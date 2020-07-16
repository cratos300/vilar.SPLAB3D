
 function crearTabla(array) {
/*


let tabla= document.createElement('table');
tabla.setAttribute('border','5px solid Black');
tabla.setAttribute('style','border-collapse: collapse');
 tabla.setAttribute('class','blanco');

let trCabecera = document.createElement('tr');

trCabecera.setAttribute('class',"colortext")
for(elemento in array[0])
{ 
   let th = document.createElement('th');
   th.textContent = elemento;
   trCabecera.appendChild(th);
}
tabla.appendChild(trCabecera);
console.log(tabla);

return tabla;
}*/
var tabla=document.createElement('table');
    tabla.setAttribute('border','5px solid');
    tabla.setAttribute('style','border-collapse: collapse');

    let cabecera = document.createElement('tr');
    cabecera.setAttribute("class","rojo");
    for(let atriubuto in array[0]){
        
        let th= document.createElement('th');
        th.textContent = atriubuto;
      
        if(atriubuto != "active")
            cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);
    for(let i = 0 ;i <array.length;i++){
        let fila = document.createElement("tr");
        let unObjeto=array[i];
        for(let j in unObjeto){
           
            if(unObjeto[j]==unObjeto["active"])
                continue;
            var celda= document.createElement('td');
            celda.setAttribute('style','text-align:center');
            celda.textContent= unObjeto[j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}
