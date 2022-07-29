import axios from "axios";
import sitedata from "sitedata";
import { commonHeader, commonCometHeader } from "component/CommonHeader/index";
import { GetLanguageDropdown, GetShowLabel1 } from 'Screens/Components/GetMetaData/index.js';
import SPECIALITY from 'speciality';
import { update_CometUser } from "Screens/Components/CommonApi/index";
import * as AustraliaC from 'Screens/Components/insuranceCompanies/australia.json';
import * as AustriaC from 'Screens/Components/insuranceCompanies/austria.json';
import * as NetherlandC from 'Screens/Components/insuranceCompanies/dutch.json';
import * as GermanC from 'Screens/Components/insuranceCompanies/german.json';
import * as PhillipinesC from 'Screens/Components/insuranceCompanies/phillippines.json';
import * as SwitzerlandC from 'Screens/Components/insuranceCompanies/switzerland.json';
import * as AmericaC from 'Screens/Components/insuranceCompanies/us.json';
import * as ThailandC from 'Screens/Components/insuranceCompanies/thailand.json';
import contry from "Screens/Components/countryBucket/countries.json";

var datas = [];
  // fOR update the flag of mobile
export const updateFLAG = (str) => {
    var mob = str && str.split("-")
    if (mob && mob.length > 0) {
        if (mob[0] && mob[0].length == 2) {
            return mob[0]
        }
        else { return 'DE' }
    }
}

 //For getting the dropdowns from the database
 export const getMetadata=(current)=>{ 
    current.setState({ allMetadata: current.props.metadata },
        () => {  GetLanguageMetadata(current); })
}

export const Upsaterhesus = (current, rhesusfromD) => {
    var rhesus = GetShowLabel1(current.state.rhesusgroup, rhesusfromD, current.props.stateLanguageType, false, "rhesus");
    current.setState({ rhesus: rhesus })
}

//Get all the information of the current User
  export const getUserData = (current) => {
      current.setState({ loaderImage: true });
      let user_token = current.props.stateLoginValueAim.token
      let user_id = current.props.stateLoginValueAim.user._id
      axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
          commonHeader(user_token)).then((response) => {
              var state1 = current.state.contact_partner;
              state1['relation'] = response.data.data && response.data.data.emergency_relation
              state1['email'] = response.data.data && response.data.data.emergency_email
              state1['name'] = response.data.data && response.data.data.emergency_contact_name
              state1['number'] = response.data.data && response.data.data.emergency_number
              current.setState({ contact_partner: state1 },
                  () => {
                      if (response.data.data && response.data.data.emergency_number && response.data.data.emergency_number !== '') {
                          let fen = response.data.data.emergency_number.split("-");
                          if (fen && fen.length > 0) {
                              current.setState({ flag_emergency_number: fen[0] })
                          }
                      }
                  })
              var title = {}, titlefromD = response.data.data.title;
              var bloodfromD = response.data.data.blood_group, rhesusfromD = response.data.data.rhesus,
                  bloods = {};
              var language = [], languagefromD = response.data.data.language;
              if (languagefromD && languagefromD.length > 0) {
                  languagefromD.map((item) => {
                      language.push({ value: item, label: item.replace(/_/g, " ") });
                  })

              }

              if (bloodfromD && bloodfromD !== "") {
                if(typeof bloodfromD === 'object') {
                    bloods =  bloodfromD;
                    }else{
                        bloods = { label: bloodfromD, value: bloodfromD }
                    }
              }
              if (rhesusfromD && rhesusfromD !== "") {
                  Upsaterhesus(current, rhesusfromD)
              }
              if (titlefromD && titlefromD !== "") {
                  title = { label: titlefromD, value: titlefromD }
              }
              if (response.data.data.mobile && response.data.data.mobile !== '') {
                  let mob = response.data.data.mobile.split("-");
                  if (mob && mob.length > 0) {
                      current.setState({ flag_mobile: mob[0] })
                  }
              }
              if (response.data.data.phone && response.data.data.phone !== '') {
                  let pho = response.data.data.phone.split("-");
                  if (pho && pho.length > 0) {
                      current.setState({ flag_phone: pho[0] })
                  }
              }
              if (response.data.data.fax && response.data.data.fax !== '') {
                  let fx = response.data.data.fax.split("-");
                  if (fx && fx.length > 0) {
                      current.setState({ flag_fax: fx[0] })
                  }
              }
             
              current.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id: response.data.data.profile_id });
              current.setState({ speciality_multi: current.state.UpDataDetails.speciality })
              current.setState({ name_multi: language, title: title, bloods: bloods })
              current.setState({
                  insurancefull: current.state.UpDataDetails.insurance,
                  insuranceDetails: { insurance: '', insurance_number: '', insurance_type: '' }
              })
              datas = current.state.UpDataDetails.insurance;
              var forUpdate = {value: true, token: user_token, user: response.data.data}
              current.props.LoginReducerAim(response.data.data?.email, '', user_token, () => {}, forUpdate);
              current.setState({ loaderImage: false });
          }).catch((error) => {
              current.setState({ loaderImage: false });
          });
  }

