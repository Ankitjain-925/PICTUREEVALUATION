import axios from "axios";
import sitedata from "sitedata";
import React from "react";
import { speciality } from "speciality";
import Resizer from 'react-image-file-resizer';
import { commonHeader } from "component/CommonHeader/index"
import _ from 'lodash';
//Custom Console So comment only One console works on whole website
export function ConsoleCustom(msg, value) {
  // console.log(msg , value)
}
//Get Date in dd/mm/yyyy format
export function getDate(date, dateFormat) {
  if (date === "") {
    return;
  }
  var d = new Date(date);
  var monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ],
    month = monthNames[d.getMonth()],
    day = d.getDate(),
    year = d.getFullYear();
  if (day.length < 2) day = "0" + day;
  if (dateFormat === "YYYY/DD/MM") {
    return year + " / " + day + " / " + month;
  } else if (dateFormat === "DD/MM/YYYY") {
    return day + " / " + month + " / " + year;
  } else {
    return month + " / " + day + " / " + year;
  }
}

//New Date for Timeline
export function newdate(date) {
  if (date === "") {
    return;
  }
  var d = new Date(date);
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
    month = monthNames[d.getMonth()],
    day = d.getDate();
  if (day.length < 2) day = "0" + day;
  return (
    <a>
      {day} <span>{month}</span>
    </a>
  );
}

//For getting the time
export function getTime(date, timeFormat) {

  if (timeFormat === "12") {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  } else {
    var h = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var m = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return h + ":" + m;
  }
}

//get image url of S3 from the multiple images
export function getImage(image, images) {
  const myFilterData =
    images &&
    images.length > 0 &&
    images.filter((value, key) => value.image === image);
  if (myFilterData && myFilterData.length > 0) {
    return myFilterData[0].new_image;
  }
}
//Sort the time taken
export function mySorter(a, b) {
  var x = a.value.toLowerCase();
  var y = b.value.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
}

//Sort by entry time
export function SortByEntry(a, b) {
  var x = a.created_on.toLowerCase();
  var y = b.created_on.toLowerCase();
  return x > y ? -1 : x < y ? 1 : 0;
}
//Sort by diagnose time
export function SortByDiagnose(a, b) {
  var x = a.datetime_on.toLowerCase();
  var y = b.datetime_on.toLowerCase();
  return x > y ? -1 : x < y ? 1 : 0;
}

//If Req to add doctor as favorite doctor
export function AddFavDoc(doctor_id, profile_id, user_token, user_profile_id) {
  axios
    .put(
      sitedata.data.path + "/UserProfile/AddFavDoc",
      {
        doctor: doctor_id,
        profile_id: profile_id,
      },
      commonHeader(user_token))
    .then((responce) => {
      if (responce.data.hassuccessed === true) {
        axios
          .post(
            sitedata.data.path + "/UserProfile/AddtoPatientList/" + doctor_id,
            {
              profile_id: user_profile_id,
            },
            commonHeader(user_token))
          .then((responce) => { });
      }
    });
}

export function AddFavDoc2(doctor_id, profile_id, user_token, user_profile_id) {
  axios
    .put(
      sitedata.data.path + "/UserProfile/AddFavDoc1/" + user_profile_id,
      {
        doctor: doctor_id,
        profile_id: profile_id,
      },
      commonHeader(user_token))
    .then((responce) => {
      if (responce.data.hassuccessed === true) {
        axios
          .post(
            sitedata.data.path + "/UserProfile/AddtoPatientList/" + doctor_id,
            {
              profile_id: user_profile_id,
            },
            commonHeader(user_token))
          .then((responce) => { });
      }
    });
}

//Get the link of the Image
export function GetUrlImage(find) {
  if (find) {
    var find1 = find.split(".com/")[1];
    axios
      .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
      .then((response) => {
        if (response.data.hassuccessed) {
          window.open(response.data.data, "_blank");
        }
      });
  }
}
export function GetUrlImage1(find) {
  if (find) {
    window.open(find, "_blank");
  }
}
export function capitalizeFirstLetter(string) {
  if (!string) return "";
  let st = string.toLowerCase();
  return st.charAt(0).toUpperCase() + st.slice(1);
}

