import { DecodedIdToken } from 'firebase-admin/auth';
import DatabaseConnector from '../../../libs/db/AlertDB';
import { Service } from 'typedi';
import { AlertData } from '../../types/types';
import AlertService from '../../Alerts/alertstrategy/AlertService';
import Fire from '../../Alerts/alertstrategy/Fire';
import Police from '../../Alerts/alertstrategy/Police';
import Ambulance from '../../Alerts/alertstrategy/Ambulance';
import Road from '../../Alerts/alertstrategy/Road';

@Service()
export default class AlertSvc {
  private db: DatabaseConnector;
  constructor() {
    this.db = new DatabaseConnector();
  }

  public async verifyToken(token: string): Promise<DecodedIdToken | Error> {
    try {
      return await this.db.verifyJWT(token);
    } catch (e) {
      return new Error(e as string);
    }
  }

  public async submitAlert(
    data: AlertData,
    user: DecodedIdToken
  ): Promise<void | Error> {
    try {
      const alertService = new AlertService();
      switch (data.event) {
        case 'fire':
          alertService.setStrategy(new Fire());
          break;
        case 'police':
          alertService.setStrategy(new Police());
          break;
        case 'medical':
          alertService.setStrategy(new Ambulance());
          break;
        case 'road':
          alertService.setStrategy(new Road());
          break;
        default:
          alertService.setStrategy(new Fire());
          break;
      }
      return await alertService.triggerAlert(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
