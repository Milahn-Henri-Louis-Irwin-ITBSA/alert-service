import type { GeoPoint } from 'firebase-admin/firestore';
import AbstractAlertPosting from '../Alerts/alertstrategy/AbstractAlertPosting';
export default interface AlertStrategy extends AbstractAlertPosting {
  getHelpCoords(): Promise<GeoPoint>;
}
