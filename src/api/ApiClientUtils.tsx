import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import Logger from "../logging/Logger";

export default class ApiClientUtils {
  static logError(logger: Logger, err: AxiosError) {
    const method = err.config.method
      ? err.config.method.toUpperCase()
      : "undefined";
    const status = err.response ? err.response.status : "undefined";
    const data = err.response ? err.response.data : "undefined";

    logger.debug(`🔴 ERR > ${method} ${err.config.url} ${status}`, data);
  }

  static logRequest(logger: Logger, config: AxiosRequestConfig) {
    const method = config.method ? config.method.toUpperCase() : "undefined";

    logger.debug(
      `⚪️ REQ > ${method} ${config.url}`,
      config.params,
      config.data
    );
  }

  static logResponse(logger: Logger, res: AxiosResponse) {
    const method = res.config.method
      ? res.config.method.toUpperCase()
      : "undefined";

    logger.debug(
      `🔵 RES > ${method} ${res.config.url} ${res.status}`,
      res.data
    );
  }
}
