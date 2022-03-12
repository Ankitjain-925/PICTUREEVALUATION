import sitedata, { data } from "sitedata";
import axios from "axios";
export const updateBlockchain = async (
  userInfo,
  track_record,
  organ_data = {},
  type = "tracker",
) => {
  if (!userInfo || !track_record) return;
  const profile_id = userInfo.profile_id;

  var vaccination = track_record.filter(
    (value, key) => value.type === "vaccination"
  ).map((data)=>
   {return {date: data.data_of_vaccination, vaccination: data.vaccination}});
  axios
    .post(sitedata.data.path + "/blockchain/dataManager", {
      path: "dataManager/getDetails/patient",
      data: {
        _selfId: profile_id,
        _patientId: profile_id,
      },
    })
    .then((response3) => {
      if (response3 && response3.data && response3.data.name === "Error") {
        axios
          .post(sitedata.data.path + "/blockchain/dataManager", {
            path: "dataManager/generate/token/patient",
            data: { _password: "123456" },
          })
          .then((response5) => {
            updateInfo(
              userInfo,
              response5.data.address,
              track_record,
              organ_data,
              type,
              vaccination
            );
          });
      } else {
        axios
          .post(sitedata.data.path + "/blockchain/dataManager", {
            path: "dataManager/generate/token/patient",
            data: { _password: "123456" },
          })
          .then((response5) => {
            var dataHeightWegiht = track_record.filter(
              (value, key) => value.type === "weight_bmi"
            );
            var datas = {};
            if (dataHeightWegiht && dataHeightWegiht.length > 0) {
              response3.data["Weight"] = dataHeightWegiht[0].weight;
              response3.data["Height"] = dataHeightWegiht[0].height;
            }
            if (type === "tracker") {
              response3.data["Track Record"] = track_record;
              response3.data["Vaccination"] = vaccination;
            } else if (type === "organ_data") {
              response3.data["organ_data"] = organ_data;
            } else {
              response3.data["Track Record"] = track_record;
              response3.data["organ_data"] = organ_data;
              response3.data["Vaccination"] = vaccination;
            }

            datas["_patientData"] = response3.data;
            datas["_publicKey"] = response5.data.address;
            datas["_patientId"] = userInfo.profile_id;
            axios
              .post(sitedata.data.path + "/blockchain/dataManager", {
                path: "dataManager/update/patient",
                data: datas,
              })
              .then((response6) => {});
          });
      }
    })
    .catch((err) => {
      axios
        .post(sitedata.data.path + "/blockchain/dataManager", {
          path: "dataManager/generate/token/patient",
          data: { _password: "123456" },
        })
        .then((response5) => {
          updateInfo(
            userInfo,
            response5.data.address,
            track_record,
            organ_data,
            type,
            vaccination
          );
        });
    });
};

const updateInfo = async (userInfo, key, track_record, organ_data, type, vaccination) => {
  const data = {
    _patientId: userInfo.profile_id,
    _publicKey: key,
    _patientData: {
      email: userInfo.email,
      "First Name": userInfo.first_name,
      "Last Name": userInfo.last_name,
      DOB: userInfo.birthday,
      Sex: userInfo.sex,
      Address: userInfo.city,
      "Contact Email": userInfo.email,
      Language: userInfo.language,
    },
  };
  if (type === "tracker") {
    data._patientData["Track Record"] = track_record;
    data._patientData["Vaccination"] = vaccination;
  } else if (type === "organ_data") {
    data._patientData["organ_data"] = organ_data;
  } else {
    data._patientData["Track Record"] = track_record;
    data._patientData["Vaccination"] = vaccination;
    data._patientData["organ_data"] = organ_data;
  }
  axios
    .post(sitedata.data.path + "/blockchain/dataManager", {
      path: "dataManager/add/patient",
      data: data,
    })
    .then((response6) => {})
    .catch(() => {});
};
