// Importando el Router de express
import { Router } from 'express';

// Importando el controlador de usuario
import UserController from './user.controller';

// Creando la instancia del enrutador
const router = new Router();

// Definiendo las rutas

// GET /user/login
router.get('/login', UserController.login);

// Get /user/logout
router.get('/logout', UserController.logout);

// GET /user/register
router.get('/register', UserController.register);

// Exportando el enrutador
export default router;
