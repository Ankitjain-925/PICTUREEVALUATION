import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
export default class index {
  constructor(user_token, user_id, logOutClick) {
    this.logOutClick = logOutClick;
    axios
      .get(sitedata.data.path + "/UserProfile/existorblock/" + user_id,  commonHeader(user_token))
      .then((response) => {
        if (response.data.hassuccessed) {
        } else {
          this.logOutClick();
        }
      }).catch((err)=>{
        this.logOutClick();
      });
  }
}
