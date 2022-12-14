import * as express from 'express';
import 'express-async-errors';
import httpErrorMiddleware from './middlewares/http.error';
import leaderRouter from './routers/leaderRouter';
import loginRouter from './routers/loginRouter';
import matcheRouter from './routers/matcheRouter';
import teamsRouter from './routers/teamsRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(loginRouter);
    this.app.use(teamsRouter);
    this.app.use(matcheRouter);
    this.app.use(leaderRouter);
    this.app.use(httpErrorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
