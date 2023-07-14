import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import Validations from '../middlewares/Validations';

const authRouter = Router();

const loginController = new LoginController();

authRouter.post(
  '/',
  Validations.validateLoginFields,
  Validations.validateLoginDb,
  (req, res) => loginController.login(req, res),
);

export default authRouter;
