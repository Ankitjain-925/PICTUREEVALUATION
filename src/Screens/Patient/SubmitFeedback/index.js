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

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        // new Timer(this.logOutClick.bind(this))
    }


    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {

        } = translate;

        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
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
                                                    <Th>
                                                        {"Hospital"}
                                                    </Th>
                                                    <Th>{"Assigned to"}</Th>
                                                    <Th>{"Status"}</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {/* {this.state.currentList &&
                                                    this.state.currentList.length > 0 &&
                                                    this.state.currentList.map((data, index) => ( */}
                                                <Tr>
                                                    <Td>
                                                        03/03/2022
                                                    </Td>
                                                    <Td>
                                                        Hopital admin 1
                                                    </Td>
                                                    <Td className="presImg">

                                                        <img
                                                            src={require("assets/images/dr1.jpg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        Dr. Rupali Gupta
                                                    </Td>
                                                    <Td className="dotsImgColor">
                                                        <span className="revwYelow"></span>
                                                        {"Assigned to Doctor"}{" "}
                                                    </Td>

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

                                                            </ul>
                                                        </a>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        03/03/2022
                                                    </Td>
                                                    <Td>
                                                        Hopital admin 1
                                                    </Td>
                                                    <Td className="presImg">
                                                        Not Assigned
                                                    </Td>
                                                    <Td className="dotsImgColor">
                                                        <span className="revwGry"></span>
                                                        {"Request Sent"}{" "}
                                                    </Td>

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

                                                            </ul>
                                                        </a>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        03/03/2022
                                                    </Td>
                                                    <Td>
                                                        Hopital admin 1
                                                    </Td>
                                                    <Td className="presImg">

                                                        <img
                                                            src={require("assets/images/dr1.jpg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        Dr. Rupali Gupta
                                                    </Td>
                                                    <Td className="dotsImgColor">
                                                        <span className="revwGren"></span>
                                                        {"Answered"}{" "}
                                                    </Td>

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
                                                                <li>
                                                                    <a >
                                                                        <img
                                                                            src={require("assets/images/details.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"Give feedback"}
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </a>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        03/03/2022
                                                    </Td>
                                                    <Td>
                                                        Hopital admin 1
                                                    </Td>
                                                    <Td className="presImg">

                                                        <img
                                                            src={require("assets/images/dr1.jpg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        Dr. Rupali Gupta
                                                    </Td>
                                                    <Td className="dotsImgColor">
                                                        <span className="revwGren"></span>
                                                        {"Submit Feedback"}{" "}
                                                    </Td>

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
                                                                <li>
                                                                    <a >
                                                                        <img
                                                                            src={require("assets/images/details.svg")}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        {"Edit feedback"}
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </a>
                                                    </Td>
                                                </Tr>
                                                
                                                <Tr>
                                                    <Td>
                                                        03/03/2022
                                                    </Td>
                                                    <Td>
                                                        Hopital admin 1
                                                    </Td>
                                                    <Td className="presImg">

                                                        <img
                                                            src={require("assets/images/dr1.jpg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        Dr. Rupali Gupta
                                                    </Td>
                                                    <Td className="dotsImgColor">
                                                        <span className="revwRed"></span>
                                                        {"Declined"}{" "}
                                                    </Td>

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

                                                            </ul>
                                                        </a>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        03/03/2022
                                                    </Td>
                                                    <Td>
                                                        Hopital admin 1
                                                    </Td>
                                                    <Td className="presImg">

                                                        <img
                                                            src={require("assets/images/dr1.jpg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        Dr. Rupali Gupta
                                                    </Td>
                                                    <Td className="dotsImgColor">
                                                        <span className="revwYelow"></span>
                                                        {"Assigned to Doctor"}{" "}
                                                    </Td>

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
                                                                <li>
                                                                    <a
                                                                        onClick={() => {
                                                                            // this.updatePrescription("cancel", data._id);
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={require("assets/images/details.svg")}
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

                                                            </ul>
                                                        </a>
                                                    </Td>
                                                </Tr>
                                             
                                                {/* ))} */}
                                            </Tbody>
                                        </Table>
                                        {/* Model setup for Prescription*/}



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
