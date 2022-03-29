import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { LanguageFetchReducer } from '../../actions';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLanguage } from "translations/index"
import {DebounceInput} from 'react-debounce-input';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        totalPage: this.props.totalPage,
        pages: this.props.pages,
        currentPage: this.props.currentPage,
        forError: false
      };
  }

  writePage = (event) =>{
    const re = /^[0-9\b]+$/;
    if(re.test(event.target.value)){
      if((event.target.value>0 && event.target.value<=this.state.totalPage)) {
        this.setState({currentPage: event.target.value})
        this.props.onChangePage(event.target.value)
      }
      else if(event.target.value === ''){
        this.setState({currentPage: event.target.value})
      }
      else{
        this.setState({currentPage: this.state.currentPage})
      }
    }
    this.setState({forError: (event.target.value<=0 || event.target.value>this.state.totalPage) ? true: false})
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.totalPage !== this.props.totalPage || prevProps.pages !== this.props.pages) {
      this.setState({ pages: this.props.pages, totalPage: this.props.totalPage });
    }
    if (prevProps.currentPage !== this.props.currentPage) {
        this.setState({ currentPage: this.props.currentPage });
      }
  };

  componentDidMount = () => {};

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { previous, next } = translate
    return (
        <>
        {console.log('this.state.totalPage', this.state.totalPage, this.state.currentPage)}
            {this.state.totalPage > 1 && <Grid className="prevNxtpag">
                <div className="movetoPage">
                  {this.state.currentPage !== 1 && <a className="prevpag" onClick={() => { this.props.onChangePage(this.state.currentPage - 1) }}>{previous}</a>}
                  {this.props.from && this.props.from === 'userlist' ? 
                  <><DebounceInput
                      name="currentPage"
                      type="number"
                      className={this.state.forError ? "setRedColor" : ""}
                      forceNotifyByEnter={true}
                      forceNotifyOnBlur={true}
                      debounceTimeout={1000}
                      value={this.state.currentPage}
                      minLength={1}
                      onChange={(event) => this.writePage(event)}
                    />
                     / {this.state.totalPage}</>
                     :
                  <> <input type="number" className={this.state.forError ? "setRedColor" : ""} onChange={(event) => this.writePage(event)} value={this.state.currentPage}/> / {this.state.totalPage}</>}
                  {this.state.currentPage !== this.state.totalPage && <a className="nxtpag" onClick={() => { this.props.onChangePage(this.state.currentPage + 1) }}>{next}</a>}
                </div>
                
            </Grid>}
        </>
    );
  }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType,
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));
