const http = require("../http-common");
class DataService {
create(data) {
    return http.post("/register", data);
  }
}
export default new DataService;