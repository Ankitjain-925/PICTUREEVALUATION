import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pure } from "recompose";
import TaskView from "../TaskView/index";
import InvoiceView from "../InvoiceView/index";

import { overView } from "Screens/Login/journalviewaction";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Track: this.props.Track,
      loggedinUser: this.props.loggedinUser,
      patient_gender: this.props.patient_gender,
      Archive: this.props.Archive,
      images: this.props.images,
      comesfrom: this.props.comesfrom,
      TrackRecord: this.props.TrackRecord,
    };
  }

  componentDidMount = () => { };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.Track !== this.props.Track) {
      this.setState({ Track: this.props.Track, Archive: this.props.Archive });
    }
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
    if (prevProps.TrackRecord !== this.props.TrackRecord) {
      this.setState({ TrackRecord: this.props.TrackRecord });
    }
    if (prevProps.loggedinUser !== this.props.loggedinUser) {
      this.setState({ loggedinUser: this.props.loggedinUser });
    }
    if (prevProps.comesfrom !== this.props.comesfrom) {
      this.setState({ comesfrom: this.props.comesfrom });
    }
  };


  render() {
    var item = this.state.Track;
    return (
      <div className="timelineGap">
        {item && item?.task_name && (
          <TaskView
            onlyOverview={this.props.Overview}
            list={this.props.Pressuresituation}
            TrackRecord={this.state.TrackRecord}
            OpenGraph={(current_graph) => this.props.OpenGraph(current_graph)}
            comesfrom={this.state.comesfrom}
            downloadTrack={(data) => this.props.downloadTrack(data)}
            images={this.state.images}
            Archive={this.state.Archive}
            DeleteTrack={(deleteKey) => this.props.DeleteTrack(deleteKey)}
            ArchiveTrack={(data) => this.props.ArchiveTrack(data)}
            EidtOption={(value, updateTrack, visibility) =>
              this.props.EidtOption(value, updateTrack, visibility)
            }
            data={item}
            loggedinUser={this.state.loggedinUser}
            date_format={this.props.date_format}
            time_format={this.props.time_format}
          />
        )}
        {item && item?.invoice_id && (
          <InvoiceView
            onlyOverview={this.props.Overview}
            list={this.props.Pressuresituation}
            TrackRecord={this.state.TrackRecord}
            OpenGraph={(current_graph) => this.props.OpenGraph(current_graph)}
            comesfrom={this.state.comesfrom}
            downloadTrack={(data) => this.props.downloadTrack(data)}
            images={this.state.images}
            Archive={this.state.Archive}
            DeleteTrack={(deleteKey) => this.props.DeleteTrack(deleteKey)}
            ArchiveTrack={(data) => this.props.ArchiveTrack(data)}
            EidtOption={(value, updateTrack, visibility) =>
              this.props.EidtOption(value, updateTrack, visibility)
            }
            data={item}
            loggedinUser={this.state.loggedinUser}
            date_format={this.props.date_format}
            time_format={this.props.time_format}
          />
        )}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { Overview } = state.overView;

  return {
    Overview,
  };
};
export default pure(withRouter(connect(mapStateToProps, { overView })(Index)));
