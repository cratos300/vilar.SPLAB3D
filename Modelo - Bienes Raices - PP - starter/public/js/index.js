    let frm;
 let eliminar;
 let modificar;
 let agregar;
 let cancelar;
let selector;
let bandera  = false;
$(inicializarManejadores);
function inicializarManejadores() { 
    document.getElementById("promedio").value = "N/A";
    DesaSelec(); 
    ContadorCheckbox();
    DesabilitarCheckbox();
    frm = document.forms[0];
    leerLocalStorage();
    modificar = document.getElementById("modificar");

    cancelar = document.getElementById("cancelar");
    selector = document.getElementById("tipo");
    $("#cancelar").on("click", function () {
        agregar.className = "visible";
        eliminar.className = 'oculto';
        modificar.className = 'oculto';
        cancelar.className = 'oculto';
        selector.selectedIndex = "0";
    })

    //verificar que estemos apuntando al formulario correcto
    eliminar = document.getElementById('eliminar');
    frm.addEventListener('submit', manejadorSubmit);
    agregar = document.getElementById('alta');

    $("#modificar").on("click", function () {
        let nuevoAnuncio = crearAnuncio(frm);
        console.log(nuevoAnuncio);
        modificacion(nuevoAnuncio);
        cancelar.className = 'oculto';
        eliminar.className = 'oculto';
        modificar.className = 'oculto';
        agregar.className = "visible";
        limpiar();

    })

    $("#eliminar").on("click", manejadoraBorrar);

    //agregar.addEventListener('click',manejadorAlta);

    //atrapar el evento submint del formularios//cuando se produsca el submit ejecuta la funcions
    Listar();
    $("#alta").on("click", manejadorAlta);
}
function manejadoraBorrar(e) {
    DesabilitarCheckbox(); 
    let nuevoAnuncio = crearAnuncio(frm);
    baja(nuevoAnuncio);
    eliminar.className = 'oculto';
    modificar.className = 'oculto';
    agregar.className = "visible";
    cancelar.className = 'oculto';
    limpiar();
}

function crearAnuncio(frm) {
    let titulo;
    let transaccion;
    let descripcion;
    let precio;
    let baños;
    let estacionamiento;
    let dormitorio;
    let id;
    for (let elemento of frm.elements) {
        switch (elemento.name) {
            case "frmTitulo":
                titulo = elemento.value;
                break;
            case "frmDescripcion":
                descripcion = elemento.value;
                break;
            case "frmPrecio":
                precio = elemento.value;
                break;
            case "frmNum_baño":
                baños = elemento.value;
                break;
            case "frmNum_estacionamiento":
                estacionamiento = elemento.value;
                break;
            case "frmNum_dormitorio":
                dormitorio = elemento.value;
                break;
            case "tipo":
                transaccion = elemento.value;
                break;
            case "id":
                id = elemento.value;
            default:
                break;
        }
    }
    return new anu(id, titulo, transaccion, descripcion, precio, baños, estacionamiento, dormitorio);

}
 function CargarFormulario(frm, obj) {
    for (let elemento of frm.elements) {
        switch (elemento.name) {
            case "frmTitulo":
                elemento.value = obj.titulo;
                break;
            case "frmDescripcion":
                elemento.value = obj.descripcion;
                break;
            case "frmPrecio":
                elemento.value = obj.precio;
                break;
            case "frmNum_baño":
                elemento.value = parseInt(obj.num_puertas);
                break;
            case "frmNum_estacionamiento":
                elemento.value = parseInt(obj.num_kms);
                break;
            case "frmNum_dormitorio":
                elemento.value = parseInt(obj.potencia);
                break;
            case "tipo":
                if (obj.transaccion == "Venta") {
                    elemento.selectedIndex = "0";
                }
                else if (obj.transaccion == "Alquiler") {
                    elemento.selectedIndex = "1";
                }
                else {
                    elemento.selectedIndex = "2";
                }
                break;
            case "id":
                console.log(obj.id);
                elemento.value = obj.id;
                break;
            default:
                break;
        }
    }
}
function Spinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', './img/208.gif');
    spinner.setAttribute('alt', 'spinner');
    return spinner;
}
function manejadorAlta(e) {

    DesabilitarCheckbox(); 
    let nuevoAnuncio = crearAnuncio(frm);
    limpiar();
    alta(nuevoAnuncio);
}
function manejadorSubmit(e) {
    e.preventDefault();
}
function limpiar() {
    let recorrer = document.getElementsByTagName("input");

    for (let i = 0; i < recorrer.length; i++) {
        recorrer[i].value = "";
    }
}
/*function Manejadora(e)
{
    console.log(e.target.parentElements);
    let anuncio = new Anuncio(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent,
        nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
        nodes[7].textContent);
}*/

