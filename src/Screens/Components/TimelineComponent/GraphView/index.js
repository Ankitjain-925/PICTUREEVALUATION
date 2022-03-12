import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getDate,
  getTime,
  SortByGraphView,
} from "Screens/Components/BasicMethod";
import GraphSec from "./../GraphSec/index";
import HC_more from "highcharts/highcharts-more"; //module3
// Import Highcharts
import Highcharts from "highcharts/highstock";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import AllL_Ps from "Screens/Components/Parameters/parameter.js";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
HC_more(Highcharts); //init module

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalinfo: this.props.personalinfo,
      added_data: this.props.added_data,
      time_format: this.props.time_format,
      date_format: this.props.date_format,
      current_Graph: this.props.current_Graph,
      options: false,
      resprisationLast : -1,
      HeartLast : -1,
      BPLast: -1,
      BSLast : -1, 
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

  componentDidMount() {
    this.setOptions(this.props.current_Graph);
  }
  //On change the User Data

  componentDidUpdate = (prevProps) => {
    if (prevProps.personalinfo !== this.props.personalinfo) {
      this.setState({ personalinfo: this.props.personalinfo });
    }
    if (prevProps.current_Graph !== this.props.current_Graph) {
      this.OnGraphChange(this.props.current_Graph);
    }
  };
  //On Graph Change
  OnGraphChange = (current_Graph) => {
    this.setState({ current_Graph: current_Graph });

    this.setOptions(current_Graph);
  };

  //Set options for the graph
  setOptions = (current_Graph) => {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      blood_pressure,
      heart_frequency,
      blood_sugar,
      RR_diastolic,
      rr_systolic,
      weight_bmi,
      weight,
      Hba1c,
      height,
      date,
      upr_limit,
      lwr_limit,
      BMI,
      value,
      frequency,
      respiration,
    } = translate;

    var Creatinine1 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Creatinine"
      );
    var Potassium =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Potassium"
      );
    var Hemoglobine =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Hemoglobine"
      );
    var Leucocytes =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Leucocytes"
      );
    var Pancreaticlipase =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Pancreaticlipase"
      );
    var Thrombocytes =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Thrombocytes"
      );
    var Sodium =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "Sodium"
      );
    var GGT =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "GGT"
      );
    var AST =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "AST/GOT"
      );
    var ALT =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.filter(
        (value, key) => value?.lab_parameter?.value === "ALT/GPT"
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
    
    var BPLast = 0,
    HeartLast = 0;
  var blood_pressure5 =
    this.state.personalinfo &&
    this.state.personalinfo?.blood_pressure &&
    this.state.personalinfo?.blood_pressure?.length > 0 &&
    this.state.personalinfo?.blood_pressure.sort(SortByGraphView);
  blood_pressure5 &&
    blood_pressure5?.length > 0 &&
    blood_pressure5.map((data, index) => {
      if(data.rr_diastolic || data.rr_systolic)
      {
        this.setState({BPLast: BPLast})
        BPLast = BPLast+1;
      }
      if(data.heart_frequncy){
        this.setState({HeartLast: HeartLast})
        HeartLast = HeartLast+1;
       
      }
  });

  var laboratory_result5 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData1 =
  laboratory_result5 &&
  laboratory_result5?.length > 0 &&
  laboratory_result5.filter(
    (value, key) =>
      value.lab_parameter && value?.lab_parameter?.value === "Creatinine"
  );
var LRLast =0;
  myFilterData1 &&
    myFilterData1?.length > 0 &&
    myFilterData1.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({LRLast: LRLast})
        LRLast = LRLast+1;
      
      } 
    });


  var laboratory_result6 =
    this.state.personalinfo &&
    this.state.personalinfo?.laboratory_result &&
    this.state.personalinfo?.laboratory_result?.length > 0 &&
    this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
  var myFilterData2 =
    laboratory_result6 &&
    laboratory_result6?.length > 0 &&
    laboratory_result6.filter(
      (value, key) =>
        value.lab_parameter && value?.lab_parameter?.value === "Potassium"
    );
  var potassiumLast = 0;
  
    myFilterData2 &&
      myFilterData2?.length > 0 &&
      myFilterData2.map((data, index) => {
        if(data.upper_limit || data.lower_limit || data.value)
        {
          this.setState({potassiumLast : potassiumLast})
          potassiumLast = potassiumLast+1;
        }
     
      });
  
  


  var laboratory_result7 =
    this.state.personalinfo &&
    this.state.personalinfo?.laboratory_result &&
    this.state.personalinfo?.laboratory_result?.length > 0 &&
    this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
  var myFilterData3 =
    laboratory_result7 &&
    laboratory_result7?.length > 0 &&
    laboratory_result7.filter(
      (value, key) =>
        value.lab_parameter && value?.lab_parameter?.value === "Hemoglobine"
    );
  var hemoglobineLast = 0; 
  myFilterData3 &&
  myFilterData3?.length > 0 &&
  myFilterData3.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
      this.setState({hemoglobineLast : hemoglobineLast})
      hemoglobineLast = hemoglobineLast+1
      }
  });
  

  var laboratory_result8 =
    this.state.personalinfo &&
    this.state.personalinfo?.laboratory_result &&
    this.state.personalinfo?.laboratory_result?.length > 0 &&
    this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
  var myFilterData4 =
    laboratory_result8 &&
    laboratory_result8?.length > 0 &&
    laboratory_result8.filter(
      (value, key) =>
        value.lab_parameter && value?.lab_parameter?.value === "Leucocytes"
    );
  var leucocytesLast=0;
    myFilterData4 &&
      myFilterData4?.length > 0 &&
      myFilterData4.map((data, index) => {
        if(data.upper_limit || data.lower_limit || data.value)
        {
          this.setState({leucocytesLast: leucocytesLast})
          leucocytesLast = leucocytesLast+1
        }
  })
 

  var laboratory_result9 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData5 =
  laboratory_result9 &&
  laboratory_result9?.length > 0 &&
  laboratory_result9.filter(
    (value, key) =>
      value.lab_parameter &&
      value?.lab_parameter?.value === "Pancreaticlipase"
  );
