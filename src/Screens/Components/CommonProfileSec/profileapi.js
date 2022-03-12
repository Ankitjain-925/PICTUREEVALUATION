import axios from "axios";
import sitedata from "sitedata";
import { commonHeader, commonCometHeader } from "component/CommonHeader/index";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import SPECIALITY from "speciality";
import { getLanguage } from "translations/index"
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { blobToFile, resizeFile } from "Screens/Components/BasicMethod/index";

// Copy the Profile id and PIN
export const copyText = (copyT, current) => {
    current.setState({ copied: false });
    var copyText = document.getElementById(copyT);
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    current.setState({ copied: true });
    setTimeout(() => {
        current.setState({ copied: false });
    }, 5000);
};

export const GetLanguageMetadata = (current) => {
    var Allgender = GetLanguageDropdown(
        current.state.allMetadata &&
        current.state.allMetadata.gender &&
        current.state.allMetadata.gender.length > 0 &&
        current.state.allMetadata.gender,
        current.props.stateLanguageType
    );
    current.setState({
        genderdata: Allgender,
        languageData:
            current.state.allMetadata &&
            current.state.allMetadata.languages &&
            current.state.allMetadata.languages.length > 0 &&
            current.state.allMetadata.languages,
        specialityData: GetLanguageDropdown(
            SPECIALITY.speciality.english,
            current.props.stateLanguageType
        ),
        title_degreeData:
            current.state.allMetadata &&
            current.state.allMetadata.title_degreeData &&
            current.state.allMetadata.title_degreeData.length > 0 &&
            current.state.allMetadata.title_degreeData,
    });
};

//Get the current User Data
export const getUserData = (current, datas) => {
    current.setState({ loaderImage: true });
    let user_token = current.props.stateLoginValueAim.token;
    let user_id = current.props.stateLoginValueAim.user._id;
    axios
        .get(
            sitedata.data.path + "/UserProfile/Users/" + user_id,
            commonHeader(user_token)
        )
        .then((response) => {
            var title = {},
                titlefromD = response.data.data.title;
            var language = [],
                languagefromD = response.data.data.language;
            if (languagefromD && languagefromD.length > 0) {
                languagefromD.map((item) => {
                    language.push({ value: item, label: item.replace(/_/g, " ") });
                });
            }
            if (titlefromD && titlefromD !== "") {
                title = { label: titlefromD, value: titlefromD };
            }
            if (response.data.data.mobile && response.data.data.mobile !== "") {
                let mob = response.data.data.mobile.split("-");
                if (mob && mob.length > 0) {
                    current.setState({ flag_mobile: mob[0] });
                }
            }
            if (response.data.data.phone && response.data.data.phone !== "") {
                let pho = response.data.data.phone.split("-");
                if (pho && pho.length > 0) {
                    current.setState({ flag_phone: pho[0] });
                }
            }
            if (response.data.data.fax && response.data.data.fax !== "") {
                let fx = response.data.data.fax.split("-");
                if (fx && fx.length > 0) {
                    current.setState({ flag_fax: fx[0] });
                }
            }
            if (
                response.data.data.emergency_number &&
                response.data.data.emergency_number !== ""
            ) {
                let fen = response.data.data.emergency_number.split("-");
                if (fen && fen.length > 0) {
                    current.setState({ flag_emergency_number: fen[0] });
                }
            }
            current.setState({
                UpDataDetails: response.data.data,
                city: response.data.data.city,
                area: response.data.data.area,
                profile_id: response.data.data.profile_id,
            });
            current.setState({
                speciality_multi: current.state.UpDataDetails.speciality,
            });
            current.setState({ name_multi: language, title: title });
            current.setState({
                insurancefull: current.state.UpDataDetails.insurance,
                insuranceDetails: {
                    insurance: "",
                    insurance_number: "",
                    insurance_type: "",
                },
            });
            datas = current.state.UpDataDetails.insurance;
            var find =
                response.data && response.data.data && response.data.data.image;
            SettingImage(find, current);
            current.setState({ loaderImage: false });
        })
        .catch((error) => {
            current.setState({ loaderImage: false });
        });
};

//Update the states
export const updateEntryState1 = (e, current) => {
    const state = current.state.UpDataDetails;
    if (e.target.name === "mobile") {
        state[e.target.name] = current.state.flag_mobile + "-" + e.target.value;
        current.setState({ mobile: e.target.value });
    }
    if (e.target.name === "fax") {
        state[e.target.name] = current.state.flag_fax + "-" + e.target.value;
        current.setState({ fax: e.target.value });
    }
    if (e.target.name === "phone") {
        state[e.target.name] = current.state.flag_phone + "-" + e.target.value;
        current.setState({ phone: e.target.value });
    }
    if (e.target.name === "emergency_number") {
        state[e.target.name] =
            current.state.flag_emergency_number + "-" + e.target.value;
        current.setState({ phone: e.target.value });
    }
    current.setState({ UpDataDetails: state });
};

