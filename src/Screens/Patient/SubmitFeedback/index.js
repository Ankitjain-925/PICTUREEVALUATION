import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loader from 'Screens/Components/Loader/index';
import { getLanguage } from 'translations/index';
import Pagination from 'Screens/Components/Pagination/index';
import { getAllPictureEval } from 'Screens/Patient/PictureEvaluation/api';
import Modal from '@material-ui/core/Modal';
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';
import { getDate } from 'Screens/Components/BasicMethod';
import { S3Image } from 'Screens/Components/GetS3Images/index';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllData: [],
      openFeedback: false,
      updateFeedback: {},
      openDetail: true,
      openDetail: false,
      showDetails: {},
    };
    // new Timer(this.logOutClick.bind(this))
  }

  componentDidMount = () => {
    getAllPictureEval(this);
  };
  // Open Feedback Form
  handleOpFeedback = () => {
    this.setState({ openFeedback: true });
  };
  // Close Feedback Form
  handleCloseFeedback = () => {
    this.setState({ openFeedback: false });
  };
  updateRequestBeforePayment = (data) => {
    this.props.history.push({
      pathname: '/patient/picture-evaluation',
      state: { data: data },
    });
  };
  // Open See Details Form
  handleOpenDetail = (detail) => {
    this.setState({ openDetail: true, showDetails: detail });
  };
  // Close See Details Form
  handleCloseDetail = () => {
    this.setState({ openDetail: false });
  };

  updateEntryState1 = (value, name) => {
    const state = this.state.updateFeedback;
    state[name] = value;
    this.setState({ updateFeedback: state });
    // this.props.updateEntryState1(value, name);
  };

  handleSubmitFeed = () => {
    setTimeout(
      this.setState({ updateFeedback: {}, openFeedback: false }),
      6000
    );
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      evaluation_request,
      added_on,
      hospital,
      assigned_to,
      see_details,
      edit_request,
      edit_feedback,
      cancel_request,
      give_feedback,
      rr_systolic,
      RR_diastolic,
      male,
      female,
      other,
      Hba1c,
      situation,
      smoking_status,
      status,
      from,
      when,
      until,
      age,
      gender,
      diabetes,
      blood_pressure,
      blood_sugar,
      picture_evaluation,
      place_of_residence,
      treatment_so_far,
      family_history,
      allergies,
      place_of_birth,
      phenotyp_race,
      medical_preconditions,
      premedication,
      travel_history_last_month,
      image_evaluation,
      when_did_it_start,
      pain_level,
      itch,
      pain,
      size_progress,
      warm,
      fever_body_temp,
      sun_before_how_long,
      how_cold_long,
      sexual_activities,
      select_status,
      submit,
      yes,
      no,
      cold,
      sexual_active,
      sun_before,
      body_temp,
      payment_done,
    } = translate;

    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === 'dark'
            ? 'homeBg homeBgDrk'
            : 'homeBg'
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="feedback" />
                <LeftMenuMobile isNotShow={true} currentPage="feedback" />
                <Grid item xs={12} md={11} lg={10}>
                  <Grid className="docsOpinion">
                    <Grid container direction="row" className="docsOpinLbl">
                      <Grid item xs={12} md={6}>
                        <label>{evaluation_request}</label>
                      </Grid>
                      {/* <Grid item xs={12} md={6} className="docsOpinRght">
                                                <a onClick={this.handlePicEval}>+ {New} {"Picture Evaluation"}</a>
                                            </Grid> */}
                    </Grid>
                    <Grid className="presPkgIner2">
                      <Grid className="presOpinionIner">
                        <Table>
                          <Thead>
                            <Tr>
                              <Th>{added_on}</Th>
                              <Th>{hospital}</Th>
                              <Th>{assigned_to}</Th>
                              <Th>{status}</Th>
                              <Th></Th>
                              <Th></Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {this.state.AllData?.length > 0 &&
                              this.state.AllData.map((item, index) => (
                                <Tr>
                                  <Td>
                                    {getDate(
                                      item && item?.created_at,
                                      this.props.settings &&
                                        this.props.settings?.setting &&
                                        this.props.settings?.setting
                                          ?.date_format
                                    )}
                                  </Td>
                                  <Td>{item.task_name}</Td>
                                  <Td>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: item.treatment_so_far,
                                      }}
                                    />
                                  </Td>
                                  <Td>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: item.premedication,
                                      }}
                                    />
                                  </Td>
                                  <Td>
                                    {!item.is_payment && (
                                      <span className="err_message">
                                        Your Payment is pending
                                      </span>
                                    )}
                                  </Td>
                                  <Td className="presEditDot scndOptionIner">
                                    <a className="openScndhrf">
                                      <img
                                        src={require('assets/images/three_dots_t.png')}
                                        alt=""
                                        title=""
                                        className="openScnd"
                                      />
                                      <ul>
                                        <li>
                                          <a
                                            onClick={() =>
                                              this.handleOpenDetail(item)
                                            }
                                          >
                                            <img
                                              src={require('assets/images/details.svg')}
                                              alt=""
                                              title=""
                                            />
                                            {see_details}
                                          </a>
                                        </li>
                                        {!item.is_payment && (
                                          <>
                                            <li>
                                              <a
                                                onClick={() => {
                                                  this.updateRequestBeforePayment(
                                                    item
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={require('assets/images/cancel-request.svg')}
                                                  alt=""
                                                  title=""
                                                />
                                                {edit_request}
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                onClick={() => {
                                                  // this.updatePrescription("cancel", data._id);
                                                }}
                                              >
                                                <img
                                                  src={require('assets/images/cancel-request.svg')}
                                                  alt=""
                                                  title=""
                                                />
                                                {cancel_request}
                                              </a>
                                            </li>
                                          </>
                                        )}
                                        {item.status === 'done' && (
                                          <>
                                            <li>
                                              <a
                                                onClick={this.handleOpFeedback}
                                              >
                                                <img
                                                  src={require('assets/images/cancel-request.svg')}
                                                  alt=""
                                                  title=""
                                                />
                                                {give_feedback}
                                              </a>
                                            </li>
                                          </>
                                        )}
                                      </ul>
                                    </a>
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                        <Grid className="tablePagNum">
                          <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                              <Grid className="totalOutOff">
                                <a>
                                  {this.state.currentPage} of{' '}
                                  {this.state.totalPage}
                                </a>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              {this.state.totalPage > 1 && (
                                <Grid className="prevNxtpag">
                                  <Pagination
                                    totalPage={1}
                                    currentPage={1}
                                    pages={this.state.pages}
                                    // onChangePage={(page) => { this.onChangePage(page) }}
                                  />
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Feedback form open */}
              <Modal
                open={this.state.openFeedback}
                onClose={this.handleCloseFeedback}
                className={
                  this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === 'dark'
                    ? 'darkTheme nwDiaModel'
                    : 'nwDiaModel'
                }
              >
                <Grid className="nwDiaCntnt">
                  <Grid className="nwDiaCntntIner">
                    <Grid className="nwDiaCourse">
                      <Grid className="nwDiaCloseBtn">
                        <a onClick={this.handleCloseFeedback}>
                          <img
                            src={require('assets/images/close-search.svg')}
                            alt=""
                            title=""
                          />
                        </a>
                      </Grid>

                      <div>
                        <p>Submit Feedback</p>
                      </div>
                    </Grid>
                    <Grid className="symptomSec symptomSec1">
                      <h3></h3>
                      <SymptomQuestions
                        updateEntryState1={(e) =>
                          this.updateEntryState1(e, 'fast_service')
                        }
                        comesFrom="Feedback"
                        label="Is it fast service?"
                        value={this.state.updateFeedback?.fast_service}
                      />
                      <SymptomQuestions
                        updateEntryState1={(e) =>
                          this.updateEntryState1(e, 'doctor_explaination')
                        }
                        comesFrom="Feedback"
                        label="Did you understood the doctor explaination?"
                        value={this.state.updateFeedback?.doctor_explaination}
                      />
                      <SymptomQuestions
                        updateEntryState1={(e) =>
                          this.updateEntryState1(e, 'satisfy_with_service')
                        }
                        comesFrom="Feedback"
                        label="Are you satisfied with the service?"
                        value={this.state.updateFeedback?.satisfy_with_service}
                      />
                      <Grid className="infoShwSave3">
                        <input
                          type="submit"
                          value="Submit"
                          onClick={this.handleSubmitFeed}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Modal>
              {/* Feedback Model close */}

              {/* Model setup */}
              <Modal
                open={this.state.openDetail}
                onClose={this.handleCloseDetail}
                className={
                  this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === 'dark'
                    ? 'prespBoxModel darkTheme'
                    : 'prespBoxModel'
                }
              >
                <Grid className="prespBoxCntnt">
                  <Grid className="prespCourse">
                    <Grid className="prespCloseBtn nwEntrCloseBtnAdd">
                      <a onClick={this.handleCloseDetail}>
                        <img
                          src={require('assets/images/close-search.svg')}
                          alt=""
                          title=""
                        />
                      </a>
                    </Grid>
                    <p>Details</p>
                  </Grid>
                  <Grid className="detailPrescp">
                    <Grid className="stndQues stndQues1">
                      <Grid>
                        <label>Added On</label>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.showDetails &&
                            this.state.showDetails?.created_at,
                          this.props.settings &&
                            this.props.settings?.setting &&
                            this.props.settings?.setting?.date_format
                        )}
                      </p>
                      <Grid>
                        <label>{age}</label>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.showDetails && this.state.showDetails?.dob,
                          this.props.settings &&
                            this.props.settings?.setting &&
                            this.props.settings?.setting?.date_format
                        )}
                      </p>
                      <Grid>
                        <label>{gender}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails && this.state.showDetails?.sex}
                      </p>
                      <Grid>
                        <h2>{blood_pressure}</h2>
                      </Grid>
                      <Grid container xs={12} md={12}>
                        <Grid xs={4} md={4}>
                          <label>{rr_systolic}</label>
                          <p>
                            {this.state.showDetails &&
                              this.state.showDetails?.rr_systolic}
                          </p>
                        </Grid>
                        <Grid xs={4} md={4}>
                          <label>{RR_diastolic}</label>
                          <p>
                            {this.state.showDetails &&
                              this.state.showDetails?.rr_diastolic}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid>
                        <h2>{diabetes}</h2>
                      </Grid>
                      <Grid container xs={12} md={12}>
                        <Grid xs={4} md={4}>
                          <label>{blood_sugar}</label>
                          <p>
                            {this.state.showDetails &&
                              this.state.showDetails?.blood_sugar}
                          </p>
                        </Grid>
                        <Grid xs={4} md={4}>
                          <label>{Hba1c}</label>
                          <p>
                            {this.state.showDetails &&
                              this.state.showDetails?.Hba1c}
                          </p>
                        </Grid>
                        <Grid xs={4} md={4}>
                          <label>{situation}</label>
                          <p>
                            {this.state.showDetails &&
                              this.state.showDetails?.situation &&
                              this.state.showDetails?.situation?.label}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid>
                        <h2>{smoking_status}</h2>
                      </Grid>
                      <Grid container xs={12} md={12}>
                        <Grid xs={4} md={4}>
                          <label>{status}</label>
                          <p>
                            {this.state.showDetails &&
                              this.state.showDetails?.smoking_status &&
                              this.state.showDetails?.smoking_status?.label}
                          </p>
                        </Grid>
                        {!this.state.showDetails?.smoking_status ||
                          (this.state.showDetails &&
                            this.state.showDetails?.smoking_status &&
                            this.state.showDetails?.smoking_status?.value !==
                              'Never_smoked' && (
                              <>
                                <Grid xs={4} md={4}>
                                  <label>
                                    {from} {when}
                                  </label>
                                  <p>
                                    {console.log(
                                      'this.state.showDetails?.from_when',
                                      this.state.showDetails?.from_when
                                    )}
                                    {this.state.showDetails &&
                                    !this.state.showDetails?.from_when ? (
                                      '-'
                                    ) : (
                                      <>
                                        {getDate(
                                          this.state.showDetails?.from_when,
                                          this.props.settings &&
                                            this.props.settings?.setting &&
                                            this.props.settings?.setting
                                              ?.date_format
                                        )}
                                      </>
                                    )}
                                  </p>
                                </Grid>
                                <Grid xs={4} md={4}>
                                  <label>
                                    {until} {when}
                                  </label>
                                  <p>
                                    {this.state.showDetails &&
                                    !this.state.showDetails?.until_when ? (
                                      '-'
                                    ) : (
                                      <>
                                        {getDate(
                                          this.state.showDetails?.until_when,
                                          this.props.settings &&
                                            this.props.settings?.setting &&
                                            this.props.settings?.setting
                                              ?.date_format
                                        )}
                                      </>
                                    )}
                                  </p>
                                </Grid>
                              </>
                            ))}
                      </Grid>
                      <Grid>
                        <label>{allergies}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.allergies,
                        }}
                      />
                      <Grid>
                        <label>{family_history}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.family_history,
                        }}
                      />

                      <Grid>
                        <label>{treatment_so_far}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.treatment_so_far,
                        }}
                      />

                      <Grid>
                        <label>{place_of_residence}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails &&
                          this.state.showDetails?.residenceCountry &&
                          this.state.showDetails?.residenceCountry?.label}
                      </p>
                      <Grid>
                        <label>{place_of_birth}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails &&
                          this.state.showDetails?.country &&
                          this.state.showDetails?.country?.label}
                      </p>
                      <Grid>
                        <label>{phenotyp_race}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.race,
                        }}
                      />
                      <Grid>
                        <label>{travel_history_last_month}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.history_month,
                        }}
                      />
                      <Grid>
                        <label>{medical_preconditions}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.medical_precondition,
                        }}
                      />
                      <Grid>
                        <label>{premedication}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.premedication,
                        }}
                      />
                      <Grid>
                        <label>{image_evaluation}</label>
                      </Grid>
                      {this.state.showDetails &&
                        this.state.showDetails?.fileattach &&
                        this.state.showDetails?.fileattach.map((data) => (
                          <div className="imageEvalSize">
                            <S3Image imgUrl={data?.filename} />
                          </div>
                        ))}
                      <Grid>
                        <label>Start From</label>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.showDetails &&
                            this.state.showDetails?.start_date,
                          this.props.settings &&
                            this.props.settings?.setting &&
                            this.props.settings?.setting?.date_format
                        )}
                      </p>
                      <Grid container xs={12} md={12}>
                        <Grid xs={3} md={3}>
                          <label>{warm}</label>
                          {this.state.showDetails &&
                          this.state.showDetails?.warm === true ? (
                            <p>{yes}</p>
                          ) : (
                            <p>{no}</p>
                          )}
                        </Grid>
                        <Grid xs={3} md={3}>
                          <label>{size_progress}</label>

                          {this.state.showDetails &&
                          this.state.showDetails?.size_progress === true ? (
                            <p>{yes}</p>
                          ) : (
                            <p>{no}</p>
                          )}
                        </Grid>
                        <Grid xs={3} md={3}>
                          <label>{itch}</label>

                          {this.state.showDetails &&
                          this.state.showDetails?.itch === true ? (
                            <p>{yes}</p>
                          ) : (
                            <p>{no}</p>
                          )}
                        </Grid>
                        <Grid xs={3} md={3}>
                          <label>{pain}</label>

                          {this.state.showDetails &&
                          this.state.showDetails?.pain === true ? (
                            <p>{yes}</p>
                          ) : (
                            <p>{no}</p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid>
                        <label>{pain_level}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails &&
                          this.state.showDetails?.pain_intensity}
                      </p>
                      <Grid>
                        <label>{body_temp}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails &&
                          this.state.showDetails?.body_temp}
                      </p>
                      <Grid>
                        <label>{sun_before}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails &&
                          this.state.showDetails?.sun_before}
                      </p>
                      <Grid>
                        <label>{cold}</label>
                      </Grid>
                      <p>
                        {this.state.showDetails && this.state.showDetails?.cold}
                      </p>
                      <Grid>
                        <label>{sexual_active}</label>
                      </Grid>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.showDetails &&
                            this.state.showDetails?.sexual_active,
                        }}
                      />
                      <Grid>
                        <label>{payment_done}</label>
                      </Grid>

                      {this.state.showDetails &&
                      this.state.showDetails?.is_payment === true ? (
                        <p>{yes}</p>
                      ) : (
                        <p>{no}</p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Modal>
              {/* End of Model setup */}
            </Grid>
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
