import * as translationEN from "./en.json";
import * as translationDE from "./de.json";
import * as translationSP from "./sp.json";
import * as translationPT from "./pt.json";
import * as translationRS from "./rs.json";
import * as translationNL from "./nl.json";
import * as translationCH from "./ch.json";
import * as translationSW from "./sw.json";
import * as translationFR from "./fr.json";
import * as translationAR from "./ar.json";
import * as translationTR from "./tr.json"; 


const getLanguage = (languageType) => {
    switch (languageType) {
        case "en":
            return translationEN.text
        case "de":
            return translationDE.text
        case "pt":
            return translationPT.text
        case "sp":
            return translationSP.text
        case "rs":
            return translationRS.text
        case "nl":
            return translationNL.text
        case "ch":
            return translationCH.text
        case "sw":
            return translationSW.text
        case "fr":
            return translationFR.text
        case "ar":
            return translationAR.text
        case "tr":
            return translationTR.text
        default:
            return translationEN.text
    }
}

export {
    getLanguage,
    translationAR,
    translationSW,
    translationSP,
    translationRS,
    translationEN,
    translationNL,
    translationDE,
    translationCH,
    translationPT,
    translationFR,
    translationTR
}