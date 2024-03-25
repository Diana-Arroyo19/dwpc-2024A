// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Definiendo las rutas

// GET /project
router.get('/', projectController.showDashboard);

// GET /project/add
// GET /project/add-form
router.get('/add', projectController.addForm);

// Exportando el enrutador
export default router;
