import {
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
  } from "translations/index";

 
  export const organDonorLang = (key, lang)=>{
    var statusbyp = {};
    if(key == 'yes_to_all')
    {
        statusbyp = {label_en : 'Transplantation of one or more organ / tissues of mine after doctors have pronounced me dead',
                label_tr : 'Doktorlar öldüğümü bildirdikten sonra bir veya daha fazla organ / doku nakli',
                label_pt : 'Transplante de um ou mais órgãos / tecidos meus depois que os médicos me declararam morto',
                label_nl : 'Transplantatie van een of meer organen / weefsels van mij nadat doktoren mij dood hebben verklaard',
                label_rs : 'Трансплантация одного или нескольких моих органов / тканей после того, как врачи констатировали мою смерть',
                label_de : 'Transplantation eines oder mehrerer Organe / Gewebe von mir, nachdem Ärzte mich für tot erklärt haben',
                label_sw : 'Kupandikiza kiungo / tishu moja yangu au zaidi baada ya madaktari kutangaza kuwa nimekufa',
                label_sp : 'Trasplante de uno o más órganos / tejidos míos después de que los médicos me declararon muerto',
                label_ch :  '在医生宣布我死亡后，我的一个或多个器官/组织的移植',
        }
        return statusbyp['label_'+lang];
       
    }
    else if(key == 'exclude_some')
    {
        statusbyp = {label_en : 'Transplantation of organ / tissues of mine after doctors have pronounced me dead accept for following organ / tissues',
        label_tr : 'Doktorlar öldüğümü ilan ettikten sonra organ / doku nakli aşağıdaki organ / dokular için kabul et',
        label_pt : 'Transplante de órgãos / tecidos meus depois que os médicos me declararam morto aceito para os seguintes órgãos / tecidos',
        label_nl : 'Transplantatie van orgaan / weefsels van mij nadat doktoren mij dood hebben verklaard, accepteren voor het volgen van orgaan / weefsels',
        label_rs : 'Трансплантация моего органа / тканей после того, как врачи объявили меня мертвым, согласны на следующие органы / ткани',
        label_de : 'Die Transplantation von Organen / Geweben von mir, nachdem Ärzte mich für tot erklärt haben, akzeptiert für folgende Organe / Gewebe',
        label_sw : 'Upandikizaji wa chombo / tishu za mgodi baada ya madaktari kutamka kuwa nimekufa kukubali kwa kufuata chombo / tishu',
        label_sp : 'Trasplante de órganos / tejidos míos después de que los médicos me hayan declarado muerto aceptar para los siguientes órganos / tejidos',
        label_ch :  '在医生宣布我死亡接受以下器官/组织后，我的器官/组织的移植',}
        return statusbyp['label_'+lang];
    }
    else if(key == 'include_some')
    {
        statusbyp = {label_en :'Transplantation of organ / tissues of mine after doctors have pronounced me dead only for following organ / tissues',
        label_tr :'Sadece aşağıdaki organ / dokular için doktorlar öldüğümü ilan ettikten sonra organ / dokularımın nakli',
        label_pt : 'Transplante de órgãos / tecidos meus depois que os médicos me declararam morto apenas pelos seguintes órgãos / tecidos',
        label_nl : 'Transplantatie van orgaan / weefsels van mij nadat doktoren mij dood hebben verklaard, alleen voor het volgen van orgaan / weefsels',
        label_rs : 'Трансплантация моего органа / тканей после того, как врачи объявили меня мертвым, только для следующих органов / тканей',
        label_de : 'Transplantation von Organen / Geweben von mir, nachdem Ärzte mich nur für folgende Organe / Gewebe für tot erklärt haben',
        label_sw : 'Kupandikiza kiungo / tishu za mgodi baada ya madaktari kutangaza kuwa nimekufa tu kwa kufuata chombo / tishu',
        label_sp : 'Trasplante de órganos / tejidos míos después de que los médicos me hayan declarado muerto solo por los siguientes órganos / tejidos',
        label_ch :  '在医生宣布我仅因以下器官/组织死亡后，我的器官/组织的移植',}
        return statusbyp['label_'+lang];
    }
    else if(key == 'not_allowed')
    {
        statusbyp = {label_en :'NOT allow a transplantation of any of my organs or tissues',
        label_tr :'Organlarımdan veya dokularımdan herhangi birinin nakline izin VERMEYİN',
        label_pt : 'NÃO permitir o transplante de nenhum dos meus órgãos ou tecidos',
        label_nl : 'GEEN transplantatie van mijn organen of weefsels toestaan',
        label_rs : 'НЕ разрешать трансплантацию любого из моих органов или тканей',
        label_de : 'Erlaube KEINE Transplantation meiner Organe oder Gewebe',
        label_sw : 'USiruhusu upandikizaji wa viungo vyangu vyovyote au tishu',
        label_sp : 'NO permitir un trasplante de ninguno de mis órganos o tejidosd me dead',
        label_ch :  '不允许移植我的任何器官或组织',}
        return statusbyp['label_'+lang];
    }
    else if(key == 'decided_by_following')
    {
        statusbyp = {label_en : 'Transplantation of one or more organ / tissues of mine after doctors have pronounced me dead YES or NO shall be decided by the following person',
        label_tr : 'Doktorlar öldüğümü bildirdikten sonra bir veya daha fazla organ / doku nakline aşağıdaki kişi tarafından EVET veya HAYIR karar verilecektir.',
        label_pt : 'O transplante de um ou mais órgãos / tecidos meus após os médicos me declararem morto SIM ou NÃO será decidido pela seguinte pessoa',
        label_nl : 'Transplantatie van een of meer organen / weefsels van mij nadat doktoren mij dood hebben verklaard JA of NEE wordt beslist door de volgende persoon',
        label_rs : 'Решение о трансплантации одного или нескольких моих органов / тканей после того, как врачи объявили меня умершим ДА или НЕТ, принимает следующий человек',
        label_de : 'Die Transplantation eines oder mehrerer Organe / Gewebe von mir, nachdem Ärzte mich für tot erklärt haben JA oder NEIN, wird von der folgenden Person entschieden',
        label_sw : 'Kupandikiza kiungo / tishu moja yangu au zaidi baada ya madaktari kutangaza kuwa nimekufa NDIYO au HAPANA kutaamuliwa na mtu ifuatayo',
        label_sp : 'El trasplante de uno o más órganos / tejidos míos después de que los médicos me hayan declarado muerto SÍ o NO lo decidirá la siguiente persona',
        label_ch :  '在医生宣布我已死亡后，我的一个或多个器官/组织的移植应由以下人员决定',}
        return statusbyp['label_'+lang];
    }
    else
    {
        statusbyp = {label_en : 'Nothing',
        label_tr : 'Hiçbir şey değil',
        label_pt : 'Nada',
        label_nl : 'Niets',
        label_rs : 'Ничего',
        label_de : 'Nichts',
        label_sw : 'Hakuna kitu',
        label_sp : 'Nada',
        label_ch :  '没有',}
        return statusbyp['label_'+lang];
    }
  }

  export const KeyLang = (key, lang)=>{
    var languages = FileLang(lang)
    if(languages[key]) return languages[key];
    switch (key) {
        case 'vaccination_trial': return languages['VaccinationTrial'];
        case 'laboratory_result': return languages['lab_result'];
        case 'hospitalization': return languages['hosp_visit'];
        case 'file_upload': return languages['file_uploads'];
        case 'family_anamnesis': return languages['family_anmnies'];
        case 'covid_19': return languages['covid_diary'];
        case 'sick_certificate': return languages['sick_cert'];
        case 'second_opinion': return languages['secnd_openion'];
        case 'doctor_visit': return languages['doc_visit'];
        case 'first_name': return languages['recEmp_FirstName'];
        case 'last_name': return languages['recEmp_LastName'];
        case 'address': return languages['add'];
        case 'doctor_name': return languages['doc_name'];
        case 'vaccination_charge': return languages['VaccinationCharge'];
        case 'temprature': return languages['temparture'];
        case 'problem': return languages['Problem'];
        case 'remarks': return languages['Remarks'];
        case 'new_diagnoses': return languages['Newdiagnoses'];
        case 'new_medication': return languages['Newmedication'];
        case 'new_allergies': return languages['Newallergies'];
        case 'heart_frequncy': return languages['heart_frequency'];
        case 'rr_diastolic': return languages['RR_diastolic'];
        case 'time_measured': return languages['time_measure'];
        case 'date_measured': return languages['date_measure'];
        case 'event_date': return languages['Date_of_event'];
        case 'symptoms': return languages['symp_notes'];
        case 'conditions': return languages['Conditions'];
        case 'pains': return languages['pain'];
        case 'saturaion': return languages['saturation'];
        case 'diagnosed_by': return languages['diagnosed']+' '+languages['by'];
        case 'diagnosed_on': return languages['date_of_dignose'];
        case 'doctor_id': return languages['doc_id'];
        case 'hospital_id': return languages['hosp_id'];
        case 'hospital_name': return languages['hosp_name'];
        case 'digestion': return languages['Digestion'];
        case 'diary_entry': return languages['diary_note'];
        case 'new_doctor_visits': return languages['Newdoctorvisits'];
        case 'new_hospitalizations': return languages['Newhospitalizations'];
        case 'new_infections': return languages['Newinfections'];
        case 'explanation': return languages['Explanation'];
        case 'data_of_vaccination': return languages['date_of_vaccination'];
        case 'charge_number': return languages['change_num'];
        case 'from_when': return languages['from'] +' '+languages['when'];
        case 'until_when': return languages['until']+' '+languages['when'];
        case 'prescribed_on': return languages['prescribed']+' '+languages['on'];
        case 'substance': return languages['Substance'];
        case 'quick_value': return languages['quik_value'];
        case 'upper_limit': return languages['upr_limit'];
        case 'lower_limit': return languages['lwr_limit'];
        case 'pills_taken': return languages['pill_taken'];
        case 'first_visit_date': return languages['first_visit_day'];
        case 'last_visit_date': return languages['last_visit_day'];
        case 'dod_onset': return languages['date_of_dieses_patient'];
        case 'dod': return languages['date_of_death'];
        case 'date_doctor_visit': return languages['date_doc_visit'];
    }
  }

const FileLang = (lang)=>{
  switch (lang) {
    case "en":
      return translationEN.text;
      break;
    case "de":
      return translationDE.text;
      break;
    case "pt":
      return translationPT.text;
      break;
    case "sp":
      return translationSP.text;
      break;
    case "rs":
      return translationRS.text;
      break;
    case "nl":
      return translationNL.text;
      break;
    case "ch":
      return translationCH.text;
      break;
    case "sw":
      return translationSW.text;
      break;
    case "fr":
      return translationFR.text;
      break;
    case "ar":
      return translationAR.text;
      break;
    case "tr":
      return translationTR.text;
      break;
    default:
      return translationEN.text;
  }
}