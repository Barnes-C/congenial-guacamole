import { AdsModel } from '../../api/models';

export const findById = (id: string) =>
  AdsModel.findById(id).select('fraud_score').exec();