import type { AlertData } from '../types/types';
import type { WriteResult } from 'firebase-admin/firestore';
interface IAlertDB {
  set(data: AlertData): Promise<WriteResult>;
  getByID(id: string): Promise<AlertData | null>;
  update(logReference: string, data: Partial<AlertData>): Promise<WriteResult>;
  deleteByID(id: string): Promise<Boolean>;
}
export default IAlertDB;
