import axios, { AxiosInstance } from "axios";

import Logger from "../logging/Logger";
import ApiClientUtils from "./ApiClientUtils";

export default class ApiClient {
  instance: AxiosInstance;
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;

    this.instance = axios.create({
      baseURL: "https://api.kraken.com"
    });

    this.instance.interceptors.request.use(
      config => {
        ApiClientUtils.logRequest(this.logger, config);
        return config;
      },
      err => Promise.reject(err)
    );

    this.instance.interceptors.response.use(
      res => {
        ApiClientUtils.logResponse(this.logger, res);
        return res;
      },
      // TODO: handle errors
      err => {
        ApiClientUtils.logError(this.logger, err);
        return Promise.reject(err);
      }
    );
  }
}
