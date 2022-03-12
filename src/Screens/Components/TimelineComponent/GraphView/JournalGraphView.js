import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getDate, getTime, GetUrlImage, getFirstLastName } from 'Screens/Components/BasicMethod';
import GraphSec from './../GraphSec/index'
import HC_more from "highcharts/highcharts-more"; //module3
// Import Highcharts
import Highcharts from "highcharts/highstock";
HC_more(Highcharts); //init module

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personalinfo: this.props.personalinfo,
            added_data: this.props.added_data,
            time_format : this.props.time_format,
            date_format : this.props.date_format,
            current_Graph : this.props.current_Graph,
            options : false,
        };
    }

    componentDidMount(){
        this.setOptions(this.props.current_Graph)
    }
    //On change the User Data
    componentDidUpdate = (prevProps) => {
        if (prevProps.personalinfo !== this.props.personalinfo) {
            this.setState({ personalinfo: this.props.personalinfo  })     
        }
        if(prevProps.current_Graph !== this.props.current_Graph)
        {
            this.OnGraphChange(this.props.current_Graph)   
        }
    }

    //On Graph Change
    OnGraphChange=(current_Graph)=>{
        this.setState({ current_Graph: current_Graph })
        this.setOptions(current_Graph);
    }

    //Set options for the graph
    setOptions=(current_Graph)=>{
        if(current_Graph ==='blood_pressure' || current_Graph === 'heart_rate'){
            var categoriesbp=[],databp_d=[],databp_s=[], dataf=[],oldone;
            this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0  && this.state.personalinfo.blood_pressure.map((data, index) => {
                databp_d.push({
                    "y": parseFloat(data.rr_diastolic)
                })
                databp_s.push({
                    "y": parseFloat(data.rr_systolic)
                })
                dataf.push({
                    "y": parseFloat(data.heart_frequncy)
                })
                if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.created_at) {
                    categoriesbp.push(getTime(data.datetime_on, this.state.time_format))
                }
                else {
                    categoriesbp.push(getDate(data.datetime_on, this.state.date_format))
                }
                oldone = data;
            })
            if(current_Graph ==='blood_pressure'){
                var options = {
                    title: {
                        text: 'Blood Pressure'
                    },
    
                    yAxis: {
                        title: {
                            text: 'Blood Pressure'
                        }
    
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: categoriesbp
                    },
    
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'
    
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'RR Diastolic',
                        data: databp_d,
                        type: 'line',
                        color: '#008080'
    
                    },
                    {
                        name: 'RR Systolic',
                        data: databp_s,
                        type: 'line',
                        color: '#0000A0'
    
                    }]
                }
            }
            else{
                var options = {
                    title: {
                        text: 'Heart Frequency'
                    },
    
                    yAxis: {
                        title: {
                            text: 'Heart Frequency'
                        }
    
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: categoriesbp
                    },
    
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'
    
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Frequency',
                        data: dataf,
                        type: 'line',
                        color: '#008080'
    
                    }]
                }
            }
            this.setState({options: options})
        }
        if(current_Graph === 'laboratory_result'){
            var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
            {this.state.personalinfo && this.state.personalinfo.laboratory_result &&  this.state.personalinfo.laboratory_result.length>0 &&this.state.personalinfo.laboratory_result.map((data, index) => {
            datalr1_u.push({
                "y": parseFloat(data.upper_limit)
            })
            datalr1_l.push({
                "y": parseFloat(data.lower_limit)
            })
            datalr1_v.push({
                "y": parseFloat(data.value)
            })
            myFilterlr1.push(data);
            if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
                categorieslr.push(getTime(data.datetime_on, this.state.time_format))
            }
            else {
                categorieslr.push(getDate(data.datetime_on, this.state.date_format))
            }
            oldone = data;
        })}
            var options = {
                    title: {
                        text: 'Creatinine (mg/dl)'
                    },

                    yAxis: {
                        title: {
                            text: 'Creatinine (mg/dl)'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: categorieslr
                    },

                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Value',
                        data: datalr1_v,
                        type: 'line',
                        color: '#800000'

                    }, {
                        name: 'Upper limit',
                        data: datalr1_u,
                        type: 'line',
                        dashStyle: 'dot',
                        color: '#008080'

                    },
                    {
                        name: 'Lower limit',
                        data: datalr1_l,
                        type: 'line',
                        dashStyle: 'dot',
                        color: '#0000A0'

                    }]
                }
            this.setState({options : options})
        }

        if(current_Graph === 'weight_bmi'){
            var oldthree, weightbmi=[],Ibmi=[],heightbmi=[],categoriesbmi=[];
            {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 && this.state.personalinfo.weight_bmi.map((data, index) => {
            weightbmi.push({
                "y": parseFloat(data.weight)
            })
            var BMI = (data.weight / (data.height * data.height) * 10000).toFixed(2)
            Ibmi.push({
                "y": parseFloat(BMI)
            })
            heightbmi.push({
                "y": parseFloat(data.height)
            })
            if (oldthree && oldthree.datetime_on && oldthree.datetime_on === oldthree.datetime_on && oldthree.created_at) {
                categoriesbmi.push(getTime(data.datetime_on, this.state.time_format))
            }
            else {
                categoriesbmi.push(getDate(data.datetime_on, this.state.date_format))
            }
            oldthree = data;
            })}
            options ={
                title: {
                    text: 'Weight and BMI'
                },

                yAxis: {
                    title: {
                        text: 'Weight'
                    }
                },
                yAxis: [{
                    title: {
                        text: 'BMI',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Weight'
                    }
                }],
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                    categories: categoriesbmi
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Weight',
                    data: weightbmi,
                    type: 'line'
                },
                {
                    name: 'Height',
                    data: heightbmi,
                    type: 'line',
                    color: 'red'
                },
                {
                    name: 'BMI',
                    data: Ibmi,
                    type: 'line'
                }]
            }
            this.setState({options : options})
        }
        if(current_Graph === 'blood_sugar'){
            var categoriesbs=[], oldtwo, hbac=[],blood_s=[];
            {this.state.personalinfo && this.state.personalinfo.blood_sugar &&  this.state.personalinfo.blood_sugar.length>0 && this.state.personalinfo.blood_sugar.map((data, index) => {
                hbac.push({
                    "y": parseFloat(data.Hba1c)
                })
                blood_s.push({
                    "y": parseFloat(data.blood_sugar)
                })
                if (oldtwo && oldtwo.datetime_on && oldtwo.datetime_on === data.datetime_on && oldtwo.created_at) {
                    categoriesbs.push(getTime(data.datetime_on, this.state.time_format))
                }
                else {
                    categoriesbs.push(getDate(data.datetime_on, this.state.date_format))
                }
                oldtwo = data;
            })}
            options ={
                title: {
                    text: 'Blood Sugar'
                },

                yAxis: {
                    title: {
                        text: 'Blood Sugar'
                    }
                },
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                    categories: categoriesbs
                },

                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Blood Sugar',
                    data: blood_s,
                    type: 'line'
                },
                {
                    name: 'HBA1c',
                    data: hbac,
                    type: 'line'
                }]
            }
            this.setState({options : options})
        }
    }
    
    render() {
        var item = this.state.item;
        return (
            <div>
                <Grid container direction="row" justify="center">
                <Grid item xs={12} md={12}>
                    <Grid className="presurMeter">
                        <Grid className="presurCloseFncy">
                            <img onClick={this.props.CloseGraph} src={require('assets/images/close-search.svg')} alt="" title="" />
                        </Grid>

                        <Grid className="presurInner">
                            {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 && 
                            <a className={this.state.current_Graph === 'blood_pressure' && "presurInnerActv"} onClick={()=> this.OnGraphChange('blood_pressure')}>
                                <label>Blood Pressure</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].rr_systolic +'/'+  this.state.personalinfo.blood_pressure[0].rr_diastolic)} mmHg</span></Grid>
                                <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 &&
                            <a className={this.state.current_Graph === 'heart_rate' && "presurInnerActv"} onClick={()=> this.OnGraphChange('heart_rate')}>
                                <label>Heart Frequency</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].heart_frequncy )} bpm</span></Grid>
                                <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.blood_sugar &&  this.state.personalinfo.blood_sugar.length>0 &&
                            <a className={this.state.current_Graph === 'blood_sugar' && "presurInnerActv"} onClick={()=> this.OnGraphChange('blood_sugar')}>
                                <label>Blood Sugar</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar[0] && (this.state.personalinfo.blood_sugar[0].blood_sugar )} mg/dl</span></Grid>
                                <p>{getDate(this.state.personalinfo.blood_sugar[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_sugar[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 &&
                            <a className={this.state.current_Graph === 'weight_bmi' && "presurInnerActv"} onClick={()=> this.OnGraphChange('weight_bmi')}>
                                <label>Weight & BMI</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi[0] && this.state.personalinfo.weight_bmi[0].weight} kg, {this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi[0] && (this.state.personalinfo.weight_bmi[0].height + '/'+this.state.personalinfo.weight_bmi[0].weight )} BMI</span></Grid>
                                <p>{getDate(this.state.personalinfo.weight_bmi[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.weight_bmi[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.laboratory_result &&  this.state.personalinfo.laboratory_result.length>0 &&
                            <a className={this.state.current_Graph === 'laboratory_result' && "presurInnerActv"} onClick={()=> this.OnGraphChange('laboratory_result')}>
                                <label>Creatinine</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result[0] && (this.state.personalinfo.laboratory_result[0].value )} mg/dl</span></Grid>
                                <p>{getDate(this.state.personalinfo.laboratory_result[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.laboratory_result[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className="presurGraph">
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={9}>
                        <Grid className="presurLabl">
                            {this.state.current_Graph === 'laboratory_result' && <h1>Creatinine</h1>}
                            {this.state.current_Graph === 'weight_bmi' && <h1>Weight & BMI</h1>}
                            {this.state.current_Graph === 'blood_sugar' && <h1>Blood Sugar</h1>}
                            {this.state.current_Graph === 'heart_rate' && <h1>Heart Frequency</h1>}
                            {this.state.current_Graph === 'blood_pressure' && <h1>Blood Pressure</h1>}
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
                            {this.state.options && <GraphSec options={this.state.options}/> }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={3}>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }
}

export default Index;
