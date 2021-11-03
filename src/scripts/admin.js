//Categoria
const categoryForm = document.getElementById("category-form");
categoryForm.addEventListener("submit", onFormSubmit);

let selectedRow = null;
let id_increment = 1;

function onFormSubmit() {
  let formData = readFormData(selectedRow);
  if (formData.category && selectedRow === null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
}

function readFormData(selectedRow) {
  let formData = {};
  formData["category"] = document.getElementById("categoryName").value;
  if (!selectedRow) formData["id"] = `${id_increment++}`;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("categoryTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.lenght);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.category;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.id;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = `<a onClick="onEdit(this)" id='config'>Editar</a>
  <a onClick="onDelete(this)" id='config'>Deletar</a>`;
}

function onEdit(td) {
  document.getElementById("submit").value = "Editar";
  selectedRow = td.parentElement.parentElement;
  document.getElementById("categoryName").value =
    selectedRow.cells[0].innerHTML;
}

function resetForm() {
  document.getElementById("categoryName").value = "";
  document.getElementById("submit").value = "Adicionar";
}

function updateRecord(data) {
  selectedRow.cells[0].innerHTML = data.category;
  selectedRow = null;
}

function onDelete(td) {
  
  if (confirm("Tem certeza que deseja deletar essa categoria ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("categoryTable").deleteRow(row.rowIndex);
    resetForm();
  }
}

//Produtos
const productForm = document.getElementById("form-produtos");
productForm.addEventListener("submit", onProductFormSubmit);

function openModal() {
  const categorias = getAllCategory();
  if (categorias.length !== 0) {
    mountSelect(categorias);
    document.getElementById("form-modal").style.display = "flex";
    return;
  }
  alert("Você não possui nenhuma categoria cadastrada!");
}
function closeModal() {
  document.getElementById("form-modal").style.display = "none";
  resetProductForm();
}

function getAllCategory() {
  let table = document.getElementById("categoryTable");
  let categorias = [];
  for (var i = 1, row; (row = table.rows[i]); i++) {
    categorias.push({
      nome: row.cells[0].innerText,
      id: row.cells[1].innerText,
    });
  }
  return categorias;
}

function mountSelect(categorias) {
  const categorySelect = document.getElementById("category-select");
  removeOptions(categorySelect);
  categorias.forEach((categoria) => {
    option = new Option(categoria.nome, categoria.nome);
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
    insertNewProductRecord(formData);
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

function insertNewProductRecord(data) {
  var table = document
    .getElementById("productsTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data["product-name"];
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data["product-code"];
  cell3 = newRow.insertCell(2);
  let price = data["product-price"];
  price = currencyFormatter(price);
  cell3.innerHTML = price;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data["product-weight"];
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data["product-image"];
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = data["product-category"];
  cell6 = newRow.insertCell(6);
  cell6.innerHTML =
    data["product-description"].length > 15
      ? data["product-description"].substring(0, 15) + "..."
      : data["product-description"];
  cell7 = newRow.insertCell(7);
  cell7.innerHTML = `<a onClick="editProductRecord(this)" id='config'>Editar</a>
  <a onClick="deleteProduct(this);" id='config'>Deletar</a>`;
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
