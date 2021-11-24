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
    })
    .then(() => {
      let produto = document.getElementById("produto-link");
      produto.addEventListener("click", () => {
        let produtos = {
          nome: "",
          preco: "",
          imagem: "",
          descricao: "",
          categoria: "",
        };
        produtos.nome = document.getElementById("nome").innerText;
        produtos.preco = document.getElementById("price").innerText;
        produtos.imagem = document.getElementById("imagem-produto").src;
        produtos.categoria = document.getElementById("select-categorias").value;

        showProductDetails(produtos);
      });
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
    div.classList.add("produtos-container");
    if (produto.nome.length > 15) {
      produto.nome = produto.nome.substring(0, 15) + "...";
    }
    div.innerHTML = `
        <a class="link-produto" id="produto-link">
        <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto" id="imagem-produto">
        <div class="info">
            <h3 id="nome">${produto.nome}</h3>
            <p class="price" id="price">R$ ${produto.preco}</p>
        </div>
        </a>
        `;
    container.appendChild(div);
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
  const descricao = document.getElementById("product-details-descricao");
  //descricao.innerText = produtos.descricao;
}

function closeProductDetails() {
  const produto = document.getElementById("product-details");
  produto.style.display = "none";
}

document.getElementById("select-categorias").addEventListener("change", (e) => {
  const idCategoria = e.target.value;
  changeCategoria(idCategoria);
});

function changeCategoria(id) {
  const KEY = "xc6iPDgo3w"; // a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "produto";
  const OPCAO = "listar";
  const FORMATO = "json";
  fetch(
    `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}&f=${FORMATO}&categoria=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      const produtos = data.dados;
      clearScreen();
      showProducts(produtos);
    });
}

let cart = [];