/*$("#modificar").on("click", function() {
        let nuevoAnuncio = crearAnuncio(frm); 
        console.log(nuevoAnuncio);
        modificacion(nuevoAnuncio);
        cancelar.className = 'oculto';
        eliminar.className = 'oculto';
        modificar.className = 'oculto';
        agregar.className = "visible";
        
    })*/
 function manejadorCheckbox(datos) {
    for (let i = 0; frm.elements[i]; i++) {
        if (frm.elements[i].type == 'checkbox') {
            frm.elements[i].addEventListener("click", function () {
                SeterLocalStorage();
                let seleccionados = [];
                for (let i = 0; frm.elements[i]; i++) {
                    if (frm.elements[i].type == 'checkbox') {
                        if (!frm.elements[i].checked) {
                            seleccionados.push(frm.elements[i].name);
                        }
                    }
                }
                Realizar(seleccionados,datos);
            })
        }
    }
}
function Realizar(seleccionados,datos)
{
    let transaccion =  null;
    let descripcion = null;
    let general = null;
    let precio = null;
    let puertas = null;
    let km = null;
    let potencia = null;
    let titulo = null;
    let id = null;
    let nuevoArray;
    id = datos.map(dar => dar.id);
    for(let i =0; i<seleccionados.length; i++)
    {
        //tengo que hacer varios if con cada una de las opciones y meter adentor esto por que no hay otra forma
        if(seleccionados[i] == "transaccion")
        {
            transaccion = datos.map(dato=>dato.transaccion); 
        }
        else if(seleccionados[i] == "descripcion"){
            descripcion = datos.map(dato=>dato.descripcion);
        }
        else if(seleccionados[i] == "precio"){
            precio = datos.map(dato=>dato.precio);
        }
        else if(seleccionados[i] == "puertas"){
            puertas = datos.map(dato=>dato.num_puertas);
        }
        else if(seleccionados[i] == "kms"){
            km = datos.map(dato=>dato.num_kms);
        }
        else if(seleccionados[i] == "potencia"){
            potencia = datos.map(dato=>dato.potencia);
        }
        else if(seleccionados[i] == "titulo"){
            titulo = datos.map(dato=>dato.titulo);
        }
        else if(seleccionados[i] == "id"){
            id = datos.map(dato=>dato.id);
        }
    }
    general = Array();
        for(let i = 0; i<id.length;i++)
        {
            objetos = new Object();
            objetos.id = id[i];
            
            if(transaccion!=null)
            {
                objetos.transaccion = transaccion[i];
            }
            if(titulo != null)
            {
                objetos.titulo = titulo[i];
            }
            if(descripcion != null)
            {
                objetos.descripcion = descripcion[i]
            }
            if(precio != null)
            {
                objetos.precio = precio[i]
            }
            if(puertas != null)
            {
                objetos.num_puertas = puertas[i]
            }
            if(km!= null)
            {
                objetos.num_kms = km[i]
            }
            if(potencia != null)
            {
                objetos.potencia = potencia[i]
            }
            general.push(objetos);
        }
        document.getElementById("tabla").innerText = "";
        document.getElementById('tabla').appendChild(crearTabla(general));
        
    
}
function manejarINICIO(datos) {
    let contador = 0;
            let date = document.getElementsByTagName("input");
             let seleccionados = Array();
                for (let i = 0;i<date.length; i++) {
                    if(date[i].type == "checkbox"){
                        if (!date[i].checked) {
                            seleccionados.push(date[i].name);
                        }
                    }
                }
                
                //console.log(seleccionados);
                Realizar(seleccionados,datos);
            }

