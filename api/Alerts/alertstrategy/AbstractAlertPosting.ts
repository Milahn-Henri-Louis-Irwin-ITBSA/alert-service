import axios from 'axios';
import { AlertData } from '../../types/types';
export default abstract class AbstractAlertPosting {
  public async postMapping(alertData: AlertData): Promise<void> {
    return await axios.get('https://feed.tripwiz.me');
  }
}
