// Preambulo
// Ayuda a manejar errores http
import createError from 'http-errors';
// Ayuda a crear servidores web
import express from 'express';
//Nucleo de node, ayuda al manejo de las rutas
import path from 'path';
// Ayuda al manejo de las cookies
import cookieParser from 'cookie-parser';
// Maneja el log de las peticiones http
import logger from 'morgan';

import usersRouter from'./routes/users';
import indexRouter from'./routes/index';

// Importando las dependencias de webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

// Importando configuracion de webpack
import webpackConfig from '../webpack.dev.config';

// Creando la intancia express
var app = express();

// Obteniendo el modo de ejecucion de la app
const nodeEnviroment = process.env.NODE_ENV || 'production' 

// Cinfigurando entorno de desarrollo
if(nodeEnviroment === 'developement'){
  console.log("🛠️ Ejecutando en modo desarrollo 🛠️");
  // Agregando el modo de ejecucion a la configuracion
  webpackConfig.mode = 'development';
  // Estableciendo el valor del puerto del servidor de desarrollo
  webpackConfig.devServer.port = process.env.PORT;
  // Configurando el HMR (Hot Module Replacement)
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
	// Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Generando el empquetador (bundle) de webpack
  const bundle = webpack(webpackConfig);
  // Habilitando el webpack middleware
  app.use( WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }) );
  //  Agregando el midelware webpack HMR
  app.use( WebpackHotMiddleware(bundle) );
}else{
  console.log("🏭 Ejecutando en modo producción 🏭");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Servidor de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// exportando intancia app usando js moderno
export default app;
