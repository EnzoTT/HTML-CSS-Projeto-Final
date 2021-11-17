window.onload = () => {
  fetchCategoryData();
  fetchProductData();
};
//API function
function loadJSON(callback, url) {
  console.log(url);
  var obj = new XMLHttpRequest();
  obj.overrideMimeType("application/json");
  obj.open("GET", url, true);
  obj.onreadystatechange = function () {
    if (obj.readyState == 4 && obj.status == "200") {
      callback(JSON.parse(obj.responseText));
    }
  };
  obj.send(null);
}

//Categoria
const categoryForm = document.getElementById("category-form");
categoryForm.addEventListener("submit", onCategoryFormSubmit);

let selectedRow = null;
let id_increment = 1;

function generateCategoryTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    if (key === "id") {
      text = document.createTextNode("ID");
    } else if (key === "nome") {
      text = document.createTextNode("Nome");
    }
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateCategoryTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let th = document.createElement("th");
      let text = document.createTextNode(element[key]);
      th.appendChild(text);
      row.appendChild(th);
    }
    let td = document.createElement("td");
    row.appendChild(td);
    td.innerHTML = `<a onClick="onEditCategory(this)" id='config'>Editar</a>
    <a onClick="onDeleteCategory(this);" id='config'>Deletar</a>`;
  }
}

let categorysData = {};
function fetchCategoryData() {
  document.getElementById("categoryTable").innerHTML = "";
  const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "categoria";
  const OPCAO = "listar";
  fetch(`http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log(data.dados.length);
        categorysData = data.dados;
        const dados = Object.keys(data.dados[0]);
        generateCategoryTableHead(
          document.getElementById("categoryTable"),
          dados
        );
        generateCategoryTable(
          document.getElementById("categoryTable"),
          data.dados
        );
      }
    });
}
function onCategoryFormSubmit() {
  //Adicionar Categoria
  let formData = readCategoryFormData();
  if (document.getElementById("submit").value !== "Editar") {
    const KEY = "xc6iPDgo3w";
    const COMANDO = "categoria";
    const OPCAO = "inserir";
    loadJSON((any) => {},
    `http://loja.buiar.com/?key=${KEY}&c=${COMANDO}&t=${OPCAO}&nome=${formData["category"]}`);
    fetchCategoryData();
    return;
  }
  editCategory(formData["category"]);
  console.log("Editei");
}

function editCategory(nome) {selectedRow.cells[1].innerHTML;
  ("categoria");
  const KEY = "xc6iPDgo3w";
  const COMANDO = "categoria";
  const OPCAO = "alterar";
  loadJSON((any) => {},
  `http://loja.buiar.com/?key=${KEY}&c=${COMANDO}&t=${OPCAO}&id=${editCategoryId}&nome=${nome}`);
  fetchCategoryData();
  resetForm();
}

function resetForm() {
  document.getElementById("categoryName").value = "";
  document.getElementById("submit").value = "Adicionar";
}

function readCategoryFormData() {
  let formData = {};
  formData["category"] = document.getElementById("categoryName").value;
  return formData;
}

let editCategoryId;
//Editar Categoria
function onEditCategory(td) {
  document.getElementById("submit").value = "Editar";
  selectedRow = td.parentElement.parentElement;
  document.getElementById("categoryName").value =
    selectedRow.cells[1].innerHTML;
  editCategoryId = selectedRow.cells[0].innerHTML;
}

function updateRecord(data) {
  selectedRow.cells[0].innerHTML = data.category;
  selectedRow = null;
}
//Deletar Categoria
function onDeleteCategory(td) {
  if (confirm("Tem certeza que deseja deletar essa categoria ?")) {
    row = td.parentElement.parentElement;
    idToDelete = row.cells[0].innerHTML;
    const KEY = "xc6iPDgo3w";
    const COMANDO = "categoria";
    const OPCAO = "remover";
    loadJSON((any) => {},
    `http://loja.buiar.com/?key=${KEY}&c=${COMANDO}&t=${OPCAO}&id=${idToDelete}`);
    fetchCategoryData();
  }
}
function isCategoryEmpty() {
  return categorysData.length > 0;
}

//Produtos
const productForm = document.getElementById("form-produtos");
productForm.addEventListener("submit", onProductFormSubmit);

