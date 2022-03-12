export default class index {
  constructor(logOutClick) {
    this.logOutClick = logOutClick;
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    this.timeout();
    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }
  }

  clearTimeout = () => {
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  };
  timeout = () => {
    var session = 5000 * 1000;
    this.logoutTimeout = setTimeout(this.logOutClick, session);
  };

  resetTimeout = () => {
    this.clearTimeout();
    this.timeout();
  };
}
