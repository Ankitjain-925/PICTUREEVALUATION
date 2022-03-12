import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import Modal from '@material-ui/core/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Select from 'react-select';
import Loader from 'Screens/Components/Loader/index';
import { getImage } from 'Screens/Components/BasicMethod/index';
import {  getLanguage } from "translations/index"
import {deleteClickDoctor, alldoctor, alldocs, AddFmilyDoc, UpdateDoc, addDoctor} from './mdapi';
var doctorArray = [];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            loaderImage: false,
            allDocData: [],
            allDocData1: [],
            favDoc: [],
            items: [],
            users: [],
            filteredUsers: [],
            q: '',
            selectedUser: '',
            doctorId: [],
            myfavDoctors: [],
            selectedprofile: '',
            reccomend: [],
            images: [],
            Reccimages: [],
            openTrust: false,
            SelectUser: false,
            already: false,
            succset: false,
            recAdd: false,
            already1: false,
            removes: false,
            family_doc: [],
            family_doc1: [],
            PassDone: false,
            family_doc_list: [],
            family_doc_list1: [],
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    //Open Dialog to add the Trusted Doctor
    handleOpenTrust = () => {
        this.setState({ openTrust: true });
    };
    handleCloseTrust = () => {
        this.setState({ openTrust: false });
    };
    
    componentDidMount() {
        alldoctor(this, alldoctor);
        alldocs(this);
    }

    //For Filter the Doctor
    componentWillReceiveProps(nextProps) {
        this.setState({ users: nextProps.users, filteredUsers: nextProps.users }, () => this.filterList());
    }

    //User list will be show/hide
    toggle = () => {
        this.setState({
            shown: !this.state.shown
        });
    }

    //Change the UserList
    onChange = (event) => {
        const q = event.target.value.toLowerCase();
        this.setState({ q }, () => this.filterList());
    }

    //Filter the list according to type
    filterList = () => {
        let users = this.state.users;
        let q = this.state.q;
        users = users && users.length > 0 && users.filter(function (user) {
            return (user.name.toLowerCase().indexOf(q) != -1 || user.alies_id.toLowerCase().indexOf(q) != -1);
            // return  // returns true or false
        });
        this.setState({ filteredUsers: users });
        if (this.state.q == '') {
            this.setState({ filteredUsers: [] });
        }
    }

    //For remove the doctor in the trusted Doctor
    removeDoctor = (doctor) => {
        let translate = getLanguage(this.props.stateLanguageType)
        let { remove, capab_Doctors, r_u_sure_remove_doctor, yes, no } = translate
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
                        <h1>{remove} {capab_Doctors}</h1>
                        <p>{r_u_sure_remove_doctor}</p>
                        <div className="react-confirm-alert-button-group">
                            <button
                                onClick={() => { deleteClickDoctor(doctor, this); onClose() }}
                            >
                                {yes}
                            </button>
                            <button
                                onClick={() => { onClose(); }}
                            >
                                {no}
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }

    toggle(position) {
        if (this.state.active === position) {
            this.setState({ active: null })
        } else {
            this.setState({ active: position })
        }
    }

    myColor(position) {
        if (this.state.active === position) {
            return "#00a891";
        }
        return "";
    }

    color(position) {
        if (this.state.active === position) {
            return "white";
        }
        return "";
    }

    // On Select Family Docotor
    onSelectFamilyDoc(event) {
        var family_doc = [event.value];
        this.setState({ family_doc: event, family_doc1: family_doc });

    }

    render() {
        const userList = this.state.filteredUsers && this.state.filteredUsers.map(user => {
            return (
                <li key={user.id} style={{ background: this.myColor(user.id), color: this.color(user.id) }} value={user.profile_id}
                    onClick={() => { this.setState({ q: user.name, selectedUser: user.profile_id, selectedprofile: user.profile_id }); this.toggle(user.id); this.setState({ filteredUsers: [] }) }}
                >{user.name} ( {user.profile_id} )</li>
            )
        });
        var shown = {
            display: this.state.shown ? "none" : "block",
            width: '100%'
        };

        let translate = getLanguage(this.props.stateLanguageType)
        let { select_family_doc, family_doc, visible_emergancy, doc_added_succefully, New, make_sure_family_doc, add_a_family_doc, trusted_doc,
            doc_have_access_ur_journal, doc_already_exit_in_list, doc_removed_trusted_list, remove, add_trusted_doc, select_doctor,
            find_doc, serch_by_name_id, add_to_trusted_doc, recmonded_doc, doc_who_part_of_aimedis } = translate;


        return (
            <div className={this.props.comesFrom && 'paddingSides'}>
                <Grid className="docTabCntnt">
                    {this.state.loaderImage && <Loader />}
                    <Grid className="fmlyDoc">
                        <h3>{family_doc}</h3>
                        <p>{visible_emergancy}</p>
                    </Grid>
                    {this.state.PassDone && <div className="success_message">{doc_added_succefully}</div>}
                    {this.state.Nodoc && <div className="err_message">{select_family_doc}</div>}

                    <Grid className="addDocUpr">
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 9}>
                                <Select
                                    value={this.state.family_doc}
                                    onChange={(e) => this.onSelectFamilyDoc(e)}
                                    options={this.state.family_doc_list}
                                    placeholder={make_sure_family_doc}
                                    name="title"
                                    isSearchable={true}
                                    className="mkFmlyDoc"
                                />
                                {/* <Grid ><p></p></Grid> */}
                            </Grid>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 3}>
                                <Grid className="addFmlyDoc"><a onClick={()=>AddFmilyDoc(this)}>+ {add_a_family_doc}</a></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {!this.props.comesFrom &&
                    <Grid className="doctrstCntnt">

                        <Grid className="trstfmlyDoc">
                            <h3>{trusted_doc}</h3>
                            <p>{doc_have_access_ur_journal}</p>
                        </Grid>
                        {this.state.recAdd && <div className="success_message">{doc_added_succefully}</div>}
                        {this.state.already1 && <div className="err_message">{doc_already_exit_in_list}</div>}
                        {this.state.removes && <div className="success_message">{doc_removed_trusted_list}</div>}
                        {this.state.myfavDoctors && this.state.myfavDoctors.length > 0 && this.state.myfavDoctors.map((index, i) => (
                            <Grid className="trstaddDocUpr">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={9}>
                                        <Grid className="trstmkFmlyDoc 44">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={5}>
                                                    {index.image ? <a><img src={getImage(index.image, this.state.images)} alt="" title="" /> </a>
                                                        : <a><img src={require('assets/images/chatPerson.jpg')} alt="" title="" /> </a>}<label>{index.first_name && index.first_name} {index.last_name && index.last_name}</label></Grid>
                                                <Grid item xs={12} md={7}><p>{index.alies_id && index.alies_id}</p></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid className="trstaddFmlyDoc"><a onClick={() => { this.removeDoctor(index.profile_id) }}>{remove}</a></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={9}></Grid>
                            <Grid item xs={12} md={3}>
                                <Grid className="addTrstDoc"><a onClick={this.handleOpenTrust}>+ {add_trusted_doc}</a></Grid>
                            </Grid>
                        </Grid>

                        {/* Model setup */}
                        <Modal
                            open={this.state.openTrust}
                            onClose={this.handleCloseTrust}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme trstBoxModel" : "trstBoxModel"}>
                            <Grid className="trstBoxCntnt">
                                <Grid className="trstCourse">
                                    {this.state.succset && <div className="success_message">{doc_added_succefully}</div>}
                                    {this.state.SelectUser && <div className="err_message">{select_doctor}</div>}
                                    {this.state.already && <div className="err_message">{doc_already_exit_in_list}</div>}
                                    <Grid className="trstCloseBtn">
                                        <a onClick={this.handleCloseTrust}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{New} {trusted_doc}</label></Grid>
                                </Grid>
                                <Grid className="findDoctor">
                                    <Grid><label>{find_doc}</label></Grid>
                                    <Grid><input type="text" placeholder={serch_by_name_id} value={this.state.q} onChange={this.onChange} />
                                        <ul className="insuranceHint" style={{ height: userList != '' ? '150px' : '' }}>
                                            {userList}
                                        </ul>
                                    </Grid>
                                    <Grid><input type="submit" value={add_to_trusted_doc} onClick={() => addDoctor(this)} /></Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of Model setup */}

                        <Grid className="rectrstCntnt">
                            <Grid className="recfmlyDoc">
                                <h3>{recmonded_doc}</h3>
                                <p>{doc_who_part_of_aimedis}</p>
                            </Grid>
                            {this.state.reccomend && this.state.reccomend.length > 0 && this.state.reccomend.map((index, i) => (
                                <Grid className="recaddDocUpr">
                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                        <Grid item xs={12} md={9}>
                                            <Grid className="recmkFmlyDoc">
                                                <Grid container direction="row" alignItems="center">
                                                    <Grid item xs={12} md={4}>
                                                        {index.image ? <a><img src={getImage(index.image, this.state.images)} alt="" title="" /> </a>
                                                            : <a><img src={require('assets/images/chatPerson.jpg')} alt="" title="" /> </a>}
                                                        <label>{index.first_name && index.first_name} {index.last_name && index.last_name}</label></Grid>
                                                    <Grid item xs={12} md={8}><p>{index.alies_id}</p></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Grid className="recaddFmlyDoc"><a onClick={() => { UpdateDoc(index.profile_id, this) }}>+ {add_to_trusted_doc}</a></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));