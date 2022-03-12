import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import { AddFavDoc } from 'Screens/Components/BasicMethod/index';

//After confirm User delete from My doctor
export const deleteClickDoctor = (doctor, current) => {
    current.setState({ loaderImage: true });
    const user_token = current.props.stateLoginValueAim.token;
    axios.delete(sitedata.data.path + '/UserProfile/favDocs/' + doctor + '/' + current.props.stateLoginValueAim.user.profile_id,
        commonHeader(user_token)).then((response) => {
            current.setState({ loaderImage: false, removes: true });
            setTimeout(() => { current.setState({ removes: false }) }, 5000)
            getUserData(current);
        }).catch((error) => {
            current.setState({ loaderImage: false });
        });
}

 //Get All doctors
 export const alldoctor = (current, doctorArray) => {
    var FamilyList = [], FamilyList1 = [];
    doctorArray = [];
    const user_token = current.props.stateLoginValueAim.token;
    axios.get(sitedata.data.path + '/UserProfile/DoctorUsers',
        commonHeader(user_token)).then((response) => {
            current.setState({ allDocData: response.data.data })
            for (let i = 0; i < current.state.allDocData.length; i++) {
                var name = '';
                if (current.state.allDocData[i].first_name && current.state.allDocData[i].last_name) {
                    name = current.state.allDocData[i].first_name + ' ' + current.state.allDocData[i].last_name
                }
                else if (current.state.allDocData[i].first_name) {
                    name = current.state.allDocData[i].first_name
                }
                doctorArray.push({
                    name: name,
                    id: current.state.allDocData[i]._id,
                    profile_id: current.state.allDocData[i].profile_id,
                    alies_id: current.state.allDocData[i].alies_id
                })
                FamilyList.push({ value: current.state.allDocData[i]._id, label: name })
                FamilyList1.push({ profile_id: current.state.allDocData[i].profile_id, value: current.state.allDocData[i]._id, label: name })
            }
            current.setState({ users: doctorArray, family_doc_list: FamilyList, family_doc_list1: FamilyList1 })
        })
}

  //Get the current User Data
  export const getUserData = (current) => {
    current.setState({ loaderImage: true });
    var myfavDoctors = [];
    var reccomend = [];
    let user_token = current.props.stateLoginValueAim.token
    let user_id = current.props.stateLoginValueAim.user._id
    axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
        commonHeader(user_token)).then((response) => {
            var myFilterData = [];
            if (response.data.data.family_doc && response.data.data.family_doc.length > 0) {
                response.data.data.family_doc.map((item) => {
                    myFilterData = current.state.family_doc_list && current.state.family_doc_list.length > 0 && current.state.family_doc_list.filter((ind) =>
                        ind.value === item);
                })
            }
            current.setState({ family_doc: myFilterData, family_doc1: response.data.data.family_doc })
            if (response.data.data.fav_doctor) {
                for (let i = 0; i < response.data.data.fav_doctor.length; i++) {
                    if (response.data.data.fav_doctor[i].doctor) {
                        var datas = current.state.allDocData1 && current.state.allDocData1.length > 0 && current.state.allDocData1.filter(data => data.profile_id === response.data.data.fav_doctor[i].doctor)
                        if (datas && datas.length > 0) {
                            if (response.data.data.fav_doctor[i].type && response.data.data.fav_doctor[i].type === 'recommended') {
                                reccomend.push(datas[0])
                            }
                            else {
                                myfavDoctors.push(datas[0])
                            }
                        }
                        current.setState({ loaderImage: false });
                    }
                }

                if (response.data.data.fav_doctor.length == 0) {
                    current.setState({ loaderImage: false });
                }
                current.setState({ myfavDoctors: myfavDoctors, reccomend: reccomend })
            }
        }).catch((error) => {
            current.setState({ loaderImage: false });
        });
}

 //Get the all doctor 
 export const alldocs = (current) => {
    const user_token = current.props.stateLoginValueAim.token;
    axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',
        commonHeader(user_token)).then((response) => {
            var images = [], Reccimages = [];
            response.data.data && response.data.data.length > 0 && response.data.data.map((datas) => {
                var find = datas && datas.image && datas.image
                if (find) {
                    var find1 = find.split('.com/')[1]
                    axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                        .then((response2) => {
                            if (response2.data.hassuccessed) {
                                images.push({ image: find, new_image: response2.data.data })
                                current.setState({ images: images })
                            }
                        })
                }
            })
            current.setState({ allDocData1: response.data.data })
            getUserData(current);
        })
}


    //For Add the Doctor
    export const addDoctor = (current) => {
        current.setState({ already: false, SelectUser: false })
        if ((current.state.doctorId.doctor_id === '' || !current.state.doctorId.doctor_id) && (current.state.selectedUser === '')) {
            current.setState({ SelectUser: true })
        } else {
            var doctor_id
            if (current.state.doctorId.doctor_id != '' && current.state.selectedUser != '' && current.state.doctorId.doctor_id != undefined) {
                doctor_id = current.state.doctorId.doctor_id
                // profile_id= current.state.selectedprofile
            } else {
                if (current.state.doctorId.doctor_id != '' && current.state.doctorId.doctor_id != undefined) {
                    doctor_id = current.state.doctorId.doctor_id
                    // profile_id= current.state.selectedprofile
                }
                if (current.state.selectedUser != '' && current.state.selectedUser != undefined) {
                    doctor_id = current.state.selectedUser
                    // profile_id= current.state.selectedprofile
                }
            }
            const user_token = current.props.stateLoginValueAim.token;
            if (doctor_id != '' && doctor_id != undefined) {
                current.setState({ loaderImage: true })
                axios.put(sitedata.data.path + '/UserProfile/AddFavDoc', {
                    doctor: doctor_id,
                    profile_id: current.state.selectedprofile,
                }, commonHeader(user_token)).then((responce) => {
                    current.setState({ loaderImage: false, q: '', filteredUsers: [] })
                    if (responce.data.hassuccessed == true) {
                        current.setState({ succset: true });
                        setTimeout(() => { current.setState({ succset: false }) }, 5000)
                        axios.post(sitedata.data.path + '/UserProfile/AddtoPatientList/' + doctor_id, {
                            profile_id: current.props.stateLoginValueAim.user.profile_id
                        },
                            commonHeader(user_token)).then((responce) => { })
                        current.setState({ selectedUser: '', })
                        getUserData(current);
                    } else {
                        current.setState({ selectedUser: '' })
                        current.setState({ already: true })
                        getUserData(current);
                    }
                })
            }
        }
    }

    //For add/edit family doctor
    export const AddFmilyDoc = (current) => {
        if (current.state.family_doc1 && current.state.family_doc1.length > 0) {
            current.setState({ Nodoc: false, loaderImage: true })
            var myFilterData = current.state.family_doc_list1 && current.state.family_doc_list1.length > 0 && current.state.family_doc_list1.filter((ind) =>
                ind.value === current.state.family_doc.value);
            if (myFilterData && myFilterData.length > 0 && myFilterData[0] && myFilterData[0].profile_id) {
                AddFavDoc(myFilterData[0].profile_id, myFilterData[0].profile_id, current.props.stateLoginValueAim.token, current.props.stateLoginValueAim.user.profile_id);
            }
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                family_doc: current.state.family_doc1
            }, commonHeader(current.props.stateLoginValueAim.token)).then((responce) => {
                if (current.props.comesFrom) {
                    current.props.EditFamilyDoc();
                }
                getUserData(current);
                current.setState({ PassDone: true, loaderImage: false })
                setTimeout(() => { current.setState({ PassDone: false }) }, 5000)

            })
        } else {
            current.setState({ Nodoc: true })
        }
    }

    //Send doctor reccomendation to trusted doctor 
    export const  UpdateDoc = (id, current) => {
        current.setState({ recAdd: false, already1: false, loaderImage: true })
        const user_token = current.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/AddRecDoc', {
            doctor: id,
            profile_id: id,
        }, commonHeader(user_token)).then((responce) => {
            current.setState({ loaderImage: false, q: '', filteredUsers: [] });
            if (responce.data.hassuccessed == true) {
                current.setState({ recAdd: true })
                setTimeout(() => { current.setState({ recAdd: false }) }, 5000)
                axios.post(sitedata.data.path + '/UserProfile/AddtoPatientList/' + id, {
                    profile_id: current.props.stateLoginValueAim.user.profile_id
                }, commonHeader(user_token)).then((responce) => { })
                current.setState({ selectedUser: '', })
                getUserData(current);
            } else {
                current.setState({ already1: true })
                current.setState({ selectedUser: '' })
                getUserData(current);
            }
        })
    }