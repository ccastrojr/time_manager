import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import DepartmentController from './app/controllers/DepartmentController';
import ProfessorController from './app/controllers/ProfessorController';
import ClassroomController from './app/controllers/ClassroomController';
import AcademicSubjectsController from './app/controllers/AcademicSubjectsController';
import ClassController from './app/controllers/ClassController';

import authMiddleware from './app/middlewares/auth';
import authCoordinator from './app/middlewares/auth_coordinator';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/department', authCoordinator, DepartmentController.store);
routes.put('/department/:id', authCoordinator, DepartmentController.update);
routes.get('/department', authCoordinator, DepartmentController.index);

routes.post('/professor', authCoordinator, ProfessorController.store);
routes.put('/professor', ProfessorController.update);
routes.delete('/professor/:id', authCoordinator, ProfessorController.delete);
routes.get('/professor/', ProfessorController.index);

routes.post('/classroom', authCoordinator, ClassroomController.store);
routes.get('/classroom', ClassroomController.index);

routes.post(
  '/academicsubjects',
  authCoordinator,
  AcademicSubjectsController.store
);
routes.put(
  '/academicsubjects/:id',
  authCoordinator,
  AcademicSubjectsController.update
);
routes.delete(
  '/academicsubjects/:id',
  authCoordinator,
  AcademicSubjectsController.delete
);
routes.get('/academicsubjects', AcademicSubjectsController.index);

routes.post('/class', authCoordinator, ClassController.store);
routes.put('/class/:id', authCoordinator, ClassController.update);
routes.delete('/class/:id', authCoordinator, ClassController.delete);
routes.get('/class', ClassController.index);

export default routes;
