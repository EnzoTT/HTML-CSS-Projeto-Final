window.addEventListener("load", () => {
  if (localStorage.hasOwnProperty("carrinho")) {
    let items = JSON.parse(localStorage.getItem("carrinho"));
    console.log(items);
    buscaItens(items);
  }
});

function buscaItens(items) {
  let itens = [];
  items.forEach((item) => {
    const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
    const SAIDA = "json";
    const COMANDO = "produto";
    const OPCAO = "listar";
    const URL = `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&id=${item.id}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        itens.push(data.dados[0]);
        showCartProducts(data.dados[0], itens);
      });
  });
  document.getElementById("quantidade-carrinho").innerHTML = items.length;
}

function aumentaQuantidade(id) {
  let itens = JSON.parse(localStorage.getItem("carrinho"));
  let newItems = itens.filter((item) => {
    return item.id != id;
  });
  newItems.push({ id: id });
  localStorage.setItem("carrinho", JSON.stringify(newItems));
  window.location.reload();
}

function diminuiQuantidade(id, quantidade) {
  let itens = JSON.parse(localStorage.getItem("carrinho"));
  let newItems = itens.filter((item) => {
    return item.id != id;
  });
  localStorage.setItem("carrinho", JSON.stringify(newItems));
  window.location.reload();
}

function removeItem(id) {
  let items = JSON.parse(localStorage.getItem("carrinho"));
  let newItems = items.filter((item) => {
    return item.id != id;
  });
  localStorage.setItem("carrinho", JSON.stringify(newItems));
  window.location.reload();
}

function showCartProducts(data, itens) {
  let quantidadeItens = {};

  const container = document.getElementById("produtos-container");
  console.log(data);
  let div = document.createElement("div");
  div.classList.add("produtos-card");
  div.innerHTML = `
    <a class="link-produto" id="${data.id}">
    <img src="${data.imagem}" alt="${data.nome}" class="imagem-produto" id="imagem-produto">
    <div class="info">
      <h3 id="nome" class="produto-nome">${data.nome}</h3>
      <p class="price" id="price">R$ ${data.preco}</p>
      <p class="quantidade" id="quantidade">Quantidade: ${quantidadeItem(data.nome, itens)}</p> 
    </div>
    <div> 
      <button class="+" id="aumentar" >+</button>
      <button class="-" id="diminuir" >-</button>
    </div>
    <div> 
      <button class="btn-remove" id="btn-remove">Remover</button>
    </div>
   </a>
    `;
  container.appendChild(div);

  document.getElementById("btn-remove").addEventListener("click", () => {
    removeItem(data.id);
  });

  document.getElementById("aumentar").addEventListener("click", () => {
    aumentaQuantidade(data.id);
  });

  document.getElementById("diminuir").addEventListener("click", () => {
    diminuiQuantidade(data.id, quantidadeItem(data.nome, itens));
  });

  function quantidadeItem(nomeItem, itens) {
    let quantidade = 0;
    itens.forEach((item) => {
      if (item.nome == nomeItem) {
        quantidade++;
      }
    });
    return quantidade;
  }
}


