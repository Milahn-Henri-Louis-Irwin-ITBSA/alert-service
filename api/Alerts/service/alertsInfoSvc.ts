import axios from 'axios';
import { alert } from '../../../libs/alertlog';
import { Service } from 'typedi';
import { AlertPosts, AlertObject, AlertPost } from '../model/alertsinfo';

@Service()
export class alertInfoSvc {
  constructor() {}

  async AlertInfoExecuter(): Promise<Array<AlertObject>> {
    try {
      const alertPostResponseList: AlertPosts = await axios.get(
        'https://gorest.co.in/public/v2/posts'
      );
      return Promise.resolve(alertPostResponseList.data);
    } catch (error) {
      alert.error(
        'Service: alertInfoExecuter',
        'errorInfo:' + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  }

  async alertInfoExecuterById(alertID?: any): Promise<AlertObject> {
    try {
      const alertPostResponse: AlertPost = await axios.get(
        `https://gorest.co.in/public/v2/posts/${alertID}`
      );
      return Promise.resolve(alertPostResponse.data);
    } catch (error) {
      alert.error(
        'Service: alertInfoExecuterById',
        'errorInfo:' + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  }
}
