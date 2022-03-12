import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import ReactTooltip from "react-tooltip";
// import FileViews from "./../FileViews/index";
import CreatedBySec from "Screens/Components/TimelineComponent/CreatedBysec";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import DownloadFullTrack from "Screens/Components/DownloadFullTrack/index.js";
import { LanguageFetchReducer } from "Screens//actions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import SpecialityButton from "../../VirtualHospitalComponents/SpecialityButton";
import { getLanguage } from "translations/index";
import { getDate, newdate, getTime, getImage, } from "../../BasicMethod/index";
import { pure } from "recompose";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive: this.props.archive,
            loggedinUser: this.props.loggedinUser,
            images: this.props.images,
            TrackRecord: this.props.TrackRecord,
            onlyOverview: this.props.onlyOverview,
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data ||
            prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({
                item: this.props.data,
                loggedinUser: this.props.loggedinUser
            });
        }
        if (prevProps.images !== this.props.images) {
            this.setState({ images: this.props.images });
        }
        if (prevProps.TrackRecord !== this.props.TrackRecord) {
            this.setState({ TrackRecord: this.props.TrackRecord });
        }
        if (prevProps.onlyOverview !== this.props.onlyOverview) {
            this.setState({ onlyOverview: this.props.onlyOverview });
        }
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            show,
            hide,
            until,
            archive,
            visibility,
            edit,
            Delete,
            always,
            details,
            Change,
            de_archive,
            Download,
            Services,
            Price
        } = translate;
        var item = this.state.item;
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={12} md={1} className="descpCntntLft">
                    {newdate(item?.created_at, this.state.date_format)}
                </Grid>
                <Grid item xs={12} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght">
                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg">
                                    <a className="diryNote">
                                        <img
                                            src={require("assets/images/condition-diagnosis-family-anamnesis-diary.svg")}
                                            alt=""
                                            title=""
                                        />
                                        <span>Invoice</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <Grid className="bp_vsblSec scndOptionIner1">
                                    <ReactTooltip
                                        className="timeIconClas"
                                        id={item.track_id + "visibility"}
                                        place="top"
                                        effect="solid"
                                        backgroundColor="#ffffff"
                                    >
                                        {item.visible === "show" ? (
                                            <label>
                                                {show} {until}
                                            </label>
                                        ) : (
                                            <label>
                                                {hide} {until}
                                            </label>
                                        )}
                                        {item.public === "always" ? (
                                            <p> {always} </p>
                                        ) : (
                                            <p>{getDate(item.public, this.state.date_format)}</p>
                                        )}
                                    </ReactTooltip>
                                    <a className="openScndhrf1">
                                        <a className="vsblDots">
                                            <img
                                                src={require("assets/images/nav-more.svg")}
                                                alt=""
                                                title=""
                                            />
                                        </a>
                                        {!this.props.Archive ? (
                                            <ul>
                                                <li>
                                                    <a onClick={(data) => this.props.ArchiveTrack(item)}>
                                                        <img
                                                            src={require("assets/images/archive-1.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        {archive}
                                                    </a>
                                                </li>
                                                {this.props.comesfrom === "patient" && (
                                                    <li>
                                                        {item.created_by === this.state.loggedinUser._id &&
                                                            (!item.updated_by || item.updated_by === "") ? (
                                                            <a
                                                                onClick={() =>
                                                                    this.props.EidtOption(item.type, item)
                                                                }
                                                            >
                                                                <img
                                                                    src={require("assets/images/edit-1.svg")}
                                                                    alt=""
                                                                    title=""
                                                                />
                                                                {edit}
                                                            </a>
                                                        ) : (
                                                            <a
                                                                onClick={() =>
                                                                    this.props.EidtOption(item.type, item, true)
                                                                }
                                                            >
                                                                <img
                                                                    src={require("assets/images/edit.svg")}
                                                                    alt=""
                                                                    title=""
                                                                />
                                                                {Change} {visibility}
                                                            </a>
                                                        )}
                                                    </li>
                                                )}
                                                {this.props.comesfrom !== "patient" && (
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                this.props.EidtOption(item.type, item)
                                                            }
                                                        >
                                                            <img
                                                                src={require("assets/images/edit-1.svg")}
                                                                alt=""
                                                                title=""
                                                            />
                                                            {edit}
                                                        </a>
                                                    </li>
                                                )}

                                                <li>
                                                    <a onClick={() => this.props.downloadTrack(item)}>
                                                        <img
                                                            src={require("assets/images/download.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        {Download}
                                                    </a>
                                                </li>
                                                <li>
                                                    <DownloadFullTrack
                                                        TrackRecord={this.state.TrackRecord}
                                                    />
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={(deleteKey) =>
                                                            this.props.DeleteTrack(item.track_id)
                                                        }
                                                    >
                                                        <img
                                                            src={require("assets/images/cancel-request.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        {Delete}
                                                    </a>
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul>
                                                <li>
                                                    <a onClick={(data) => this.props.ArchiveTrack(item)}>
                                                        <img
                                                            src={require("assets/images/archive-1.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        {de_archive}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={(deleteKey) =>
                                                            this.props.DeleteTrack(item.track_id)
                                                        }
                                                    >
                                                        <img
                                                            src={require("assets/images/cancel-request.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                        {Delete}
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </a>
                                </Grid> */}
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="bp_hg addSpc">
                            {item && item.invoice_id &&
                                <label><span>{item.invoice_id}</span></label>
                            }
                        </Grid>
                        <Grid className="bp_hg addSpc">
                            <label><span>
                                {/* <SpecialityButton
                                    label={item?.speciality?.specialty_name}
                                    backgroundColor={item?.speciality?.background_color}
                                    viewImage={false}
                                    color={item?.speciality?.color}
                                    showActive={false}
                                /> */}
                                <label><span>$ {item.total_amount}</span></label>
                            </span></label>
                            {/* <p>Normal</p> */}
                        </Grid>

                        <Collapsible
                            trigger={<ExpandMoreIcon />}
                            triggerWhenOpen={<ExpandLessIcon />}
                            open={!this.state.onlyOverview}
                        >
                            {
                                <Grid>
                                    <Grid container direction="row" className="addSpc bpJohnMain">
                                        <Grid item xs={12} md={12}>

                                            {/* <CreatedBySec data={item} /> */}
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                    {/* <Grid className="addSpc detailMark">
                                        <Collapsible trigger="Assigned to" open="true">
                                            <Grid className="detailCntnt">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6} lg={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5} >
                                                                {item && item.assinged_to && item.assinged_to.length > 0 && item.assinged_to.map((data) => (
                                                                    <CreatedBySec
                                                                        data={data}
                                                                        callFrom='assignedTo'
                                                                        track_id={item.track_id} />
                                                                ))}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Collapsible>
                                    </Grid> */}
                                    <Grid className="addSpc detailMark">
                                        <Collapsible trigger={details} open="true">
                                            <Grid className="detailCntnt">
                                                {/* <Grid container direction="row">
                                                    <Grid item xs={12} md={6} lg={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5} >
                                                                <label>Due on</label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>
                                                                {item && item?.due_on && item?.due_on?.time &&
                                                                    <span>
                                                                        {getDate(item?.due_on?.time, this.state.date_format)}
                                                                    </span>
                                                                }
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5} >
                                                                <label>Due on (time)</label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>
                                                                {item && item?.due_on && item?.due_on?.time &&
                                                                    <span>
                                                                        {getTime(new Date(item?.due_on?.time), this.state.time_foramt)}
                                                                    </span>
                                                                }
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid> */}


                                                <Grid className="srvcTable3">
                                                    <Table>
                                                        <Thead>
                                                            <Tr>
                                                                <Th>{Services}</Th>
                                                                <Th>{Price}</Th>
                                                                <Th>Quantity</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {item?.services?.length > 0 &&
                                                                item?.services.map((data) => (
                                                                    <>
                                                                        <Tr>
                                                                            <Td>
                                                                                <label>{data.service}</label>
                                                                            </Td>
                                                                            <Td>{data.price}</Td>
                                                                            <Td>{data.quantity}</Td>
                                                                            {/* <Td className="srvcDots"> */}
                                                                            <Td>
                                                                                {/* <Grid
                                                                                    item
                                                                                    xs={6}
                                                                                    md={6}
                                                                                    className="spcMgntRght7 presEditDot scndOptionIner"
                                                                                > */}
                                                                                {/* <a className="openScndhrf">
                                                                                        <img
                                                                                            src={require("assets/images/three_dots_t.png")}
                                                                                            alt=""
                                                                                            title=""
                                                                                            className="openScnd specialuty-more"
                                                                                        />
                                                                                        <ul>
                                                                                            <li>
                                                                                                <a
                                                                                                    onClick={() => {
                                                                                                        editService(data, this);
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        src={require("assets/images/details.svg")}
                                                                                                        alt=""
                                                                                                        title=""
                                                                                                    />
                                                                                                    Edit Service
                                                                                                </a>
                                                                                            </li>

                                                                                            <li
                                                                                                onClick={() => {
                                                                                                    this.removeServices(data._id);
                                                                                                }}
                                                                                            >
                                                                                                <a>
                                                                                                    <img
                                                                                                        src={require("assets/images/cancel-request.svg")}
                                                                                                        alt=""
                                                                                                        title=""
                                                                                                    />
                                                                                                    Delete Service
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </a> */}
                                                                                {/* </Grid> */}
                                                                            </Td>
                                                                        </Tr>
                                                                    </>
                                                                ))}
                                                        </Tbody>
                                                    </Table>
                                                </Grid>
                                            </Grid>
                                        </Collapsible>
                                    </Grid>
                                    {/* <Grid className="addSpc detailMark task_desk">
                                        <Collapsible trigger="Description" open="true">
                                            <Grid className="task_desk">
                                                <span>{item.description}</span>
                                            </Grid>
                                        </Collapsible>
                                    </Grid> */}
                                    {/* <Grid className="addSpc detailMark">
                                        <Collapsible trigger="Attachments" open="true">
                                            <FileViews
                                                images={this.state.images}
                                                attachfile={item.attachments}
                                            />
                                        </Collapsible>
                                    </Grid> */}
                                </Grid>
                            }
                        </Collapsible>
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
export default pure(
    withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index))
);
