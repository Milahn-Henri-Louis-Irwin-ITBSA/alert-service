import {
  JsonController,
  Post,
  HeaderParam,
  BodyParam,
} from 'routing-controllers';
import { Service } from 'typedi';
import { URL_INFO } from '../alertApiInfo';
import alertSvc from '../service/alertSvc';
import type { EventTypes } from '../../types/types';
import { Timestamp } from 'firebase-admin/firestore';
import { events } from '../../types/conts';
@JsonController(URL_INFO.contextPath + '/alerts')
@Service()
export class AlerInfoController {
  constructor(public _alertSvc: alertSvc) {}
  @Post('/submitAlert')
  public async submitAlert(
    @HeaderParam('Authorization') token: string,
    @BodyParam('event') event: EventTypes,
    @BodyParam('coordinates') coordinates: { long: number; lang: number },
    @BodyParam('info') info: string
  ): Promise<any> {
    try {
      if (!token) {
        return Promise.resolve({ error: 'No token provided', status: 401 });
      }
      if (!event) {
        return Promise.resolve({ error: 'No event provided', status: 401 });
      }
      if (events.indexOf(event) === -1) {
        return Promise.resolve({
          error: 'Invalid event provided',
          status: 401,
          possibleEvents: events,
        });
      }
      if (!coordinates) {
        return Promise.resolve({
          error: 'No coordinates provided',
          status: 401,
        });
      }

      if (!(coordinates.long && coordinates.lang)) {
        return Promise.resolve({
          error: 'Invalid coordinates provided',
          status: 401,
        });
      }

      if (
        typeof coordinates.long !== 'number' ||
        typeof coordinates.lang !== 'number'
      ) {
        return Promise.resolve({
          error: 'Invalid coordinates provided',
          status: 401,
        });
      }

      token = token.replace('Bearer ', '');

      const user = await this._alertSvc.verifyToken(token);
      if (user instanceof Error) {
        return Promise.resolve({ error: user.message, status: 401 });
      }

      const data = {
        event,
        coordinates,
        created_by: user.uid,
        created_at: Timestamp.now(),
      };
      const alertSubmission = await this._alertSvc.submitAlert(data, user);
      if (alertSubmission instanceof Error) {
        return Promise.resolve({ error: alertSubmission.message, status: 500 });
      }
      return Promise.resolve({ status: 200, event, coordinates, info });
    } catch (e: any) {
      return Promise.resolve({ error: e.message, status: 500 });
    }
  }
}
