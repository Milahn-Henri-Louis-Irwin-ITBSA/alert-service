import AlertStrategy from '../../interfaces/AlertStrategy';
import { AlertData } from '../../types/types';
export default class AlertService {
  private strategy: AlertStrategy | undefined;
  public setStrategy(strategy: AlertStrategy): void {
    this.strategy = strategy;
  }
  public async triggerAlert(data: AlertData): Promise<void> {
    if (this.strategy) {
      this.strategy.postMapping(data);
      this.strategy.getHelpCoords();
    }
  }
}
