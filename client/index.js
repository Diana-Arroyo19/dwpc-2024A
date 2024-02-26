// importar estilos
import './styles/style.css'


console.log("🎉 Client Server Working powered by webpack 🎉");

// Codigo ES6
// Default Parameters
let show = (msg="No message given") => {
  console.log(msg)
}

// Async Await
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000)
  });
}

// Funcion asincrona
async function asyncCall() {
  console.log("Calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
}

// Llmar a la funcion asincrona
asyncCall();
