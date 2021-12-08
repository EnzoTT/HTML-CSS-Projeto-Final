let cartItems = {};
let quatidadeItems = 0;
window.addEventListener("load", () => {
  if (localStorage.hasOwnProperty("cartItems")) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    buscaItens(cartItems);
  }
});

function buscaItens(items) {
  let itens = Object.keys(items);
  itens.forEach((item) => {
    const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
    const SAIDA = "json";
    const COMANDO = "produto";
    const OPCAO = "listar";
    const URL = `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&id=${item}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        cartItems[item].nome = data.dados[0].nome;
        cartItems[item].preco = data.dados[0].preco;
        cartItems[item].imagem = data.dados[0].imagem;

        showCartProducts(cartItems, item);
        console.log(cartItems);
      });
    });

  document.getElementById("quantidade-carrinho").innerHTML = quatidadeItemsNoCarrinho();
}

function quatidadeItemsNoCarrinho(){
  let total = 0;
  Object.keys(cartItems).forEach(item=>{
    total = total + cartItems[item].quantidade
  })
  return total
}

function addItem(item){
  let id = item.parentElement.parentElement.id
  let cart = JSON.parse(localStorage.getItem("cartItems"))
  cart[id].quantidade++
  localStorage.setItem("cartItems", JSON.stringify(cart))
  window.location.reload();
}

function removeItem(item){
  let id = item.parentElement.parentElement.id
  let cart = JSON.parse(localStorage.getItem("cartItems"))
  cart[id].quantidade--
  if(cart[id].quantidade===0){
   delete cart[id]
  }
  localStorage.setItem("cartItems", JSON.stringify(cart))
  window.location.reload();
}

function deleteItem(item){
  let id = item.parentElement.parentElement.id
  let cart = JSON.parse(localStorage.getItem("cartItems"));
  delete cart[id]
  localStorage.setItem("cartItems", JSON.stringify(cart))
  window.location.reload();
}

function showCartProducts(data, item) {
  const container = document.getElementById("produtos-container");
  console.log(data);
  let div = document.createElement("div");
  div.className = "item-produto";
  div.id = data[item].id;

  div.innerHTML = `
    <img src='${data[item].imagem}'>
    <h1>${data[item].nome}</h1>
    <span> R$${data[item].preco}</span>
    <div class='item-button'>
    <button onClick="removeItem(this)">-</button>
    <span>${data[item].quantidade}</span>
    <button onClick="addItem(this)">+</button>
    <button class='remove-button' onClick="deleteItem(this)">Remover</button>
    </div>
    `;
  container.appendChild(div);

  document.getElementById('total-price').innerHTML = `<p>Valor total: R$ ${precoTotal().toFixed(2)}</p>`
}

function precoTotal(){
  let total = 0;
  Object.keys(cartItems).forEach(item=>{
    total = total + (cartItems[item].quantidade*cartItems[item].preco)
  })
  return total
}

//Funcoes de finalização de pedido
function buscaCEP() {
  let cep = document.getElementById("cep").value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("uf").value = data.uf;
    });
}

function validaCPF() {
  let cpf = document.getElementById("cpf").value;
  if (cpf.length != 11) {
    document.getElementById("cpf").style.borderColor = "red";
  } else {
    document.getElementById("cpf").style.borderColor = "green";
  }
}

function finalizarPedido(event) {
  event.preventDefault();
  let nome = document.getElementById("nome").value;
  console.log(nome);
  let cpf = document.getElementById("cpf").value;
  let cep = document.getElementById("cep").value;
  let rua = document.getElementById("rua").value;
  let bairro = document.getElementById("bairro").value;
  let cidade = document.getElementById("cidade").value;
  let uf = document.getElementById("uf").value;
  let numero = document.getElementById("numero").value;
  let complemento = document.getElementById("complemento").value;
  let items = JSON.parse(localStorage.getItem("cartItems"));


  const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "pedido";
  const OPCAO = "inserir";
  const NOME = nome;
  const CPF = cpf;
  const CEP = cep;
  const RUA = rua;
  const BAIRRO = bairro;
  const CIDADE = cidade;
  const UF = uf;
  const NUMERO = numero;
  const COMPLEMENTO = complemento;
  let ID_PEDIDO = 0;

  let requisicao = { method: "POST" };

  const URL = `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&nome=${NOME}&cpf=${CPF}&cep=${CEP}&rua=${RUA}&bairro=${BAIRRO}&cidade=${CIDADE}&uf=${UF}&numero=${NUMERO}&complemento=${COMPLEMENTO}`;
  fetch(URL, requisicao)
    .then((response) => response.json())
    .then((data) => {
      ID_PEDIDO = data.dados.id;
      console.log(data);
      if (data.erro == 0) {
        requisicao_itens(ID_PEDIDO, items);
      }
    });

  let pedido = {
    nome: nome,
    cpf: cpf,
    cep: cep,
    rua: rua,
    bairro: bairro,
    cidade: cidade,
    uf: uf,
  };
}

function requisicao_itens(ID_PEDIDO, items) {
  const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "item";
  const OPCAO = "inserir";

  let requisicao = { method: "POST" };
  Object.keys(items).forEach((item) => {
    console.log(item);

    const URL = `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&pedido=${ID_PEDIDO}&qtd=${items[item].quantidade}&produto=${
      item
    }`;
    console.log(URL);
    fetch(URL, requisicao)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
}