var  pancreaticlipaseLast=0;

myFilterData5 &&
myFilterData5?.length > 0 &&
myFilterData5.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({pancreaticlipaseLast: pancreaticlipaseLast})
        pancreaticlipaseLast = pancreaticlipaseLast+1;
      }
    });


  var laboratory_result10 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData6 =
laboratory_result10 &&
laboratory_result10?.length > 0 &&
laboratory_result10.filter(
    (value, key) =>
      value.lab_parameter && value?.lab_parameter?.value === "Thrombocytes"
  );
 var thrombocytesLast=0;

  myFilterData6 &&
    myFilterData6?.length > 0 &&
    myFilterData6.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({thrombocytesLast : thrombocytesLast})
        thrombocytesLast = thrombocytesLast+1;
      }
    });

  var laboratory_result11 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData7 =
laboratory_result11 &&
laboratory_result11?.length > 0 &&
laboratory_result11.filter(
    (value, key) =>
      value.lab_parameter && value?.lab_parameter?.value === "Sodium"
  );
var sodiumLast=0;

myFilterData7 &&
myFilterData7?.length > 0 &&
myFilterData7.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({sodiumLast: sodiumLast})
        sodiumLast = sodiumLast+1
      }
    });

  var laboratory_result12 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData8 =
  laboratory_result12 &&
  laboratory_result12?.length > 0 &&
  laboratory_result12.filter(
    (value, key) =>
      value.lab_parameter && value?.lab_parameter?.value === "GGT"
  );
var ggtLast=0;

  myFilterData8 &&
    myFilterData8?.length > 0 &&
    myFilterData8.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({ggtLast: ggtLast})
        ggtLast= ggtLast+1
      }
    });


  var laboratory_result13 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData9 =
laboratory_result13 &&
laboratory_result13?.length > 0 &&
laboratory_result13.filter(
    (value, key) =>
      value.lab_parameter && value?.lab_parameter?.value === "AST/GOT"
  );
