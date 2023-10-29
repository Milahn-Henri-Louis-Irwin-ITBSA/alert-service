import { JsonController, Get, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { URL_INFO } from '../alertApiInfo';
import { alert } from '../../../libs/alertlog';
import { alertInfoSvc } from '../service/alertsInfoSvc';

@JsonController(URL_INFO.contextPath + '/AlertObject')
@Service()
export class AlerInfoController {
  constructor(public _alertsInfosvc: alertInfoSvc) {}

  @Get('/getAlertInfo')
  public async getAlertInfo(): Promise<any> {
    try {
      const resp = await this._alertsInfosvc.AlertInfoExecuter();
      alert.info(
        'Controller: getAlertInfo',
        'response:' + JSON.stringify(resp)
      );
      return Promise.resolve(resp);
    } catch (error) {
      alert.error(
        'Controller: getAlertInfo',
        'errorInfo:' + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  }
  

  @Get('/getUserInfoById')
  public async getUserInfoById(@QueryParam('id') userId: number): Promise<any> {
    try {
      const resp = await this._alertsInfosvc.alertInfoExecuterById(alert);
      alert.info(
        'Controller: getUserInfoById',
        'response:' + JSON.stringify(resp)
      );
      return Promise.resolve(resp);
    } catch (error) {
      alert.error(
        'Controller: getUserInfoById',
        'errorInfo:' + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  }
  @Get('/ping')
  public async ping(): Promise<any> {
    return { message: 'pong' };
  }
}