//For getting doctor speciality
export function getSpec(value, lang) {
  if (!value) return "";
  if (Array.isArray(value)) {
    const valarray =
      value &&
      value.map((_it) =>
        typeof _it === "string"
          ? _it && _it.toLowerCase().replace(/\s/g, "_")
          : _it.value && _it.value.toLowerCase().replace(/\s/g, "_")
      );
    return speciality.english
      .filter((it) => {
        return (
          valarray.includes(it && it.value && it.value.toLowerCase()) ||
          valarray.includes(
            it &&
            it.value &&
            it.value.toLowerCase() &&
            it.value.toLowerCase().replace(/\s/g, "_")
          )
        );
      })
      .map((item) => item["label_" + lang])
      .join(", ")
      .replace(/_/g, " ");
  } else if (typeof value === "object") {
    return value["label_" + lang] ? value["label_" + lang] : value.label;
  } else {
    return "";
  }
}

export function getReminder(reminder, timeFormat) {
  if (reminder && reminder.length > 0) {
    var data = [];
    reminder.map((itm) => {
      var date = new Date(itm.value);
      if (timeFormat === "12") {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        data.push(strTime);
      } else {
        var h = (date.getHours() < 10 ? "0" : "") + date.getHours();
        var m = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        data.push(h + ":" + m);
      }
    });
    return data.join(", ");
  }
}

//get desc date
export function getDesc(a, b) {
  var x = a.date;
  var y = b.date;
  return x < y ? -1 : x > y ? 1 : 0;
}

//Sort by diagnose time
export function SortByGraphView(a, b) {
  var x = a.datetime_on.toLowerCase();
  var y = b.datetime_on.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
}

//For hospital add new method to block the user
export function blockClick(deletekey, userblock, user_token) {
  axios.put(sitedata.data.path + '/admin/BlockUser/' + deletekey,
    { isblock: !userblock },
    commonHeader(user_token))
    .then((response) => {
      return response;
    })
}

export function sortCometUser(userList) {
  let users = userList && userList.length>0 && userList.sort(function (a, b) {
    if (a.name.includes('undefined') && b.name.includes('undefined')) {
      if (a.uid < b.uid) { return -1; }
      if (a.uid > b.uid) { return 1; }
    }
    else if (a.name.includes('undefined') || b.name.includes('undefined')) {
      if (a.name.includes('undefined')) {
        if (a.uid < b.name) { return -1; }
        if (a.uid > b.name) { return 1; }
      }
      if (a.name.includes('undefined')) {
        if (a.name < b.uid) { return -1; }
        if (a.name > b.uid) { return 1; }
      }
    }
    else {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
    }
    return 0;
  })
  return users
}

export function unreadAtLast(userList, unread) {
  let users = userList && userList.length>0 && userList.filter(function (usersa) {
    if (unread && unread.users && unread.users.hasOwnProperty(usersa.uid)) {
      return false;
    }
    else {
      return true;
    }
  })
  return users
}

//For find difference
export function timeDiffCalc(dateFuture, dateNow) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  let hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  if (days >= 1) {
    hours = (days * 24) + hours
  }

  let difference = parseFloat(hours + '.' + minutes);

  return difference;
}

export const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    },
    'blob'
  );
});

export const blobToFile = (theBlob, fileName) => {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return new File([theBlob], fileName);
}

export const isLessThanToday = (someDate) => {
  const today = new Date()
  someDate = new Date(someDate)
  return someDate.getDate() >= today.getDate() &&
    someDate.getMonth() >=  today.getMonth() &&
    someDate.getFullYear() >= today.getFullYear()
}

export const isToday = (someDate) => {
  const today = new Date()
  someDate = new Date(someDate)
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}
export const filterPatient = (taskForSelectedHouse) => {
  const patientForFilterArr = _.uniqBy(
    _.map(taskForSelectedHouse, item => item.patient),
    item => item?.profile_id,
  );
  let patientForFilterArr1 = patientForFilterArr.map((item) => {
    let name = (item?.first_name && item?.last_name) ? item?.first_name + ' ' + item?.last_name : item?.first_name;
    return {
      value: item.patient_id? item.patient_id : item.user_id,
      label: name
    }
  })
  return patientForFilterArr1;
};

export function allusers(currentPage,user_token,type,institute_id){
  let data1 = axios.get(`${sitedata.data.path}/admin/allHospitalusers/${institute_id}/${type}/${currentPage}`,
      {
          headers: {
              'token': user_token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
  )
  return data1;
}