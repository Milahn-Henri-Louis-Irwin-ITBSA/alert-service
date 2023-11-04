export interface IApiInfo {
  contextPath: string;
}

export interface AlertPosts {
  data?: Array<AlertObject>;
}

export interface AlertPost {
  data?: AlertObject;
}

export interface AlertObject {
  alertID?: number;
  event?: string;
  location?: string;
  time?: string;
}
