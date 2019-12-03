function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("id");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  var div1 = document.getElementById("div1");
  if (nodeCopy.id === "COMA ") {
    nodeCopy.text = ", "
  }
  if (nodeCopy.id === "PARENTESIS ABRE ") {
    nodeCopy.text = "( "
  }
  if (nodeCopy.id === "PARENTESIS CIERRA ") {
    nodeCopy.text = ") "
  }

  nodeCopy.id = "newId"
  div1.appendChild(nodeCopy);
}

function validar() {
  var div1 = document.getElementById("div1");
  var respdiv = document.getElementById("response");
  var select = "";
  div1.childNodes.forEach(element => {
    if (element.text != undefined) {
      select += element.text.trim() + " ";
    }
  });
  console.log(select);

  $.post('/validate', { select: select }, function (data) {
    if (data.content != "error") {
      respdiv.innerHTML = "Query Valida: " + data.content;
      respdiv.style.background = "#79fc88"
    } else {
      respdiv.innerHTML = "Query Invalida: ";
      respdiv.style.background = "#fc5e56"
    }
  });
}

function borrar() {
  var div1 = document.getElementById("div1");
  var i = div1.childNodes.length;
  div1.removeChild(div1.childNodes[i - 1]);
}
var cont = 0;

function addAtrib() {
  var formu = document.getElementById("form_tabla");
  var form1Inputs = document.forms["form_tabla"].getElementsByTagName("input");
  var html0 = "<div class=\"form-group\"><label for=\"tableName\">Tabla</label><input type=\"text\" class=\"form-control\" id=\"tableName\"placeholder=\"Nombre de la tabla\" value=\"" + form1Inputs[0].value.replace(/ /g, "") + "\"></div>";
  var html = html0;
  for (let i = 1; i < form1Inputs.length; i++) {
    html += "<div class=\"form-group\"><label for=\"atributo" + cont + "\"> Nombre:</label ><input type=\"text\" class=\"form-control\" id=\" atributo" + cont + "\" placeholder=\"Nombre del atributo\" value=\"" + form1Inputs[i].value.replace(/ /g, "") + "\"></div>"
    console.log(form1Inputs[i].value.replace(/ /g, ""))
  }

  html += "<div class=\"form-group\"><label for=\"atributo" + cont + "\"> Nombre:</label ><input type=\"text\" class=\"form-control\" id=\" atributo" + cont + "\" placeholder=\"Nombre del atributo\"></div>"
  formu.innerHTML = html;
  cont += 1;
}

function resetform() {
  var formu = document.getElementById("form_tabla");
  var html = "<div class=\"form-group\"><label for=\"tableName\">Tabla</label><input type=\"text\" class=\"form-control\" id=\"tableName\"placeholder=\"Nombre de la tabla\"></div>"
  formu.innerHTML = html;
}

var tablas = [];

function enviar() {
  let formValues = [];
  var form1Inputs = document.forms["form_tabla"].getElementsByTagName("input");
  for (let i = 0; i < form1Inputs.length; i++) {
    formValues.push(form1Inputs[i].value.replace(/ /g, ""));
  }
  tablas.push(formValues)
  addAtributos();
  addTablas();
  console.log(tablas);
}
function addTablas() {
  var menutablas = document.getElementById("droptablas");
  var htmltablas = "";
  for (let index = 0; index < tablas.length; index++) {
    const element = tablas[index];
    htmltablas += "<li><a id=\" " + element[0] + "\" draggable=\"true\" ondragstart=\"drag(event)\" class=\"text-center\">" + element[0] + "</a></li>"
  }
  menutablas.innerHTML = htmltablas;
}
function addAtributos() {
  var menuatributos = document.getElementById("dropatributos");
  var htmlatributos = "<a id=\"* \" draggable=\"true\" ondragstart=\"drag(event)\" class=\"text-center\">*</a>";
  for (let index = 0; index < tablas.length; index++) {
    const element = tablas[index];
    for (let j = 1; j < element.length; j++) {
      htmlatributos += "<li><a id=\"" + element[0] + "." + element[j] + "\" draggable=\"true\" ondragstart=\"drag(event)\" class=\"text-center\">" + element[0] + "." + element[j] + "</a></li>"
    }
  }
  menuatributos.innerHTML = htmlatributos;
}

