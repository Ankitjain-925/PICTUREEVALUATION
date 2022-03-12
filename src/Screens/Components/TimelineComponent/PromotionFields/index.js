import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SelectField from "Screens/Components/Select/index";
import MMHG from "Screens/Components/mmHgField/index";
import NotesEditor from "../../Editor/index";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import { LanguageFetchReducer } from "Screens//actions";
import { LoginReducerAim } from "Screens/Login/actions";
import Typography from "@material-ui/core/Typography";
import { pure } from "recompose";
import PropTypes from "prop-types";
import { getLanguage } from "translations/index"
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
import sitedata from "sitedata";
import { GetLanguageDropdown, GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
const options = [
    { value: 'specific', label: 'Specific Patient' },
    { value: 'all', label: 'All Patients' }
];

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            PatientList: this.props.PatientList,
            cur_one: this.props.cur_one,
            buttonField: false,
            updateTrack: {},
            selectedUser: {},
            options: this.props.options,
        };
    }

    updateEntryState1 = (value, name) => {
        var state = this.state.updateTrack;
        if (name === 'UserId') {
            state[name] = [value?.value];
            this.setState({ updateTrack: state, selectedUser: value });
            this.props.updateEntryState1([value?.value], name);
        }
        else {
            state[name] = value;
            this.setState({ updateTrack: state });
            this.props.updateEntryState1(value, name);
        }
    };

    updateEntryState = (e) => {
        var state = this.state.updateTrack;
        state[e.target.name] = e.target.value;
        this.setState({ updateTrack: state });
        this.props.updateEntryState(e);
    };

    componentDidMount() {
        var data = this.state.PatientList?.length > 0 && this.state.PatientList.filter((item) => this.props.cur_one?._id?.includes(item?.value))
        if (data && data?.length > 0) {
            this.setState({ selectedUser: data[0] });
        }
    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack });
        }
    };

    render() {
        const { value, personalinfo } = this.state;
        let translate = getLanguage(this.props.stateLanguageType)
        let {Whowouldyouliketosendthisto,
            selectpatient,
            PromotionType,
            Title,
            Text,
            Addbuttonattheendofpost,
            Setbuttontext
           
        } = translate;
        return (
            <div>
                <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <SelectByTwo
                            name="option"
                            label={Whowouldyouliketosendthisto}
                            options={options}
                            onChange={(e) => this.updateEntryState1(e, "option")}
                            value={this.state.updateTrack?.option}
                        />
                    </Grid>
                    {this.state.updateTrack?.option?.value === 'specific' && (
                        <Grid className="fillDia">
                            <SelectField
                                name="patient"
                                isSearchable={true}
                                label={selectpatient}
                                option={this.state.PatientList}
                                onChange={(e) => this.updateEntryState1(e, "UserId")}
                                value={this.state.selectedUser}
                            />
                        </Grid>
                    )}
                    <Grid className="fillDia">
                        <SelectField
                            name="promotion_type"
                            isSearchable={true}
                            label={PromotionType}
                            option={this.state.options}
                            onChange={(e) => this.updateEntryState1(e, "promotion_type")}
                            value={GetShowLabel1(
                                this.props.options,
                                this.state.updateTrack &&
                                this.state.updateTrack.promotion_type &&
                                this.state.updateTrack.promotion_type.value,
                                this.props.stateLanguageType,
                                false,
                                "anamnesis"
                            )}
                        // value={this.state.updateTrack?.promotion_type}
                        />
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG
                            name="title"
                            label={Title}
                            onChange={(e) => this.props.updateEntryState(e)}
                            value={this.state.updateTrack.title}
                        />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor
                            name="text"
                            label={Text}
                            onChange={(e) => this.updateEntryState1(e, "text")}
                            value={this.state.updateTrack.remarks}
                        />
                    </Grid>
                    <Grid className="fillDia">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="checkedB"
                                    color="#00ABAF"
                                    name="isbutton"
                                    checked={this.state.updateTrack.isbutton}
                                    onChange={(e) => this.updateEntryState1(e.target.checked, "isbutton")}
                                />
                            }
                            label={Addbuttonattheendofpost}
                        />
                    </Grid>
                    {this.state.updateTrack?.isbutton == true && (
                        <Grid className="fillDia">
                            <MMHG
                                name="button_text"
                                label={Setbuttontext}
                                onChange={(e) => this.props.updateEntryState(e)}
                                value={this.state.updateTrack.button_text}
                            />
                        </Grid>
                    )}
                    {/* </Grid> */}
                    <Grid className="infoShwSave3">
                        <input
                            type="submit"
                            value={"Publish Promotion"}
                            onClick={this.props.AddTrack}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    return {
        stateLanguageType,
        stateLoginValueAim
    };
};
export default pure(
    withRouter(connect(mapStateToProps, { LanguageFetchReducer, LoginReducerAim, })(Index))
);