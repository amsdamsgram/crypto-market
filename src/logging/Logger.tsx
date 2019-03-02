import Utils from "../utils/Utils";

export default class Logger {
  debug(message: any, ...params: any[]) {
    if (Utils.isDev()) {
      // tslint:disable-next-line:no-console
      console.log(message, ...params);
    }
  }

  warn(message: any, ...params: any[]) {
    if (Utils.isDev()) {
      // tslint:disable-next-line:no-console
      console.warn(message, ...params);
    }
  }

  error(err: Error) {
    if (Utils.isDev()) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }
}
