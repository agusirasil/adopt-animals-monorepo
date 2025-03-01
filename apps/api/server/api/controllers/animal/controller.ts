import AnimalService from '../../services/animal.service';
import { Request, Response } from 'express';
import delay from '../../../../tools/delay';

export class Controller {
  all(req: Request, res: Response): void {
    delay(2000).then(() => {
      AnimalService.all().then(r => res.json(r));
    });
  }

  byId(req: Request, res: Response): void {
    AnimalService.byId(parseInt(req.params.id)).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  delete(req: Request, res: Response): void {
    AnimalService.delete(parseInt(req.params.id))
      .then(r => {
        res
          .status(204)
          .json(r)
      })
      .catch(r =>
        res
          .status(404)
          .end()
      )
  }

  edit(req: Request, res: Response): void {
    AnimalService.edit(parseInt(req.params.id), req.body)
      .then(r =>
        res
          .status(202)
          .location(`/api/v1/animal/${r.id}`)
          .json(r)
      )
      .catch(r =>
        res
          .status(404)
          .end()
      )
  }

  create(req: Request, res: Response): void {
    AnimalService.create(req.body)
      .then(r =>
        res
          .status(201)
          .location(`/api/v1/animal/${r.id}`)
          .json(r)
      ).catch(r =>
        res
          .status(500)
          .end()
      )
  }
}

export default new Controller();
