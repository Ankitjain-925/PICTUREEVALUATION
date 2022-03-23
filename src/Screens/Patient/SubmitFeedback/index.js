import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loader from "Screens/Components/Loader/index";
import { getLanguage } from "translations/index"
import Pagination from "Screens/Components/Pagination/index";
import { getAllPictureEval } from 'Screens/Patient/PictureEvaluation/api';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllData: []
        };
        // new Timer(this.logOutClick.bind(this))
    }

    componentDidMount = () => {
        getAllPictureEval(this)
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {

        } = translate;

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
                                                                    <a >
                                                                        <img
                                                                            src={require("assets/images/details.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"See Details"}
                                                                    </a>
                                                                </li>
                                                                {item.status !== "done" && <> 
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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