//For update the flags
export const updateFlags = (e, name, current) => {
    const state = current.state.UpDataDetails;
    if (name === "flag_mobile") {
        state["mobile"] = e + "-" + current.state.mobile;
        current.setState({ flag_mobile: e });
    }
    if (name === "flag_fax") {
        state["fax"] = e + "-" + current.state.fax;
        current.setState({ flag_fax: e });
    }

    if (name === "flag_phone") {
        state["phone"] = e + "-" + current.state.phone;
        current.setState({ flag_phone: e });
    }
    if (name === "flag_emergency_number") {
        state["emergency_number"] = e + "-" + current.state.phone;
        current.setState({ flag_emergency_number: e });
    }
    current.setState({ UpDataDetails: state });
};
//For change the title of user
export const onSelectDegree = (event, current) => {
    current.setState({ title: event });
    const state = current.state.UpDataDetails;
    state["title"] = event.label;
    current.setState({ UpDataDetails: state });
};

// On change the Birthday
export const onChange = (date, current) => {
    const state = current.state.UpDataDetails;
    state["birthday"] = date;
    current.setState({ UpDataDetails: state });
};

//Save the User profile
export const saveUserData = (current, datas) => {
    if (
        current.state.insuranceDetails.insurance !== "" &&
        current.state.insuranceDetails.insurance_number !== "" &&
        current.state.insuranceDetails.insurance_country !== ""
    ) {
        if (
            datas.some(
                (data) => data.insurance === current.state.insuranceDetails.insurance
            )
        ) {
        } else {
            datas.push(current.state.insuranceDetails);
            current.setState({ insurancefull: datas });
        }
    }
    if (
        current.state.flag_emergency_number &&
        current.state.flag_emergency_number === "" &&
        current.state.flag_emergency_number === "undefined"
    ) {
        current.setState({ flag_emergency_number: "DE" });
    }
    if (
        current.state.flag_mobile &&
        current.state.flag_mobile === "" &&
        current.state.flag_mobile === "undefined"
    ) {
        current.setState({ flag_mobile: "DE" });
    }
    if (
        current.state.flag_phone &&
        current.state.flag_phone === "" &&
        current.state.flag_phone === "undefined"
    ) {
        current.setState({ flag_phone: "DE" });
    }
    if (
        current.state.flag_fax &&
        current.state.flag_fax === "" &&
        current.state.flag_fax === "undefined"
    ) {
        current.setState({ flag_fax: "DE" });
    }
    current.setState({ loaderImage: true, phonevalidate: false });
    current.setState({ regisError1: "" });
    current.setState({ regisError2: "" });
    const user_token = current.props.stateLoginValueAim.token;
    current.setState({
        insuranceDetails: {
            insurance: "",
            insurance_number: "",
            insurance_country: "",
        },
    });
    var parent_id = current.state.UpDataDetails.parent_id
        ? current.state.UpDataDetails.parent_id
        : "0";
    axios
        .put(
            sitedata.data.path + "/UserProfile/Users/update",
            {
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
                street: current.state.UpDataDetails.street,
                city: current.state.city,
                area: current.state.area,
                address: current.state.UpDataDetails.address,
                emergency_contact_name: current.state.UpDataDetails
                    .emergency_contact_name,
                emergency_email: current.state.UpDataDetails.emergency_email,
                emergency_number: current.state.UpDataDetails.emergency_number,
                family_doc: current.state.UpDataDetails.family_doc,
                insurance: datas,
                is2fa: current.state.UpDataDetails.is2fa,
                country: current.state.UpDataDetails.country,
                citizen_country: current.state.UpDataDetails.citizen_country,
                pastal_code: current.state.UpDataDetails.pastal_code,
            },
            commonHeader(user_token)
        )
        .then((responce) => {
            if (responce.data.hassuccessed) {
                current.setState({ loaderImage: false });
                current.setState({
                    editInsuranceOpen: false,
                    addInsuranceOpen: false,
                    succUpdate: true,
                    insuranceDetails: {
                        insurance: "",
                        insurance_number: "",
                        insurance_country: "",
                    },
                });
                current.setState({ loaderImage: false });
                setTimeout(() => {
                    current.setState({ succUpdate: false });
                }, 5000);
                getUserData(current);
                axios
                    .put(
                        "https://api-eu.cometchat.io/v2.0/users/" +
                        current.state.profile_id.toLowerCase(),
                        {
                            name:
                                current.state.UpDataDetails.first_name +
                                " " +
                                current.state.UpDataDetails.last_name,
                        },
                        commonCometHeader()
                    )
                    .then((res) => {
                        var data = update_CometUser(current.props?.stateLoginValueAim?.user?.profile_id.toLowerCase(), res.data.data)
                    });
            } else {
                current.setState({ loaderImage: false });
                if (responce.data.message === "Phone is not verified") {
                    current.setState({ phonevalidate: true });
                }
                current.setState({ error3: true });
                setTimeout(() => {
                    current.setState({ error3: false });
                }, 5000);
            }
        });
};

