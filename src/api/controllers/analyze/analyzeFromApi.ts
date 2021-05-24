import { analyze } from '../../../services/analyze';
import { getSingleById } from '../../../services/ebay';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

/**
 * Funktion welche die Anfrage vom Request Router entgegennimmt und die Analyse über die API anstößt
 * @param {req} req - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
export const analyzeFromApi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    getSingleById(id)
      .then((ad) => {
        analyze(ad)
          .then((result) => {
            res.status(HttpStatus.OK).json(result);
          })
          .catch((error) => {
            res.status(HttpStatus.NOT_FOUND).json({
              msg: 'Internal Error',
              error,
            });
          });
      })
      .catch(() => {
        res.status(HttpStatus.NOT_FOUND).json({
          msg: 'Ad not found',
        });
      });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
