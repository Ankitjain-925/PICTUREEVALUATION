import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import sitedata from "sitedata";
import axios from "axios";
import Loader from "./../Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { getImage } from "./../BasicMethod/index";
import { getLanguage } from "translations/index"
class ImageUploderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileattach: [],
      images: [],
      attachfile: this.props.attachfile,
      ismore_five: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.attachfile !== this.props.attachfile) {
      this.updateImages(this.props.attachfile);
    }
  };
  componentDidMount = () => {
    this.updateImages(this.props.attachfile);
  };
  updateNewImage = (file) => {
    var images = this.state.images;
    if (file) {
      var find1 = file.split(".com/")[1];
      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
        .then((response2) => {
          if (response2.data.hassuccessed) {
            images.push({ image: file, new_image: response2.data.data });
            this.setState({ images: images });
          }
        });
    }
  };
  updateImages = (attachfile) => {
    var images = [];
    attachfile &&
      attachfile.length > 0 &&
      attachfile.map((data, index) => {
        var find = data && data.filename && data.filename;
        if (find) {
          var find1 = find.split(".com/")[1];
          axios
            .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
            .then((response2) => {
              if (response2.data.hassuccessed) {
                images.push({ image: find, new_image: response2.data.data });
                this.setState({ images: images });
              }
            });
        }
      });
  };
  getFileName = (file) => {
    if (file && file.filename) {
      if (file.filename.split("Trackrecord/")[1]) {
        if (file.filename.split("Trackrecord/")[1].split("&bucket=")[0]) {
          return file.filename.split("Trackrecord/")[1].split("&bucket=")[0];
        } else {
          return file.filename.split("Trackrecord/")[1];
        }
      } else {
        return file.filename;
      }
    } else return "";
  };
  //Rmove file functionality
  delindex = (file) => {
    var data = [];
    data =
      this.state.attachfile &&
      this.state.attachfile.length > 0 &&
      this.state.attachfile.filter((item) => item.filename !== file);
    this.setState({ attachfile: data });
    this.props.fileUpload(data, this.props.name);
  };
  //For upload and image previews
  UploadFiles = (event) => {
    if (event && event.length > 0) {
      this.setState({ isfileuploadmulti: true });
      if (event[0].type === "application/x-zip-compressed") {
        this.setState({ file_type: true });
      } else {
        if (event.length + this.state.attachfile.length > 5) {
          this.setState({ ismore_five: true, file_type: false });
        } else {
          var Fileadd = this.state.attachfile;
          this.setState({ ismore_five: false, file_type: false });
          for (var i = 0; i < event.length; i++) {
            let file = event[i];
            let fileParts = file.name.split(".");
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            let bucket = this.props.cur_one && this.props.cur_one.bucket;
            this.setState({ loaderImage: true });
            axios
              .post(sitedata.data.path + "/aws/sign_s3", {
                fileName: fileName,
                fileType: fileType,
                folders:
                  this.props.cur_one &&
                  this.props.cur_one.profile_id + "/Trackrecord/",
                bucket: bucket,
              })
              .then((response) => {
                Fileadd.push({
                  filename:
                    response.data.data.returnData.url + "&bucket=" + bucket,
                  filetype: fileType,
                });
                setTimeout(() => {
                  this.setState({ fileupods: false });
                }, 3000);
                let returnData = response.data.data.returnData;
                let signedRequest = returnData.signedRequest;
                
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
                  .put(signedRequest, file, options)
                  .then((result) => {})
                  .catch((error) => {});

                let previes = URL.createObjectURL(file);
                if (fileType === "mp4") {
                  previes = require("assets/images/videoIcon.png");
                }
                if (fileType === "pdf" || fileType === "application/pdf") {
                  previes = require("assets/images/pdfimg.png");
                } else if (
                  fileType === "doc" ||
                  fileType === "docx" ||
                  fileType === "xml" ||
                  fileType === "txt"
                ) {
                  previes = require("assets/images/txt1.png");
                } else if (
                  fileType === "xls" ||
                  fileType === "xlsx" ||
                  fileType === "xml"
                ) {
                  previes = require("assets/images/xls1.svg");
                } else if (fileType === "csv") {
                  previes = require("assets/images/csv1.png");
                } else if (
                  fileType === "dcm" ||
                  fileType === "DCM" ||
                  fileType === "DICOM" ||
                  fileType === "dicom"
                ) {
                  previes = require("assets/images/dcm1.png");
                } else {
                  previes = URL.createObjectURL(file);
                }
                let images = this.state.images;
                images.push({
                  image:
                    response.data.data.returnData.url + "&bucket=" + bucket,
                  new_image: previes,
                });
                this.setState({ images: images });
                //    this.updateNewImage(response.data.data.returnData.url + '&bucket=' + bucket)
              })
              .catch((error) => {});

            this.setState({ loaderImage: false, attachfile: Fileadd });
            this.props.fileUpload(Fileadd, this.props.name);
          }
        }
      }
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      browse,
      suported_file_type_jpg_png_dcm,
      less_than_err,
      err_file_formart,
      or_drag_here,
    } = translate;
    return (
      <div>
        {this.state.loaderImage && <Loader />}
        {this.state.file_type && (
          <div className="err_message">{err_file_formart}</div>
        )}
        {this.state.ismore_five && (
          <div className="err_message">{less_than_err}</div>
        )}
        <Dropzone onDrop={(e) => this.UploadFiles(e)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <Input {...getInputProps()} />
              <Grid className="browsInput">
                <a>
                  <img
                    src={require("assets/images/upload-file.svg")}
                    alt=""
                    title=""
                  />
                </a>
                <a>
                  {browse}{" "}
                  <input
                    type="file"
                    onChange={(e) => this.UploadFiles(e.target.files)}
                    multiple={this.props.isMulti}
                  />
                </a>{" "}
                {or_drag_here}
              </Grid>
              <p>{suported_file_type_jpg_png_dcm}</p>
            </div>
          )}
        </Dropzone>
        {this.state.attachfile && this.state.attachfile.length > 0
          ? this.state.attachfile.map((file, index) => (
              <Grid container direction="row" className="updatedfileuploader">
                <Grid item xs={3} md={3} className="updatedfileLft">
                  {file?.filetype === "mp4" && (
                    <img
                      src={require("assets/images/videoIcon.png")}
                      alt=""
                      title=""
                    />
                  )}
                  {(file?.filetype === "png" ||
                    file?.filetype === "jpeg" ||
                    file?.filetype === "jpg" ||
                    file?.filetype === "svg") && (
                    <img
                      src={getImage(file.filename, this.state.images)}
                      alt=""
                      title=""
                    />
                  )}
                  {file?.filetype === "pdf" && (
                    <img
                      src={require("assets/images/pdfimg.png")}
                      alt=""
                      title=""
                    />
                  )}
                  {(file?.filetype === "doc" ||
                    file?.filetype === "docx" ||
                    file?.filetype === "xml" ||
                    file?.filetype === "txt") && (
                    <img
                      src={require("assets/images/txt1.png")}
                      alt=""
                      title=""
                    />
                  )}
                  {(file?.filetype === "xls" ||
                    file?.filetype === "xlsx" ||
                    file?.filetype === "xml") && (
                    <img
                      src={require("assets/images/xls1.svg")}
                      alt=""
                      title=""
                    />
                  )}
                  {file?.filetype === "csv" && (
                    <img
                      src={require("assets/images/csv1.png")}
                      alt=""
                      title=""
                    />
                  )}
                  {(file?.filetype === "dcm" ||
                    file?.filetype === "DICOM" ||
                    file?.filetype === "dicom" ||
                    file?.filetype === "DCM") && (
                    <img
                      src={require("assets/images/dcm1.png")}
                      alt=""
                      title=""
                    />
                  )}
                </Grid>
                <Grid item xs={6} md={6} className="updatedfileMid">
                  <label>{this.getFileName(file)}</label>
                </Grid>
                <Grid item xs={3} md={3} className="updatedfileRght">
                  <img
                    className="deletepointer"
                    onClick={() => {
                      this.delindex(file.filename);
                    }}
                    src={require("assets/images/closeCall.png")}
                    alt=""
                    title=""
                  />
                </Grid>
              </Grid>
            ))
          : ""}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, { LanguageFetchReducer })(ImageUploderView)
  )
);
