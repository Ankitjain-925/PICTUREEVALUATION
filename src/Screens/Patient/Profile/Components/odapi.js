import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { updateBlockchain } from 'Screens/Components/BlockchainEntry/index';
import { GetShowLabel1 } from 'Screens/Components/GetMetaData/index.js';
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

//Get all the information of the current User
  export const getUserData = (current) => {
      current.setState({ loaderImage: true });
      let user_token = current.props.stateLoginValueAim.token
      let user_id = current.props.stateLoginValueAim.user._id
      axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
          commonHeader(user_token)).then((response) => {
              current.setState({ loaderImage: false });
              if (response) {
                  updateBlockchain(current.props.stateLoginValueAim.user, [], response.data.data.organ_donor[0], 'organ_data')
                  if (response.data.data.organ_donor[0].selectedOption) {
                      current.setState({ selectedOption: response.data.data.organ_donor[0].selectedOption })
                  }
                  if (response.data.data.organ_donor[0].free_remarks) {
                      current.setState({ OptionData: { free_remarks: response.data.data.organ_donor[0].free_remarks } })
                  }
                  if (response.data.data.organ_donor[0].selectedOption == "yes_to_all" && response.data.data.organ_donor[0].OptionData) {
                      current.setState({ OptionData: { yes_to_all: response.data.data.organ_donor[0].OptionData } },
                          () => {
                              if (response.data.data.organ_donor[0].free_remarks) {
                                  var state = current.state.OptionData;
                                  state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                  current.setState({ OptionData: state })
                              }
                          })
                  }
                  if (response.data.data.organ_donor[0].selectedOption == "exclude_some" && response.data.data.organ_donor[0].OptionData) {
                      let title, titlefromD = response.data.data.organ_donor[0].OptionData, titles = [];
                      if (titlefromD && titlefromD !== "") {
                          title = response.data.data.organ_donor[0].OptionData.split(", ");
                      }
                      else {
                          title = [];
                      }
                      current.Upsaterhesus(response.data.data.organ_donor[0].OptionData, 'exclude_some')
                      current.setState({ OptionData: { exclude_some: response.data.data.organ_donor[0].OptionData } },
                          () => {
                              if (response.data.data.organ_donor[0].free_remarks) {
                                  var state = current.state.OptionData;
                                  state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                  current.setState({ OptionData: state })
                              }
                          })
                  }
                  if (response.data.data.organ_donor[0].selectedOption == "include_some" && response.data.data.organ_donor[0].OptionData) {
                      let title1, titlefromD1 = response.data.data.organ_donor[0].OptionData, titles1 = [];
                      if (titlefromD1 && titlefromD1 !== "") {
                          title1 = response.data.data.organ_donor[0].OptionData.split(", ");
                      }
                      else {
                          title1 = [];
                      }
                      current.Upsaterhesus(response.data.data.organ_donor[0].OptionData, 'include_some')
                      current.setState({ OptionData: { include_some: response.data.data.organ_donor[0].OptionData } },
                          () => {
                              if (response.data.data.organ_donor[0].free_remarks) {
                                  var state = current.state.OptionData;
                                  state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                  current.setState({ OptionData: state })
                              }
                          })
                  }
                  if (response.data.data.organ_donor[0].selectedOption == "decided_by_following" && response.data.data.organ_donor[0].OptionData) {
                      let pho = response.data.data.organ_donor[0].OptionData.phone.split("-");
                      if (pho && pho.length > 0) {
                          current.setState({ flag_phone: pho[0] })
                      }
                      current.setState({ OptionData: response.data.data.organ_donor[0].OptionData },
                          () => {
                              if (response.data.data.organ_donor[0].free_remarks) {
                                  var state = current.state.OptionData;
                                  state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                  current.setState({ OptionData: state })
                              }
                          })
                  }
              }
          }).catch((error) => {
              current.setState({ loaderImage: false });
          });
  }
//Save the User Data of Orgen Donor
 export const  saveUserData = (current) => {
     current.setState({ loaderImage: true });
     var OptionData
     if (current.state.selectedOption == 'exclude_some') {
         OptionData = current.state.OptionData.exclude_some
     }
     if (current.state.selectedOption == 'include_some') {
         OptionData = current.state.OptionData.include_some
     }
     if (current.state.selectedOption == 'decided_by_following') {
         OptionData = {
             first_name: current.state.OptionData.first_name,
             last_name: current.state.OptionData.last_name,
             phone: current.state.OptionData.phone,
             city: current.state.OptionData.city,
             address: current.state.OptionData.address,
             postal_code: current.state.OptionData.postal_code,
         }
     }
     const user_token = current.props.stateLoginValueAim.token;
     axios.put(sitedata.data.path + '/UserProfile/organDonor', {
         selectedOption: current.state.selectedOption,
         OptionData: OptionData,
         free_remarks: current.state.OptionData.free_remarks,
     }, commonHeader(user_token))
         .then((responce) => {
             getUserData(current);
             if (current.props.comesFrom) {
                 current.props.EditOrganDonar();
             }
             current.setState({ PassDone: true, loaderImage: false })
             setTimeout(() => { current.setState({ PassDone: false }) }, 5000)

         })
 }

 export const  Upsaterhesus = (optionData, name, current) => {
    var rhesus = [];
    if (optionData && typeof optionData === 'string') {
        optionData = optionData.split(", ")
        rhesus = optionData && optionData.length > 0 && optionData.map((item) => {
            return GetShowLabel1(current.state.tissue, item, current.props.stateLanguageType, false, 'organ')
        })
    }
    else {
        rhesus = optionData;
    }

    if (name === 'include_some') { current.setState({ include_some: rhesus }) }
    else { current.setState({ exclude_some: rhesus }) }

}
// For Select one option 
export const  handleOptionChange = (changeEvent, current) => {
    current.setState({
        selectedOption: changeEvent.target.value
    })
}

//For update the mobile number
export const  updateMOBILE = (str) => {
    if (!str || str === 'undefined' || str === null || str === '') {
        return str;
    }
    else {
        var mob = str && str.split("-")
        return mob.pop()

    }
}

//Uodate tghe State of Option Data (Name phone etc)
export const updateEntryState = (e, current) => {
    const state = current.state.OptionData;
    state[e.target.name] = e.target.value;
    current.setState({ OptionData: state });
}

//For update the flags 
export const updateFlags = (e, name, current) => {
    const state = current.state.OptionData;
    if (name === 'flag_phone') {
        state['phone'] = e + '-' + current.state.phone;
        current.setState({ flag_phone: e });
    }
    current.setState({ OptionData: state });
}

//Update the states
export const updateEntryState1 = (e, current) => {
    const state = current.state.OptionData;
    if (e.target.name === 'phone') {
        state[e.target.name] = current.state.flag_phone + '-' + e.target.value;
        current.setState({ phone: e.target.value });
    }
    current.setState({ OptionData: state });
}

//For change the Organ / Tissue
export const handleChange_multi = (event, name, current) => {
    const state = current.state.OptionData;
    if (name === 'include_some') { current.setState({ include_some: event }) }
    else { current.setState({ exclude_some: event }) }
    state[name] = event && (Array.prototype.map.call(event, s => s.value).toString()).split(/[,]+/).join(',  ');
    current.setState({ OptionData: state })
};