import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import { getDate, newdate, getTime, getImage } from "Screens/Components/BasicMethod/index";
import CreatedBySec from "Screens/Components/TimelineComponent/CreatedBysec";
import { withRouter } from "react-router-dom";
import { GetLanguageDropdown, GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens//actions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { getLanguage } from "translations/index";
import { pure } from "recompose";
import Button from "@material-ui/core/Button";
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
        if (
            prevProps.data !== this.props.data ||
            prevProps.loggedinUser !== this.props.loggedinUser
        ) {
            this.setState({
                item: this.props.data,
                loggedinUser: this.props.loggedinUser,
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
        let translate = getLanguage(this.props.stateLanguageType);
        let { visible, hide, not_mentioned, show, until, always, archive, edit, details, img_files,
            Change, visibility, Download, Delete, de_archive,PromotionType, Promotion, PromotionTitle } = translate;
        var item = this.state.item;

        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={12} md={1} className="descpCntntLft">
                    {newdate(item.datetime_on)}
                </Grid>
                <Grid item xs={12} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght descpInerBlue">
                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg">
                                    <a className="blodPrsurNote">
                                    <img
                                        src={require("assets/images/blood-pressure-sugar.svg")}
                                        alt=""
                                        title=""
                                    />
                                     <span>{Promotion}</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>

                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>
                        <Grid className="bp_hg addSpc">
                            <label>
                                {item.file_content && item.file_content}
                                <span></span>
                            </label>
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
                                            <CreatedBySec data={item} />
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                    <Grid className="addSpc detailMark">
                                        <Collapsible trigger={details} open="true">
                                            <Grid className="detailCntnt">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5}>
                                                                <label>{PromotionTitle}</label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>
                                                                <span>{item.title && item.title}</span>
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5}>
                                                                <label>{PromotionType}</label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>
                                                            <span>{item.promotion_type &&
                                                                GetShowLabel1(
                                                                    this.props.PromotionType,
                                                                    item.promotion_type.value,
                                                                    this.props.stateLanguageType,
                                                                    true,
                                                                    "anamnesis"
                                                                )}{" "}</span>
                                                                <span></span>
                                                                {/* <span>{item.promotion_type?.label && item.promotion_type?.label}</span> */}
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5}>
                                                                <label></label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>

                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Collapsible>

                                    </Grid>
                                    <Grid className="addSpc detailMark">
                                        <Collapsible trigger={"Text"} open="true">
                                            <Grid className="detailCntnt">
                                                <p
                                                    dangerouslySetInnerHTML={{ __html: item.text }}
                                                />
                                            </Grid>
                                        </Collapsible>
                                    </Grid>
                                    <Grid className="addSpc detailMark">
                                        {item?.isbutton &&
                                            <Grid className="newAddStepBtn">
                                                <Button >
                                                    {item.button_text}
                                                </Button>
                                            </Grid>
                                        }
                                    </Grid>
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
        stateLanguageType
    };
};
export default pure(
    withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index))
);