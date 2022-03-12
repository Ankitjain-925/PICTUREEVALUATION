import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import sitedata from "sitedata";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import Select from "react-select";
import { GetUrlImage } from "Screens/Components/BasicMethod/index";
import npmCountryList from "react-select-country-list";
import Loader from "Screens/Components/Loader/index";
import FileUploader from "Screens/Components/FileUploader/index";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getLanguage } from "translations/index";
import { getKYC, getUserData, newEntryState1, toggle, UploadFile, saveKYC } from "./kycapi";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderImage: false,
      fileattach1: false,
      fileattach2: false,
      uploadLicence: [],
      CreateKYC: {},
      err1: false,
      err_pdf: false,
      err_document: false,
      success: false,
      filederr: false,
      fileupods: false,
      KYC_ID: "",
      KYC_LICENSE: "",
      selectedOption: null,
      selectedCountry: null,
      CurrentCountry: {},
      allField: false,
      uploadLicence: false,
      FilesUp: [],
      fileattach: [],
      UpDataDetails: {}
    };
  }

  componentDidMount() {
    var npmCountry = npmCountryList().getData();
    this.setState({ selectCountry: npmCountry });
    getKYC(this)
    getUserData(this);
  }

  //Attach the documents
  fileUpload = (event, filed_name) => {
    if (
      event[0].type === "application/pdf" ||
      event[0].type === "image/jpeg" ||
      event[0].type === "image/png"
    ) {
      this.setState({
        loaderImage: true,
        err_pdf: false,
        err_document: false,
        err1: false,
        isfileuploadmulti: true,
      });
      var namefield = filed_name;
      for (var i = 0; i < event.length; i++) {
        var file = event[i];
        let profile_id = this.props.stateLoginValueAim.user.profile_id;
        let fileParts = event[i].name.split(".");
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        axios
          .post(sitedata.data.path + "/aws/sign_s3", {
            fileName: fileName,
            fileType: fileType,
            folders: `${profile_id}/KYC/`,
            bucket: this.props.stateLoginValueAim.user.bucket,
          })
          .then((response) => {
            if (namefield === "UploadID") {
              this.setState({
                fileattach1:
                  response.data.data.returnData.url +
                  "&bucket=" +
                  this.props.stateLoginValueAim.user.bucket,
              });
            } else {
              this.setState({
                fileattach2:
                  response.data.data.returnData.url +
                  "&bucket=" +
                  this.props.stateLoginValueAim.user.bucket,
              });
            }
            this.setState({ fileupods: true });
            setTimeout(() => {
              this.setState({ fileupods: false });
            }, 3000);
            var returnData = response.data.data.returnData;
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            if (fileType === "pdf") {
              fileType = "application/pdf";
            }
            // Put the fileType in the headers for the upload
            var options = { headers: { "Content-Type": fileType } };
            axios
              .put(signedRequest, file, options)
              .then((result) => {
                this.setState({ loaderImage: false });
              })
              .catch((error) => { });
          })
          .catch((error) => { });
      }
    } else {
      this.setState({ err_pdf: true, err_document: false, err1: false });
    }
  };
 

  //For updating and country
  EntryValueName = (value, name) => {
    const state = this.state.CreateKYC;
    state[name] = value.value;
    this.setState({
      CurrentCountry: value,
      CreateKYC: state,
      selectedCountry: value.value,
    });
  };

  //Reset the all Data of KYC
  cancelKYC = () => {
    getKYC(this)
  };

  
  render() {
    //company list generate from here
    const companyList =
      this.state.filteredCompany &&
      this.state.filteredCompany.map((company) => {
        return (
          <li
            value={company}
            onClick={() => {
              this.setState({ q: company });
              toggle(company, this);
              this.setState({ filteredCompany: [] });
            }}
          >
            {company}
          </li>
        );
      });

    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Pharmacy,
      upload_license_is,
      click_here_uplod_license,
      ID,
      kyc,
      reg_number_if_aplicble,
      enter_healthcare_and_upload_data,
      plz_upload_png_jpg,
      plz_uplod_doc,
      plz_fill_all_fields,
      plz_accept_term,
      is,
      patient_id,
      insurance,
      save_change,
      by_clicking_accept_aimedis_term,
      upload_id_card,
      updated_success,
      file_uploaded,
      attached_doc,
      number,
      company,
      u_r_nvr_obligate_to_upload_doc,
      country,
      Nurse,
      Doctor,
      registration,
      capab_Doctors,
      in_critical_enviroment_id,
      responsible_authority,

    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}
        <Grid>
          <Grid className="patientKyc">
            {this.props.comesFrom === 'pharmacy' && <h5>
              {Pharmacy} {ID} / {kyc}
            </h5>}
            {this.props.comesFrom === 'pateint' && <h5>
              {patient_id} / {kyc}
            </h5>}
            {this.props.comesFrom === 'nurse' && <h5>
              {Nurse} {ID} / {kyc}
            </h5>}
            {this.props.comesFrom === 'doctor' && <h5>
              {capab_Doctors} {ID} / {kyc}
            </h5>}
            <p>{enter_healthcare_and_upload_data}</p>
          </Grid>
          {this.state.err_pdf && (
            <div className="err_message">{plz_upload_png_jpg}</div>
          )}
          {this.state.err_document && (
            <div className="err_message">{plz_uplod_doc}</div>
          )}
          {this.state.allField && (
            <div className="err_message">{plz_fill_all_fields}</div>
          )}
          {this.state.err1 && (
            <div className="err_message">{plz_accept_term}</div>
          )}
          {this.state.success && (
            <div className="success_message">
              {kyc} {is} {updated_success}
            </div>
          )}
          {this.state.fileupods && (
            <div className="success_message">{file_uploaded}</div>
          )}
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={4}>
              <Grid className="kycForms">
                <Grid>
                  <label>{country}</label>
                </Grid>
                {this.state.CreateKYC && this.state.CreateKYC.country && (
                  <Grid className="cntryDropTop">
                    <Select
                      value={this.state.CurrentCountry}
                      onChange={(e) => this.EntryValueName(e, "country")}
                      options={this.state.selectCountry}
                      placeholder=""
                      isSearchable={true}
                      name="country"
                      className="cntryDrop cstmSelect1"
                    />

                  </Grid>
                )}
              </Grid>

              <Grid className="kycForms">
                <Grid>
                  {(this.props.comesFrom === 'pharmacy' || this.props.comesFrom === 'nurse' || this.props.comesFrom === 'doctor') && <label>{responsible_authority}</label>}
                  {this.props.comesFrom === 'pateint' && <label>{insurance} {company}</label>}
                </Grid>
                {this.state.CreateKYC &&
                  this.state.CreateKYC.country &&
                  this.state.CreateKYC.country !== "" && (
                    <Grid>
                      <input
                        type="text"
                        name="authority"
                        value={this.state.CreateKYC.authority}
                        onChange={(e)=> newEntryState1(e, this)}
                      />
                      <ul
                        className="insuranceHint"
                        style={{
                          height:
                            companyList && companyList.length > 0
                              ? "150px"
                              : "",
                        }}
                      >
                        {companyList}
                      </ul>
                    </Grid>
                  )}
              </Grid>

              <Grid className="kycForms">
                <Grid>
                  {this.props.comesFrom === 'pharmacy' || this.props.comesFrom === 'nurse' && <label>{reg_number_if_aplicble}</label>}
                  {this.props.comesFrom === 'pateint' && <label>{insurance} {number}</label>}
                  {this.props.comesFrom === 'doctor' && <label>{registration} / {capab_Doctors} {number} </label>}
                </Grid>
                <Grid>
                  <input
                    type="text"
                    name="number"
                    value={this.state.CreateKYC.number}
                    onChange={(e)=> newEntryState1(e, this)}
                  />
                </Grid>
              </Grid>

              {this.state.CreateKYC &&
                this.state.CreateKYC.attachment &&
                this.state.CreateKYC.attachment.length > 0 &&
                this.state.CreateKYC.attachment.length == 2 ? (
                this.state.CreateKYC.attachment.map((value, index) => (
                  <Grid>
                    {value.type === "UploadID" && (
                      <Grid className="kycForms sprtImg">
                        <Grid>
                          <label>{upload_id_card}</label>
                        </Grid>
                        <Grid>
                          <label className="attached_file">
                            {attached_doc} -{" "}
                            <a
                              onClick={() => {
                                GetUrlImage(this.state.KYC_i1);
                              }}
                            >
                              {this.state.KYC_ID}
                            </a>
                          </label>
                        </Grid>
                        <FileUploader
                          name="UploadID"
                          comesFrom="journal"
                          fileUpload={this.fileUpload}
                        />

                      </Grid>
                    )}

                    {value.type === "UploadLicense" && (
                      <Grid className="kycForms sprtImg">
                        <Grid>
                          <label>{upload_id_card}</label>
                        </Grid>
                        <Grid>
                          <label className="attached_file">
                            {attached_doc} -{" "}
                            <a
                              onClick={() => {
                                GetUrlImage(this.state.KYC_l1);
                              }}
                            >
                              {this.state.KYC_LICENSE}
                            </a>
                          </label>
                        </Grid>
                        <FileUploader
                          name="UploadLicense"
                          comesFrom="journal"
                          fileUpload={this.fileUpload}
                        />
                      </Grid>
                    )}
                  </Grid>
                ))
              ) : this.state.CreateKYC &&
                this.state.CreateKYC.attachment &&
                this.state.CreateKYC.attachment.length > 0 &&
                this.state.CreateKYC.attachment.length == 1 ? (
                this.state.CreateKYC.attachment.map((value, index) => (
                  <Grid>
                    {value.type === "UploadID" && (
                      <Grid>
                        <Grid className="kycForms sprtImg">
                          <Grid>
                            <label>{upload_id_card}</label>
                          </Grid>
                          <Grid>
                            <label className="attached_file">
                              {attached_doc} -{" "}
                              <a
                                onClick={() => {
                                  GetUrlImage(this.state.KYC_i1);
                                }}
                              >
                                {this.state.KYC_ID}
                              </a>
                            </label>
                          </Grid>
                          <FileUploader
                            name="UploadID"
                            comesFrom="journal"
                            fileUpload={this.fileUpload}
                          />
                        </Grid>
                        <Grid className="kycForms sprtImg">
                          <Grid>
                            <label>{upload_id_card}</label>
                          </Grid>
                          <FileUploader
                            name="UploadLicense"
                            comesFrom="journal"
                            fileUpload={this.fileUpload}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {value.type === "UploadLicense" && (
                      <Grid>
                        <Grid className="kycForms sprtImg">
                          <Grid>
                            <label>{upload_id_card}</label>
                          </Grid>
                          <FileUploader
                            name="UploadID"
                            comesFrom="journal"
                            fileUpload={this.fileUpload}
                          />
                        </Grid>

                        <Grid className="kycForms sprtImg">
                          <Grid>
                            <label>{upload_id_card}</label>
                          </Grid>
                          <Grid>
                            <label className="attached_file">
                              {attached_doc} -{" "}
                              <a
                                onClick={() => {
                                  GetUrlImage(this.state.KYC_l1);
                                }}
                              >
                                {this.state.KYC_LICENSE}
                              </a>
                            </label>
                          </Grid>
                          <FileUploader
                            name="UploadLicense"
                            comesFrom="journal"
                            fileUpload={this.fileUpload}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                ))
              ) : (
                <Grid>
                  <Grid className="kycForms sprtImg">
                    <Grid>
                      <label>{upload_id_card}</label>
                    </Grid>
                    <FileUploader
                      name="UploadID"
                      comesFrom="journal"
                      fileUpload={this.fileUpload}
                    />
                  </Grid>

                  <Grid className="kycForms sprtImg">
                    <Grid>
                      <label>{upload_id_card}</label>
                    </Grid>
                    <FileUploader
                      name="UploadLicense"
                      comesFrom="journal"
                      fileUpload={this.fileUpload}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid className="clear"> </Grid>
          </Grid>

          <Grid className="aceptTermsPlcy">
            <FormControlLabel
              control={
                <Checkbox
                  value="checkedB"
                  color="#00ABAF"
                  checked={this.state.agree === true && this.state.agree}
                  onChange={(e) => {
                    this.setState({ agree: !this.state.agree, err1: false });
                  }}
                />
              }
              label={by_clicking_accept_aimedis_term}
            />
          </Grid>
          {(this.props.comesFrom === 'pharmacy' || this.props.comesFrom === 'nurse' || this.props.comesFrom === 'doctor') && <>
            {this.state.UpDataDetails.licence && this.state.UpDataDetails.licence.length > 0 && this.state.UpDataDetails.licence[0].url && this.state.UpDataDetails.licence[0].url.split('registration/')[1] ?
              <Grid item xs={12} sm={12} className="common_name_v2_reg profileInfoIner">
                <label htmlFor="UploadDocument" onClick={() => GetUrlImage(this.state.UpDataDetails.licence && this.state.UpDataDetails.licence && this.state.UpDataDetails.licence.length > 0 && this.state.UpDataDetails.licence[0].url && this.state.UpDataDetails.licence[0].url)}>
                  {" "}
                  {upload_license_is}{" "}
                  <img
                    src={require("assets/images/links.png")}
                    alt=""
                    title=""
                    className="link_docs"
                  />
                </label>
              </Grid> :
              <Grid item xs={12} sm={12} className="common_name_v2_reg profileInfoIner">
                <label htmlFor="UploadDocument">
                  {" "}
                  {click_here_uplod_license}{" "}
                  <img
                    src={require("assets/images/links.png")}
                    alt=""
                    title=""
                    className="link_docs"
                  />
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="UploadDocument"
                  name="UploadDocument"
                  onChange={(e) => UploadFile(e, this)}
                  multiple
                />
                <div>
                  {this.state.fileattach &&
                    this.state.fileattach.length > 0 &&
                    this.state.fileattach.map((data) => (
                      <span className="ViewImage">
                        <img src={data} />
                      </span>
                    ))}
                </div>
              </Grid>}
          </>}
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={4} className="kycSaveChng">
              <input type="submit" onClick={()=>saveKYC(this)} value={save_change} />
            </Grid>
          </Grid>

          <Grid className="licensProof">
            <p>{u_r_nvr_obligate_to_upload_doc}</p>
            <p>{in_critical_enviroment_id}</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
