import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/teams', teamsController.getAll);
teamsRouter.get('/teams/:id', teamsController.getById);

export default teamsRouter;