function SeterLocalStorage()
{
    let check = document.getElementsByTagName("input");
    arr = Array()
    for(let i =0; i<check.length;i++)
    {
        if(check[i].type == "checkbox")
        {
            if(check[i].checked == true)
            {
                arr.push(check[i].value)
            }
        }
    }
    console.log(arr);
    localStorage.setItem("checkbox", arr);
}
function leerLocalStorage()
{
    arra  = Array();
    let datos = localStorage.getItem("checkbox");
    if(datos != null)
    {
    arra = datos.split(",");
    for(let i = 0; i<arra.length;i++)
    {
        if(arra[i] == "transaccion")
        {
            document.getElementById("transaccion").checked = true;
        }
        else if(arra[i] == "titulo")
        {
            document.getElementById("titulo").checked = true;
        }
        else if(arra[i] == "puertas")
        {
            document.getElementById("puertas").checked = true;
        }
        else if(arra[i] == "precio")
        {
            document.getElementById("precio").checked = true;
        }
        else if(arra[i] == "descripcion")
        {
            document.getElementById("descripcion").checked = true;
        }
        else if(arra[i] == "kms")
        {
            document.getElementById("kms").checked = true;
        }
        else if(arra[i] == "potencia")
        {
            document.getElementById("potencia").checked = true;
        }
    }
}
}
function DesabilitarCheckbox()
{
    let check = document.getElementsByTagName("input");
    for(let i = 0; i<check.length;i++)
    {
        if(check[i].type == "checkbox")
        {
            check[i].disabled  =  true;
        }
    }
}
function HabilitarCheckbox()
{
    let check = document.getElementsByTagName("input");
    for(let i = 0; i<check.length;i++)
    {
        if(check[i].type == "checkbox")
        {
            check[i].disabled  =  false;
        }
    }
}
function FiltrarTransaccion(datos,filtrar)
{
   let datii = document.getElementById("frmNum_baño").value;
   let datii2  = document.getElementById("frmNum_dormitorio").value;
   let todoss;
   let data;
   let contador = 0;
   let acumulador = 0;
    if(filtrar == "Venta")
    {
        let respuesta = Array();
         respuesta = datos.filter(elemento => (elemento.transaccion == "Venta"));
         todoss = respuesta;
         document.getElementById("tabla").innerText = "";
         document.getElementById('tabla').appendChild(crearTabla(respuesta));
         acumulador = respuesta.reduce((prev,actual)=>{
             return (Number(prev)+Number(actual.precio))}
             ,0);
             promedio = acumulador / respuesta.length;
            document.getElementById("promedio").value = promedio;
    }
    else if(filtrar == "Alquiler")
    {
        let respuesta = datos.filter(elemento => elemento.transaccion == "Alquiler");
        todoss = respuesta;
        document.getElementById("tabla").innerText = "";
        document.getElementById('tabla').appendChild(crearTabla(respuesta));
        acumulador = respuesta.reduce((prev,actual)=>{
            return (Number(prev)+Number(actual.precio))}
            ,0);
            promedio = acumulador / respuesta.length;
           document.getElementById("promedio").value = promedio;
    }
    else if(filtrar == "Permutar")
    {
        let respuesta = datos.filter(elemento => elemento.transaccion == "Permutar");
        todoss = respuesta;
        document.getElementById("tabla").innerText = "";
        document.getElementById('tabla').appendChild(crearTabla(respuesta));
        acumulador = respuesta.reduce((prev,actual)=>{
            return (Number(prev)+Number(actual.precio))}
            ,0);
            promedio = acumulador / respuesta.length;
           document.getElementById("promedio").value = promedio;
    }
    else
    {
        todoss = datos;
        document.getElementById("tabla").innerText = "";
        document.getElementById('tabla').appendChild(crearTabla(datos));
        document.getElementById("promedio").value = "N/A";
    }
    return todoss;
}
function DesaSelec()
{
    let selec = document.getElementById("seleccionado");
    selec.disabled = true;
}
function HabiSelec()
{
    let selec = document.getElementById("seleccionado");
    selec.disabled = false;
}
function ContadorCheckbox()
{
    let contador = 0;
    let dat = document.getElementsByTagName("input");
    for(let i = 0; i<dat.length;i++)
    {
        if(dat[i].type == "checkbox")
        {
            dat[i].addEventListener("click",function(){
                for(let i = 0; i<dat.length;i++)
                {
                    DesaSelec();
                    if(dat[i].type == "checkbox")
                    {
                        if (!dat[i].checked) 
                        {
                            contador++;   
                        }
                    }
                }
                console.log(contador);
                if(contador == 7)
                {
                    HabiSelec();
                }
                contador = 0;
            })
        }
    }

}


