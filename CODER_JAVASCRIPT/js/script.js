let user = "javascript";

function login(){
    let ingresar= false;

    for (let i = 4; i >=0 ; i--) {
        let usuarioId= prompt ("ingresa tu usuario");

        if( usuarioId===user){
        alert("ingreso Valido.")
        ingresar=true;
        break;

        }else{
        alert("Error. te quedan " + i + "intentos")
        }
    
    }
return ingresar;
}

//console.log(login());
let Valido=login();
if(Valido){
   
let mesas= 50000;


let opcion = prompt ('Elige una opcion: \n1 - mesas. \n2 - comprar varios articulos \n presiona F para cancelar.');

while(opcion != "F"){

  switch (opcion) {
    case "1":
        alert( "El precio es de $50000");
        break;
    case "2":
        alert("Comprar varios articulos")
        let valorCompra=parseInt(prompt('ingresa cantidad a comprar'));
        let total= mesas + mesas;
        alert("tu compra total es de $ " + total);
        console.log(valorCompra);
  
    default:
        alert("Gracias por tu compra. En instantes te enviaremos un mail para efectuar el pago")
        break;
  } 


    
    opcion = prompt ('Elige una opcion: \n1 - mesas. \n2 - comprar varios articulos \n presiona F para cancelar.');

}
}