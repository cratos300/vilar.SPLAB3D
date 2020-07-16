function alta(nuevoAnuncio) 
{ 
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange =()=>{
        //aca va el codigo que maneja la peticion
        if(xhr.readyState==4)
        {
            if(xhr.status == 200)
            {   
                let data = JSON.parse(xhr.responseText);   
               if(data.message == "Alta Exitosa")
               {
                   console.log("Alta exitosa");
                   Listar();
                   //LLamar a la funcion que se encargue de listar!!
                   //esto es lo que quiero se ejecute 
               }
            }
            else
            {
                    console.log(`Error:${xhr.status}-${xhr.statusText}`);
            }
        }
        else
        {
            document.getElementById("tabla").innerText = "";
            document.getElementById("tabla").appendChild(Spinner());
        }
        
    }
     //abri la conexion con el servidor enviar o traer datos
     xhr.open('POST','/alta',true);
     xhr.setRequestHeader('Content-type','application/json');
     //enviar la peticion
     xhr.send(JSON.stringify(nuevoAnuncio));
     /*
     document.getElementById("tabla").innerText = "";
     document.getElementById("tabla").appendChild(Spinner());
        fetch('/alta',{
            method:'POST',
           headers:{'content-type':'application/json'},
           body: JSON.stringify(nuevoAnuncio)
        }).then(res=>res.json())
        . then(data=>{
            if(data.message == "Alta Exitosa")
            {
                Listar();
            }
     })*/
     }
 function baja(nuevoAnuncio) 
{ 

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange =()=>{
        //aca va el codigo que maneja la peticion
        if(xhr.readyState==4)
        {
            if(xhr.status == 200)
            {   
                let res = JSON.parse(xhr.responseText);
               if(res.message=="Baja Exitosa")
               { 
                   console.log("se bajo exitosamente");
                   Listar();
               }
               else
               {
                   console.log("bajo no exitosamente");
               }
            }
            else
            {
                    console.log(`Error:${xhr.status}-${xhr.statusText}`);
            }
        }
        else
        {
            document.getElementById("tabla").innerText = "";
            document.getElementById("tabla").appendChild(Spinner());
        } 
    }
     //abri la conexion con el servidor enviar o traer datos
     xhr.open('POST','/baja',true);
     xhr.setRequestHeader('Content-type','application/json');
     //enviar la peticion
     xhr.send(JSON.stringify(nuevoAnuncio));
     /*    
     document.getElementById("tabla").innerText = "";
     document.getElementById("tabla").appendChild(Spinner());
        fetch('/baja',{
            method:'POST',
           headers:{'content-type':'application/json'},
           body: JSON.stringify(nuevoAnuncio)
        }).then(res=>res.json())
        . then(data=>{
            if(data.message == "Baja Exitosa")
            {
                Listar();
            }
     })*/
}
 function modificacion(nuevoAnuncio) 
{ 
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange =()=>{
        //aca va el codigo que maneja la peticion
        if(xhr.readyState==4)
        {
            if(xhr.status == 200)
            {   
                let res = JSON.parse(xhr.responseText);
               if(res['message'] == 'Modificacion Exitosa')
               {
                   Listar();
               }
            }
            else
            {
                    console.log(`Error:${xhr.status}-${xhr.statusText}`);
            }
        }
        else
        {
            document.getElementById("tabla").innerText = "";
            document.getElementById("tabla").appendChild(Spinner());
        } 
    }
     //abri la conexion con el servidor enviar o traer datos
     xhr.open('POST','/modificar',true);
     xhr.setRequestHeader('Content-type','application/json');
     //enviar la peticion
     xhr.send(JSON.stringify(nuevoAnuncio));
    /* document.getElementById("tabla").innerText = "";
     document.getElementById("tabla").appendChild(Spinner());
        fetch('/modificar',{
            method:'POST',
           headers:{'content-type':'application/json'},
           body: JSON.stringify(nuevoAnuncio)
        }).then(res=>res.json())
        . then(data=>{
            if(data.message == "Modificacion Exitosa")
            {
                Listar();
            }
     })*/
}
 function Listar()
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange =()=>{
        //aca va el codigo que maneja la peticion
        if(xhr.readyState==4)
        {
            if(xhr.status == 200)
            {   
                let data = xhr.responseText;
                data = JSON.parse(data);
                    
                   //LLamar a la funcion que se encargue de listar!!
                   //esto es lo que quiero se ejecute 
                   document.getElementById("tabla").innerText = "";
                
                   document.getElementById('tabla').appendChild(crearTabla(data.data));
                   HabiSelec();
                   let td = document.getElementsByTagName('td');    
                   HabilitarCheckbox();
                   let referencia = document.getElementById("seleccionado");
                   manejarINICIO(data.data);
                   referencia.addEventListener("change",function()
                   {
                       if(this.value != "Todos")
                       {
                           DesabilitarCheckbox();
                       }
                       else
                       {
                           HabilitarCheckbox();
                       }
                       let diti = FiltrarTransaccion(data.data,this.value);
                   })
                   
                    
                   for(let i=0;i<td.length;i++)
                   {
                    
                       td[i].addEventListener('click',function(e){
                        let esa = e.target.parentElement;
                        let nodes = esa.childNodes;
                        let anuncio = new anu(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent,
                            nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
                            nodes[7].textContent);
                            CargarFormulario(frm,anuncio);
                            eliminar.className = 'visible';
                            eliminar.className = "btn btn-success";
                            modificar.className = 'visible';
                            modificar.className = "btn btn-primary";
                            cancelar.className = 'visible';
                            cancelar.className = "btn btn-danger";
                            agregar.className = 'oculto';
                       });

                }
                
                manejadorCheckbox(data.data,document.getElementById("seleccionado").value);


                
                
            }
            else
            {
                    console.log(`Error:${xhr.status}-${xhr.statusText}`);
            }
        }
        else
        {
            document.getElementById("tabla").innerText = "";
            document.getElementById("tabla").appendChild(Spinner());
        }
    }
    xhr.open('GET','/traer',true);
     //xhr.setRequestHeader('Content-type','application/json');
     //enviar la peticion
     xhr.send();
    /* document.getElementById("tabla").innerText = "";
     document.getElementById("tabla").appendChild(Spinner());
     fetch('/traer').then(res=>res.json())
     . then(data=>{
        document.getElementById("tabla").innerText = "";
        console.log(data.data);
        document.getElementById('tabla').appendChild(crearTabla(data.data));
        let td = document.getElementsByTagName('td');     
        //query selector             
                   for(let i=0;i<td.length;i++)
                   {
                       td[i].addEventListener('click',function(e){
                        esa = e.target.parentElement;
                        let nodes = esa.childNodes;
                        let anuncio = new Anuncio(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent,
                            nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
                            nodes[7].textContent);
                            CargarFormulario(frm,anuncio);
                            eliminar.className = 'visible';
                            modificar.className = 'visible';
                       });
                }
     });*/
    
}
