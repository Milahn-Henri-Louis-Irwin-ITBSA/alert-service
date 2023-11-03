import { GeoPoint } from 'firebase-admin/firestore';
import AlertStrategy from '../../interfaces/AlertStrategy';
import AbstractAlertPosting from './AbstractAlertPosting';

export default class Ambulance
  extends AbstractAlertPosting
  implements AlertStrategy
{
  constructor() {
    super();
  }
  public async getHelpCoords(): Promise<GeoPoint> {
    return new GeoPoint(0, 0);
  }
}
