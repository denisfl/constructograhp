export default {
  getData(url) {
    var startTime = Date.now();

    var req = new XMLHttpRequest();
    req.open('get', url, false);
    req.send();

    if (req.status == 200) {
      return req.response;
    } else {
      throw Error(req.statusText || "Request failed");
    }
  },
  fetch(url) {
    return JSON.parse(this.getData(url));
  }
}
