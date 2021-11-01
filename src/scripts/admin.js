const elementoForm = document.querySelector("form");
elementoForm.addEventListener("submit", onFormSubmit);

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