//Uodate tghe State of Option Data (Name phone etc)
export const updateEntryState = (e, current) => {
    const state = current.state.UpDataDetails;
    state[e.target.name] = e.target.value;
    current.setState({ UpDataDetails: state });
}

//For update the flags 
export const updateflags = (e, name, current) => {
    const state = current.state.UpDataDetails;
    if (name === 'flag_mobile') {
        state['mobile'] = e + '-' + current.state.mobile;
        current.setState({ flag_mobile: e });
    }
    if (name === 'flag_fax') {
        state['fax'] = e + '-' + current.state.fax;
        current.setState({ flag_fax: e });
    }

    if (name === 'flag_phone') {
        state['phone'] = e + '-' + current.state.phone;
        current.setState({ flag_phone: e });
    }
    if (name === 'flag_emergency_number') {

        const state = current.state.contact_partner;
        state['number'] = e + '-' + current.state.emergency_number;
        current.setState({ flag_emergency_number: e });
        current.setState({ contact_partner: state });
        // state['emergency_number'] = e + '-' + current.state.phone;
    }
    current.setState({ UpDataDetails: state });
}

 //For change the language and the Speciality
export const  handleChange_multi = (event, name, current) => {
    const state = current.state.UpDataDetails;
    if (name == "languages") {
        current.setState({ name_multi: event });
        state['language'] = event && (Array.prototype.map.call(event, s => s.value))

    }
    if (name == "speciality") {
        current.setState({ speciality_multi: event });
    }
    current.setState({ UpDataDetails: state })
};

  // On change the Birthday
export const onChange = (date, current) => {
    const state = current.state.UpDataDetails;
    state['birthday'] = date
    current.setState({ UpDataDetails: state })
}

export const firstLoginUpdate = (current) => {
    const user_token = current.props.stateLoginValueAim.token;
    axios.put(sitedata.data.path + '/UserProfile/Users/update', {
        firstlogin: true,
    }, commonHeader(user_token)).then((responce) => { })
}

 // Copy the Profile id and PIN
 export const copyText = (copyT, current) => {
    current.setState({ copied: false })
    var copyText = document.getElementById(copyT);
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    current.setState({ copied: true })
    setTimeout(() => {
        current.setState({ copied: false })
    }, 5000)
}

export const updateEntryState11 = (e, current) => {
    const state = current.state.contact_partner;
    state['number'] = current.state.flag_emergency_number + '-' + e.target.value;
    current.setState({ emergency_number: e.target.value });
    current.setState({ contact_partner: state });
}
//Update the states
export const updateEntryState1 = (e, current) => {
    const state = current.state.UpDataDetails;
    if (e.target.name === 'mobile') {
        state[e.target.name] = current.state.flag_mobile + '-' + e.target.value;
        current.setState({ mobile: e.target.value });
    }
    if (e.target.name === 'fax') {
        state[e.target.name] = current.state.flag_fax + '-' + e.target.value;
        current.setState({ fax: e.target.value });
    }
    if (e.target.name === 'phone') {
        state[e.target.name] = current.state.flag_phone + '-' + e.target.value;
        current.setState({ phone: e.target.value });
    }
    if (e.target.name === 'emergency_number') {
        state[e.target.name] = current.state.flag_emergency_number + '-' + e.target.value;
        current.setState({ emergency_number: e.target.value });
    }
    current.setState({ UpDataDetails: state });
}

//For updating gender and country
export const EntryValueName = (value, name, current) => {
    if(name === 'title'){
        current.setState({ title: value });
    }
    if(name === 'blood_group'){
        current.setState({ bloods: value });
    }
    if(name === 'rhesus'){
        current.setState({ rhesus: value });
    }
    const state = current.state.UpDataDetails;
    state[name] = value;
    current.setState({ UpDataDetails: state });
}


