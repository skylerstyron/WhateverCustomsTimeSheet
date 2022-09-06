const container = document.getElementById("container");
const heading = document.getElementById("heading");
const cName = document.getElementById("customerName");
const tableContainer = document.getElementById("tableContainer");
const printBtn = document.getElementById("printBtn");
const addRow = document.getElementById("rowBtn");

let rows;
let columns;
const vehicleColumns = ["Vehicle", "Vin #", "Arrival date"];
const mainColumnNames = ["Completed by:", "Job", "Time"];

const table = document.createElement("table");
const tbody = document.createElement("tbody");

const createCustomerTable = () => {
  rows = 1;
  columns = 1;
  const headTable = document.createElement("table");
  headTable.classList.add("head-table");
  const tbody1 = document.createElement("tbody");

  let thead1 = document.createElement("thead");
  let colNames1 = document.createElement("tr");

  for (let i = 0; i < columns; i++) {
    let th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("Customer"));
    colNames1.appendChild(th1);
  }

  thead1.appendChild(colNames1);

  for (let i = 0; i < rows; i++) {
    let tr1 = document.createElement("tr");

    for (let cols = 0; cols < columns; cols++) {
      let td1 = document.createElement("td");
      td1.addEventListener("mousedown", makeEditable); // Add mousedown listener.
      tr1.appendChild(td1);
      td1.style.fontSize = '30px';
      td1.style.fontWeight = '700';
      continue;
    }
    tbody1.appendChild(tr1);
  }

  headTable.appendChild(thead1);
  headTable.appendChild(tbody1);
  heading.appendChild(headTable);
  headTable.style.margin = '40px 0';

};

const createVehicleTable = () => {
  rows = 1;
  columns = 3;
  const headTable = document.createElement("table");
  headTable.classList.add("head-table");
  const tbody1 = document.createElement("tbody");

  let thead1 = document.createElement("thead");
  let colNames1 = document.createElement("tr");

  for (let i = 0; i < columns; i++) {
    let th1 = document.createElement("th");
    th1.appendChild(document.createTextNode(vehicleColumns[i]));
    colNames1.appendChild(th1);
  }

  thead1.appendChild(colNames1);

  for (let i = 0; i < rows; i++) {
    let tr1 = document.createElement("tr");

    for (let cols = 0; cols < columns; cols++) {
      let td1 = document.createElement("td");
      td1.addEventListener("mousedown", makeEditable); // Add mousedown listener.
      tr1.appendChild(td1);
      continue;
    }
    tbody1.appendChild(tr1);
  }

  headTable.appendChild(thead1);
  headTable.appendChild(tbody1);
  heading.appendChild(headTable);
};

const createMainTable = () => {
  rows = 5;
  columns = 3;
  table.classList.add("main-table");

  let thead2 = document.createElement("thead");
  let colNames2 = document.createElement("tr");

  for (let i = 0; i < columns; i++) {
    let th2 = document.createElement("th");
    th2.appendChild(document.createTextNode(mainColumnNames[i]));
    colNames2.appendChild(th2);
  }

  thead2.appendChild(colNames2);

  for (let i = 0; i < rows; i++) {
    let tr2 = document.createElement("tr");

    for (let cols = 0; cols < columns; cols++) {
      let td2 = document.createElement("td");
      td2.addEventListener("mousedown", makeEditable); // Add mousedown listener.
      tr2.appendChild(td2);
      continue;
    }
    tbody.appendChild(tr2);
  }

  table.appendChild(thead2);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
};

const createNewRow = () => {
  rows++;
  tr = document.createElement("tr");
  tbody.appendChild(tr);

  for (let cols = 0; cols < columns; cols++) {
    let td = document.createElement("td");
    td.addEventListener("mousedown", makeEditable); // Add mousedown listener.
    tr.appendChild(td);
    continue;
  }
};

function makeEditable(e) {
  let cell = e.target;
  if (cell.dataset.editing !== "true") {
    cell.dataset.editing = true;
    let text = cell.innerHTML;
    cell.innerHTML = "";
    let input = document.createElement("input");
    input.addEventListener("blur", makeNonEditable);
    input.type = "text";
    input.value = text;
    cell.appendChild(input);
  }
}

function makeNonEditable(e) {
  let input = e.target;
  let text = input.value;
  let cell = input.parentElement;
  if (cell.dataset.editing === "true") {
    cell.dataset.editing = false;
    cell.innerHTML = text;
  }
}

const print = () => {
  const printContent = container.innerHTML;
  newWindow = window.open();

  newWindow.document.write(printContent);
  newWindow.document.write('<link rel="stylesheet" href="styles.css">');
  newWindow.document.write('<script type="text/javascript"> window.onload = function() { window.print(); window.close(); }; </script>');

  newWindow.document.close(); // necessary for IE >= 10
  newWindow.focus(); // necessary for IE >= 10

  return true;
}

createCustomerTable();
createVehicleTable();
createMainTable();

addRow.addEventListener("click", createNewRow);
printBtn.addEventListener("click", print);
cName.addEventListener("blur", makeNonEditable);

