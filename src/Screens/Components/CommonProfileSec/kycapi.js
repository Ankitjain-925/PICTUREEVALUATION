import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import * as AustraliaC from "Screens/Components/insuranceCompanies/australia.json";
import * as AustriaC from "Screens/Components/insuranceCompanies/austria.json";
import * as NetherlandC from "Screens/Components/insuranceCompanies/dutch.json";
import * as GermanC from "Screens/Components/insuranceCompanies/german.json";
import * as PhillipinesC from "Screens/Components/insuranceCompanies/phillippines.json";
import * as SwitzerlandC from "Screens/Components/insuranceCompanies/switzerland.json";
import * as AmericaC from "Screens/Components/insuranceCompanies/us.json";
import * as ThailandC from "Screens/Components/insuranceCompanies/thailand.json";

 //Get the Exist KYC
 export const getKYC=(current)=> {
   var user_id = current.props.stateLoginValueAim.user._id;
   var user_token = current.props.stateLoginValueAim.token;
   axios
     .get(sitedata.data.path + "/User/getKyc/" + user_id, commonHeader(user_token))
     .then((response) => {
       if (response.data.data) {
         current.setState(
           { personalinfo: response.data.fulldata, loaderImage: false },
           () => {
             if (
               current.state.personalinfo.attachment &&
               current.state.personalinfo.attachment.length > 0
             ) {
               var KYC_ID =
                 current.state.personalinfo.attachment &&
                 current.state.personalinfo.attachment.length > 0 &&
                 current.state.personalinfo.attachment[0] &&
                 current.state.personalinfo.attachment[0].file &&
                 current.state.personalinfo.attachment[0].file;
               if (KYC_ID) {
                 current.setState({ KYC_i1: KYC_ID });
                 KYC_ID = KYC_ID.split("KYC/")[1].split("&bucket=")[0];
                 current.setState({ KYC_ID: KYC_ID });
               }
               var KYC_LICENSE =
                 current.state.personalinfo.attachment &&
                 current.state.personalinfo.attachment.length > 0 &&
                 current.state.personalinfo.attachment[1] &&
                 current.state.personalinfo.attachment[1].file &&
                 current.state.personalinfo.attachment[1].file;
               if (KYC_LICENSE) {
                 current.setState({ KYC_l1: KYC_LICENSE });
                 KYC_LICENSE = KYC_LICENSE.split("KYC/")[1].split(
                   "&bucket="
                 )[0];
                 current.setState({ KYC_LICENSE: KYC_LICENSE });
               }
             }
           }
         );
         current.setState({
           CreateKYC: response.data.fulldata,
           selectedCountry: response.data.fulldata.country,
         });
         var getCountry =
           current.state.selectCountry &&
           current.state.selectCountry.length > 0 &&
           current.state.selectCountry.filter(
             (item) => item.value === response.data.fulldata.country
           );
         if (getCountry && getCountry.length > 0) {
           current.setState({ CurrentCountry: getCountry[0] });
         }
       } else {
         current.setState({ loaderImage: false });
         current.setState({
           CreateKYC: {
             number: "",
             authority: "",
             country: "US",
             attachment: [],
           },
           selectedCountry: "US",
         });
       }
     })
     .catch((err) => { });
 }
