import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import Modal from "@material-ui/core/Modal";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getLanguage } from "translations/index";
import { Button } from "@material-ui/core/index";
import _ from "lodash";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [],
      currentList2: [],
      searchValue: "",
      showPopup: false,
      showRename: false,
      txtName: {},
      showinput: false,
    };
  }
  componentDidMount = () => {
    this.allHouses();
    this.getSetting();
  };

  redirectSpace = (data) => {
    this.props.houseSelect(data);
    this.props.history.push("/VirtualHospital/space");
  };

  getSetting = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/UserProfile/updateSetting",
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          this.setState({
            timeF: {
              label: responce.data.data.time_format,
              value: responce.data.data.time_format,
            },
            dateF: {
              label: responce.data.data.date_format,
              value: responce.data.data.date_format,
            },
          });
          this.props.Settings(responce.data.data);
        } else {
          this.props.Settings({
            user_id: this.props.stateLoginValueAim.user._id,
          });
        }
        this.setState(
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
            this.props.LanguageFetchReducer(this.state.languageValue);
          }
        );
      });
  };

  allHouses = () => {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(
        sitedata.data.path + "/UserProfile/Users/" + user_id,
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        this.setState({
          currentList: response.data.data.houses,
          currentList2: response.data.data.houses,
        });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  };

  SearchFilter = (e) => {
    this.setState({ searchValue: e.target.value });
    let track1 = this.state.currentList2;
    let FilterFromSearch1 =
      track1 &&
      track1.length > 0 &&
      track1.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ currentList: FilterFromSearch1 });
  };

  //for rename popup
  renamePopup = (item) => {
    this.setState({ showRename: item.value, txtName:  _.cloneDeep(item) });
  };

  renamePopup2 = (item) => {
    const user_token = this.props.stateLoginValueAim.token;
    this.state.currentList.map((item)=>{
      if(item.value === this.state.showRename)
      item.label = this.state.txtName.label;
    })
    this.setState({ showRename: false, loaderImage: true });
    axios
      .put(
        sitedata.data.path + "/UserProfile/Users/update",
        {
          houses: this.state.currentList,
        },
        commonHeader(user_token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          this.setState({ loaderImage: false, succUpdate: true });
          setTimeout(() => {
            this.setState({ succUpdate: false });
          }, 5000);
          this.allHouses();
        }
      });
  };

  handletxtName = (e) => {
    var txtName = this.state.txtName;
    txtName[e.target.name] = e.target.value;
    this.setState({ txtName: txtName });
  };

  //for PopUp Opening and Closing
  handleOpenPopUp = () => {
    this.setState({ showPopup: true });
  };

  handleClosePopUp = () => {
    this.setState({ showPopup: false , showRename: false, txtName:  {}});
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {Institution, Hospitals, Save, Rename } = translate;
    const { currentList2 } = this.state;
    return (

      <Grid className="topLeftSpc">
        {this.state.loaderImage && <Loader />}
        {/* Start of Bread Crumb */}
        <Grid className="breadCrumbUpr">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={9}>
              <Grid className="roomBreadCrumb medcalCntr">
                <ul>
                  <li>
                    <a>
                      <label>{Hospitals}</label>
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid className="settingInfo">
                {this.state.showinput && (
                  <input
                    className="serchInput"
                    name="Search"
                    placeholder="Search"
                    value={this.state.searchValue}
                    onChange={this.SearchFilter}
                  />
                )}
                <a>
                  {!this.state.showinput ? (
                    <img
                      src={require("assets/virtual_images/search-entries.svg")}
                      alt=""
                      title=""
                      onClick={() => {
                        this.setState({
                          showinput: !this.state.showinput,
                        });
                      }}
                    />
                  ) : (
                    <img
                      src={require("assets/images/close-search.svg")}
                      alt=""
                      title=""
                      onClick={() => {
                        this.setState({
                          showinput: !this.state.showinput,
                          currentList: this.state.currentList2,
                          searchValue: "",
                        });
                      }}
                    />
                  )}
                </a>
                <a onClick={this.handleOpenPopUp}>
                  <img
                    src={require("assets/virtual_images/setting.png")}
                    alt=""
                    title=""
                  />
                </a>
                <Modal
                  open={this.state.showPopup}
                  onClose={this.handleClosePopUp}
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode === "dark"
                      ? "darkTheme paraBoxModel"
                      : "paraBoxModel"
                  }
                >
                  <Grid className="nwDiaCntnt">
                    <Grid className="nwDiaCntntIner">
                      <Grid className="nwDiaCourse">
                        <Grid className="nwDiaCloseBtn">
                          <a onClick={this.handleClosePopUp}>
                            <img
                              src={require("assets/images/close-search.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                      </Grid>
                      <Grid className="RenameInstitute">
                        <Grid
                          container
                          direction="row"
                          justify="center"
                        >
                          <Grid item xs={12} md={12}>
                            <h2 className="renameHouseh2">{Hospitals}</h2>
                          </Grid>
                          {currentList2 &&
                            currentList2.map((item) => (
                              <Grid item xs={12} md={12}>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                >
                                  <Grid
                                    item
                                    xs={8}
                                    md={8}
                                  >
                                    {this.state.showRename === item.value ?
                                      <div className="creatInfoIner" ><input type="text" name="label" onChange={(e) => this.handletxtName(e)} value={this.state.txtName?.label || ''} /> </div>
                                      : <label> {item.label && item.label} </label>}
                                  </Grid>
                                  <Grid
                                    item
                                    xs={3}
                                    md={3}
                                  >
                                    {this.state.showRename === item.value ?
                                      <Button onClick={() => this.renamePopup2(item)} className="renameButton" >{Save}</Button>
                                      : <Button onClick={() => this.renamePopup(item)} className="renameButton" >{Rename}</Button>}
                                  </Grid>
                                  <Grid
                                    item
                                    xs={1}
                                    md={1}
                                  ></Grid>
                                </Grid>
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* End of Bread Crumb */}

        <Grid className="wardsGrupUpr">
          <Grid container direction="row">
            {this.state.currentList?.length > 0 &&
              this.state.currentList.map((item) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  onClick={() => this.props.redirectSpace(item)}
                >
                  <Grid className="medcalFZCntnt">
                    <Grid>
                      <a>
                        <img
                          src={require("assets/virtual_images/bitmap.png")}
                          alt=""
                          title=""
                        />
                      </a>
                    </Grid>
                    <Grid>
                      <label>{item.label}</label>
                    </Grid>
                    <p>{item.group_name}</p>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    House,
    settings,
    verifyCode,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index)
);
