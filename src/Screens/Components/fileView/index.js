import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getImage , GetUrlImage} from './../BasicMethod/index';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attachfile : this.props.attachfile,
            images: this.props.images,
        };
    }

  componentDidUpdate = (prevProps) => {
        if (prevProps.attachment !== this.props.attachment) {
            this.setState({attachfile: this.props.attachment})
        }
        if(prevProps.images !== this.props.images)
        {
            this.setState({ images: this.props.images})
        }
    }


    render() {
        var item = this.state.attachfile;
        return (
            <Grid className="imgsFile">
                {item && item.length>0 && item.map((file)=>(
                       file && file.filename &&
                        <a>
                            {(file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='mp4' && 
                                <video width="100%" className="VideoPlay" controls>
                                    <source src={getImage(file.filename, this.state.images)} type="video/mp4" />
                                </video>
                            }
                            {((file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='jpg') && 
                                <img className="pointThis" onClick={()=>GetUrlImage(file.filename)} src={getImage(file.filename, this.state.images)} alt="" title="" />
                            }
                            {((file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='pdf') && <img className="pointThis"  onClick={()=>GetUrlImage(file.filename)}  src={require('assets/images/pdfimg.png')} alt="" title="" />}  
                            {((file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='doc'|| (file.filename.split("&bucket=")[0]).split('.').pop() ==='docx' || (file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='xml' || (file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='txt') && <img className="pointThis"  onClick={()=>GetUrlImage(file.filename)} src={require('assets/images/txt1.png')} alt="" title="" />}
                            {((file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='xls'|| (file.filename.split("&bucket=")[0]).split('.').pop() ==='xlsx' || (file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='xml' ) && <img className="pointThis" onClick={()=>GetUrlImage(file.filename)} src={require('assets/images/xls1.svg')} alt="" title="" />} 
                            {((file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='csv') && <img className="pointThis" onClick={()=>GetUrlImage(file.filename)} src={require('assets/images/csv1.png')} alt="" title="" />} 
                            {((file && file.filename && file.filename.split("&bucket=")[0]).split('.').pop() ==='dcm') && <img className="pointThis" onClick={()=>GetUrlImage(file.filename)} src={require('assets/images/dcm1.png')} alt="" title="" />} 
                            <label>{(file && file.filename && file.filename.split('lms/')[1]).split("&bucket=")[0]}</label>
                        </a>
                ))}
            </Grid>
        )
    }
}

export default Index;