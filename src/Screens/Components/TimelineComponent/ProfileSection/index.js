import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import sitedata from "sitedata";
import axios from "axios";
import { getDate, blobToFile, resizeFile } from "Screens/Components/BasicMethod/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import Loader from "Screens/Components/Loader";
import { getLanguage } from "translations/index"
import { pure } from "recompose";
import { commonHeader , commonCometHeader} from "component/CommonHeader/index";

class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedimage: "",
      loaderImage: false,
      image: "",
      user: this.props.user,
      user_token: this.props.user_token,
      personalinfo: {},
      old_image: this.props.image,
    };
  }

  componentDidMount = () => {
    this.SetImage(this.props.user.image);
  };

  //Set the Profile
  SetImage = (image) => {
    if (image && image !== "" && image !== "undefined") {
      var find1 = image.split(".com/")[1];
      if (find1.split("/")[0] !== "undefined") {
        axios
          .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
          .then((response) => {
            if (response.data.hassuccessed) {
              this.setState({ image: response.data.data });
            }
          });
      }
    }
  };

  //On change the User Data
  componentDidUpdate = (prevProps) => {
    if (prevProps.user !== this.props.user) {
      this.setState(
        { user: this.props.user },
        this.SetImage(this.props.user?.image)
      );
    }
    if (prevProps.personalinfo !== this.props.personalinfo) {
      this.setState({ personalinfo: this.props.personalinfo });
    }
  };

  //For Saving the Image
  saveUserData() {
    const user_token = this.state.user_token;
    axios
      .put(
        sitedata.data.path + "/UserProfile/Users/updateImage",
        {
          image: this.state.uploadedimage,
        },
        commonHeader(user_token)
      )
      .then((responce) => {
        this.props.getData();
        this.setState({ loaderImage: false });
        axios
          .put(
            "https://api-eu.cometchat.io/v2.0/users/" +
              this.state.personalinfo.info.profile_id.toLowerCase(),
            {
              avatar: this.state.uploadedimage,
            },
            commonCometHeader()
          )
          .then((res) => {});
      });
  }
  //For Upload the User Image
  UploadFile = async (event) => {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png"
    ) {
      this.setState({
        loaderImage: true,
        image: URL.createObjectURL(event.target.files[0]),
      });
      event.preventDefault();
      let file = event.target.files[0];
      let fileParts = event.target.files[0].name.split(".");
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      
      const compressedFile = await resizeFile(file);

      var data = blobToFile(compressedFile, file.name)
      axios
        .post(sitedata.data.path + "/aws/sign_s3", {
          fileName: data.name,
          fileType: fileType,
          folders: this.state.user.profile_id + "/",
          bucket: this.state.user.bucket,
        })
        .then((response) => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          if (fileType === "pdf") {
            fileType = "application/pdf";
          }
          // Put the fileType in the headers for the upload
          var options = {
            headers: {
              "Content-Type": fileType,
            },
          };
          axios
            .put(signedRequest, data, options)
            .then((result) => {
              this.setState(
                {
                  uploadedimage:
                    response.data.data.returnData.url +
                    "&bucket=" +
                    this.state.user.bucket,
                  loaderImage: false,
                },
                () => {
                  this.saveUserData();
                }
              );
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    } else {
      let translate = getLanguage(this.props.stateLanguageType)
      let { plz_upload_png_jpeg, ok } = translate;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div
              className={
                this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                  ? "dark-confirm react-confirm-alert-body"
                  : "react-confirm-alert-body"
              }
            >
              <h1>{plz_upload_png_jpeg}</h1>
              <div className="react-confirm-alert-button-group">
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  {ok}
                </button>
              </div>
            </div>
          );
        },
      });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      add_profile,
      picture,
      cmplt_ur_profile,
      my_profile,
      weight,
      height,
      BMI,
      blood,
      Noimageavailable
    } = translate;

    return (
      <Grid className="profileDescp">
        {this.state.loaderImage && <Loader />}
        {this.props.comesFrom && this.props.comesFrom === "patient" ? (
          <div>
            <input
              type="file"
              id="getFile"
              className="FileInptJournal"
              onChange={this.UploadFile}
            />
            {this.state.image && this.state.image !== "" ? (
              <Grid className="myProfile">
                <a className="profilePic">
                  <label htmlFor="getFile">
                    <img src={this.state.image} alt="" titles="" />
                  </label>
                </a>
              </Grid>
            ) : (
              <Grid className="myProfile2">
                <a className="profilePic2">
                  <label htmlFor="getFile">
                    <span>
                      {add_profile} <br /> {picture}
                    </span>
                    <img
                      src={require("assets/images/user2.jpg")}
                      alt=""
                      title=""
                    />
                  </label>
                </a>
              </Grid>
            )}
          </div>
        ) : (
          <div>
            {this.state.image && this.state.image !== "" ? (
              <Grid className="myProfile">
                <a className="profilePic">
                  <img src={this.state.image} alt="" titles="" />
                </a>
              </Grid>
            ) : (
              <Grid className="myProfile2">
                <a className="profilePic2">
                  {this.props.comesFrom && this.props.comesFrom === "patient" ? <span>
                    {add_profile} <br /> {picture}
                  </span>:
                  <span>{Noimageavailable}</span> }
                  <img
                    src={require("assets/images/user2.jpg")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
            )}
          </div>
        )}
        <Grid className="profileName">
          <label>
            {this.state.user?.first_name && this.state.user?.first_name}{" "}
            {this.state.user?.last_name && this.state.user?.last_name}
          </label>
          {this.state.user?.birthday && this.state.user?.birthday !== "" ? (
            <p>
              {getDate(
                this.state.user?.birthday,
                this.props.settings.setting.date_format
              )}{" "}
            </p>
          ) : (
            this.props.comesFrom && this.props.comesFrom === "patient" && <p onClick={this.props.MoveProfile}>{cmplt_ur_profile}</p>
          )}
           <Grid className="profileBtn">
          {this.props.comesFrom && this.props.comesFrom === "patient" && 
           
              <a onClick={this.props.MoveProfile}>{my_profile}</a>
          
          }
            </Grid>
          <Grid>
            <Grid className="prfilHght">
              <Grid className="prfilHghtLft">
                <label>{weight}</label>
                <p>
                  {this.state.personalinfo &&
                  this.state.personalinfo?.weight_bmi &&
                  this.state.personalinfo?.weight_bmi.length > 0 &&
                  this.state.personalinfo?.weight_bmi[0].weight
                    ? this.state.personalinfo?.weight_bmi[0].weight
                    : "--"}
                  <span>kg</span>
                </p>
              </Grid>
              <Grid className="prfilHghtRght">
                <label>{height}</label>
                <p>
                  {this.state.personalinfo &&
                  this.state.personalinfo?.weight_bmi &&
                  this.state.personalinfo?.weight_bmi.length > 0 &&
                  this.state.personalinfo?.weight_bmi[0].height
                    ? this.state.personalinfo?.weight_bmi[0].height
                    : "--"}
                  <span>cm</span>
                </p>
              </Grid>
            </Grid>
            <Grid className="prfilHght">
              <Grid className="prfilHghtLft">
                <label>{BMI}</label>
                {this.state.personalinfo &&
                this.state.personalinfo?.weight_bmi &&
                this.state.personalinfo?.weight_bmi.length > 0 ? (
                  <p>
                    {(
                      (this.state.personalinfo.weight_bmi[0].weight /
                        (this.state.personalinfo.weight_bmi[0].height *
                          this.state.personalinfo.weight_bmi[0].height)) *
                      10000
                    ).toFixed(2) === "NaN"
                      ? "--"
                      : (
                          (this.state.personalinfo.weight_bmi[0].weight /
                            (this.state.personalinfo.weight_bmi[0].height *
                              this.state.personalinfo.weight_bmi[0].height)) *
                          10000
                        ).toFixed(2)}
                  </p>
                ) : (
                  <p>--</p>
                )}
              </Grid>
              <Grid className="prfilHghtRght">
                <label>{blood}</label>
                <p>
                  {(this.state.user &&
                  this.state.user?.blood_group &&
                  this.state.user?.rhesus && this.state.user.blood_group.value !== 'not_known' && this.state.user.rhesus.value !== 'not_known')
                    ? typeof this.state.user.blood_group === 'object' ? 
                     this.state.user.blood_group.value  +' '+ this.state.user.rhesus.value
                    : this.state.user.blood_group +' '+ this.state.user.rhesus.value
                    : "--"}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(PointPain)
));
