// Notas importanes
// 🚨 El archivo de configuración debe usar ES5 no ES6
// es por ello que veras "requires" no "imports"

// Importar un administrador de rutas de archivos
const path = require('path');

// Exportamos un objeto de configuración
// que sera usado por webpack
module.exports = {
  // 0. Modo de empaquetado
  mode: "development",
  // 1. El archivo de entrada a partir del cual
  // contendra todas las definiciones a empaquetar
  entry: "./client/index.js",
  // 2. Especificar el archivo de salida
  // Aqui se detalla donde quedara el archivo
  // final empaquetado.
  output: {
    // 2.1 Ruta absoluta de salida
    // Note que se esta colocando en el directorio
    // de archivos estáticos del proyecto
    path: path.resolve(__dirname, "public"),
    // 2.2 Nombre del archivo de salida
    filename: "bundle.js",
    // 2.3 Ruta base de archivos estáticos
		publicPath: "/"
  },
  // 3. Configurando el servidor de desarrollo
  // El servidor de desarrollo sirve los archivos
  // empaquetados para no tener que estar reempaquetando
  // en cada cambio del código.
  devServer: {
    // 3.1 Folder de archivos estáticos
    static: path.join(__dirname, "public"),
    // 3.2 Puerto del servidor de desarrollo
    port: 8080,
    // 3.3 Definiendo el host
    host: "0.0.0.0"
  },
  // 3. Configuración de los loaders
  module:{
    rules: [
      // 3.1 Reglas para archivos JS
      {
        // 3.1.1 Expresión regular para identificar archivos
        test: /\.js$/,
        // 3.1.2 Excluir archivos de la carpeta node_modules
        exclude: /node_modules/,
        // 3.1.3 Usar el loader de babel
        use:[
          {
            loader: "babel-loader",
            // 3.1.4 Opciones de configuración de babel
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  // 3.1.5 Opciones de configuración de preset-env 
                  {
                    "modules": false,
                    "useBuiltIns": "usage",
                    // 3.1.6 Corejs para usar con polyfills
                    "targets": '> 0.25%, not dead',
                    "corejs": 3
                  }
                ],
              ]
            }
          }
        ]
      }
    ]
  }
};