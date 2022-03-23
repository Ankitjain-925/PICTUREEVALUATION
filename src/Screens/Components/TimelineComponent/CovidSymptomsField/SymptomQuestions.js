import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from 'translations/index';
import { pure } from 'recompose';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      value: this.props.value,
    };
  }

  updateEntryState1 = (value) => {
    if (!this.props.notchangeble) {
      this.props.updateEntryState1(value);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.label !== this.props.label ||
      prevProps.loggedinUser !== this.props.loggedinUser ||
      prevProps.value !== this.props.value
    ) {
      this.setState({
        label: this.props.label,
        loggedinUser: this.props.loggedinUser,
        value: this.props.value,
      });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {} = translate;
    return (
      <>
        <Grid container direction="row" alignItems="center">
          {this.props.comesFrom === 'Feedback' ? (
            <Grid className="FeedbackCss">
              <Grid item xs={12} md={12}>
                <label>{this.state.label}</label>
              </Grid>
              <Grid item xs={12} md={12} className="symptomsType">
                <a
                  className={this.state.value == 0 && 'activeButton'}
                  onClick={() => this.updateEntryState1(0)}
                >
                  <img
                    src={require('assets/images/smile1.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile1wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 1 && 'activeButton'}
                  onClick={() => this.updateEntryState1(1)}
                >
                  <img
                    src={require('assets/images/smile2.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile2wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 2 && 'activeButton'}
                  onClick={() => this.updateEntryState1(2)}
                >
                  <img
                    src={require('assets/images/smile3.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile3wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 3 && 'activeButton'}
                  onClick={() => this.updateEntryState1(3)}
                >
                  <img
                    src={require('assets/images/smile4.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile4wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 4 && 'activeButton'}
                  onClick={() => this.updateEntryState1(4)}
                >
                  <img
                    src={require('assets/images/smile5.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile5wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid item xs={5} md={5}>
                <label>{this.state.label}</label>
              </Grid>
              <Grid item xs={7} md={7} className="symptomsType">
                <a
                  className={this.state.value == 0 && 'activeButton'}
                  onClick={() => this.updateEntryState1(0)}
                >
                  <img
                    src={require('assets/images/smile1.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile1wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 1 && 'activeButton'}
                  onClick={() => this.updateEntryState1(1)}
                >
                  <img
                    src={require('assets/images/smile2.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile2wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 2 && 'activeButton'}
                  onClick={() => this.updateEntryState1(2)}
                >
                  <img
                    src={require('assets/images/smile3.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile3wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 3 && 'activeButton'}
                  onClick={() => this.updateEntryState1(3)}
                >
                  <img
                    src={require('assets/images/smile4.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile4wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
                <a
                  className={this.state.value == 4 && 'activeButton'}
                  onClick={() => this.updateEntryState1(4)}
                >
                  <img
                    src={require('assets/images/smile5.png')}
                    alt=""
                    title=""
                    className="symptomsGry"
                  />
                  <img
                    src={require('assets/images/smile5wht.png')}
                    alt=""
                    title=""
                    className="symptomsWht"
                  />
                </a>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index))
);
