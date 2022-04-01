import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loader from 'Screens/Components/Loader/index';
import { getLanguage } from 'translations/index';
import { confirmAlert } from 'react-confirm-alert';
import Pagination from 'Screens/Components/Pagination/index';
import { getAllPictureEval } from 'Screens/Patient/PictureEvaluation/api';
import Modal from '@material-ui/core/Modal';
import { getDate } from 'Screens/Components/BasicMethod/index';
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';
import {
  handleSubmitFeed,
  handleOpFeedback,
  handleCloseFeedback,
  handleOpenDetail,
  handleCloseDetail,
  updateEntryState1,
  updateRequestBeforePayment,
} from '../PictureEvaluation/api';
import FileViews from 'Screens/Components/TimelineComponent/FileViews/index';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllData: [],
      AllData1: [],
      openFeedback: false,
      updateFeedback: {},
      openDetail: false,
      showDetails: {},
      forFeedback: {},
      allcompulsary: false,
      sendError: false,
      sendSuccess: false,
      totalPage: 1,
      currentPage: 1,
    };
    // new Timer(this.logOutClick.bind(this))
  }

  componentDidMount = () => {
    getAllPictureEval(this);
  };

  updateRequestBeforePayment = (data) => {
    this.props.history.push({
      pathname: '/patient/picture-evaluation',
      state: { data: data },
    });
  };

  updateEntryState1 = (value, name) => {
    const state = this.state.updateFeedback;
    state[name] = value;
    this.setState({ updateFeedback: state });
    // this.props.updateEntryState1(value, name);
  };

  //For chnage the page
  onChangePage = (pageNumber) => {
    this.setState({
      AllData: this.state.AllData1.slice(
        (pageNumber - 1) * 20,
        pageNumber * 20
      ),
      currentPage: pageNumber,
    });
  };

  deleteRequest = (id) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { remove_task, you_sure_to_remove_task, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1>{remove_task}</h1>
            <p>{you_sure_to_remove_task}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.removeTask2(id);
                  // onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  removeTask2 = (id) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { RemoveTask, really_want_to_remove_task, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1 class="alert-btn">{RemoveTask}</h1>
            <p>{really_want_to_remove_task}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.deleteClickTask(id);
                  onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  //for delete the Task
  deleteClickTask(id) {
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path + '/vh/AddTask/' + id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        if (response.data.hassuccessed) {
          getAllPictureEval(this)
        }
      })
      .catch((error) => { });
  }

  handleSubmitFeed = () => {
    setTimeout(
      this.setState({ updateFeedback: {}, openFeedback: false }),
      6000
    );
  };

  calculateAge = (date) => {
    if (date) {
      var birthDate = new Date(date);
      var otherDate = new Date();

      var years = otherDate.getFullYear() - birthDate.getFullYear();

      if (
        otherDate.getMonth() < birthDate.getMonth() ||
        (otherDate.getMonth() == birthDate.getMonth() &&
          otherDate.getDate() < birthDate.getDate())
      ) {
        years--;
      }
      return years;
    }
    return '-';
  };



  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Your_Payment_is_pending,
      Your_request_is_Declined,
      Check_the_reply_from_the_doctor_on_detail,
      submit_Feedback,
      All_fields_are_compulsary_please_fill_all,
      Feedback_already_given_by_you,
      Feedback_submit_successfully,
      understood_explaination,
      satisfied_service,
      Submit,
      details,
      No_attachments,
      No_comments,
      evaluation_request,
      added_on,
      hospital,
      assigned_to,
      status,
      task_name,
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
      Is_it_fast_service,
      sexual_active,
      sun_before,
      body_temp,
      payment_done,
      Attachments,
      Reply,
      Comments,
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
                              <Th>{task_name}</Th>
                              <Th>{treatment_so_far}</Th>
                              <Th>{premedication}</Th>
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
                                    {item.is_decline ? <>
                                      <span className="err_message">
                                      {Your_request_is_Declined}
                                      </span>
                                    </> :
                                      <>
                                        {!item.is_payment && (
                                          <span className="err_message">
                                            {Your_Payment_is_pending}
                                          </span>
                                        )}
                                        {((item.status === 'done' ||
                                          item?.comments?.length > 0 || item?.attachments?.length > 0) && !item.isviewed) && (
                                            <span className="success_message">
                                              {Check_the_reply_from_the_doctor_on_detail}
                                            </span>
                                          )}
                                      </>}
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
                                              handleOpenDetail(this, item)
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
                                        {(!item.is_payment || item.is_decline)
                                           &&
                                            (<li>
                                              <a
                                                onClick={() => {
                                                  updateRequestBeforePayment(
                                                    this,
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
                                            </li>)}
                                        {!item.is_payment && (
                                          <li>
                                            <a
                                              onClick={() => {
                                                this.deleteRequest(item._id);
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
                                        )}

                                        {(item.status === 'done' ||
                                          item?.comments?.length > 0) && (
                                            <>
                                              <li>
                                                <a
                                                  onClick={() =>
                                                    handleOpFeedback(this, item)
                                                  }
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
                                    totalPage={this.state.totalPage}
                                    currentPage={this.state.currentPage}
                                    pages={this.state.pages}
                                    onChangePage={(page) => { this.onChangePage(page) }}
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
                onClose={() => handleCloseFeedback(this)}
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
                        <a onClick={() => handleCloseFeedback(this)}>
                          <img
                            src={require('assets/images/close-search.svg')}
                            alt=""
                            title=""
                          />
                        </a>
                      </Grid>

                      <div>
                        <p>{submit_Feedback}</p>
                      </div>
                    </Grid>
                    {this.state.allcompulsary && <div className="err_message">
                      {All_fields_are_compulsary_please_fill_all}
                    </div>}
                    {this.state.sendError && <div className="err_message">
                      {Feedback_already_given_by_you}
                    </div>}
                    {this.state.sendSuccess &&
                      <div className="success_message">
                        {Feedback_submit_successfully}
                      </div>}
                    <Grid className="symptomSec symptomSec1">
                      <h3></h3>
                      <SymptomQuestions
                        updateEntryState1={(e) =>
                          updateEntryState1(this, e, 'fast_service')
                        }
                        comesFrom="Feedback"
                        label={Is_it_fast_service}
                        value={this.state.updateFeedback?.fast_service}
                      />
                      <SymptomQuestions
                        updateEntryState1={(e) =>
                          updateEntryState1(this, e, 'doctor_explaination')
                        }
                        comesFrom="Feedback"
                        label={understood_explaination}
                        value={this.state.updateFeedback?.doctor_explaination}
                      />
                      <SymptomQuestions
                        updateEntryState1={(e) =>
                          updateEntryState1(this, e, 'satification')
                        }
                        comesFrom="Feedback"
                        label={satisfied_service}
                        value={this.state.updateFeedback?.satification}
                      />
                      {!this.state.sendError && <Grid className="infoShwSave3">
                        <input
                          type="submit"
                          value={Submit}
                          onClick={() => handleSubmitFeed(this)}
                        />
                      </Grid>}
                    </Grid>
                  </Grid>
                </Grid>
              </Modal>
              {/* Feedback Model close */}

              {/* Model setup */}
              <Modal
                open={this.state.openDetail}
                onClose={() => handleCloseDetail(this)}
                className={
                  this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === 'dark'
                    ? 'darkTheme'
                    : ''
                }>
                <Grid className="creatTaskModel">
                  <Grid className="creatTaskCntnt">
                    <Grid container direction="row">
                      <Grid item xs={12} md={12}>
                        <Grid className="creatLbl">
                          <Grid className="creatLblClose createLSet">
                            <a onClick={() => handleCloseDetail(this)}>
                              <img src={require('assets/images/close-search.svg')} alt="" title="" />
                            </a>
                          </Grid>
                          <label>{details}</label>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className="setDetail-eval">
                      <Grid item xs={12} md={12} className="taskDescp">
                        <Grid className="stndQues stndQues1">
                          <Grid class="addStnd">
                            <Grid><label>{added_on}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                !this.state.showDetails?.created_at ? (
                                '-'
                              ) : (
                                <>
                                  {getDate(
                                    this.state.showDetails?.created_at,
                                    this.props.settings &&
                                    this.props.settings?.setting &&
                                    this.props.settings?.setting?.date_format
                                  )}
                                </>
                              )}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{age}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                !this.state.showDetails?.dob ? (
                                '-'
                              ) : (
                                <>
                                  {getDate(
                                    this.state.showDetails?.dob,
                                    this.props.settings &&
                                    this.props.settings?.setting &&
                                    this.props.settings?.setting?.date_format
                                  )} {` (${this.calculateAge(this.state.showDetails?.dob)} years)`}

                                </>
                              )}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{gender}</label></Grid>
                            <p className="setFirstCapGender">
                              {this.state.showDetails &&
                                this.state.showDetails?.sex}
                            </p>
                          </Grid>
                          <Grid><h2>{blood_pressure}</h2></Grid>
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
                          <Grid><h2>{smoking_status}</h2></Grid>
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
                                this.state.showDetails?.smoking_status
                                  ?.value !== 'Never_smoked' && (
                                  <>
                                    <Grid xs={4} md={4}>
                                      <label>
                                        {from} {when}
                                      </label>
                                      <p>
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
                                              this.state.showDetails
                                                ?.until_when,
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
                          <Grid class="addStnd">
                            <Grid><label>{allergies}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.allergies,
                              }} />
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{family_history}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.family_history,
                              }}
                            />
                          </Grid>

                          <Grid class="addStnd">
                            <Grid><label>{treatment_so_far}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.treatment_so_far,
                              }}
                            />
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{place_of_residence}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.residenceCountry &&
                                this.state.showDetails?.residenceCountry?.label}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{place_of_birth}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.country &&
                                this.state.showDetails?.country?.label}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{phenotyp_race}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.race,
                              }}
                            />
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{travel_history_last_month}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.history_month,
                              }}
                            />
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{medical_preconditions}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.medical_precondition,
                              }}
                            />
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{premedication}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.premedication,
                              }}
                            />
                          </Grid>
                          <Grid class="addStnd addStndCstm">
                            <Grid><label>{image_evaluation}</label></Grid>
                            <div className="imageEvalSize">
                              <FileViews
                                comesFrom="Picture_Task"
                                images={this.state.images}
                                attachfile={this.state.showDetails?.fileattach}
                              />
                            </div>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>Start From</label></Grid>
                            <p>
                              {getDate(
                                this.state.showDetails &&
                                this.state.showDetails?.start_date,
                                this.props.settings &&
                                this.props.settings?.setting &&
                                this.props.settings?.setting?.date_format
                              )}
                            </p>
                          </Grid>

                          <Grid><h2> </h2></Grid>
                          <Grid container xs={12} md={12}>
                            <Grid xs={3} md={3}>
                              <label>{warm}</label>
                              {this.state.showDetails &&
                                this.state.showDetails?.warm === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={3} md={3}>
                              <label>{size_progress}</label>

                              {this.state.showDetails &&
                                this.state.showDetails?.size_progress === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={3} md={3}>
                              <label>{itch}</label>

                              {this.state.showDetails &&
                                this.state.showDetails?.itch === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={3} md={3}>
                              <label>{pain}</label>

                              {this.state.showDetails &&
                                this.state.showDetails?.pain === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{pain_level}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.pain_intensity}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{body_temp}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.body_temp}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{sun_before}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.sun_before}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{cold}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.cold}
                            </p>
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{sexual_active}</label></Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.showDetails &&
                                  this.state.showDetails?.sexual_active,
                              }}
                            />
                          </Grid>
                          <Grid class="addStnd">
                            <Grid><label>{payment_done}</label></Grid>
                            {this.state.showDetails &&
                              this.state.showDetails?.is_payment === true ? (
                              <p>{yes}</p>
                            ) : (
                              <p>{no}</p>
                            )}
                          </Grid>

                          <Grid>
                            <h2>{Reply}</h2>
                            <label>{Attachments}</label>
                          </Grid>
                          <Grid className="imageEvalSize" imageEvalSize>
                            {this.state.showDetails &&
                              this.state.showDetails?.attachments &&
                              this.state.showDetails?.attachments?.length > 0 ? (
                              <FileViews
                                comesFrom="Picture_Task"
                                images={this.state.images}
                                attachfile={this.state.showDetails?.attachments}
                              />
                            ) : (
                              <p>{No_attachments}</p>
                            )}
                          </Grid>

                          <Grid class="addStnd1">
                            <Grid><label>{Comments}</label></Grid>
                            <p>
                              {this.state.showDetails &&
                                this.state.showDetails?.comments &&
                                this.state.showDetails?.comments?.length > 0 ? (
                                this.state.showDetails?.comments.map(
                                  (data, index) => (
                                    <div className="dataCommentBor">
                                      {data?.comment}
                                    </div>
                                  )
                                )
                              ) : (
                                <p>{No_comments}</p>
                              )}
                            </p>
                          </Grid>

                        </Grid>
                      </Grid>
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
