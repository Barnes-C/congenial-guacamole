import express, { Router } from 'express';
import { saveComment } from '../controllers/ads/saveComment';
import { analyzeFromApi } from '../controllers/analyze/analyzeFromApi';
import { analyzeFromDb } from '../controllers/analyze/analyzeFromDb';

// eslint-disable-next-line new-cap
const analyzeRouter: Router = express.Router();

// TODO SWAGGER.io doc
analyzeRouter.route('/:id').get(analyzeFromApi);
analyzeRouter.route('/fromDb/:id').get(analyzeFromDb); // gleich wie  analyzeRouter.route('/fromDb/:id').get((req: Request, res: Response) => analyzeFromDb(req,res));
analyzeRouter.route('/:id/comment').patch(saveComment);

export { analyzeRouter };
