export default class Utils {
  static isDev() {
    return process.env.NODE_ENV === "development";
  }
}
