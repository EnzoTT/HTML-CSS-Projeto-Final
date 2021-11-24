window.onload = function () {
  fetchProductData();
  getCategoria();
};

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

function showProducts(produtos) {
  const container = document.getElementById("produtos-container");
  produtos.forEach((produto) => {
    const div = document.createElement("div");
    div.classList.add("produtos-container");
    if(produto.nome.length > 15){
        produto.nome = produto.nome.substring(0, 15) + "...";
    }
    div.innerHTML = `
        <a class="link-produto" draggable="true">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="info">
            <h3>${produto.nome}</h3>
            <p class="price">R$ ${produto.preco}</p>
        </div>
        </a>
        `;
    container.appendChild(div);
  });
}

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

let cart = [];
