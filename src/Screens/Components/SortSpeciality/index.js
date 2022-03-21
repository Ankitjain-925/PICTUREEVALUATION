export const SortSubSpeciality = (Metadatas, language) => {

    function compareStrings(a, b) {
        // Assuming you want case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    var lan = Metadatas.sort(function (a, b) {
        switch (language) {
            case "en":
                return compareStrings(a.label_en, b.label_en);
            case "de":
                return compareStrings(a.label_de, b.label_de);
            case "pt":
                return compareStrings(a.label_pt, b.label_pt);
            case "sp":
                return compareStrings(a.label_sp, b.label_sp);
            case "rs":
                return compareStrings(a.label_rs, b.label_rs);
            case "nl":
                return compareStrings(a.label_nl, b.label_nl);
            case "ch":
                return compareStrings(a.label_ch, b.label_ch);
            case "sw":
                return compareStrings(a.label_sw, b.label_sw);
            case "fr":
                return compareStrings(a.label_fr, b.label_fr);
            case "ar":
                return compareStrings(a.label_ar, b.label_ar);
            default:
                return compareStrings(a.value, b.value);
        }
    })
    return lan
}
