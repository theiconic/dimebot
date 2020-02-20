import { Request, Response, Router } from 'express';

export class DefaultController {
  public constructor(
    public readonly router: Router
  ) {
    this.router = Router();
    this.init();
  }

  public async ping(req: Request, res: Response) {
    res.send({ message: 'pong' });
  }

  private init() {
    this.router.get('/ping', (req: Request, res: Response) => this.ping(req, res));
  }
}
