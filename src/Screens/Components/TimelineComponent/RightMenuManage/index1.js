import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getDate,
  getTime,
  GetUrlImage,
  getSpec,
  getImage,
  SortByGraphView,
} from "Screens/Components/BasicMethod";
import axios from "axios";
import sitedata from "sitedata";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import moment from "moment";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import AllL_Ps from "Screens/Components/Parameters/parameter.js";
import HC_more from "highcharts/highcharts-more"; //module3
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import {
  translationAR,
  translationSW,
  translationSP,
  translationRS,
  translationEN,
  translationNL,
  translationDE,
  translationCH,
  translationPT,
  translationFR
} from "translations/index"

HC_more(Highcharts); //init modules

class RightManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalinfo: this.props.personalinfo,
      upcoming_appointment: this.props.upcoming_appointment,
      added_data: this.props.added_data,
      time_format: this.props.time_format,
      date_format: this.props.date_format,
      loggedinUser: this.props.loggedinUser,
      doc_image: "",
      images: [],
      resprisationLast : -1,
      HeartLast : -1,
      BPLast: -1,
      BSLast :-1, 
      hbLast : -1, 
      wiegthLast : -1,
      potassiumLast : -1,
      hemoglobineLast : -1,
      leucocytesLast : -1,
      pancreaticlipaseLast : -1,
      thrombocytesLast : -1,
      sodiumLast : -1,
      ggtLast : -1,
      astLast : -1,
      altLast : -1,
      LRLast : -1
    };
  }

  componentDidMount = () => {};

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.loggedinUser !== this.props.loggedinUser ||
      nextState.loggedinUser !== this.state.loggedinUser ||
      nextProps.personalinfo !== this.props.personalinfo ||
      nextProps.upcoming_appointment !== this.props.upcoming_appointment ||
      nextProps.added_data !== this.props.added_data ||
      nextProps.stateLanguageType !== this.props.stateLanguageType ||
      nextState.Creatinine !== this.state.Creatinine ||
      nextState.laboratory_result !== this.state.laboratory_result ||
      nextState.blood_pressure !== this.state.blood_pressure ||
      nextState.weight_bmi !== this.state.weight_bmi ||
      nextState.heart_rate !== this.state.heart_rate ||
      nextState.blood_sugar !== this.state.blood_sugar ||
      nextState.potassium1 !== this.state.potassium1 ||
      nextState.Potassium !== this.state.Potassium ||
      nextState.GGT !== this.state.GGT ||
      nextState.AST !== this.state.AST ||
      nextState.ALT !== this.state.ALT ||
      nextState.hemoglobine1 !== this.state.hemoglobine1 ||
      nextState.Hemoglobine !== this.state.Hemoglobine ||
      nextState.ggt1 !== this.state.ggt1 ||
      nextState.ast1 !== this.state.ast1 ||
      nextState.alt1 !== this.state.alt1 ||
      nextState.leucocytes1 !== this.state.leucocytes1 ||
      nextState.Leucocytes !== this.state.Leucocytes ||
      nextState.sodium1 !== this.state.sodium1 ||
      nextState.Sodium !== this.state.Sodium ||
      nextState.thrombocytes1 !== this.state.thrombocytes1 ||
      nextState.Thrombocytes !== this.state.Thrombocytes ||
      nextState.respiration_data !== this.state.respiration_data ||
      nextState.hba_data !== this.state.hba_data || 
      nextState.HeartLast !== this.state.HeartLast ||
      nextState.resprisationLast !== this.state.resprisationLast || 
      nextState.BPLast !== this.state.BPLast ||
      nextState.BSLast !== this.state.BSLast || 
      nextState.hbLast !== this.state.hbLast ||
      nextState.wiegthLast !== this.state.wiegthLast ||
      nextState.potassiumLast !== this.state.potassiumLast ||
      nextState.hemoglobineLast !== this.state.hemoglobineLast ||
      nextState.leucocytesLast !== this.state.leucocytesLast ||
      nextState.pancreaticlipaseLast !== this.state.pancreaticlipaseLast ||
      nextState.thrombocytesLast !== this.state.thrombocytesLast ||
      nextState.sodiumLast !== this.state.sodiumLast ||
      nextState.ggtLast !== this.state.ggtLast ||
      nextState.astLast !== this.state.astLast ||
      nextState.altLast !== this.state.altLast ||
      nextState.LRLast !== this.state.LRLast
    );
  }

  //On change the User Data
  componentDidUpdate = (prevProps) => {
    if (prevProps.added_data !== this.props.added_data) {
      this.setState({ added_data: this.props.added_data });
    }
    if (
      prevProps.personalinfo !== this.props.personalinfo ||
      prevProps.stateLanguageType !== this.props.stateLanguageType
    ) {
      this.setState({ personalinfo: this.props.personalinfo }, () => {
        // var find = this.state.personalinfo && this.state.personalinfo.upcoming_appointment && this.state.personalinfo.upcoming_appointment.length > 0 && this.state.personalinfo.upcoming_appointment[0] && this.state.personalinfo.upcoming_appointment[0].docProfile && this.state.personalinfo.upcoming_appointment[0].docProfile.profile_image
        // if (find) {
        //     var find1 = find.split('.com/')[1]
        //     axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
        //         .then((response) => {
        //             if (response.data.hassuccessed) {
        //                 this.setState({ doc_image: response.data.data })
        //             }
        //         })
        // }
        var images = [];
        this.state.personalinfo &&
          this.state.personalinfo.last_dv &&
          this.state.personalinfo.last_dv.length > 0 &&
          this.state.personalinfo.last_dv.map((item) => {
            if (item.image) {
              var find = item && item.image;
              if (find) {
                var find1 = find.split(".com/")[1];
                axios
                  .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
                  .then((response) => {
                    if (response.data.hassuccessed) {
                      images.push({
                        image: find,
                        new_image: response.data.data,
                      });
                      this.setState({ images: images });
                    }
                  });
              }
            }
          });

        var laboratory_result = this.getOptions("laboratory_result");
        var blood_pressure = this.getOptions("blood_pressure");
        var weight_bmi = this.getOptions("weight_bmi");
        var heart_rate = this.getOptions("heart_rate");
        var blood_sugar = this.getOptions("blood_sugar");
        var potassium1 = this.getOptions("potassium");
        var hemoglobine1 = this.getOptions("hemoglobine");
        var leucocytes1 = this.getOptions("leucocytes");
        var pancreaticlipase1 = this.getOptions("pancreaticlipase");
        var thrombocytes1 = this.getOptions("thrombocytes");
        var sodium1 = this.getOptions("sodium");
        var ggt1 = this.getOptions("ggt");
        var ast1 = this.getOptions("ast/got");
        var alt1 = this.getOptions("alt/gpt");
        var respiration_data = this.getOptions("respiration");
        var hba_data = this.getOptions('hba');

        var Creatinine1 =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "Creatinine"
          );
        var Potassium =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "Potassium"
          );
        var Hemoglobine =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "Hemoglobine"
          );
        var Leucocytes =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "Leucocytes"
          );
        var Pancreaticlipase =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter &&
              value.lab_parameter.value === "Pancreaticlipase"
          );
        var Thrombocytes =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter &&
              value.lab_parameter.value === "Thrombocytes"
          );
        var Sodium =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "Sodium"
          );
        var GGT =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "GGT"
          );
        var AST =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "AST/GOT"
          );
        var ALT =
          this.state.personalinfo &&
          this.state.personalinfo.laboratory_result &&
          this.state.personalinfo.laboratory_result.length > 0 &&
          this.state.personalinfo.laboratory_result.filter(
            (value, key) =>
              value.lab_parameter && value.lab_parameter.value === "ALT/GPT"
          );
        this.setState({
          Creatinine: Creatinine1,
          Potassium: Potassium,
          Hemoglobine: Hemoglobine,
          Leucocytes: Leucocytes,
          Pancreaticlipase: Pancreaticlipase,
          Thrombocytes: Thrombocytes,
          Sodium: Sodium,
          GGT: GGT,
          AST: AST,
          ALT: ALT,
        });
        this.setState({
          laboratory_result: laboratory_result,
          blood_pressure: blood_pressure,
          respiration_data: respiration_data,
          hba_data: hba_data,
          weight_bmi: weight_bmi,
          heart_rate: heart_rate,
          blood_sugar: blood_sugar,
          pancreaticlipase1: pancreaticlipase1,
          potassium1: potassium1,
          hemoglobine1: hemoglobine1,
          leucocytes1: leucocytes1,
          thrombocytes1: thrombocytes1,
          sodium1: sodium1,
          ggt1: ggt1,
          ast1: ast1,
          alt1: alt1,
        });
      });
    }
    if (prevProps.upcoming_appointment !== this.props.upcoming_appointment) {
      this.setState({ upcoming_appointment: this.props.upcoming_appointment });
    }
    if (prevProps.loggedinUser !== this.props.loggedinUser) {
      this.setState({ loggedinUser: this.props.loggedinUser });
    }
  };

  getOptions = (current_Graph) => {
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
      blood_pressure,
      date,
      heart_frequency,
      lwr_limit,
      upr_limit,
      RR_diastolic,
      frequency,
      rr_systolic,
      value,
      weight,
      height,
      weight_bmi,
      BMI,
      blood_sugar,
      respiration,
      Hba1c
    } = translate;

    if (current_Graph === "blood_pressure" || current_Graph === "heart_rate") {
      var categoriesbp = [],
        databp_d = [],
        databp_s = [],
        dataf = [],
        categoriesfs = [],
        BPLast = 0,
        HeartLast = 0,
        oldone;
      var blood_pressure5 =
        this.state.personalinfo &&
        this.state.personalinfo.blood_pressure &&
        this.state.personalinfo.blood_pressure.length > 0 &&
        this.state.personalinfo.blood_pressure.sort(SortByGraphView);
      blood_pressure5 &&
        blood_pressure5.length > 0 &&
        blood_pressure5.map((data, index) => {
          if(data.rr_diastolic || data.rr_systolic)
          {
            databp_d.push({
              y: parseFloat(data.rr_diastolic),
            });
            databp_s.push({
              y: parseFloat(data.rr_systolic),
            });
            this.setState({BPLast: BPLast})
            BPLast = BPLast+1;
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.created_at
            ) {
              categoriesbp.push(
                getTime(new Date(data.datetime_on, this.state.time_foramt))
              );
            } else {
              categoriesbp.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
          }
          if(data.heart_frequncy){
            dataf.push({
              y: parseFloat(data.heart_frequncy),
            });
            this.setState({HeartLast: HeartLast})
            HeartLast = HeartLast+1;
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.created_at
            ) {
              categoriesfs.push(
                getTime(new Date(data.datetime_on, this.state.time_foramt))
              );
            } else {
              categoriesfs.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
          }
         
          
          oldone = data;
        });
        

      if (current_Graph === "blood_pressure") {
        var options = {
          title: {
            text: blood_pressure,
          },

          yAxis: {
            title: {
              text: blood_pressure,
            },
          },
          xAxis: {
            title: {
              text: date,
            },
            categories: categoriesbp,
          },

          plotOptions: {
            series: {
              marker: {
                enabled: true,
                radius: 3,
              },
            },
          },
          chart: {
            type: "line",
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: RR_diastolic,
              data: databp_d,
              type: "line",
              color: "#008080",
            },
            {
              name: rr_systolic,
              data: databp_s,
              type: "line",
              color: "#0000A0",
            },
          ],
        };
      } else {
        var options = {
          title: {
            text: heart_frequency,
          },

          yAxis: {
            title: {
              text: heart_frequency,
            },
          },
          xAxis: {
            title: {
              text: date,
            },
            categories: categoriesfs,
          },

          plotOptions: {
            series: {
              marker: {
                enabled: true,
                radius: 3,
              },
            },
          },
          chart: {
            type: "line",
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: frequency,
              data: dataf,
              type: "line",
              color: "#008080",
            },
          ],
        };
      }

      return options;
    }
    if (current_Graph === "potassium") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "Potassium"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        myFilterlr1 = [],
        potassiumLast = 0;
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({potassiumLast : potassiumLast})
              potassiumLast = potassiumLast+1;
              datalr1_u.push({
                y: parseFloat(data.upper_limit),
              });
              datalr1_l.push({
                y: parseFloat(data.lower_limit),
              });
              datalr1_v.push({
                y: parseFloat(data.value),
              });
              myFilterlr1.push(data);
              if (
                oldone &&
                oldone.datetime_on &&
                oldone.datetime_on === data.datetime_on &&
                oldone.datetime_on
              ) {
                categorieslr.push(
                  getTime(data.datetime_on, this.state.time_format)
                );
              } else {
                categorieslr.push(
                  getDate(data.datetime_on, this.state.date_format)
                );
              }
              oldone = data;
            }
         
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Potassium",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Potassium",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "hemoglobine") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "Hemoglobine"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        myFilterlr1 = [],
        hemoglobineLast = 0;
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({hemoglobineLast : hemoglobineLast})
              hemoglobineLast = hemoglobineLast+1
              datalr1_u.push({
                y: parseFloat(data.upper_limit),
              });
              datalr1_l.push({
                y: parseFloat(data.lower_limit),
              });
              datalr1_v.push({
                y: parseFloat(data.value),
              });
              myFilterlr1.push(data);
              if (
                oldone &&
                oldone.datetime_on &&
                oldone.datetime_on === data.datetime_on &&
                oldone.datetime_on
              ) {
                categorieslr.push(
                  getTime(data.datetime_on, this.state.time_format)
                );
              } else {
                categorieslr.push(
                  getDate(data.datetime_on, this.state.date_format)
                );
              }
              oldone = data;
            }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Hemoglobine",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Hemoglobine",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "leucocytes") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "Leucocytes"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        leucocytesLast=0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({leucocytesLast: leucocytesLast})
              leucocytesLast = leucocytesLast+1
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Leucocytes",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Leucocytes",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "pancreaticlipase") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter &&
            value.lab_parameter.value === "Pancreaticlipase"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        pancreaticlipaseLast=0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({pancreaticlipaseLast: pancreaticlipaseLast})
              pancreaticlipaseLast = pancreaticlipaseLast+1;
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Pancreaticlipase",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Pancreaticlipase",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "thrombocytes") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "Thrombocytes"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        thrombocytesLast=0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({thrombocytesLast : thrombocytesLast})
              thrombocytesLast = thrombocytesLast+1;
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Thrombocytes",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Thrombocytes",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "sodium") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "Sodium"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        sodiumLast=0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({sodiumLast: sodiumLast})
              sodiumLast = sodiumLast+1
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Sodium",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Sodium",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "ggt") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "GGT"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        ggtLast=0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({ggtLast: ggtLast})
              ggtLast= ggtLast+1
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "GGT",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "GGT",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "ast/got") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "AST/GOT"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        astLast= 0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({astLast: astLast});
              astLast= astLast+1
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "AST/GOT",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "AST/GOT",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "alt/gpt") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "ALT/GPT"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        altLast = 0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({altLast: altLast})
              altLast = altLast+1;
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(data.datetime_on, this.state.time_format)
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "ALT/GPT",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "ALT/GPT",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }
    if (current_Graph === "laboratory_result") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo.laboratory_result &&
        this.state.personalinfo.laboratory_result.length > 0 &&
        this.state.personalinfo.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value.lab_parameter.value === "Creatinine"
        );
      var categorieslr = [],
        datalr1_u = [],
        datalr1_l = [],
        datalr1_v = [],
        oldone,
        LRLast =0,
        myFilterlr1 = [];
      {
        myFilterData1 &&
          myFilterData1.length > 0 &&
          myFilterData1.map((data, index) => {
            if(data.upper_limit || data.lower_limit || data.value)
            {
              this.setState({LRLast: LRLast})
              LRLast = LRLast+1;
            datalr1_u.push({
              y: parseFloat(data.upper_limit),
            });
            datalr1_l.push({
              y: parseFloat(data.lower_limit),
            });
            datalr1_v.push({
              y: parseFloat(data.value),
            });
            myFilterlr1.push(data);
            if (
              oldone &&
              oldone.datetime_on &&
              oldone.datetime_on === data.datetime_on &&
              oldone.datetime_on
            ) {
              categorieslr.push(
                getTime(new Date(data.datetime_on, this.state.time_foramt))
              );
            } else {
              categorieslr.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldone = data;
          }
          });
      }
      var options = {
        title: {
          text: GetShowLabel1(
            AllL_Ps.AllL_Ps.english,
            "Creatinine",
            this.props.stateLanguageType,
            true,
            "lpr"
          ),
        },

        yAxis: {
          title: {
            text: GetShowLabel1(
              AllL_Ps.AllL_Ps.english,
              "Creatinine",
              this.props.stateLanguageType,
              true,
              "lpr"
            ),
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categorieslr,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: value,
            data: datalr1_v,
            type: "line",
            color: "#800000",
          },
          {
            name: upr_limit,
            data: datalr1_u,
            type: "line",
            dashStyle: "dot",
            color: "#008080",
          },
          {
            name: lwr_limit,
            data: datalr1_l,
            type: "line",
            dashStyle: "dot",
            color: "#0000A0",
          },
        ],
      };
      return options;
    }

    if (current_Graph === "weight_bmi") {
      var oldthree,
        weightbmi = [],
        Ibmi = [],
        heightbmi = [],
        categoriesbmi = [],
        wiegthLast = 0;
      var weight_bmi5 =
        this.state.personalinfo &&
        this.state.personalinfo.weight_bmi &&
        this.state.personalinfo.weight_bmi.length > 0 &&
        this.state.personalinfo.weight_bmi.sort(SortByGraphView);

      {
        weight_bmi5 &&
          weight_bmi5 &&
          weight_bmi5.length > 0 &&
          weight_bmi5.map((data, index) => {
            if(data.weight || data.height )
            {
              this.setState({wiegthLast: wiegthLast})
              wiegthLast = wiegthLast+1
            weightbmi.push({
              y: parseFloat(data.weight),
            });
            var BMI = (
              (data.weight / (data.height * data.height)) *
              10000
            ).toFixed(2);
            Ibmi.push({
              y: parseFloat(BMI),
            });
            heightbmi.push({
              y: parseFloat(data.height),
            });
            if (
              oldthree &&
              oldthree.datetime_on &&
              oldthree.datetime_on === oldthree.datetime_on &&
              oldthree.created_at
            ) {
              categoriesbmi.push(
                getTime(new Date(data.datetime_on, this.state.time_foramt))
              );
            } else {
              categoriesbmi.push(
                getDate(data.datetime_on, this.state.date_format)
              );
            }
            oldthree = data;
            
          }
          });
         
      }
      options = {
        title: {
          text: weight_bmi,
        },

        yAxis: {
          title: {
            text: weight,
          },
        },
        yAxis: [
          {
            title: {
              text: BMI,
              style: {
                color: Highcharts.getOptions().colors[2],
              },
            },
            opposite: true,
          },
          {
            // Secondary yAxis
            gridLineWidth: 0,
            title: {
              text: weight,
            },
          },
        ],
        xAxis: {
          title: {
            text: date,
          },
          categories: categoriesbmi,
        },
        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: weight,
            data: weightbmi,
            type: "line",
          },
          {
            name: height,
            data: heightbmi,
            type: "line",
            color: "red",
          },
          {
            name: BMI,
            data: Ibmi,
            type: "line",
          },
        ],
      };
      return options;
    }
    if (current_Graph === "blood_sugar" || current_Graph === "hba") {
      var categoriesbs = [],
      categorieshb = [],
        oldtwo,
        hbac = [],
        blood_s = [],
        hbLast = 0,
        BSLast = 0;
      var blood_sugar5 =
        this.state.personalinfo &&
        this.state.personalinfo.blood_sugar &&
        this.state.personalinfo.blood_sugar.length > 0 &&
        this.state.personalinfo.blood_sugar.sort(SortByGraphView);
      {
        blood_sugar5 &&
          blood_sugar5.length > 0 &&
          blood_sugar5.map((data, index) => {
            if(data.Hba1c){
              hbac.push({
                y: parseFloat(data.Hba1c),
              });
              this.setState({hbLast: hbLast})
              hbLast = hbLast+1 
              if (
                oldtwo &&
                oldtwo.datetime_on &&
                oldtwo.datetime_on === data.datetime_on &&
                oldtwo.created_at
              ) {
                categorieshb.push(
                  getTime(new Date(data.datetime_on, this.state.time_foramt))
                );
              } else {
                categorieshb.push(
                  getDate(data.datetime_on, this.state.date_format)
                );
              }
              oldtwo = data;
            }
            if(data.blood_sugar){
              blood_s.push({
                y: parseFloat(data.blood_sugar),
              });
              this.setState({BSLast: BSLast})
              BSLast = BSLast+1
              if (
                oldtwo &&
                oldtwo.datetime_on &&
                oldtwo.datetime_on === data.datetime_on &&
                oldtwo.created_at
              ) {
                categoriesbs.push(
                  getTime(new Date(data.datetime_on, this.state.time_foramt))
                );
              } else {
                categoriesbs.push(
                  getDate(data.datetime_on, this.state.date_format)
                );
              }
              oldtwo = data;
            }
          });
        
      }

      if (current_Graph === "blood_sugar") {
        options = {
          title: {
            text: blood_sugar,
          },
          yAxis: {
            title: {
              text: blood_sugar,
            },
          },
          xAxis: {
            title: {
              text: date,
            },
            categories: categoriesbs,
          },
  
          plotOptions: {
            series: {
              marker: {
                enabled: true,
                radius: 3,
              },
            },
          },
          chart: {
            type: "line",
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: blood_sugar,
              data: blood_s,
              type: "line",
            },
          ],
        };
      } else {
        var options = {
          title: {
            text: Hba1c,
          },

          yAxis: {
            title: {
              text: Hba1c,
            },
          },
          xAxis: {
            title: {
              text: date,
            },
            categories: categorieshb,
          },

          plotOptions: {
            series: {
              marker: {
                enabled: true,
                radius: 3,
              },
            },
          },
          chart: {
            type: "line",
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: Hba1c,
              data: hbac,
              type: "line",
            },
          ],
        };
      }

      return options;
    }
    if (current_Graph === "respiration") {
      var categoriesbs = [],
        oldtwo,
        r_value = [],
        resprisationLast = 0;
      var respiration_result =
        this.state.personalinfo &&
        this.state.personalinfo.respiration &&
        this.state.personalinfo.respiration.length > 0 &&
        this.state.personalinfo.respiration.sort(SortByGraphView);
      {
        respiration_result &&
          respiration_result.length > 0 &&
          respiration_result.map((data, index) => {
            if(data.respiration){
              r_value.push({
                y: parseFloat(data.respiration),
              });
              this.setState({resprisationLast : resprisationLast})
              resprisationLast = resprisationLast+1;
              if (
                oldtwo &&
                oldtwo.datetime_on &&
                oldtwo.datetime_on === data.datetime_on &&
                oldtwo.created_at
              ) {
                categoriesbs.push(
                  getTime(data.datetime_on, this.state.time_format)
                );
              } else {
                categoriesbs.push(
                  getDate(data.datetime_on, this.state.date_format)
                );
              }
              oldtwo = data;
            }
          });
          
      }
      options = {
        title: {
          text: respiration,
        },

        yAxis: {
          title: {
            text: respiration,
          },
        },
        xAxis: {
          title: {
            text: date,
          },
          categories: categoriesbs,
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
              radius: 3,
            },
          },
        },
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: respiration,
            data: r_value,
            type: "line",
          },
        ],
      };
    return options
    }
  };

  GetTimess = (start_time) => {
    let da1 = new Date();
    if (start_time) {
      var t1 = start_time.split(":");
    }

    if (t1 && t1.length > 0) {
      da1.setHours(t1[0]);
      da1.setMinutes(t1[1]);
    } else {
      da1.setHours("00");
      da1.setMinutes("00");
    }
    if (this.state.time_format === "12") {
      return moment(da1).format("hh:mm a");
    } else {
      return moment(da1).format("HH:mm");
    }
  };

  getFileName = (file) => {
    if (file && file.filename) {
      if (file.filename.split("Trackrecord/")[1]) {
        if (file.filename.split("Trackrecord/")[1].split("&bucket=")[0]) {
          return file.filename.split("Trackrecord/")[1].split("&bucket=")[0];
        } else {
          return file.filename.split("Trackrecord/")[1];
        }
      } else {
        return file.filename;
      }
    } else return "";
  };

  render() {
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
      open,
      blood_pressure,
      view_all,
      vdo_call,
      office_visit,
      consultancy,
      appointments,
      visibility,
      edit,
      heart_rate,
      VeiwGraph,
      no_data_avlbl,
      add_new_entry,
      weight_bmi,
      blood_sugar,
      Hba1c,
      last_doc_visit,
      upcming_apointment,
      last_document,
      prescriptions,
      sick_cert,
      Change,
      Download,
      respiration
    } = translate;
    var item = this.state.item;
    return (
      <div>
        {this.state.added_data &&
          this.state.added_data.length > 0 &&
          this.state.added_data.map((item, index) => (
            <div key={index}>
              {item === "respiration" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item sxs={6} md={6} className="lstView">
                      <label>{respiration}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.personalinfo &&
                          this.state.personalinfo.respiration &&
                          this.state.personalinfo.respiration.length > 0  && this.state.resprisationLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {/* {console.log('this.state.loggedinUser._id', this.state.loggedinUser, this.state.personalinfo.respiration[
                                      this.state.resprisationLast
                                    ].created_by )} */}
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.personalinfo.respiration[
                                      this.state.resprisationLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.personalinfo.respiration[
                                      this.state.resprisationLast
                                    ].updated_by ||
                                      this.state.personalinfo.respiration[
                                        this.state.resprisationLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.personalinfo
                                              .respiration[
                                                this.state.resprisationLast
                                            ].type,
                                            this.state.personalinfo
                                              .respiration[
                                                this.state.resprisationLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.personalinfo
                                              .respiration[
                                                this.state.resprisationLast
                                            ].type,
                                            this.state.personalinfo
                                              .respiration[
                                                this.state.resprisationLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.personalinfo
                                            .respiration[
                                              this.state.resprisationLast
                                          ].type,
                                          this.state.personalinfo
                                            .respiration[
                                              this.state.resprisationLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.personalinfo.respiration[
                                          this.state.resprisationLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("respiration")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.personalinfo &&
                  this.state.personalinfo.respiration &&
                  this.state.personalinfo.respiration.length > 0 && this.state.resprisationLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                        
                          {this.state.personalinfo &&
                            this.state.personalinfo.respiration &&
                            this.state.personalinfo.respiration[
                              this.state.resprisationLast
                            ] &&
                            this.state.personalinfo.respiration[
                              this.state.resprisationLast
                            ].respiration}
                          <span>/min</span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.personalinfo.respiration[
                              this.state.resprisationLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.personalinfo.respiration[
                                this.state.resprisationLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        {/* <img src={require('assets/images/lineGraph.png')} alt="" title="" /> */}

                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.respiration_data}
                        />
                        <a
                          onClick={() => this.props.OpenGraph("respiration")}
                        >
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("respiration")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "graph_blood_pressure" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item sxs={6} md={6} className="lstView">
                      <label>{blood_pressure}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.personalinfo &&
                          this.state.personalinfo.blood_pressure &&
                          this.state.personalinfo.blood_pressure.length > 0 && this.state.BPLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.personalinfo.blood_pressure[
                                     this.state.BPLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.personalinfo.blood_pressure[
                                      this.state.BPLast
                                    ].updated_by ||
                                      this.state.personalinfo.blood_pressure[
                                        this.state.BPLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.BPLast
                                            ].type,
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.BPLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.BPLast
                                            ].type,
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.BPLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.personalinfo
                                            .blood_pressure[
                                              this.state.BPLast
                                          ].type,
                                          this.state.personalinfo
                                            .blood_pressure[
                                              this.state.BPLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.personalinfo.blood_pressure[
                                          this.state.BPLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("blood_pressure")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.personalinfo &&
                  this.state.personalinfo.blood_pressure &&
                  this.state.personalinfo.blood_pressure.length > 0  && this.state.BPLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.personalinfo &&
                            this.state.personalinfo.blood_pressure &&
                            this.state.personalinfo.blood_pressure[
                              this.state.BPLast
                            ] &&
                            this.state.personalinfo.blood_pressure[
                              this.state.BPLast
                            ].rr_systolic +
                              "/" +
                              this.state.personalinfo.blood_pressure[
                                this.state.BPLast
                              ].rr_diastolic}{" "}
                          <span>mmHg</span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.personalinfo.blood_pressure[
                              this.state.BPLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.personalinfo.blood_pressure[
                                this.state.BPLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        {/* <img src={require('assets/images/lineGraph.png')} alt="" title="" /> */}

                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.blood_pressure}
                        />
                        <a
                          onClick={() => this.props.OpenGraph("blood_pressure")}
                        >
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("blood_pressure")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "graph_weight_bmi" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>{weight_bmi}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.personalinfo &&
                          this.state.personalinfo.weight_bmi &&
                          this.state.personalinfo.weight_bmi.length > 0 && this.state.wiegthLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.personalinfo.weight_bmi[
                                     this.state.wiegthLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.personalinfo.weight_bmi[
                                      this.state.wiegthLast
                                    ].updated_by ||
                                      this.state.personalinfo.weight_bmi[
                                        this.state.wiegthLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.personalinfo.weight_bmi[
                                              this.state.wiegthLast
                                            ].type,
                                            this.state.personalinfo.weight_bmi[
                                              this.state.wiegthLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.personalinfo.weight_bmi[
                                              this.state.wiegthLast
                                            ].type,
                                            this.state.personalinfo.weight_bmi[
                                              this.state.wiegthLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.personalinfo.weight_bmi[
                                            this.state.wiegthLast
                                          ].type,
                                          this.state.personalinfo.weight_bmi[
                                            this.state.wiegthLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.personalinfo.weight_bmi[
                                          this.state.wiegthLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("weight_bmi")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.personalinfo &&
                  this.state.personalinfo.weight_bmi &&
                  this.state.personalinfo.weight_bmi.length > 0 && this.state.wiegthLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.personalinfo &&
                            this.state.personalinfo.weight_bmi &&
                            this.state.personalinfo.weight_bmi[
                              this.state.wiegthLast
                            ] &&
                            (
                              (this.state.personalinfo.weight_bmi[
                                this.state.wiegthLast
                              ].weight /
                                (this.state.personalinfo.weight_bmi[
                                  this.state.wiegthLast
                                ].height *
                                  this.state.personalinfo.weight_bmi[
                                    this.state.wiegthLast
                                  ].height)) *
                              10000
                            ).toFixed(2)}{" "}
                          <span>BMI</span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.personalinfo.weight_bmi[
                              this.state.wiegthLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.personalinfo.weight_bmi[
                                this.state.wiegthLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.weight_bmi}
                        />
                        <a onClick={() => this.props.OpenGraph("weight_bmi")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() => this.props.SelectOption("weight_bmi")}
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
              {item === "graph_heart_rate" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>{heart_rate}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.personalinfo &&
                          this.state.personalinfo.blood_pressure &&
                          this.state.personalinfo.blood_pressure.length > 0  && this.state.HeartLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.personalinfo.blood_pressure[
                                     this.state.HeartLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.personalinfo.blood_pressure[
                                      this.state.HeartLast
                                    ].updated_by ||
                                      this.state.personalinfo.blood_pressure[
                                        this.state.HeartLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.HeartLast
                                            ].type,
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.HeartLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.HeartLast
                                            ].type,
                                            this.state.personalinfo
                                              .blood_pressure[
                                                this.state.HeartLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.personalinfo
                                            .blood_pressure[
                                              this.state.HeartLast
                                          ].type,
                                          this.state.personalinfo
                                            .blood_pressure[
                                              this.state.HeartLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.personalinfo.blood_pressure[
                                          this.state.HeartLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("heart_rate")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.personalinfo &&
                  this.state.personalinfo.blood_pressure &&
                  this.state.personalinfo.blood_pressure.length > 0 && this.state.HeartLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.personalinfo &&
                            this.state.personalinfo.blood_pressure &&
                            this.state.personalinfo.blood_pressure[
                              this.state.HeartLast
                            ] &&
                            this.state.personalinfo.blood_pressure[
                              this.state.HeartLast
                            ].heart_frequncy}{" "}
                          <span>b/min</span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.personalinfo.blood_pressure[
                              this.state.HeartLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.personalinfo.blood_pressure[
                                this.state.HeartLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.heart_rate}
                        />
                        <a onClick={() => this.props.OpenGraph("heart_rate")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("blood_pressure")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
              {item === "potassium" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {" "}
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Potassium",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Potassium &&
                          this.state.Potassium.length > 0 && this.state.potassiumLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.Potassium[
                                       this.state.potassiumLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.Potassium[
                                      this.state.potassiumLast
                                    ].updated_by ||
                                      this.state.Potassium[
                                        this.state.potassiumLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.Potassium[
                                              this.state.potassiumLast
                                            ].type,
                                            this.state.Potassium[
                                              this.state.potassiumLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.Potassium[
                                              this.state.potassiumLast
                                            ].type,
                                            this.state.Potassium[
                                              this.state.potassiumLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Potassium[
                                            this.state.potassiumLast
                                          ].type,
                                          this.state.Potassium[
                                            this.state.potassiumLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.Potassium[
                                          this.state.potassiumLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("potassium")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Potassium && this.state.Potassium.length > 0 && this.state.potassiumLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Potassium &&
                            this.state.Potassium[
                              this.state.potassiumLast
                            ] &&
                            this.state.Potassium[
                              this.state.potassiumLast
                            ].value}{" "}
                          <span>
                            {this.state.Potassium[
                               this.state.potassiumLast
                            ].unit &&
                              this.state.Potassium[
                                this.state.potassiumLast
                              ].unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Potassium[
                              this.state.potassiumLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Potassium[
                                this.state.potassiumLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.potassium1}
                        />
                        <a onClick={() => this.props.OpenGraph("potassium")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "creatnine" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Creatinine",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Creatinine &&
                          this.state.Creatinine.length > 0 && this.state.LRLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.Creatinine[
                                      this.state.LRLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.Creatinine[
                                      this.state.LRLast
                                    ].updated_by ||
                                      this.state.Creatinine[
                                        this.state.LRLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.Creatinine[
                                              this.state.LRLast
                                            ].type,
                                            this.state.Creatinine[
                                              this.state.LRLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.Creatinine[
                                              this.state.LRLast
                                            ].type,
                                            this.state.Creatinine[
                                              this.state.LRLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Creatinine[
                                            this.state.LRLast
                                          ].type,
                                          this.state.Creatinine[
                                            this.state.LRLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.Creatinine[
                                          this.state.LRLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("laboratory_result")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Creatinine && this.state.Creatinine.length > 0 && this.state.LRLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Creatinine &&
                            this.state.Creatinine[
                              this.state.LRLast
                            ] &&
                            this.state.Creatinine[
                              this.state.LRLast
                            ].value}{" "}
                          <span>
                            {this.state.Creatinine[
                              this.state.LRLast
                            ].unit &&
                              this.state.Creatinine[
                                this.state.LRLast
                              ].unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Creatinine[
                              this.state.LRLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Creatinine[
                                this.state.LRLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.laboratory_result}
                        />
                        <a
                          onClick={() =>
                            this.props.OpenGraph("laboratory_result")
                          }
                        >
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "hemoglobine" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Hemoglobine",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Hemoglobine &&
                          this.state.Hemoglobine.length > 0 && this.state.hemoglobineLast !==-1 &&  (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.Hemoglobine[
                                      this.state.hemoglobineLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.Hemoglobine[
                                      this.state.hemoglobineLast
                                    ].updated_by ||
                                      this.state.Hemoglobine[
                                        this.state.hemoglobineLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.Hemoglobine[
                                              this.state.hemoglobineLast
                                            ].type,
                                            this.state.Hemoglobine[
                                              this.state.hemoglobineLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.Hemoglobine[
                                              this.state.hemoglobineLast
                                            ].type,
                                            this.state.Hemoglobine[
                                              this.state.hemoglobineLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Hemoglobine[
                                            this.state.hemoglobineLast
                                          ].type,
                                          this.state.Hemoglobine[
                                            this.state.hemoglobineLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.Hemoglobine[
                                          this.state.hemoglobineLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("Hemoglobine")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Hemoglobine &&
                  this.state.Hemoglobine.length > 0 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Hemoglobine &&
                            this.state.Hemoglobine[
                              this.state.hemoglobineLast
                            ] &&
                            this.state.Hemoglobine[
                              this.state.hemoglobineLast
                            ].value}{" "}
                          <span>
                            {this.state.Hemoglobine[
                               this.state.hemoglobineLast
                            ].unit &&
                              this.state.Hemoglobine[
                                this.state.hemoglobineLast
                              ].unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Hemoglobine[
                              this.state.hemoglobineLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Hemoglobine[
                                this.state.hemoglobineLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.hemoglobine1}
                        />
                        <a onClick={() => this.props.OpenGraph("hemoglobine")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "leucocytes" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Leucocytes",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Leucocytes &&
                          this.state.Leucocytes.length > 0 && this.state.leucocytesLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.Leucocytes[
                                      this.state.leucocytesLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.Leucocytes[
                                      this.state.leucocytesLast
                                    ].updated_by ||
                                      this.state.Leucocytes[
                                        this.state.leucocytesLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.Leucocytes[
                                              this.state.leucocytesLast
                                            ].type,
                                            this.state.Leucocytes[
                                              this.state.leucocytesLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.Leucocytes[
                                              this.state.leucocytesLast
                                            ].type,
                                            this.state.Leucocytes[
                                              this.state.leucocytesLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Leucocytes[
                                            this.state.leucocytesLast
                                          ].type,
                                          this.state.Leucocytes[
                                            this.state.leucocytesLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.Leucocytes[
                                          this.state.leucocytesLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("Leucocytes")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Leucocytes && this.state.Leucocytes.length > 0 && this.state.leucocytesLast !==-1? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Leucocytes &&
                            this.state.Leucocytes[
                              this.state.leucocytesLast
                            ] &&
                            this.state.Leucocytes[
                              this.state.leucocytesLast
                            ].value}{" "}
                          <span>
                            {this.state.Leucocytes[
                              this.state.leucocytesLast
                            ].unit &&
                              this.state.Leucocytes[
                                this.state.leucocytesLast
                              ].unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Leucocytes[
                              this.state.leucocytesLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Leucocytes[
                                this.state.leucocytesLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.leucocytes1}
                        />
                        <a onClick={() => this.props.OpenGraph("leucocytes")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "pancreaticlipase" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {" "}
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Pancreaticlipase",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Pancreaticlipase &&
                          this.state.Pancreaticlipase.length > 0 && this.state.pancreaticlipaseLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.Pancreaticlipase[
                                      this.state.pancreaticlipaseLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.Pancreaticlipase[
                                      this.state.pancreaticlipaseLast
                                    ].updated_by ||
                                      this.state.Pancreaticlipase[
                                        this.state.pancreaticlipaseLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.Pancreaticlipase[
                                              this.state.pancreaticlipaseLast
                                            ].type,
                                            this.state.Pancreaticlipase[
                                              this.state.pancreaticlipaseLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.Pancreaticlipase[
                                              this.state.pancreaticlipaseLast
                                            ].type,
                                            this.state.Pancreaticlipase[
                                              this.state.pancreaticlipaseLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Pancreaticlipase[
                                            this.state.pancreaticlipaseLast
                                          ].type,
                                          this.state.Pancreaticlipase[
                                            this.state.pancreaticlipaseLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.Pancreaticlipase[
                                          this.state.pancreaticlipaseLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("Pancreaticlipase")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Pancreaticlipase &&
                  this.state.Pancreaticlipase.length > 0 && this.state.pancreaticlipaseLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Pancreaticlipase &&
                            this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ] &&
                            this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ].value}{" "}
                          <span>
                            {this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ].unit &&
                              this.state.Pancreaticlipase[
                                this.state.pancreaticlipaseLast
                              ].unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Pancreaticlipase[
                                this.state.pancreaticlipaseLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.pancreaticlipase1}
                        />
                        <a
                          onClick={() =>
                            this.props.OpenGraph("pancreaticlipase")
                          }
                        >
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "thrombocytes" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Thrombocytes",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Thrombocytes &&
                          this.state.Thrombocytes.length > 0 &&  this.state.thrombocytesLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.Thrombocytes[
                                      this.state.thrombocytesLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.Thrombocytes[
                                      this.state.thrombocytesLast
                                    ].updated_by ||
                                      this.state.Thrombocytes[
                                        this.state.thrombocytesLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.Thrombocytes[
                                              this.state.thrombocytesLast
                                            ].type,
                                            this.state.Thrombocytes[
                                              this.state.thrombocytesLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.Thrombocytes[
                                              this.state.thrombocytesLast
                                            ].type,
                                            this.state.Thrombocytes[
                                              this.state.thrombocytesLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Thrombocytes[
                                            this.state.thrombocytesLast
                                          ].type,
                                          this.state.Thrombocytes[
                                            this.state.thrombocytesLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.Thrombocytes[
                                          this.state.thrombocytesLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  {" "}
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("Pancreaticlipase")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Thrombocytes &&
                  this.state.Thrombocytes.length > 0 &&  this.state.thrombocytesLast !==-1  ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Thrombocytes &&
                            this.state.Thrombocytes[
                              this.state.thrombocytesLast
                            ] &&
                            this.state.Thrombocytes[
                              this.state.thrombocytesLast
                            ].value}{" "}
                          <span>
                            {this.state.Thrombocytes[
                              this.state.thrombocytesLast
                            ].unit &&
                              this.state.Thrombocytes[
                                this.state.thrombocytesLast
                              ].unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Thrombocytes[
                              this.state.thrombocytesLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Thrombocytes[
                                this.state.thrombocytesLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.thrombocytes1}
                        />
                        <a onClick={() => this.props.OpenGraph("thrombocytes")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "sodium" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Sodium",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.Sodium && this.state.Sodium.length > 0 && this.state.sodiumLast!==-1 &&  (
                          <a className="openScndhrf1">
                            <a className="vsblDots">
                              <img
                                src={require("assets/images/nav-more.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                            <ul>
                              {this.props.from === "patient" && (
                                <li>
                                  {this.state.Sodium[
                                    this.state.sodiumLast
                                  ].created_by ===
                                    this.state.loggedinUser._id &&
                                  (!this.state.Sodium[
                                    this.state.sodiumLast
                                  ].updated_by ||
                                    this.state.Sodium[
                                      this.state.sodiumLast
                                    ].updated_by === "") ? (
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.Sodium[
                                            this.state.sodiumLast
                                          ].type,
                                          this.state.Sodium[
                                            this.state.sodiumLast
                                          ]
                                        )
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
                                        this.props.EidtOption(
                                          this.state.Sodium[
                                            this.state.sodiumLast
                                          ].type,
                                          this.state.Sodium[
                                            this.state.sodiumLast
                                          ],
                                          true
                                        )
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
                              {this.props.from !== "patient" && (
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.EidtOption(
                                        this.state.Sodium[
                                          this.state.sodiumLast
                                        ].type,
                                        this.state.Sodium[
                                          this.state.sodiumLast
                                        ]
                                      )
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
                                <a
                                  onClick={() =>
                                    this.props.downloadTrack(
                                      this.state.Sodium[
                                        this.state.sodiumLast
                                      ]
                                    )
                                  }
                                >
                                  <img
                                    src={require("assets/images/download.svg")}
                                    alt=""
                                    title=""
                                  />
                                  {Download}
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a
                                  onClick={() => this.props.OpenGraph("Sodium")}
                                >
                                  <img
                                    src={require("assets/images/eye2.png")}
                                    alt=""
                                    title=""
                                  />
                                  {VeiwGraph}
                                </a>
                              </li>
                            </ul>
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.Sodium && this.state.Sodium.length > 0 && this.state.sodiumLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.Sodium &&
                            this.state.Sodium[this.state.sodiumLast] &&
                            this.state.Sodium[this.state.sodiumLast]
                              .value}{" "}
                          <span>
                            {this.state.Sodium[this.state.sodiumLast]
                              .unit &&
                              this.state.Sodium[this.state.sodiumLast]
                                .unit.label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.Sodium[this.state.sodiumLast]
                              .datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.Sodium[
                                this.state.sodiumLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.sodium1}
                        />
                        <a onClick={() => this.props.OpenGraph("sodium")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "ggt" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "GGT",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.GGT && this.state.GGT.length > 0 && this.state.ggtLast !==-1 && (
                          <a className="openScndhrf1">
                            <a className="vsblDots">
                              <img
                                src={require("assets/images/nav-more.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                            <ul>
                              {this.props.from === "patient" && (
                                <li>
                                  {this.state.GGT[this.state.ggtLast]
                                    .created_by ===
                                    this.state.loggedinUser._id &&
                                  (!this.state.GGT[this.state.ggtLast]
                                    .updated_by ||
                                    this.state.GGT[this.state.ggtLast]
                                      .updated_by === "") ? (
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.GGT[
                                            this.state.ggtLast
                                          ].type,
                                          this.state.GGT[
                                            this.state.ggtLast
                                          ]
                                        )
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
                                        this.props.EidtOption(
                                          this.state.GGT[
                                            this.state.ggtLast
                                          ].type,
                                          this.state.GGT[
                                            this.state.ggtLast
                                          ],
                                          true
                                        )
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
                              {this.props.from !== "patient" && (
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.EidtOption(
                                        this.state.GGT[
                                          this.state.ggtLast
                                        ].type,
                                        this.state.GGT[
                                          this.state.ggtLast
                                        ]
                                      )
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
                                <a
                                  onClick={() =>
                                    this.props.downloadTrack(
                                      this.state.GGT[this.state.ggtLast]
                                    )
                                  }
                                >
                                  <img
                                    src={require("assets/images/download.svg")}
                                    alt=""
                                    title=""
                                  />
                                  {Download}
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a onClick={() => this.props.OpenGraph("GGT")}>
                                  <img
                                    src={require("assets/images/eye2.png")}
                                    alt=""
                                    title=""
                                  />
                                  {VeiwGraph}
                                </a>
                              </li>
                            </ul>
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.GGT && this.state.GGT.length > 0 && this.state.ggtLast !==-1  ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.GGT &&
                            this.state.GGT[this.state.ggtLast] &&
                            this.state.GGT[this.state.ggtLast]
                              .value}{" "}
                          <span>
                            {this.state.GGT[this.state.ggtLast].unit &&
                              this.state.GGT[this.state.ggtLast].unit
                                .label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.GGT[this.state.ggtLast]
                              .datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.GGT[
                                this.state.ggtLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.ggt1}
                        />
                        <a onClick={() => this.props.OpenGraph("ggt")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
              {item === "ast/got" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "AST/GOT",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.AST && this.state.AST.length > 0 &&  this.state.astLast !==-1  && (
                          <a className="openScndhrf1">
                            <a className="vsblDots">
                              <img
                                src={require("assets/images/nav-more.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                            <ul>
                              {this.props.from === "patient" && (
                                <li>
                                  {this.state.AST[this.state.astLast]
                                    .created_by ===
                                    this.state.loggedinUser._id &&
                                  (!this.state.AST[this.state.astLast]
                                    .updated_by ||
                                    this.state.AST[this.state.astLast]
                                      .updated_by === "") ? (
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.AST[
                                            this.state.astLast
                                          ].type,
                                          this.state.AST[
                                            this.state.astLast
                                          ]
                                        )
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
                                        this.props.EidtOption(
                                          this.state.AST[
                                            this.state.astLast
                                          ].type,
                                          this.state.AST[
                                            this.state.astLast
                                          ],
                                          true
                                        )
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
                              {this.props.from !== "patient" && (
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.EidtOption(
                                        this.state.AST[
                                          this.state.astLast
                                        ].type,
                                        this.state.AST[
                                          this.state.astLast
                                        ]
                                      )
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
                                <a
                                  onClick={() =>
                                    this.props.downloadTrack(
                                      this.state.AST[this.state.astLast]
                                    )
                                  }
                                >
                                  <img
                                    src={require("assets/images/download.svg")}
                                    alt=""
                                    title=""
                                  />
                                  {Download}
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a onClick={() => this.props.OpenGraph("AST")}>
                                  <img
                                    src={require("assets/images/eye2.png")}
                                    alt=""
                                    title=""
                                  />
                                  {VeiwGraph}
                                </a>
                              </li>
                            </ul>
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.AST && this.state.AST.length > 0 &&  this.state.astLast !==-1  ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.AST &&
                            this.state.AST[this.state.astLast] &&
                            this.state.AST[this.state.astLast]
                              .value}{" "}
                          <span>
                            {this.state.AST[this.state.astLast].unit &&
                              this.state.AST[this.state.astLast].unit
                                .label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.AST[this.state.astLast]
                              .datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.AST[
                                this.state.astLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.ast1}
                        />
                        <a onClick={() => this.props.OpenGraph("ast/got")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "alt/gpt" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "ALT/GPT",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.ALT && this.state.ALT.length > 0 && this.state.altLast !== -1 && (
                          <a className="openScndhrf1">
                            <a className="vsblDots">
                              <img
                                src={require("assets/images/nav-more.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                            <ul>
                              {this.props.from === "patient" && (
                                <li>
                                  {this.state.ALT[this.state.altLast]
                                    .created_by ===
                                    this.state.loggedinUser._id &&
                                  (!this.state.ALT[this.state.altLast]
                                    .updated_by ||
                                    this.state.ALT[this.state.altLast]
                                      .updated_by === "") ? (
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.ALT[
                                            this.state.altLast
                                          ].type,
                                          this.state.ALT[
                                            this.state.altLast
                                          ]
                                        )
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
                                        this.props.EidtOption(
                                          this.state.ALT[
                                            this.state.altLast
                                          ].type,
                                          this.state.ALT[
                                            this.state.altLast
                                          ],
                                          true
                                        )
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
                              {this.props.from !== "patient" && (
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.EidtOption(
                                        this.state.ALT[
                                          this.state.altLast
                                        ].type,
                                        this.state.ALT[
                                          this.state.altLast
                                        ]
                                      )
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
                                <a
                                  onClick={() =>
                                    this.props.downloadTrack(
                                      this.state.ALT[this.state.altLast]
                                    )
                                  }
                                >
                                  <img
                                    src={require("assets/images/download.svg")}
                                    alt=""
                                    title=""
                                  />
                                  {Download}
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a onClick={() => this.props.OpenGraph("ALT")}>
                                  <img
                                    src={require("assets/images/eye2.png")}
                                    alt=""
                                    title=""
                                  />
                                  {VeiwGraph}
                                </a>
                              </li>
                            </ul>
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.ALT && this.state.ALT.length > 0 && this.state.altLast !== -1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.ALT &&
                            this.state.ALT[this.state.altLast] &&
                            this.state.ALT[this.state.altLast]
                              .value}{" "}
                          <span>
                            {this.state.ALT[this.state.altLast].unit &&
                              this.state.ALT[this.state.altLast].unit
                                .label}
                          </span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.ALT[this.state.altLast]
                              .datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.ALT[
                                this.state.altLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.alt1}
                        />
                        <a onClick={() => this.props.OpenGraph("alt/gpt")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("laboratory_result")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}

              {item === "graph_blood_sugar" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>{blood_sugar}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.personalinfo &&
                          this.state.personalinfo.blood_sugar &&
                          this.state.personalinfo.blood_sugar.length > 0 && this.state.BSLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.personalinfo.blood_sugar[
                                     this.state.BSLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.personalinfo.blood_sugar[
                                      this.state.BSLast
                                    ].updated_by ||
                                      this.state.personalinfo.blood_sugar[
                                        this.state.BSLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.personalinfo.blood_sugar[
                                              this.state.BSLast
                                            ].type,
                                            this.state.personalinfo.blood_sugar[
                                              this.state.BSLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.personalinfo.blood_sugar[
                                              this.state.BSLast
                                            ].type,
                                            this.state.personalinfo.blood_sugar[
                                              this.state.BSLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.personalinfo.blood_sugar[
                                            this.state.BSLast
                                          ].type,
                                          this.state.personalinfo.blood_sugar[
                                            this.state.BSLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.personalinfo.blood_sugar[
                                          this.state.BSLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("blood_sugar")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.personalinfo &&
                  this.state.personalinfo.blood_sugar &&
                  this.state.personalinfo.blood_sugar.length > 0  && this.state.BSLast !==-1  ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          {this.state.personalinfo &&
                            this.state.personalinfo.blood_sugar &&
                            this.state.personalinfo.blood_sugar[
                              this.state.BSLast
                            ] &&
                            this.state.personalinfo.blood_sugar[
                              this.state.BSLast
                            ].blood_sugar}{" "}
                          <span>mg/dl</span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.personalinfo.blood_sugar[
                              this.state.BSLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.personalinfo.blood_sugar[
                                this.state.BSLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.blood_sugar}
                        />
                        <a onClick={() => this.props.OpenGraph("blood_sugar")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() => this.props.SelectOption("blood_sugar")}
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
                {item === "graph_HbA1c" && (
                <Grid className="persBlodMesur">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} className="lstView">
                      <label>{Hba1c}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="persBlodImg scndOptionIner1">
                        {this.state.personalinfo &&
                          this.state.personalinfo.blood_sugar &&
                          this.state.personalinfo.blood_sugar.length > 0 && this.state.hbLast !==-1 && (
                            <a className="openScndhrf1">
                              <a className="vsblDots">
                                <img
                                  src={require("assets/images/nav-more.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <ul>
                                {this.props.from === "patient" && (
                                  <li>
                                    {this.state.personalinfo.blood_sugar[
                                      this.state.hbLast
                                    ].created_by ===
                                      this.state.loggedinUser._id &&
                                    (!this.state.personalinfo.blood_sugar[
                                      this.state.hbLast
                                    ].updated_by ||
                                      this.state.personalinfo.blood_sugar[
                                        this.state.hbLast
                                      ].updated_by === "") ? (
                                      <a
                                        onClick={() =>
                                          this.props.EidtOption(
                                            this.state.personalinfo.blood_sugar[
                                              this.state.hbLast
                                            ].type,
                                            this.state.personalinfo.blood_sugar[
                                              this.state.hbLast
                                            ]
                                          )
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
                                          this.props.EidtOption(
                                            this.state.personalinfo.blood_sugar[
                                              this.state.hbLast
                                            ].type,
                                            this.state.personalinfo.blood_sugar[
                                              this.state.hbLast
                                            ],
                                            true
                                          )
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
                                {this.props.from !== "patient" && (
                                  <li>
                                    <a
                                      onClick={() =>
                                        this.props.EidtOption(
                                          this.state.personalinfo.blood_sugar[
                                            this.state.hbLast
                                          ].type,
                                          this.state.personalinfo.blood_sugar[
                                            this.state.hbLast
                                          ]
                                        )
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
                                  <a
                                    onClick={() =>
                                      this.props.downloadTrack(
                                        this.state.personalinfo.blood_sugar[
                                          this.state.hbLast
                                        ]
                                      )
                                    }
                                  >
                                    <img
                                      src={require("assets/images/download.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Download}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.props.OpenGraph("blood_sugar")
                                    }
                                  >
                                    <img
                                      src={require("assets/images/eye2.png")}
                                      alt=""
                                      title=""
                                    />
                                    {VeiwGraph}
                                  </a>
                                </li>
                              </ul>
                            </a>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.personalinfo &&
                  this.state.personalinfo.blood_sugar &&
                  this.state.personalinfo.blood_sugar.length > 0 && this.state.hbLast !==-1 ? (
                    <div>
                      <Grid className="presureData">
                        <h3>
                          
                          {this.state.personalinfo &&
                            this.state.personalinfo.blood_sugar &&
                            this.state.personalinfo.blood_sugar[
                              this.state.hbLast
                            ] &&
                            this.state.personalinfo.blood_sugar[
                              this.state.hbLast
                            ].Hba1c}{" "}
                          <span>%</span>
                        </h3>
                        <p>
                          {getDate(
                            this.state.personalinfo.blood_sugar[
                              this.state.hbLast
                            ].datetime_on,
                            this.state.date_format
                          )}
                          ,{" "}
                          {getTime(
                            new Date(
                              this.state.personalinfo.blood_sugar[
                                this.state.hbLast
                              ].datetime_on
                            ),
                            this.state.time_foramt
                          )}
                        </p>
                      </Grid>
                      <Grid className="presureDataGrph">
                        <HighchartsReact
                          constructorType={"chart"}
                          ref={this.chartComponent}
                          highcharts={Highcharts}
                          options={this.state.hba_data}
                        />
                        <a onClick={() => this.props.OpenGraph("hba")}>
                          {VeiwGraph}
                        </a>
                      </Grid>
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() => this.props.SelectOption("blood_sugar")}
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
              {item === "last_doctor_visit" && (
                <Grid className="drVisit">
                  <h3>{last_doc_visit}</h3>
                  {this.state.personalinfo &&
                  this.state.personalinfo.last_dv &&
                  this.state.personalinfo.last_dv.length > 0 ? (
                    <div>
                      {this.state.personalinfo.last_dv.map((data, index) => (
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={2} md={2}>
                            <Grid className="drVisitImg">
                              <img
                                src={
                                  data && data.image
                                    ? getImage(data.image, this.state.images)
                                    : require("assets/images/dr1.jpg")
                                }
                                alt=""
                                title=""
                              />
                              {/* <img src={require('assets/images/dr1.jpg')} alt="" title="" /> */}
                            </Grid>
                          </Grid>
                          <Grid item xs={10} md={10}>
                            <Grid className="drVisitData">
                              <label>{data.doctor_name}</label>
                              <p>
                                {getDate(
                                  data.datetime_on,
                                  this.state.date_format
                                )}
                                ,{" "}
                                {getTime(
                                  new Date(data.datetime_on),
                                  this.state.time_foramt
                                )}
                              </p>
                            </Grid>
                          </Grid>
                          <Grid className="clear"></Grid>
                        </Grid>
                      ))}
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3
                          onClick={() =>
                            this.props.SelectOption("doctor_visit")
                          }
                        >
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
              {item === "upcomming_appointments" && (
                <Grid className="comeAppoint">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={10} md={10}>
                      <Grid className="upcomView">
                        <label>{upcming_apointment}</label>{" "}
                        {this.props.from === "patient" && (
                          <a onClick={this.props.MoveAppoint}>{view_all}</a>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      {/* <Grid className="allViewDots scndOptionIner1">
                                        <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {item.created_by === this.state.loggedinUser._id && ( !item.updated_by || item.updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(item)}><img src={require('assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                          
                                        </ul>
                                    </a>
                                    </Grid> */}
                    </Grid>
                    <Grid className="clear"></Grid>
                  </Grid>

                  {this.state.upcoming_appointment &&
                  this.state.upcoming_appointment.length > 0 ? (
                    <div>
                      {this.state.upcoming_appointment.map((data, index) => (
                        <div>
                          <Grid className="oficVisit">
                            <label>
                              {getDate(data.date, this.state.date_format)},{" "}
                              {data.start_time &&
                                this.GetTimess(data.start_time)}
                            </label>

                            {data.appointment_type === "appointments" && (
                              <a>
                                <img
                                  src={require("assets/images/office-visit.svg")}
                                  alt=""
                                  title=""
                                />{" "}
                                {data.custom_text ? data.custom_text : office_visit}
                              </a>
                            )}
                            {data.appointment_type === "online_appointment" && (
                              <a>
                                <img
                                  src={require("assets/images/video-call.svg")}
                                  alt=""
                                  title=""
                                />
                                {vdo_call}
                              </a>
                            )}
                            {data.appointment_type === "practice_days" && (
                              <a>
                                <img
                                  src={require("assets/images/cal.png")}
                                  alt=""
                                  title=""
                                />
                                {consultancy} {appointments}
                              </a>
                            )}
                          </Grid>
                          <Grid className="neuroSection">
                            <h3>
                              {data.docProfile &&
                                data.docProfile.speciality &&
                                getSpec(
                                  data.docProfile.speciality,
                                  this.props.stateLanguageType
                                )}
                            </h3>
                            <p>
                              {data.docProfile &&
                                data.docProfile.subspeciality &&
                                getSpec(
                                  data.docProfile.subspeciality,
                                  this.props.stateLanguageType
                                )}
                            </p>
                            <Grid>
                              <a>
                                <img
                                  src={this.state.doc_image}
                                  alt=""
                                  title=""
                                />
                                {data.docProfile &&
                                  data.docProfile.first_name &&
                                  data.docProfile.first_name}{" "}
                                {data.docProfile &&
                                  data.docProfile.last_name &&
                                  data.docProfile.last_name}{" "}
                                (Doctor)
                              </a>
                            </Grid>
                            {/* <Grid><a><img src={require('assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid> */}
                          </Grid>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Grid className="noBpData">
                      <p>{no_data_avlbl}</p>
                      {this.props.from === "patient" && (
                        <h3 onClick={() => this.props.MoveAppoint()}>
                          + {add_new_entry}
                        </h3>
                      )}
                    </Grid>
                  )}
                </Grid>
              )}
              {item === "last_documents" && (
                <Grid className="lstDocs">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={10} md={10}>
                      <Grid className="lstView">
                        <label>{last_document}</label>{" "}
                        {this.props.from === "patient" && (
                          <a onClick={() => this.props.MoveDocument()}>
                            {view_all}
                          </a>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      {/* <Grid className="lstViewDots scndOptionIner1">
                                    <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {item.created_by === this.state.loggedinUser._id && ( !item.updated_by || item.updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(item)}><img src={require('assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                          
                                        </ul>
                                    </a>
                                    </Grid> */}
                    </Grid>
                    <Grid className="clear"></Grid>
                  </Grid>
                  <Grid className="presSec">
                    <a className="presSecAncr">
                      <h4>{prescriptions}</h4>
                      {this.state.personalinfo &&
                      this.state.personalinfo.prescriptions &&
                      this.state.personalinfo.prescriptions.length > 0 ? (
                        <div>
                          {this.state.personalinfo.prescriptions.map((itm) => (
                            <div className="metroDoctor">
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className="metroPro"
                              >
                                <Grid item xs={9} md={9}>
                                  {itm.attachfile &&
                                    itm.attachfile.length > 0 &&
                                    itm.attachfile[0] &&
                                    this.getFileName(itm.attachfile[0])}
                                </Grid>
                                <Grid
                                  item
                                  xs={3}
                                  md={3}
                                  className="metroPrOpen"
                                >
                                  {itm.attachfile &&
                                    itm.attachfile.length > 0 &&
                                    itm.attachfile[0] &&
                                    itm.attachfile[0].filename && (
                                      <a
                                        onClick={() =>
                                          GetUrlImage(
                                            itm.attachfile[0].filename
                                          )
                                        }
                                      >
                                        {open}
                                      </a>
                                    )}
                                </Grid>
                                <Grid className="clear"></Grid>
                              </Grid>
                              <Grid>
                                {/* <a><img src={require('assets/images/dr1.jpg')} alt="" title="" /> </a> */}
                              </Grid>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Grid className="noBpData">
                          <p>{no_data_avlbl}</p>
                          {this.props.from === "patient" && (
                            <h3 onClick={() => this.props.MoveDocument()}>
                              +{add_new_entry}
                            </h3>
                          )}
                        </Grid>
                      )}
                    </a>

                    <a className="presSecAncr">
                      <h4>{sick_cert}</h4>
                      {this.state.personalinfo &&
                      this.state.personalinfo.sick_certificates &&
                      this.state.personalinfo.sick_certificates.length > 0 ? (
                        <div>
                          {this.state.personalinfo.sick_certificates.map(
                            (itm) => (
                              <div className="metroDoctor">
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                  className="metroPro"
                                >
                                  <Grid item xs={9} md={9}>
                                    {itm.attachfile &&
                                      itm.attachfile.length > 0 &&
                                      itm.attachfile[0] &&
                                      this.getFileName(itm.attachfile[0])}
                                  </Grid>
                                  <Grid
                                    item
                                    xs={3}
                                    md={3}
                                    className="metroPrOpen"
                                  >
                                    {itm.attachfile &&
                                      itm.attachfile.length > 0 &&
                                      itm.attachfile[0] &&
                                      itm.attachfile[0].filename && (
                                        <a
                                          onClick={() =>
                                            GetUrlImage(
                                              itm.attachfile[0].filename
                                            )
                                          }
                                        >
                                          {open}
                                        </a>
                                      )}
                                  </Grid>
                                  <Grid className="clear"></Grid>
                                </Grid>
                                <Grid>
                                  {/* <a><img src={require('assets/images/dr1.jpg')} alt="" title="" /> </a> */}
                                </Grid>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <Grid className="noBpData">
                          <p>{no_data_avlbl}</p>
                          {this.props.from === "patient" && (
                            <h3 onClick={() => this.props.MoveDocument()}>
                              + {add_new_entry}
                            </h3>
                          )}
                        </Grid>
                      )}
                    </a>
                  </Grid>
                </Grid>
              )}
            </div>
          ))}
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
const FinalExport = withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(RightManage)
);
export default pure(FinalExport);
