window.onload = function () {
  fetchProductData();
  getCategoria();
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
          <a class="link-produto" id="${produto.id}" draggable="true">
          <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto" id="imagem-produto" draggable="false">
          <div class="info">
              <h3 id="nome" class="produto-nome">${produto.nome}</h3>
              <p class="price" id="price">R$ ${produto.preco}</p>
              <button class="btn-comprar" onclick="adicionarAoCarrinho(event)">Comprar</button>
              <p class="descricao-hide" id="descricao">${produto.descricao}</p>
          </div>
          </a>
          `;
          div.addEventListener("dragstart", drag);
    container.appendChild(div);
    getProductLinkId(div);
  });
}

function getProductLinkId(div) {
  div.addEventListener("click", (e) => {
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

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const produto = ev.target.appendChild(document.getElementById(data));
  const detalhesProduto = {
    id: produto.id,
  }
  dropCarrinho(detalhesProduto);
}

function handleDrop(e){
  console.log(e);
  e.preventDefault();
  const detalhesProduto = {
    id: e.target.id,
    preco: " ", //e.target.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText,
  }
  console.log(detalhesProduto);
  dropCarrinho(detalhesProduto);
}

function adicionarAoCarrinho(e){
  const detalhesProduto = {
    id: produto.id,
    preco: produto.preco,
  }
  dropCarrinho(detalhesProduto);
}

let carrinho = [];

function dropCarrinho(produto){
  document.getElementById("quantidade-carrinho").innerText = parseInt(document.getElementById("quantidade-carrinho").innerText) + 1;
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log(carrinho);
}