export const GetLanguageMetadata = (current) => {
    var Allgender = GetLanguageDropdown(current.state.allMetadata && current.state.allMetadata.gender && current.state.allMetadata.gender.length > 0 && current.state.allMetadata.gender, current.props.stateLanguageType)
    var rhesusgroup = GetLanguageDropdown(current.state.allMetadata && current.state.allMetadata.rhesus && current.state.allMetadata.rhesus.length > 0 && current.state.allMetadata.rhesus, current.props.stateLanguageType)
    let AllMaritalOption = GetLanguageDropdown(current.state.allMetadata && current.state.allMetadata.maritalStatus && current.state.allMetadata.maritalStatus.length > 0 && current.state.allMetadata.maritalStatus, current.props.stateLanguageType)
    current.setState({
        AllMaritalOption: AllMaritalOption,
        genderdata: Allgender,
        languageData: current.state.allMetadata && current.state.allMetadata.languages && current.state.allMetadata.languages.length > 0 && current.state.allMetadata.languages,
        specialityData: GetLanguageDropdown(SPECIALITY.speciality.english, current.props.stateLanguageType),
        title_degreeData: current.state.allMetadata && current.state.allMetadata.title_degreeData && current.state.allMetadata.title_degreeData.length > 0 && current.state.allMetadata.title_degreeData,
        bloodgroup: current.state.allMetadata && current.state.allMetadata.bloodgroup && current.state.allMetadata.bloodgroup.length > 0 && current.state.allMetadata.bloodgroup,
        rhesusgroup: rhesusgroup,
        handleMaritalStatus: AllMaritalOption
    });
}

// For add the insurance
export const addmore_insurance = (current)=> {
    datas.push(current.state.insuranceDetails)
    current.setState({ insurance_count: current.state.insurance_count + 1, insurancefull: datas })
    current.setState({ insuranceDetails: { insurance: '', insurance_type: '', insurance_number: '' } })
    current.setState({ moreone: true })
}