var astLast= 0;

  myFilterData9 &&
  myFilterData9?.length > 0 &&
  myFilterData9.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({astLast: astLast});
        astLast= astLast+1
      }
    });


  var laboratory_result14 =
  this.state.personalinfo &&
  this.state.personalinfo?.laboratory_result &&
  this.state.personalinfo?.laboratory_result?.length > 0 &&
  this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
var myFilterData10 =
laboratory_result14 &&
laboratory_result14?.length > 0 &&
laboratory_result14.filter(
    (value, key) =>
      value.lab_parameter && value?.lab_parameter?.value === "ALT/GPT"
  );
var altLast = 0;

myFilterData10 &&
myFilterData10?.length > 0 &&
myFilterData10.map((data, index) => {
      if(data.upper_limit || data.lower_limit || data.value)
      {
        this.setState({altLast: altLast})
        altLast = altLast+1;
    }
    });

  var wiegthLast = 0;
var weight_bmi5 =
  this.state.personalinfo &&
  this.state.personalinfo?.weight_bmi &&
  this.state.personalinfo?.weight_bmi?.length > 0 &&
  this.state.personalinfo?.weight_bmi.sort(SortByGraphView);

  weight_bmi5 &&
    weight_bmi5 &&
    weight_bmi5?.length > 0 &&
    weight_bmi5.map((data, index) => {
      if(data.weight || data.height )
      {
        this.setState({wiegthLast: wiegthLast})
        wiegthLast = wiegthLast+1 
      }
    });

  var hbLast = 0,
    BSLast = 0;
  var blood_sugar5 =
    this.state.personalinfo &&
    this.state.personalinfo?.blood_sugar &&
    this.state.personalinfo?.blood_sugar?.length > 0 &&
    this.state.personalinfo?.blood_sugar.sort(SortByGraphView);
  
    blood_sugar5 &&
      blood_sugar5?.length > 0 &&
      blood_sugar5.map((data, index) => {
        if(data.Hba1c){
          this.setState({hbLast: hbLast})
          hbLast = hbLast+1 
        }
        if(data.blood_sugar){
          this.setState({BSLast: BSLast})
          BSLast = BSLast+1
        }
      });
    

  var resprisationLast = 0;
  var respiration_result =
    this.state.personalinfo &&
    this.state.personalinfo?.respiration &&
    this.state.personalinfo?.respiration?.length > 0 &&
    this.state.personalinfo?.respiration.sort(SortByGraphView);
    respiration_result &&
      respiration_result?.length > 0 &&
      respiration_result.map((data, index) => {
        if(data.respiration){
          this.setState({resprisationLast : resprisationLast})
          resprisationLast = resprisationLast+1;
        }
      });

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
        this.state.personalinfo?.blood_pressure &&
        this.state.personalinfo?.blood_pressure?.length > 0 &&
        this.state.personalinfo?.blood_pressure.sort(SortByGraphView);
      blood_pressure5 &&
        blood_pressure5?.length > 0 &&
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

      this.setState({ options: options });
    }
    if (current_Graph === "laboratory_result") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter && value?.lab_parameter?.value === "Creatinine"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }
    if (current_Graph === "potassium") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo?.laboratory_result &&
        this.state.personalinfo?.laboratory_result?.length > 0 &&
        this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5?.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value?.lab_parameter?.value === "Potassium"
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
          myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "hemoglobine") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo?.laboratory_result &&
        this.state.personalinfo?.laboratory_result?.length > 0 &&
        this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5?.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value?.lab_parameter?.value === "Hemoglobine"
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
          myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "leucocytes") {
      var laboratory_result5 =
        this.state.personalinfo &&
        this.state.personalinfo?.laboratory_result &&
        this.state.personalinfo?.laboratory_result?.length > 0 &&
        this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
      var myFilterData1 =
        laboratory_result5 &&
        laboratory_result5?.length > 0 &&
        laboratory_result5.filter(
          (value, key) =>
            value.lab_parameter && value?.lab_parameter?.value === "Leucocytes"
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
          myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "pancreaticlipase") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter &&
          value?.lab_parameter?.value === "Pancreaticlipase"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "thrombocytes") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter && value?.lab_parameter?.value === "Thrombocytes"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "sodium") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter && value?.lab_parameter?.value === "Sodium"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "ggt") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter && value?.lab_parameter?.value === "GGT"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "ast/got") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter && value?.lab_parameter?.value === "AST/GOT"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
    }

    if (current_Graph === "alt/gpt") {
      var laboratory_result5 =
      this.state.personalinfo &&
      this.state.personalinfo?.laboratory_result &&
      this.state.personalinfo?.laboratory_result?.length > 0 &&
      this.state.personalinfo?.laboratory_result.sort(SortByGraphView);
    var myFilterData1 =
      laboratory_result5 &&
      laboratory_result5?.length > 0 &&
      laboratory_result5.filter(
        (value, key) =>
          value.lab_parameter && value?.lab_parameter?.value === "ALT/GPT"
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
        myFilterData1?.length > 0 &&
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
      this.setState({ options: options });
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
      this.state.personalinfo?.weight_bmi &&
      this.state.personalinfo?.weight_bmi?.length > 0 &&
      this.state.personalinfo?.weight_bmi.sort(SortByGraphView);

    {
      weight_bmi5 &&
        weight_bmi5 &&
        weight_bmi5?.length > 0 &&
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
      this.setState({ options: options });
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
        this.state.personalinfo?.blood_sugar &&
        this.state.personalinfo?.blood_sugar?.length > 0 &&
        this.state.personalinfo?.blood_sugar.sort(SortByGraphView);
      {
        blood_sugar5 &&
          blood_sugar5?.length > 0 &&
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
      this.setState({ options: options });
    }
    if (current_Graph === "respiration") {
      var categoriesbs = [],
        oldtwo,
        r_value = [],
        resprisationLast = 0;
      var respiration_result =
        this.state.personalinfo &&
        this.state.personalinfo?.respiration &&
        this.state.personalinfo?.respiration?.length > 0 &&
        this.state.personalinfo?.respiration.sort(SortByGraphView);
      {
        respiration_result &&
          respiration_result?.length > 0 &&
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
      this.setState({ options: options });
    }
  };

  render() {
    var item = this.state.item;
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      blood_pressure,
      heart_frequency,
      blood_sugar,
      weight_bmi,
      Creatinine,
      Hba1c,
      respiration,
    } = translate;
    return (
      <div>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid className="presurMeter">
              <Grid className="presurCloseFncy">
                <img
                  onClick={this.props.CloseGraph}
                  src={require("assets/images/close-search.svg")}
                  alt=""
                  title=""
                />
              </Grid>

              <Grid className="presurInner">
                {this.state.personalinfo &&
                  this.state.personalinfo?.blood_pressure &&
                  this.state.personalinfo?.blood_pressure?.length > 0 && this.state.BPLast !==-1 && (
                    <a
                      className={
                        this.state.current_Graph === "blood_pressure" &&
                        "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("blood_pressure")}
                    >
                      <label>{blood_pressure}</label>
                      <Grid>
                        <span>
                          {this.state.personalinfo &&
                            this.state.personalinfo?.blood_pressure &&
                            this.state.personalinfo?.blood_pressure[
                              this.state.BPLast
                            ] &&
                            this.state.personalinfo?.blood_pressure[
                              this.state.BPLast
                            ].rr_systolic +
                              "/" +
                              this.state.personalinfo?.blood_pressure[
                                this.state.personalinfo?.blood_pressure?.length -
                                  1
                              ].rr_diastolic}{" "}
                          mmHg
                        </span>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.personalinfo?.blood_pressure[
                            this.state.BPLast
                          ].datetime_on,
                          this.state.date_format
                        )}
                        ,{" "}
                        {getTime(
                          new Date(
                            this.state.personalinfo?.blood_pressure[
                              this.state.BPLast
                            ].datetime_on
                          ),
                          this.state.time_foramt
                        )}
                      </p>
                    </a>
                  )}
                {this.state.personalinfo &&
                  this.state.personalinfo?.blood_pressure &&
                  this.state.personalinfo?.blood_pressure?.length > 0 && this.state.HeartLast !==-1 && (
                    <a
                      className={
                        this.state.current_Graph === "heart_rate" &&
                        "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("heart_rate")}
                    >
                      <label>{heart_frequency}</label>
                      <Grid>
                        <span>
                          {this.state.personalinfo &&
                            this.state.personalinfo?.blood_pressure &&
                            this.state.personalinfo?.blood_pressure[
                              this.state.HeartLast
                            ] &&
                            this.state.personalinfo?.blood_pressure[
                              this.state.HeartLast
                            ].heart_frequncy}{" "}
                          bpm
                        </span>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.personalinfo?.blood_pressure[
                            this.state.HeartLast
                          ].datetime_on,
                          this.state.date_format
                        )}
                        ,{" "}
                        {getTime(
                          new Date(
                            this.state.personalinfo?.blood_pressure[
                              this.state.HeartLast
                            ].datetime_on
                          ),
                          this.state.time_foramt
                        )}
                      </p>
                    </a>
                  )}
                {this.state.personalinfo &&
                  this.state.personalinfo?.blood_sugar &&
                  this.state.personalinfo?.blood_sugar?.length > 0 && this.state.BSLast !==-1  && (
                    <a
                      className={
                        this.state.current_Graph === "blood_sugar" &&
                        "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("blood_sugar")}
                    >
                      <label>{blood_sugar}</label>
                      <Grid>
                        <span>
                          {this.state.personalinfo &&
                            this.state.personalinfo?.blood_sugar &&
                            this.state.personalinfo?.blood_sugar[
                              this.state.BSLast
                            ] &&
                            this.state.personalinfo?.blood_sugar[
                              this.state.BSLast
                            ].blood_sugar}{" "}
                          mg/dl
                        </span>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.personalinfo?.blood_sugar[
                            this.state.BSLast
                          ].datetime_on,
                          this.state.date_format
                        )}
                        ,{" "}
                        {getTime(
                          new Date(
                            this.state.personalinfo?.blood_sugar[
                              this.state.BSLast
                            ].datetime_on
                          ),
                          this.state.time_foramt
                        )}
                      </p>
                    </a>
                  )}

                {this.state.personalinfo &&
                  this.state.personalinfo?.blood_sugar &&
                  this.state.personalinfo?.blood_sugar?.length > 0 && this.state.hbLast !==-1 && (
                    <a
                      className={
                        this.state.current_Graph === "hba" && "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("hba")}
                    >
                      <label>{Hba1c}</label>
                      <Grid>
                        <span>
                          {this.state.personalinfo &&
                            this.state.personalinfo?.blood_sugar &&
                            this.state.personalinfo?.blood_sugar[
                              this.state.hbLast
                            ] &&
                            this.state.personalinfo?.blood_sugar[
                              this.state.hbLast
                            ].Hba1c}{" "}
                          mg/dl
                        </span>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.personalinfo?.blood_sugar[
                            this.state.hbLast
                          ].datetime_on,
                          this.state.date_format
                        )}
                        ,{" "}
                        {getTime(
                          new Date(
                            this.state.personalinfo?.blood_sugar[
                              this.state.hbLast
                            ].datetime_on
                          ),
                          this.state.time_foramt
                        )}
                      </p>
                    </a>
                  )}
                {this.state.personalinfo &&
                  this.state.personalinfo?.respiration &&
                  this.state.personalinfo?.respiration?.length > 0 && this.state.resprisationLast!==-1 && (
                    <a
                      className={
                        this.state.current_Graph === "respiration" &&
                        "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("respiration")}
                    >
                      <label>{respiration}</label>
                      <Grid>
                        <span>
                          {this.state.personalinfo &&
                            this.state.personalinfo?.respiration &&
                            this.state.personalinfo?.respiration[
                              this.state.resprisationLast
                            ] &&
                            this.state.personalinfo?.respiration[
                              this.state.resprisationLast
                            ].respiration}{" "}
                          / min
                        </span>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.personalinfo?.respiration[
                            this.state.resprisationLast
                          ].datetime_on,
                          this.state.date_format
                        )}
                        ,{" "}
                        {getTime(
                          new Date(
                            this.state.personalinfo?.respiration[
                              this.state.resprisationLast
                            ].datetime_on
                          ),
                          this.state.time_foramt
                        )}
                      </p>
                    </a>
                  )}
                {this.state.personalinfo &&
                  this.state.personalinfo?.weight_bmi &&
                  this.state.personalinfo?.weight_bmi?.length > 0 && this.state.wiegthLast !==-1 &&  (
                    <a
                      className={
                        this.state.current_Graph === "weight_bmi" &&
                        "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("weight_bmi")}
                    >
                      <label>{weight_bmi}</label>
                      <Grid>
                        <span>
                          {this.state.personalinfo &&
                            this.state.personalinfo?.weight_bmi &&
                            this.state.personalinfo?.weight_bmi[
                              this.state.wiegthLast
                            ] &&
                            this.state.personalinfo?.weight_bmi[
                              this.state.wiegthLast
                            ].weight}{" "}
                          kg,{" "}
                          {this.state.personalinfo &&
                            this.state.personalinfo?.weight_bmi &&
                            this.state.personalinfo?.weight_bmi[
                              this.state.wiegthLast
                            ] &&
                            this.state.personalinfo?.weight_bmi[
                              this.state.wiegthLast
                            ].height +
                              "/" +
                              this.state.personalinfo?.weight_bmi[
                                this.state.wiegthLast
                              ].weight}{" "}
                          BMI
                        </span>
                      </Grid>
                      <p>
                        {getDate(
                          this.state.personalinfo?.weight_bmi[
                            this.state.wiegthLast
                          ].datetime_on,
                          this.state.date_format
                        )}
                        ,{" "}
                        {getTime(
                          new Date(
                            this.state.personalinfo?.weight_bmi[
                              this.state.wiegthLast
                            ].datetime_on
                          ),
                          this.state.time_foramt
                        )}
                      </p>
                    </a>
                  )}
                {this.state.Creatinine && this.state.Creatinine?.length > 0 && this.state.LRLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "laboratory_result" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("laboratory_result")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "Creatinine",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.Creatinine &&
                          this.state.Creatinine?.length > 0 &&
                          this.state.Creatinine[
                            this.state.LRLast
                          ] &&
                          this.state.Creatinine[
                            this.state.LRLast
                          ].value}{" "}
                        {this.state.Creatinine[this.state.LRLast]
                          .unit &&
                          this.state.Creatinine[
                            this.state.LRLast
                          ].unit.label}
                      </span>
                    </Grid>
                    <p>
                      {getDate(
                        this.state.Creatinine[this.state.LRLast]
                          .datetime_on,
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
                  </a>
                )}

                {this.state.AST && this.state.AST?.length > 0 && this.state.astLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "ast/got" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("ast/got")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "AST/GOT",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.AST &&
                          this.state.AST?.length > 0 &&
                          this.state.AST[this.state.astLast] &&
                          this.state.AST[this.state.astLast].value}{" "}
                        {this.state.AST[this.state.astLast].unit &&
                          this.state.AST[this.state.astLast].unit.label}
                      </span>
                    </Grid>
                    <p>
                      {getDate(
                        this.state.AST[this.state.astLast].datetime_on,
                        this.state.date_format
                      )}
                      ,{" "}
                      {getTime(
                        new Date(
                          this.state.AST[this.state.astLast].datetime_on
                        ),
                        this.state.time_foramt
                      )}
                    </p>
                  </a>
                )}
                {this.state.GGT && this.state.GGT?.length > 0 && this.state.ggtLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "ggt" && "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("ggt")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "GGT",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.GGT &&
                          this.state.GGT?.length > 0 &&
                          this.state.GGT[this.state.ggtLast] &&
                          this.state.GGT[this.state.ggtLast].value}{" "}
                        {this.state.GGT[this.state.ggtLast].unit &&
                          this.state.GGT[this.state.ggtLast].unit.label}
                      </span>
                    </Grid>
                    <p>
                      {getDate(
                        this.state.GGT[this.state.ggtLast].datetime_on,
                        this.state.date_format
                      )}
                      ,{" "}
                      {getTime(
                        new Date(
                          this.state.GGT[this.state.ggtLast].datetime_on
                        ),
                        this.state.time_foramt
                      )}
                    </p>
                  </a>
                )}
                {this.state.Sodium && this.state.Sodium?.length > 0 && this.state.sodiumLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "sodium" && "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("sodium")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "Sodium",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.Sodium &&
                          this.state.Sodium?.length > 0 &&
                          this.state.Sodium[this.state.sodiumLast] &&
                          this.state.Sodium[this.state.sodiumLast]
                            .value}{" "}
                        {this.state.Sodium[this.state.sodiumLast].unit &&
                          this.state.Sodium[this.state.sodiumLast].unit
                            .label}
                      </span>
                    </Grid>
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
                  </a>
                )}
                {this.state.Thrombocytes && this.state.Thrombocytes?.length > 0 && this.state.thrombocytesLast !==-1 &&  (
                  <a
                    className={
                      this.state.current_Graph === "thrombocytes" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("thrombocytes")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "Thrombocytes",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.Thrombocytes &&
                          this.state.Thrombocytes?.length > 0 &&
                          this.state.Thrombocytes[
                            this.state.thrombocytesLast
                          ] &&
                          this.state.Thrombocytes[
                            this.state.thrombocytesLast
                          ].value}{" "}
                        {this.state.Thrombocytes[
                          this.state.thrombocytesLast
                        ].unit &&
                          this.state.Thrombocytes[
                            this.state.thrombocytesLast
                          ].unit.label}
                      </span>
                    </Grid>
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
                  </a>
                )}
                {this.state.Pancreaticlipase &&
                  this.state.Pancreaticlipase?.length > 0 && this.state.pancreaticlipaseLast !==-1 && (
                    <a
                      className={
                        this.state.current_Graph === "pancreaticlipase" &&
                        "presurInnerActv"
                      }
                      onClick={() => this.OnGraphChange("pancreaticlipase")}
                    >
                      <label>
                        {GetShowLabel1(
                          AllL_Ps.AllL_Ps.english,
                          "Pancreaticlipase",
                          this.props.stateLanguageType,
                          true,
                          "lpr"
                        )}
                      </label>
                      <Grid>
                        <span>
                          {this.state.Pancreaticlipase &&
                            this.state.Pancreaticlipase?.length > 0 &&
                            this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ] &&
                            this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ].value}{" "}
                          {this.state.Pancreaticlipase[
                            this.state.pancreaticlipaseLast
                          ].unit &&
                            this.state.Pancreaticlipase[
                              this.state.pancreaticlipaseLast
                            ].unit.label}
                        </span>
                      </Grid>
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
                    </a>
                  )}
                {this.state.Leucocytes && this.state.Leucocytes?.length > 0 && this.state.leucocytesLast !==-1 &&  (
                  <a
                    className={
                      this.state.current_Graph === "leucocytes" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("leucocytes")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "Leucocytes",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.Leucocytes &&
                          this.state.Leucocytes?.length > 0 &&
                          this.state.Leucocytes[
                            this.state.leucocytesLast
                          ] &&
                          this.state.Leucocytes[
                            this.state.leucocytesLast
                          ].value}{" "}
                        {this.state.Leucocytes[this.state.leucocytesLast]
                          .unit &&
                          this.state.Leucocytes[
                            this.state.leucocytesLast
                          ].unit.label}
                      </span>
                    </Grid>
                    <p>
                      {getDate(
                        this.state.Leucocytes[this.state.leucocytesLast]
                          .datetime_on,
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
                  </a>
                )}
                {this.state.Hemoglobine && this.state.Hemoglobine?.length > 0 && this.state.hemoglobineLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "hemoglobine" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("hemoglobine")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "Hemoglobine",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.Hemoglobine &&
                          this.state.Hemoglobine?.length > 0 &&
                          this.state.Hemoglobine[
                            this.state.hemoglobineLast
                          ] &&
                          this.state.Hemoglobine[
                            this.state.hemoglobineLast
                          ].value}{" "}
                        {this.state.Hemoglobine[
                          this.state.hemoglobineLast
                        ].unit &&
                          this.state.Hemoglobine[
                            this.state.hemoglobineLast
                          ].unit.label}
                      </span>
                    </Grid>
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
                  </a>
                )}

                {this.state.Potassium && this.state.Potassium?.length > 0 &&  this.state.potassiumLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "potassium" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("potassium")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "Potassium",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.Potassium &&
                          this.state.Potassium?.length > 0 &&
                          this.state.Potassium[
                            this.state.potassiumLast
                          ] &&
                          this.state.Potassium[this.state.potassiumLast]
                            .value}{" "}
                        {this.state.Potassium[this.state.potassiumLast]
                          .unit &&
                          this.state.Potassium[this.state.potassiumLast]
                            .unit.label}
                      </span>
                    </Grid>
                    <p>
                      {getDate(
                        this.state.Potassium &&
                          this.state.Potassium[this.state.potassiumLast]
                            .datetime_on,
                        this.state.date_format
                      )}
                      ,{" "}
                      {getTime(
                        new Date(
                          this.state.Potassium &&
                            this.state.Potassium[
                              this.state.potassiumLast
                            ].datetime_on
                        ),
                        this.state.time_foramt
                      )}
                    </p>
                  </a>
                )}
                {this.state.ALT && this.state.ALT?.length > 0 && this.state.altLast !==-1 && (
                  <a
                    className={
                      this.state.current_Graph === "alt/gpt" &&
                      "presurInnerActv"
                    }
                    onClick={() => this.OnGraphChange("alt/gpt")}
                  >
                    <label>
                      {GetShowLabel1(
                        AllL_Ps.AllL_Ps.english,
                        "ALT/GPT",
                        this.props.stateLanguageType,
                        true,
                        "lpr"
                      )}
                    </label>
                    <Grid>
                      <span>
                        {this.state.ALT &&
                          this.state.ALT?.length > 0 &&
                          this.state.ALT[this.state.altLast] &&
                          this.state.ALT[this.state.altLast].value}{" "}
                        {this.state.ALT[this.state.altLast].unit &&
                          this.state.ALT[this.state.altLast].unit.label}
                      </span>
                    </Grid>
                    <p>
                      {getDate(
                        this.state.ALT[this.state.altLast].datetime_on,
                        this.state.date_format
                      )}
                      ,{" "}
                      {getTime(
                        new Date(
                          this.state.ALT[this.state.altLast].datetime_on
                        ),
                        this.state.time_foramt
                      )}
                    </p>
                  </a>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="presurGraph">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={9}>
              <Grid className="presurLabl">
                {this.state.current_Graph === "potassium" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Potassium",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "hemoglobine" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Hemoglobine",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "laboratory_result" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Creatinine",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "leucocytes" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Leucocytes",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "pancreaticlipase" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Pancreaticlipase",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "thrombocytes" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Thrombocytes",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "sodium" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "Sodium",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "ggt" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "GGT",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "ast/got" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "AST/GOT",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}
                {this.state.current_Graph === "alt/gpt" && (
                  <h1>
                    {GetShowLabel1(
                      AllL_Ps.AllL_Ps.english,
                      "ALT/GPT",
                      this.props.stateLanguageType,
                      true,
                      "lpr"
                    )}
                  </h1>
                )}

                {this.state.current_Graph === "weight_bmi" && (
                  <h1>{weight_bmi}</h1>
                )}
                {this.state.current_Graph === "blood_sugar" && (
                  <h1>{blood_sugar}</h1>
                )}
                {this.state.current_Graph === "heart_rate" && (
                  <h1>{heart_frequency}</h1>
                )}
                {this.state.current_Graph === "blood_pressure" && (
                  <h1>{blood_pressure}</h1>
                )}
                {this.state.current_Graph === "respiration" && (
                  <h1>{respiration}</h1>
                )}
                {this.state.current_Graph === "hba" && 
                <h1>{Hba1c}</h1>}
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              {/* <Grid className="presurAction">
                            <a><img src={require('assets/images/download.svg')} alt="" title="" /></a>
                            <a><img src={require('assets/images/print.svg')} alt="" title="" /></a>
                            <a><img src={require('assets/images/expand.svg')} alt="" title="" /></a>
                            <a className="pluspresur">+ Add new entry</a>
                        </Grid> */}
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={9}>
              <Grid className="latestGrph">
                {this.state.options && (
                  <GraphSec options={this.state.options} />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}></Grid>
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
export default withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
);
