import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import NotesEditor from "Screens/Components/Editor/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import {
    getLanguage
  } from "translations/index"
import { pure } from "recompose";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            options: this.props.options,
        };
    }

    componentDidMount = () => { };
    updateEntryState1 = (value, name) => {
        var state = this.state.updateTrack;
        state[name] = value;
        this.setState({ updateTrack: state });
        this.props.updateEntryState1(value, name);
    };

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack });
        }
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let { attachments, save_entry, notes, respiration } = translate;
        return (
            <div>
                {!this.props.visibility && (
                    <Grid className="cnfrmDiaMain">
                        <Grid className="fillDia">
                            <MMHG
                                name="respiration"
                                Unit="/min"
                                label={respiration}
                                onChange={(e) => this.props.updateEntryState(e)}
                                value={this.state.updateTrack.respiration}
                            />
                        </Grid>
                    </Grid>
                )}

                <Grid className="infoShwHidMain3upr">
                    <ShowHide
                        eventdate={true}
                        date_format={this.state.date_format}
                        value={this.state.updateTrack}
                        onChange={(data) => this.props.GetHideShow(data)}
                    />
                    <Grid className="infoShwSave3">
                        <input
                            type="submit"
                            value={save_entry}
                            onClick={this.props.AddTrack}
                        />
                    </Grid>
                </Grid>
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
export default pure(withRouter(
    connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