//Save the User profile
export const saveUserData1 = (current) => {
    if (current.state.insuranceDetails.insurance !== "" && current.state.insuranceDetails.insurance_country !== "") {
        if (datas.some(data => data.insurance === current.state.insuranceDetails.insurance)) {

        }
        else {
            datas.push(current.state.insuranceDetails)
            current.setState({ insurancefull: datas })
        }
        const user_token = current.props.stateLoginValueAim.token;
        current.setState({ insu1: false, loaderImage: true })
        axios.put(sitedata.data.path + '/UserProfile/Users/update', {
            insurance: datas
        }, commonHeader(user_token)).then((responce) => {
            if (responce.data.hassuccessed) {
                current.setState({ editInsuranceOpen: false, addInsuranceOpen: false, succUpdate: true, insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
                current.setState({ loaderImage: false });
                setTimeout(() => { current.setState({ succUpdate: false }) }, 5000)
                getUserData(current, datas);
            }
        })
    }
    else {
        current.setState({ insu1: true })
    }
}
//Save the User profile
export const saveUserData = (current) => {
    if (!current.state.UpDataDetails.mobile.includes("-")) {
        const state2 = current.state.UpDataDetails
        state2['mobile'] = 'DE-' + current.state.UpDataDetails.mobile;

        current.setState({ UpDataDetails: state2 })
    }
    if (current.state.insuranceDetails.insurance !== "" && current.state.insuranceDetails.insurance_country !== "") {
        if (datas.some(data => data.insurance === current.state.insuranceDetails.insurance)) {

        }
        else {
            datas.push(current.state.insuranceDetails)
            current.setState({ insurancefull: datas })
        }
    }
    if (current.state.flag_emergency_number && current.state.flag_emergency_number === '' && current.state.flag_emergency_number === 'undefined') {
        current.setState({ flag_emergency_number: 'DE' })
    }
    if (current.state.flag_mobile && current.state.flag_mobile === '' && current.state.flag_mobile === 'undefined') {
        current.setState({ flag_mobile: 'DE' })
    }
    if (current.state.flag_phone && current.state.flag_phone === '' && current.state.flag_phone === 'undefined') {
        current.setState({ flag_phone: 'DE' })
    }
    if (current.state.flag_fax && current.state.flag_fax === '' && current.state.flag_fax === 'undefined') {
        current.setState({ flag_fax: 'DE' })
    }
    current.setState({ loaderImage: true, phonevalidate: false });
    current.setState({ regisError1: "" })
    current.setState({ regisError2: "" })
    const user_token = current.props.stateLoginValueAim.token;
    current.setState({ insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
    var parent_id = current.state.UpDataDetails.parent_id ? current.state.UpDataDetails.parent_id : '0';

    var tocheckWith = (current.state.UpDataDetails?.citizen_country && current.state.UpDataDetails?.citizen_country !=='') ? current.state.UpDataDetails?.citizen_country  :  current?.state?.flag_mobile;
   console.log('tocheckWith', tocheckWith)
    var getBucket = contry && contry.length > 0 && contry.filter((value, key) =>  value.code === tocheckWith?.value ?  tocheckWith?.value : tocheckWith);

    axios.put(sitedata.data.path + '/UserProfile/Users/update', {
        type: 'patient',
        pin: current.state.UpDataDetails.pin,
        first_name: current.state.UpDataDetails.first_name,
        last_name: current.state.UpDataDetails.last_name,
        nick_name: current.state.UpDataDetails.nick_name,
        title: current.state.UpDataDetails.title,
        birthday: current.state.UpDataDetails.birthday,
        language: current.state.UpDataDetails.language,
        speciality: current.state.speciality_multi,
        phone: current.state.UpDataDetails.phone,
        mobile: current.state.UpDataDetails.mobile,
        fax: current.state.UpDataDetails.fax,
        website: current.state.UpDataDetails.website,
        email: current.state.UpDataDetails.email,
        password: current.state.UpDataDetails.password,
        sex: current.state.UpDataDetails.sex,
        marital_status: current.state.UpDataDetails.marital_status,
        street: current.state.UpDataDetails.street,
        city: current.state.city,
        area: current.state.area,
        address: current.state.UpDataDetails.address,
        emergency_contact_name: current.state.contact_partner.name,
        emergency_relation: current.state.contact_partner.relation,
        emergency_email: current.state.contact_partner.email,
        emergency_number: current.state.contact_partner.number,
        family_doc: current.state.UpDataDetails.family_doc,
        insurance: datas,
        is2fa: current.state.UpDataDetails.is2fa,
        country: current.state.UpDataDetails.country,
        citizen_country: current.state.UpDataDetails.citizen_country,
        pastal_code: current.state.UpDataDetails.pastal_code,
        blood_group: current.state.UpDataDetails.blood_group,
        rhesus: current.state.UpDataDetails.rhesus,
        bucket: getBucket[0].bucket,
        country_code:current.state.UpDataDetails?.citizen_country?.value || current?.state?.flag_mobile
    }, commonHeader(user_token)).then((responce) => {
        if (responce.data.hassuccessed) {
            current.setState({ editInsuranceOpen: false, addInsuranceOpen: false, succUpdate: true, insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
            current.setState({ loaderImage: false });
            setTimeout(() => { current.setState({ succUpdate: false }) }, 5000)
            getUserData(current, datas);
            axios.put('https://api-eu.cometchat.io/v2.0/users/' + current.state.profile_id.toLowerCase(), {
                name: current.state.UpDataDetails.first_name + ' ' + current.state.UpDataDetails.last_name
            },
            commonCometHeader())
                .then((res) => {
                    var data = update_CometUser(current.props?.stateLoginValueAim?.user?.profile_id.toLowerCase() , res.data.data)
                 })
        }
        else {
            current.setState({ loaderImage: false });
            if (responce.data.message === 'Phone is not verified') {
                current.setState({ phonevalidate: true })
            }
            current.setState({ error3: true })
            setTimeout(() => { current.setState({ error3: false }) }, 5000)
        }
    })
}

// Check the Alies is duplicate or not
export const changePin = (e, current) => {
    const state = current.state.UpDataDetails1;
    state[e.target.name] = e.target.value;
    current.setState({ UpDataDetails1: state });
    if (e.target.value.length > 3 && e.target.value !== '') {
        current.setState({ toSmall1: false });
    }
    else {
        current.setState({ toSmall1: true })
    }
}
//Chnage Id Pin by here
export const ChangeIDPIN = (current) => {
    if (!current.state.DuplicateAlies && !current.state.toSmall && !current.state.toSmall1) {
        current.setState({ loaderImage: true });
        const user_token = current.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/Users/update', {
            pin: current.state.UpDataDetails1.pin,
            alies_id: current.state.UpDataDetails1.alies_id,
        }, commonHeader(user_token)).then((responce) => {
            if (responce.data.hassuccessed) {
                current.setState({ ChangedPIN: true ,   UpDataDetails1: {}})
                setTimeout(() => { current.setState({ ChangedPIN: false }) }, 5000)
            }
            current.setState({ loaderImage: false });
            getUserData(current, datas);
            current.handlePinClose("chngPinOpen");
        })
    }
}

// Check the Alies is duplicate or not
export const changeAlies = (e, current) => {
    const state = current.state.UpDataDetails1;
    state[e.target.name] = e.target.value;
    current.setState({ UpDataDetails1: state });
    if (e.target.value.length > 5 && e.target.value !== '') {
        current.setState({ loaderImage: true, toSmall: false });
        const user_token = current.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/checkAlies?alies_id=' + e.target.value,  commonHeader(user_token)).then((responce) => {
            if (responce.data.hassuccessed) { current.setState({ DuplicateAlies: true }) }
            else { current.setState({ DuplicateAlies: false }) }
            current.setState({ loaderImage: false });
        })
    }
    else {
        current.setState({ toSmall: true })
    }
}

  //For update the insurance country
export const updatesinsurancesCountry =(keys, e, current)=> {
    datas[keys].insurance_country = e.value;
    current.setState({ insurancefull: datas })
}

//Update Insurance
export const updatesinsurances = (keys, e, current) => {
    if (e.target.name === 'insurance') {
        datas[keys].insurance = e.target.value;
        const q = e.target.value.toLowerCase();
        current.setState({ q }, () => filterList(datas[keys].insurance_country, current));
        current.setState({ updateIns: keys })
    }
    if (e.target.name === 'insurance_number') {
        datas[keys].insurance_number = e.target.value;
    }
    current.setState({ insurancefull: datas })
}

//For removing the insurance 
export const removeInsurance = (keys, e, current) => {
    datas.splice(keys, 1);
    current.setState({ insurancefull: datas })
}

  // For update full insurance
export const updateInsurancee = (e, current) => {
    if (e.target.name === "insurance") {
        const q = e.target.value.toLowerCase();
        current.setState({ q }, () => filterList(current.state.insuranceDetails.insurance_country, current));
        current.setState({ updateIns: -2 })
    }
    const state = current.state.insuranceDetails;
    state[e.target.name] = e.target.value;
    current.setState({ insuranceDetails: state });
}

// For Add more insurance model
export const handleAddInsurance = (current) => {
    current.setState({ addInsuranceOpen: true });
}

//To add Insurance
export const insuranceForm = (e, current) => {
    const state = current.state.insuranceDetails;
    if (e.target.name == 'insurance') {
        const q = e.target.value.toLowerCase();
        current.setState({ q }, () => filterList(current.state.insuranceDetails.insurance_country, current));
    }
    state[e.target.name] = e.target.value;
    current.setState({ insuranceDetails: state });
}

//Update contact State
export const contact_partnerState = (e, current) => {
    let state = current.state.contact_partner;
    state[e.target.name] = e.target.value;
    current.setState({ contact_partner: state })
}

export const selectCountry = (event, current) => {
    const state = current.state.insuranceDetails;
    state['insurance_country'] = event.value;
    current.setState({ insuranceDetails: state });
    current.setState({ selectedCountry: event })
}

//For insurance Countries getting the list
export const filterList = (data, current)=> {
    let iCompany;
    switch (data) {
        case "AU":
            iCompany = AustraliaC.australia
            break;
        case "AT":
            iCompany = AustriaC.austria
            break;
        case "US":
            iCompany = AmericaC.us
            break;
        case "NL":
            iCompany = NetherlandC.dutch
            break;
        case "DE":
            iCompany = GermanC.german
            break;
        case "PH":
            iCompany = PhillipinesC.phillippines
            break;
        case "CH":
            iCompany = SwitzerlandC.switzerland
            break;
        case "TH":
            iCompany = ThailandC.thailand
            break;
    }
    let q = current.state.q;
    iCompany = iCompany && iCompany.length > 0 && iCompany.filter(function (company) {
        const companyLower = company.toLowerCase()
        return companyLower.indexOf(q) != -1;
    })
    current.setState({ filteredCompany: iCompany });
    if (current.state.q == '') {
        current.setState({ filteredCompany: [] });
    }
}

export const toggle = (event, current) => {
    const state = current.state.insuranceDetails;
    state['insurance'] = event;
    current.setState({ insuranceDetails: state });
    if (current.state.active === event) {
        current.setState({ active: null })
    } else {
        current.setState({ active: event })
    }
}

//For filter the country for add insuance
export const filterCountry = (i, current) => {
    let countryList = current.state.selectCountry
    let name
    name = countryList.filter(value => {
        if (value.value == i) {
            return value.label
        }
    })
    return name[0].label
}

//For filter the country for add insuances
export const filterCountry1 = (i, current) => {
    let countryList = current.state.selectCountry
    let name
    name = countryList.filter(value => {
        if (value.value == i) {
            return value.label
        }
    })
    return name[0]
}

export const handleMaritalStatus = (e, current) => {
    const state = current.state.UpDataDetails;
    state["marital_status"] = e
    current.setState({ UpDataDetails: state })
}
