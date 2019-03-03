import { action, observable } from "mobx";

import Config from "../config/Config";

type Message = string | null;

export default class ErrorStore {
  @observable message: Message = null;

  notifyGlobalError() {
    this.setMessage("Oops, an error occurred");
  }

  @action
  setMessage(message: string) {
    this.message = message;

    setTimeout(() => {
      this.dismiss();
    }, Config.errorAutoDismissDuration);
  }

  @action
  dismiss() {
    this.message = null;
  }
}
