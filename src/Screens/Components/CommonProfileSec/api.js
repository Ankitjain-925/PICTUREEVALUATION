import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import Timezone from "timezon.json";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";

  export const GetLanguageMetadata = (current) => {
    var Alltissues = GetLanguageDropdown(
      current.state.allMetadata &&
        current.state.allMetadata.tissue &&
        current.state.allMetadata.tissue.length > 0 &&
        current.state.allMetadata.tissue,
      current.props.stateLanguageType
    );
    var zones = GetLanguageDropdown(
      Timezone && Timezone.length > 0 && Timezone,
      current.props.stateLanguageType,
      "timezone"
    );
    current.setState({
      tissue: Alltissues,
      dates:
        current.state.allMetadata &&
        current.state.allMetadata.dates &&
        current.state.allMetadata.dates.length > 0 &&
        current.state.allMetadata.dates,
      times:
        current.state.allMetadata &&
        current.state.allMetadata.times &&
        current.state.allMetadata.times.length > 0 &&
        current.state.allMetadata.times,
      timezones: zones,
    });
  };

  //Get the current User Data
  export const getUserData=(current)=>{ 
    current.setState({ loaderImage: true });
    let user_token = current.props.stateLoginValueAim.token;
    let user_id = current.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id,commonHeader(user_token))
      .then((response) => {
        current.setState({ loaderImage: false, LoggedInUser: response.data.data });
      })
      .catch((error) => {
        current.setState({ loaderImage: false });
      });
  }