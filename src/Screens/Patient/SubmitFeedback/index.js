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
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loader from "Screens/Components/Loader/index";
import { getLanguage } from "translations/index"
import Pagination from "Screens/Components/Pagination/index";
import { getAllPictureEval } from 'Screens/Patient/PictureEvaluation/api';
import Modal from '@material-ui/core/Modal';
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllData: [],
            openFeedback: false,
            updateFeedback: {},
            openDetail: true,
            openDetail: false,
        };
        // new Timer(this.logOutClick.bind(this))
    }

    componentDidMount = () => {
        getAllPictureEval(this)
    }
    // Open Feedback Form
  handleOpFeedback = () => {
    this.setState({ openFeedback: true });
  };
  // Close Feedback Form
  handleCloseFeedback = () => {
    this.setState({ openFeedback: false });
  };
  updateRequestBeforePayment=(data)=>{
    this.props.history.push({
      pathname: '/patient/picture-evaluation',
      state: { data: data }
    })
  }
  // Open See Details Form
  handleOpenDetail = () => {
    this.setState({ openDetail: true });
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
    console.log('updateFeedback', this.state.updateFeedback);
    setTimeout(
      this.setState({ updateFeedback: {}, openFeedback: false }),
      6000
    );
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {} = translate;

        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    {console.log('AllDataAllData', this.state.AllData)}
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="feedback" />
                                <LeftMenuMobile isNotShow={true} currentPage="feedback" />
                                <Grid item xs={12} md={11} lg={10}>
                                    <Grid className="docsOpinion">
                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={6}><label>{"Evaluation Request"}</label></Grid>
                                            {/* <Grid item xs={12} md={6} className="docsOpinRght">
                                                <a onClick={this.handlePicEval}>+ {New} {"Picture Evaluation"}</a>
                                            </Grid> */}
                                        </Grid>
                                        <Grid className="presPkgIner2">
                                            <Grid className="presOpinionIner">
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>{"Added On"}</Th>
                                                            <Th>{"Task Name"}</Th>
                                                            <Th>{"Treatment So far"}</Th>
                                                            <Th>{"Premedication"}</Th>
                                                            <Th></Th>
                                                            <Th></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {this.state.AllData?.length > 0 && this.state.AllData.map((item, index) => (
                                                            <Tr>
                                                                <Td>{item.created_at}</Td>
                                                                <Td>{item.task_name}</Td>
                                                                <Td>  <span
                                            dangerouslySetInnerHTML={{
                                              __html: item.treatment_so_far
                                            }}
                                          /></Td>
                                                                <Td>
                                                                <span
                                            dangerouslySetInnerHTML={{
                                              __html: item.premedication
                                            }}
                                          /></Td>
                                                                <Td>{!item.is_payment && <span className="err_message">Your Payment is pending</span>}</Td>
                                                                <Td className="presEditDot scndOptionIner">
                                                        <a className="openScndhrf">
                                                            <img
                                                                src={require("assets/images/three_dots_t.png")}
                                                                alt=""
                                                                title=""
                                                                className="openScnd"
                                                            />
                                                            <ul>
                                                                <li>
                                                                <a onClick={this.handleOpenDetail}>
                                                                        <img
                                                                            src={require("assets/images/details.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"See Details"}
                                                                    </a>
                                                                </li>
                                                                {!item.is_payment && <> 
                                                                <li>
                                                                    <a
                                                                        onClick={() => {
                                                                            this.updateRequestBeforePayment(item);
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={require("assets/images/cancel-request.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"Edit Request"}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        onClick={() => {
                                                                            // this.updatePrescription("cancel", data._id);
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={require("assets/images/cancel-request.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"Cancel Request"}
                                                                    </a>
                                                                </li>
                                                                </>}
                                                                {item.status === "done" && <>
                                                                <li>
                                                                <a onClick={this.handleOpFeedback}>
                                                                        <img
                                                                            src={require("assets/images/cancel-request.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"Give Feedback"}
                                                                    </a>
                                                                </li> 
                                                                </>}
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
                                                                    {this.state.currentPage} of {this.state.totalPage}
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {this.state.totalPage > 1 && (
                                                                <Grid className="prevNxtpag">
                                                                    <Pagination totalPage={1} currentPage={1} pages={this.state.pages}
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
                    {/* <Grid>
                      <label>hello</label>
                    </Grid> */}
                  </Grid>
                  <Grid className="detailPrescp">
                    <Grid className="stndQues">
                      <Grid>
                        <span>Added On</span>
                      </Grid>
                      <Grid>
                        <p>Hospital</p>
                        <p>patient_info</p>
                        <Grid>
                          <label>Assigned to</label>
                        </Grid>
                        <p>Status</p>
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
