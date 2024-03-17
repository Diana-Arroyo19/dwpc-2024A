// Preambulo
// Ayuda a crear servidores web
import express from 'express';
// Nucleo de node, ayuda al manejo de las rutas
import path from 'path';
// Ayuda al manejo de las cookies
import cookieParser from 'cookie-parser';
// Maneja el log de las peticiones http
import morgan from 'morgan';

// Importando las dependencias de webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

// Importando mis rutas
import router from './router';

// Importando configuracion de webpack
import webpackConfig from '../webpack.dev.config';

// Impornting winston logger
import log from './config/winston';

// Importando template-engine
import configTemplateEngine from './config/templateEngine';

// Creando la intancia express
const app = express();

// Obteniendo el modo de ejecucion de la app
const nodeEnviroment = process.env.NODE_ENV || 'production';

// Cinfigurando entorno de desarrollo
if (nodeEnviroment === 'developement') {
  console.log('🛠️ Ejecutando en modo desarrollo 🛠️');
  // Agregando el modo de ejecucion a la configuracion
  webpackConfig.mode = 'development';
  // Estableciendo el valor del puerto del servidor de desarrollo
  webpackConfig.devServer.port = process.env.PORT;
  // Configurando el HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Generando el empquetador (bundle) de webpack
  const bundle = webpack(webpackConfig);
  // Habilitando el webpack middleware
  app.use(
    WebpackDevMiddleware(bundle, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  //  Agregando el midelware webpack HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log('🏭 Ejecutando en modo producción 🏭');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: log.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Servidor de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Agregando rutas
router.addRoutes(app);

// exportando intancia app usando js moderno
export default app;