//For getting User Data
export const getUserData = (current)=> {
  current.setState({ loaderImage: true });
  let user_token = current.props.stateLoginValueAim.token;
  let user_id = current.props.stateLoginValueAim.user._id;
  axios
    .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
    .then((response) => {
      current.setState({ loaderImage: false });
      current.setState({
        UpDataDetails: response.data.data,
      });
    })
    .catch((error) => {
      current.setState({ loaderImage: false });
    });
}

 //set the state of authority
 export const newEntryState1 = (e, current) => {
    const state = current.state.CreateKYC;
    if (e.target.name == "authority") {
      const q = e.target.value.toLowerCase();
      current.setState({ q }, () => filterList(current));
    }
    state[e.target.name] = e.target.value;
    current.setState({ CreateKYC: state });
  };

  //Get the list of insurances according the country
  export const  filterList=(current) =>{
    let iCompany;
    switch (current.state.selectedCountry) {
      case "AU":
        iCompany = AustraliaC.australia;
        break;
      case "AT":
        iCompany = AustriaC.austria;
        break;
      case "US":
        iCompany = AmericaC.us;
        break;
      case "NL":
        iCompany = NetherlandC.dutch;
        break;
      case "DE":
        iCompany = GermanC.german;
        break;
      case "PH":
        iCompany = PhillipinesC.phillippines;
        break;
      case "CH":
        iCompany = SwitzerlandC.switzerland;
        break;
      case "TH":
        iCompany = ThailandC.thailand;
        break;
    }
    let q = current.state.q;
    iCompany =
      iCompany &&
      iCompany.length > 0 &&
      iCompany.filter((company) => {
        const companyLower = company.toLowerCase();
        return companyLower.indexOf(q) != -1;
      });
    current.setState({ filteredCompany: iCompany });
    if (current.state.q == "") {
      current.setState({ filteredCompany: [] });
    }
  }

  //Set the Insurance name from list or without list
  export const toggle = (event, current) => {
    const state = current.state.CreateKYC;
    state["authority"] = event;
    current.setState({ CreateKYC: state });
    if (current.state.active === event) {
      current.setState({ active: null });
    } else {
      current.setState({ active: event });
    }
  };

  //For upload the Doctor Liscence
  export const UploadFile = (e, current) => {
    current.setState({ FilesUp: e.target.files, loaderImage: true }, () => {
      if (current.state.FilesUp && current.state.FilesUp.length > 0) {
        for (var i = 0; i < current.state.FilesUp.length; i++) {
          var file = current.state.FilesUp[i];
          let fileParts = current.state.FilesUp[i].name.split(".");
          let fileName = fileParts[0];
          let fileType = fileParts[1];
          axios
            .post(sitedata.data.path + "/aws/sign_s3", {
              fileName: fileName,
              fileType: fileType,
              folders: "registration/",
              bucket: current.props.stateLoginValueAim.user.bucket,
            })
            .then((response) => {
              current.setState(
                {
                  uploadLicence: {
                    url:
                      response.data.data.returnData.url +
                      "&bucket=" +
                      current.props.stateLoginValueAim.user.bucket,
                  },
                }
              );
              var returnData = response.data.data.returnData;
              var signedRequest = returnData.signedRequest;
              var url = returnData.url;
              if (fileType === "pdf") {
                fileType = "application/pdf";
              }
              // Put the fileType in the headers for the upload
              var options = { headers: { "Content-Type": fileType } };
              axios
                .put(signedRequest, file, options)
                .then((result) => {
                  current.setState({ success: true, loaderImage: false });
                })
                .catch((error) => { });
            })
            .catch((error) => { });
        }
      }
    });

    var Preview = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].name.split(".").pop() === "mp4") {
        Preview.push(require("assets/images/videoIcon.png"));
      }
      if (e.target.files[i].name.split(".").pop() === "pdf") {
        Preview.push(require("assets/images/pdfimg.png"));
      } else if (
        e.target.files[i].name.split(".").pop() === "doc" ||
        e.target.files[i].name.split(".").pop() === "docx" ||
        e.target.files[i].name.split(".").pop() === "xml" ||
        e.target.files[i].name.split(".").pop() === "txt"
      ) {
        Preview.push(require("assets/images/txt1.png"));
      } else if (
        e.target.files[i].name.split(".").pop() === "xls" ||
        e.target.files[i].name.split(".").pop() === "xlsx" ||
        e.target.files[i].name.split(".").pop() === "xml"
      ) {
        Preview.push(require("assets/images/xls1.svg"));
      } else if (e.target.files[i].name.split(".").pop() === "csv") {
        Preview.push(require("assets/images/csv1.png"));
      } else if (
        e.target.files[i].name.split(".").pop() === "dcm" ||
        e.target.files[i].name.split(".").pop() === "DCM" ||
        e.target.files[i].name.split(".").pop() === "DICOM" ||
        e.target.files[i].name.split(".").pop() === "dicom"
      ) {
        Preview.push(require("assets/images/dcm1.png"));
      } else {
        Preview.push(URL.createObjectURL(e.target.files[i]));
      }
    }
    current.setState({ fileattach: Preview });
  }

   //Save the User profile
   export const saveUserData = (current) => {
    var Licence = current.state.UpDataDetails.licence
    if (current.state.uploadLicence) {
      Licence = current.state.uploadLicence
    }
    const user_token = current.props.stateLoginValueAim.token;
    axios
      .put(
        sitedata.data.path + "/UserProfile/Users/update",
        {
          licence: Licence
        },
        commonHeader(user_token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          getUserData(current);
        }
      });
  };

  //Save KYC Data
  export const saveKYC = (current) => {
    var data = current.state.CreateKYC;
    var user_id = current.props.stateLoginValueAim.user._id;
    var user_token = current.props.stateLoginValueAim.token;
    // if (current.state.fileattach1 && current.state.fileattach2) {
    data.user_id = user_id;
    var attachment = current.state.CreateKYC.attachment;
    if (current.state.fileattach1) {
      var index = attachment
        .map((e) => {
          return e.type;
        })
        .indexOf("UploadID");

      if (index > -1) {
        attachment[index] = { type: "UploadID", file: current.state.fileattach1 };
      } else {
        attachment.push({ type: "UploadID", file: current.state.fileattach1 });
      }
    }
    if (current.state.fileattach2) {
      var index = attachment
        .map((e) => {
          return e.type;
        })
        .indexOf("UploadLicense");

      if (index > -1) {
        attachment[index] = {
          type: "UploadLicense",
          file: current.state.fileattach2,
        };
      } else {
        attachment.push({
          type: "UploadLicense",
          file: current.state.fileattach2,
        });
      }
    }
    data.attachment = attachment;
    if (
      current.state.CreateKYC &&
      current.state.CreateKYC.country &&
      current.state.CreateKYC.country !== "" &&
      current.state.CreateKYC.number !== "" &&
      current.state.CreateKYC.number &&
      current.state.CreateKYC.authority &&
      current.state.CreateKYC.authority !== ""
    ) {
      if (current.state.agree) {
        current.setState({
          loaderImage: true,
          err_document: false,
          allField: false,
        });
        if (data._id) {
          axios
            .put(sitedata.data.path + "/User/updateKyc/" + data._id, data, commonHeader(user_token))
            .then((response) => {
              if (response.data.hassuccessed) {
                current.setState({
                  success: true,
                  err1: false,
                  agree: false,
                  CreateKYC: {},
                  fileattach1: false,
                  fileattach2: false,
                  loaderImage: false,
                }, () => {
                 saveUserData(current)
                });
                setTimeout(() => {
                  current.setState({ success: false });
                }, 3000);
              }
              getKYC(current)
            });
        } else {
          axios
            .post(sitedata.data.path + "/User/Addkyc", data, commonHeader(user_token))
            .then((response) => {
              if (response.data.hassuccessed) {
                current.setState({
                  success: true,
                  err1: false,
                  agree: false,
                  CreateKYC: {},
                  fileattach1: false,
                  fileattach2: false,
                  loaderImage: false,
                }, () => {
                 saveUserData(current)
                });
                setTimeout(() => {
                  current.setState({ success: false });
                }, 3000);
              }
              getKYC(current)
            });
        }
      } else {
        current.setState({ err1: true, err_document: false, allField: false });
      }

    } else {
      current.setState({ allField: true });
    }
  };


    //Attach the documents
    export const fileUpload = (event, filed_name, current) => {
        if (
          event[0].type === "application/pdf" ||
          event[0].type === "image/jpeg" ||
          event[0].type === "image/png"
        ) {
          current.setState({
            loaderImage: true,
            err_pdf: false,
            err_document: false,
            err1: false,
            isfileuploadmulti: true,
          });
          var namefield = filed_name;
          for (var i = 0; i < event.length; i++) {
            var file = event[i];
            let profile_id = current.props.stateLoginValueAim.user.profile_id;
            let fileParts = event[i].name.split(".");
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            axios
              .post(sitedata.data.path + "/aws/sign_s3", {
                fileName: fileName,
                fileType: fileType,
                folders: `${profile_id}/KYC/`,
                bucket: current.props.stateLoginValueAim.user.bucket,
              })
              .then((response) => {
                if (namefield === "UploadID") {
                  current.setState({
                    fileattach1:
                      response.data.data.returnData.url +
                      "&bucket=" +
                      current.props.stateLoginValueAim.user.bucket,
                  });
                } else {
                  current.setState({
                    fileattach2:
                      response.data.data.returnData.url +
                      "&bucket=" +
                      current.props.stateLoginValueAim.user.bucket,
                  });
                }
                current.setState({ fileupods: true });
                setTimeout(() => {
                  current.setState({ fileupods: false });
                }, 3000);
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                if (fileType === "pdf") {
                  fileType = "application/pdf";
                }
                // Put the fileType in the headers for the upload
                var options = { headers: { "Content-Type": fileType } };
                axios
                  .put(signedRequest, file, options)
                  .then((result) => {
                    current.setState({ loaderImage: false });
                  })
                  .catch((error) => { });
              })
              .catch((error) => { });
          }
        } else {
          current.setState({ err_pdf: true, err_document: false, err1: false });
        }
      };
     