function fetchProductData() {
  document.getElementById("productsTable").innerHTML = "";
  const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "produto";
  const OPCAO = "listar";
  fetch(`http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const dados = Object.keys(data.dados[0]);
      generateProductTableHead(document.getElementById("productsTable"), dados);
      generateProductTable(
        document.getElementById("productsTable"),
        data.dados
      );
    });
}

function generateProductTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    if (key === "id") {
      text = document.createTextNode("ID");
    } else if (key === "codigo") {
      text = document.createTextNode("Código");
    } else if (key === "categoria") {
      text = document.createTextNode("Categoria");
    } else if (key === "nome") {
      text = document.createTextNode("Nome");
    } else if (key === "descricao") {
      text = document.createTextNode("Descrição");
    } else if (key === "preco") {
      text = document.createTextNode("Preço");
    } else if (key === "imagem") {
      text = document.createTextNode("Imagem");
    } else if (key === "peso") {
      text = document.createTextNode("Peso");
    }
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateProductTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let th = document.createElement("th");
      let text = document.createTextNode(
        element[key].length > 10
          ? element[key].substring(0, 10) + "..."
          : element[key]
      );
      if (key === "preco") {
        const price = currencyFormatter(element[key]);
        text = document.createTextNode(price);
      }
      th.appendChild(text);
      row.appendChild(th);
    }
    let td = document.createElement("td");
    row.appendChild(td);
    td.innerHTML = `<a onClick="editProduct(this)" id='config'>Editar</a>
    <a onClick="deleteProduct(this);" id='config'>Deletar</a>`;
  }
}

function openModal() {
  if (isCategoryEmpty()) {
    mountSelect(categorysData);
    document.getElementById("form-modal").style.display = "flex";
    return;
  }
  alert("Você não possui nenhuma categoria cadastrada!");
}

function closeModal() {
  document.getElementById("form-modal").style.display = "none";
  resetProductForm();
}

function mountSelect(categorias) {
  const categorySelect = document.getElementById("category-select");
  removeOptions(categorySelect);
  categorias.forEach((categoria) => {
    option = new Option(categoria.nome, categoria.id);
    categorySelect.options[categorySelect.options.length] = option;
  });
}

function removeOptions(selectElement) {
  var i,
    length = selectElement.options.length - 1;
  for (i = length; i >= 1; i--) {
    selectElement.remove(i);
  }
}

function resetProductForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productCode").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("ProductWeight").value = "";
  document.getElementById("productImage").value = "";
  document.getElementById("category-select").value = "";
  document.getElementById("submit-product").value = "Adicionar";
}

//Funcoes para handle tabela
function onProductFormSubmit() {
  if (isValidProductForm()) {
    let formData = readProductFormData();
    console.log(formData);
    const KEY = "xc6iPDgo3w";
    const COMANDO = "produto";
    const OPCAO = "inserir";
    console.log(`http://loja.buiar.com/?key=${KEY}&c=${COMANDO}&t=${OPCAO}
    &nome=${formData["product-name"]}
    &categoria=${formData["product-category"]}
    &descricao${formData["product-description"]}
    &preco=${formData["product-price"]}
    &imagem=${formData["product-image"]}
    &peso=${formData["product-weight"]}`);
    loadJSON((any) => {
      console.log(any);
    }, `http://loja.buiar.com/?key=${KEY}&c=${COMANDO}&t=${OPCAO}&nome=${formData["product-name"]}&categoria=${formData["product-category"]}&descricao=${formData["product-description"]}&preco=${formData["product-price"]}&imagem=${formData["product-image"]}&peso=${formData["product-weight"]}&codigo=${formData["product-code"]}`);
    fetchProductData();
    closeModal();
  } else {
    alert("Você deve preencher todos os campos!");
  }
}

function readProductFormData() {
  let formData = {};
  formData["product-name"] = document.getElementById("productName").value;
  formData["product-code"] = document.getElementById("productCode").value;
  formData["product-price"] = document.getElementById("productPrice").value;
  formData["product-weight"] = document.getElementById("ProductWeight").value;
  formData["product-image"] = document.getElementById("productImage").value;
  formData["product-description"] =
    document.getElementById("productDescription").value;
  formData["product-category"] =
    document.getElementById("category-select").value;
  return formData;
}

function isValidProductForm() {
  if (
    document.getElementById("productName").value !== "" &&
    document.getElementById("productCode").value !== "" &&
    document.getElementById("productPrice").value !== "" &&
    document.getElementById("ProductWeight").value !== "" &&
    document.getElementById("productImage").value !== "" &&
    document.getElementById("category-select").value !== ""
  ) {
    return true;
  }
  return false;
}
//Deletar Produto
function deleteProduct(data) {
  if (confirm("Tem certeza que deseja deletar este produto?")) {
    selectedRow = data.parentElement.parentElement;
    document.getElementById("productsTable").deleteRow(selectedRow.rowIndex);
  }
}

function currencyFormatter(price) {
  price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return price;
}