//For change the language and the Speciality
export const handleChange_multi = (event, name, current) => {
    const state = current.state.UpDataDetails;
    if (name == "languages") {
        current.setState({ name_multi: event });
        state["language"] =
            event && Array.prototype.map.call(event, (s) => s.value);
    }
    if (name == "speciality") {
        current.setState({ speciality_multi: event });
    }
    current.setState({ UpDataDetails: state });
};
//FOR UPLOADING THE IMAGE
export const saveUserData1 = (current) => {
    current.setState({ loaderImage: true });
    const user_token = current.props.stateLoginValueAim.token;
    axios
        .put(
            sitedata.data.path + "/UserProfile/Users/updateImage",
            {
                image: current.state.uploadedimage,
            },
            commonHeader(user_token)
        )
        .then((responce) => {
            axios
                .put(
                    "https://api-eu.cometchat.io/v2.0/users/" +
                    current.props.stateLoginValueAim.user.profile_id.toLowerCase(),
                    {
                        avatar: current.state.uploadedimage,
                    },
                    commonCometHeader()
                )
                .then((res) => {
                    var data = update_CometUser(current.props?.stateLoginValueAim?.user?.profile_id.toLowerCase(), res.data.data)
                });
            var find1 = current.state.uploadedimage;
            SettingImage(find1, current);
        });
};

//For setting the image
export const SettingImage = (find, current) => {
    if (find) {
        find = find.split(".com/")[1];
        axios
            .get(sitedata.data.path + "/aws/sign_s3?find=" + find)
            .then((response) => {
                if (response.data.hassuccessed) {
                    current.setState({ image: response.data.data });
                    setTimeout(() => {
                        current.setState({ loaderImage: false });
                    }, 5000);
                }
            });
    }
};

// Check the Alies is duplicate or not
export const changePin = (e, current) => {
    const state = current.state.UpDataDetails1;
    state[e.target.name] = e.target.value;
    current.setState({ UpDataDetails1: state });
    if (e.target.value.length > 3 && e.target.value !== "") {
        current.setState({ toSmall1: false });
    } else {
        current.setState({ toSmall1: true });
    }
};

export const changeAlies = (e, current) => {
    const state = current.state.UpDataDetails1;
    state[e.target.name] = e.target.value;
    current.setState({ UpDataDetails1: state });
    if (e.target.value.length > 5 && e.target.value !== "") {
        current.setState({ loaderImage: true, toSmall: false });
        const user_token = current.props.stateLoginValueAim.token;
        axios
            .get(
                sitedata.data.path +
                "/UserProfile/checkAlies?alies_id=" +
                e.target.value,
                commonHeader(user_token)
            )
            .then((responce) => {
                if (responce.data.hassuccessed) {
                    current.setState({ DuplicateAlies: true });
                } else {
                    current.setState({ DuplicateAlies: false });
                }
                current.setState({ loaderImage: false });
            });
    } else {
        current.setState({ toSmall: true });
    }
};

//Chnage Id Pin by here
export const ChangeIDPIN = (current) => {
    if (
      !current.state.DuplicateAlies &&
      !current.state.toSmall &&
      !current.state.toSmall1
    ) {
      current.setState({ loaderImage: true });
      const user_token = current.props.stateLoginValueAim.token;
      axios
        .put(
          sitedata.data.path + "/UserProfile/Users/update",
          {
            pin: current.state.UpDataDetails1.pin,
            alies_id: current.state.UpDataDetails1.alies_id,
          },
          commonHeader(user_token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            current.setState({ ChangedPIN: true ,  UpDataDetails1: {}});
            setTimeout(() => {
              current.setState({ ChangedPIN: false });
            }, 5000);
          }
          current.setState({ loaderImage: false });
          getUserData(current);
          current.handlePinClose("chngPinOpen");
        });
    }
  };

  //For upload the Profile pic
  export const fileUpload = async (event, current) => {
      current.setState({ loaderImage: true });
      // let reader = new FileReader();
      let file = event[0];
      current.setState({
        loaderImage: true,
        imagePreviewUrl1: URL.createObjectURL(file),
      });
      let fileParts = event[0].name.split(".");
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      const compressedFile = await resizeFile(file);

      var data = blobToFile(compressedFile, file.name)
      axios
        .post(sitedata.data.path + "/aws/sign_s3", {
          fileName: data.name,
          fileType: fileType,
          folders: current.props.stateLoginValueAim.user.profile_id + "/",
          bucket: current.props.stateLoginValueAim.user.bucket,
        })
        .then((response) => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          if (fileType === "pdf") {
            fileType = "application/pdf";
          }
          // Put the fileType in the headers for the upload
          var options = {
            headers: {
              "Content-Type": fileType,
            },
          };
          axios
            .put(signedRequest, data, options)
            .then((result) => {
              current.setState(
                {
                  uploadedimage:
                    response.data.data.returnData.url +
                    "&bucket=" +
                    current.props.stateLoginValueAim.user.bucket,
                  loaderImage: false,
                },
                () => {
                  saveUserData1(current);
                }
              );
            })
            .catch((error) => { });
        })
        .catch((error) => { });
    
  };
