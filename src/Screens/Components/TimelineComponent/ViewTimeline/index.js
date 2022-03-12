import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BPView from "../BPView/index";
import BSView from "../BSView/index";
import CPView from "../CPView/index";
import CovidView from "../CovidView/index";
import DianosisView from "../DianosisView/index";
import DiaryView from "../DiaryView/index";
import DVView from "../DVView/index";
import FAView from "../FAView/index";
import FUView from "../FUView/index";
import HVView from "../HVView/index";
import LRView from "../LRView/index";
import MPView from "../MPView/index";
import MedicationView from "../MedicationView/index";
import SSView from "../SSView/index";
import VaccinationView from "../VaccinationView/index";
import WBMIView from "../WBMIView/index";
import AnamnesisView from "../AnamnesisView/index";
import PrescriptionView from "../PrescriptionView/index";
import VaccinationTrialView from "../VaccinationTrialView/index";
import SOView from "../SOView/index";
import SCView from "../SCView/index";
import RespirationView from "../respirationView/index";
import CovidSymptomsView from "../CovidSymptomsView/index";
import { overView } from "Screens/Login/journalviewaction";
import { pure } from "recompose";
import PromotionView from "../PromotionView/index";
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
        {item.type === "blood_pressure" && (
          <BPView
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
        {item.type === "blood_sugar" && (
          <BSView
            onlyOverview={this.props.Overview}
            list={this.props.Allsituation}
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
        {item.type === "weight_bmi" && (
          <WBMIView
            onlyOverview={this.props.Overview}
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
        {(item.type === "promotion" && this.props.comesfrom==='patient') && (
          <PromotionView
            PromotionType={this.props.PromotionType}
            onlyOverview={this.props.Overview}
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
        {item.type === "marcumar_pass" && (
          <MPView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "smoking_status" && (
          <SSView
            onlyOverview={this.props.Overview}
            Allsmoking_status={this.props.Allsmoking_status}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "vaccination" && (
          <VaccinationView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "hospitalization" && (
          <HVView
            onlyOverview={this.props.Overview}
            AllSpecialty={this.props.AllSpecialty}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "doctor_visit" && (
          <DVView
            onlyOverview={this.props.Overview}
            AllSpecialty={this.props.AllSpecialty}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "condition_pain" && (
          <CPView
            onlyOverview={this.props.Overview}
            paintype={this.props.Allpain_type}
            painquality={this.props.Allpain_quality}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "diary" && (
          <DiaryView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
            comesfrom={this.state.comesfrom}
            downloadTrack={(data) => this.props.downloadTrack(data)}
            images={this.state.images}
            Archive={this.state.Archive}
            DeleteTrack={(deleteKey) => this.props.DeleteTrack(deleteKey)}
            ArchiveTrack={(data) => this.props.ArchiveTrack(data)}
            data={item}
            EidtOption={(value, updateTrack, visibility) =>
              this.props.EidtOption(value, updateTrack, visibility)
            }
            loggedinUser={this.state.loggedinUser}
            date_format={this.props.date_format}
            time_format={this.props.time_format}
          />
        )}
        {item.type === "medication" && (
          <MedicationView
            onlyOverview={this.props.Overview}
            Allreminder={this.props.Allreminder}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "laboratory_result" && (
          <LRView
            onlyOverview={this.props.Overview}
            lrp={this.props.lrp}
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
        {item.type === "file_upload" && (
          <FUView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "family_anamnesis" && (
          <FAView
            onlyOverview={this.props.Overview}
            Allgender={this.props.Allgender}
            Allrelation={this.props.Allrelation}
            TrackRecord={this.state.TrackRecord}
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
        {item.type === "covid_19" && (
          <CovidView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "diagnosis" && (
          <DianosisView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "second_opinion" && (
          <SOView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "prescription" && (
          <PrescriptionView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "sick_certificate" && (
          <SCView
            onlyOverview={this.props.Overview}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "anamnesis" && (
          <AnamnesisView
            onlyOverview={this.props.Overview}
            list={this.props.Anamnesis}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "vaccination_trial" && (
          <VaccinationTrialView
            onlyOverview={this.props.Overview}
            paintype={this.props.Allpain_type}
            painquality={this.props.Allpain_quality}
            TrackRecord={this.state.TrackRecord}
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
            gender={this.state.patient_gender}
          />
        )}
        {item.type === "respiration" && (
          <RespirationView
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
        {item.type === "long_covid" && (
          <CovidSymptomsView
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
            gender={this.state.patient_gender}
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
