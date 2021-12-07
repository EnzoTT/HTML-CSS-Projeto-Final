function buscaPedido(e) {
  e.preventDefault();
  let pedido = document.getElementById("numero-pedido").value;
  if (pedido == "") {
    alert("Digite um pedido para buscar");
    return false;
  }

  const KEY = "xc6iPDgo3w"; // usada para testes, a chave do grupo é xc6iPDgo3w
  const SAIDA = "json";
  const COMANDO = "pedido";
  const OPCAO = "listar";
  const URL = `http://loja.buiar.com/?key=${KEY}&f=${SAIDA}&c=${COMANDO}&t=${OPCAO}`;
  console.log(URL);
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const pedidos = data.dados;
      console.log(data);
      pedidos.forEach((pedidoBuscar) => {
        if (pedidoBuscar.id == pedido) {
          console.log("achou");
          generateProductTableHead(
            document.getElementById("tabela-pedidos"),
            Object.keys(pedidoBuscar),
            pedidoBuscar
          );
        }
      });
    });
}

function generateProductTableHead(table, data, pedidoBuscar) {
  console.log(data);
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    if (key === "id") {
      text = document.createTextNode("ID ");
    } else if (key === "nome") {
      text = document.createTextNode("Nome ");
    } else if (key === "numero") {
      text = document.createTextNode("Numero ");
    } else if (key === "rua") {
      text = document.createTextNode("Rua ");
    } else if (key === "cidade") {
      text = document.createTextNode("Cidade ");
    } else if (key === "uf") {
      text = document.createTextNode("UF");
    } else if (key === "cep") {
      text = document.createTextNode("CEP ");
    } else if (key === "bairro") {
      text = document.createTextNode("Bairro ");
    }
    th.appendChild(text);
    row.appendChild(th);
  }
  geraTabelaPedido(pedidoBuscar);
}

function geraTabelaPedido(pedido) {
  console.log(pedido);
  let tabela = document.getElementById("tabela-pedidos");
  let linha = document.createElement("tr");
  let coluna = document.createElement("td");
  if (pedido.nome.length > 10) pedido.nome.substring(0, 10) + "...";
  if (pedido.rua.length > 10) pedido.rua = pedido.rua.substring(0, 10) + "...";
  if (pedido.cidade.length > 10)
    pedido.cidade = pedido.cidade.substring(0, 10) + "...";
  if (pedido.bairro.length > 10)
    pedido.bairro = pedido.bairro.substring(0, 10) + "...";

  coluna.innerHTML = pedido.id;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.time;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.nome;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.cpf;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.cep;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.rua;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.numero;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.complemento;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.bairro;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.cidade;
  linha.appendChild(coluna);
  coluna = document.createElement("td");
  coluna.innerHTML = pedido.uf;
  linha.appendChild(coluna);

  tabela.appendChild(linha);
}
