
import {SortSubSpeciality } from "../SortSpeciality/index"

export function GetLanguageDropdown(Metadatas, language, name = "") {
  if (Metadatas && Metadatas.length > 0 && language) {
    Metadatas.forEach(function (e, index) {
      if (typeof e === "object") {
        if (name === "timezone") {
          e["label"] = e["text"];
        } else {
          e["label"] = e["label_" + language]
            ? e["label_" + language]
            : e["label"];
        }
        if (name === "personalised_card") {
          e["id"] = index;
        }
      }
    });

    if (name === "subspeciality" || name === "speciality") {
      var lan = SortSubSpeciality(Metadatas, language)
      Metadatas = lan
    }
    return Metadatas;
  } else return;
}
export function GetShowLabel(data, language, name = "") {
  if (data && language) {
    return data["label_" + language]
      ? data["label_" + language]
      : data["label"];
  } else return;
}
export function GetShowLabel1(
  list,
  data,
  language,
  forview = false,
  comesFrom = ""
) {
  if (list && data && data !== "undefined" && language) {
    var filterData =
      list &&
      list.length > 0 &&
      list.filter((d) => {
        if (d.value && data) {
          if (comesFrom === "organ") {
            return d.value.replace(/\s/g, "") === data.replace(/\s/g, "");
          }
          if (comesFrom === "anamnesis") {
            return (
              d.value.replace(/\s/g, "") === data && data.replace(/\s/g, "")
            );
          }
          if (comesFrom === "specialty" || comesFrom === "lpr") {
            return (
              d.value.toLowerCase() === data.toLowerCase().replace(/\s/g, "_")
            );
          }
          if (comesFrom === "rhesus") {
              if(data?.value){
                return (d.value.toLowerCase() === data.value.toLowerCase().replace(/\s/g, "_"))
              }
              else{                
                return (d.value.toLowerCase() === data.toLowerCase().replace(/\s/g, "_"))
              }
          } else {
            return (
              d.value &&
              d.value.toLowerCase().replace(/\s/g, "") === data &&
              data.toLowerCase().replace(/\s/g, "")
            );
          }
        }
      });
    if (filterData && filterData.length > 0) {
      var e = filterData[0];
      e["label"] = e["label_" + language] ? e["label_" + language] : e["label"];
      if (forview) {
        return e.label;
      }
      return filterData[0];
    }
  } else return;
}

export function GetShowLabel12(list, data, language) {
  if (list && data && language) {
    if (Array.isArray(data)) {
      var datat = data.map((_it) => {
        var filterData =
          list &&
          list.length > 0 &&
          list.filter((d) => {
            return (
              d.value.toLowerCase() ===
              _it.value.toLowerCase().replace(/\s/g, "_")
            );
          });
        if (filterData && filterData.length > 0) {
          var e = filterData[0];
          e["label"] = e["label_" + language]
            ? e["label_" + language]
            : e["label"];
          return filterData[0];
        }
      });
      return datat;
    }
  } else return;
}
