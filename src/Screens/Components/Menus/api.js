import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"

export const getSetting = (current) => {
    current.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + "/UserProfile/updateSetting",  commonHeader(current.props.stateLoginValueAim.token))
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          current.setState({
            timeF: {
              label: responce.data.data.time_format,
              value: responce.data.data.time_format,
            },
            dateF: {
              label: responce.data.data.date_format,
              value: responce.data.data.date_format,
            },
          });
          current.props.Settings(responce.data.data);
        } else {
          current.props.Settings({
            user_id: current.props.stateLoginValueAim.user._id,
          });
        }
        current.setState(
          {
            loaderImage: false,
            languageValue:
              responce.data.data && responce.data.data.language
                ? responce.data.data.language
                : "en",
            mode:
              responce.data.data && responce.data.data.mode
                ? responce.data.data.mode
                : "normal",
          },
          () => {
            current.props.LanguageFetchReducer(current.state.languageValue);
          }
        );
      });
  };