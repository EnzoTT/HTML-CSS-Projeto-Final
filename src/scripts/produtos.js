window.onload = function () {
  fetchProductData();
  getCategoria();
  document.getElementById('quantidade-carrinho').innerText = quatidadeItemsNoCarrinho()
};

function getCategoria() {
  const KEY = "xc6iPDgo3w"; // a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "categoria";
  const OPCAO = "listar";
  const FORMATO = "json";
  fetch(
    `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&f=${FORMATO}`
  )
    .then((response) => response.json())
    .then((data) => {
      const listaCategorias = data.dados;
      const selectionCategoria = document.getElementById("select-categorias");
      listaCategorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.id;
        option.innerText = categoria.nome;
        selectionCategoria.appendChild(option);
      });
    });
}

function fetchProductData() {
  const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "produto";
  const OPCAO = "listar";
  fetch(`http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const produtos = data.dados;
      showProducts(produtos);
    });
}

function clearScreen() {
  const container = document.getElementById("produtos-container");
  container.innerHTML = "";
}

function showProducts(produtos) {
  const container = document.getElementById("produtos-container");
  produtos.forEach((produto) => {
    const div = document.createElement("div");
    div.classList.add("produtos-card");
    if (produto.nome.length > 15) {
      produto.nome = produto.nome.substring(0, 15) + "...";
    }
    div.innerHTML = `
        <a class="link-produto" id="${produto.id}" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">
        <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto" id="imagem-produto">
        <div class="info">
            <h3 id="nome" class="produto-nome">${produto.nome}</h3>
            <p class="price" id="price">R$ ${produto.preco}</p>
            <button class="btn-comprar">Comprar</button>
            <p class="descricao-hide" id="descricao">${produto.descricao}</p>
        </div>
        </a>
        `;
    container.appendChild(div);
  });
  getProductLinkId();
}

function getProductLinkId() {
  document.getElementById("produto-link").addEventListener("click", (e) => {
    e.preventDefault();
    const detalhes = {
      imagem: e.target.parentNode.firstElementChild.src,
      nome: e.target.parentNode.firstElementChild.nextElementSibling
        .firstElementChild.innerText,
      preco: document.getElementById("price").innerText,
      descricao: document.getElementById("descricao").innerText,
    };
    console.log(detalhes);
    showProductDetails(detalhes);
  });
}

function showProductDetails(produtos) {
  console.log(produtos);
  console.log("showProductDetails");
  const produto = document.getElementById("product-details");
  produto.style.display = "block";
  produto.style.position = "absolute";
  produto.style.top = "50%";
  produto.style.left = "50%";
  produto.style.transform = "translate(-50%, -50%)";

  const image = document.getElementById("product-details-image");
  image.src = produtos.imagem;
  const nome = document.getElementById("product-details-name");
  nome.innerText = produtos.nome;
  const preco = document.getElementById("product-details-price");
  preco.innerText = produtos.preco;
  const descricao = document.getElementById("product-details-description");
  descricao.innerText = produtos.descricao;
}

function closeProductDetails() {
  const produto = document.getElementById("product-details");
  produto.style.display = "none";
}

document.getElementById("select-categorias").addEventListener("change", (e) => {
  const idCategoria = e.target.value;
  if (e.currentTarget.value == "todos") {
    clearScreen();
    fetchProductData();
  } else {
    changeCategoria(idCategoria);
  }
});

function changeCategoria(id) {
  const KEY = "xc6iPDgo3w"; // a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "produto";
  const OPCAO = "listar";
  const FORMATO = "json";
  let produtosLista = [];
  fetch(
    `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&f=${FORMATO}&categoria=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      const produtos = data.dados;
      produtos.forEach((produto) => {
        if (produto.categoria == id) {
          produtosLista.push(produto);
        }
      });
      clearScreen();
      showProducts(produtosLista);
    });
}

let cart = JSON.parse(localStorage.getItem('cartItems')) || {};
function productIsOnCart(id) {
  return id in cart;
}

function addItemToCart(productId) {
  if (productIsOnCart(productId)) {
    cart[productId].quantidade++;
    return
  }
  cart[productId]={
    quantidade:1,
    id: productId
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("id");
  addItemToCart(data)
  localStorage.setItem('cartItems', JSON.stringify(cart));
  document.getElementById('quantidade-carrinho').innerText = quatidadeItemsNoCarrinho()
}

function quatidadeItemsNoCarrinho(){
  let total = 0;
  let cartItems = JSON.parse(localStorage.getItem('cartItems'))
  Object.keys(cartItems).forEach(item=>{
    total = total + cartItems[item].quantidade
  })
  return total
}