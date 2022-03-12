import { data } from "jquery"

export const MultiFilter = (user, assignedTo, Speciality, fullData) => {
    let fullarray = []

    const assignedToFunc = (array1) => {
        let assignedToNew = []
        assignedToNew = assignedTo.map((item) => {
            return item?.value
        })

        let fullarray2 = []
        let list = []
        let array2 = array1.filter((item) => {
            assignedToNew.includes(item.assinged_to.map((item) => {
                list.push(item.user_id)
            }))
            return list
        })
        if (Speciality && Speciality.length > 0) {
            var spec = SpecialityFunc(array2)
            return spec;
        }
        else {
            return array2;
        }

    }
    const SpecialityFunc = (array2) => {
        let SpecialityNew = []
        SpecialityNew = Speciality.map((item) => {
            return item?.value
        })

        let array3 = array2.filter((item) => SpecialityNew.includes(item?.speciality?._id))
        return array3;
    }
    const userFunc = () => {
        if (user && user.length > 0) {
            let usersNew = []
            usersNew = user.map((item) => {
                return item?.profile_id
            })
            var array1 = fullData.filter((item) => usersNew.includes(item?.patient?.profile_id))
            if (assignedTo && assignedTo.length > 0) {
                var assigned = assignedToFunc(array1)
                return assigned;
            }
            else if (Speciality && Speciality.length > 0) {
                var spec1 = SpecialityFunc(array1)
                return spec1;
            }
            else {
                return array1;
            }
        }
        else if (assignedTo && assignedTo.length > 0) {
            var assig = assignedToFunc(fullData)
            return assig;
        }
        else if (Speciality && Speciality.length > 0) {
            var spec2 = SpecialityFunc(fullData)
            return spec2;
        }
        else {
            return fullData;
        }
    }

    var findData = userFunc(fullData)
    return findData;
}




export const AppointFilter = (user, Speciality, Choosetask, fullData) => {

    // const ChoosetaskFunc = (array1) => {
    //     let assignedToNew = []
    //     assignedToNew = assignedTo.map((item) => {
    //         return item?.value
    //     })

    //     let fullarray2 = []
    //     let list = []
    //     let array2 = array1.filter((item) => {
    //         assignedToNew.includes(item.assinged_to.map((item) => {
    //             list.push(item.user_id)
    //         }))
    //         return list
    //     })
    //     if (Speciality && Speciality.length > 0) {
    //         var spec = SpecialityFunc(array2)
    //         return spec;
    //     }
    //     else {
    //         return array2;
    //     }

    // }

    const SpecialityFunc = (array2) => {
        let SpecialityNew = []
        SpecialityNew = Speciality.map((item) => {
            return item?.value
        })

        let array3 = array2.filter((item) => SpecialityNew.includes(item?.speciality?._id))
        return array3;
    }

    const userFunc = () => {
        if (user && user.length > 0) {
            let usersNew = []
            usersNew = user.map((item) => {
                return item?.profile_id

            })
            var array1 = fullData.filter((item) => usersNew.includes(item?.patient?.profile_id))
            if (Speciality && Speciality.length > 0) {
                var spec1 = SpecialityFunc(array1)
                return spec1;
            }
            // else if (Choosetask && Choosetask.length > 0) {
            //     var task1 = ChoosetaskFunc(array1)
            //     return task1;
            // }
            else {
                return array1;
            }
        }
        else if (Speciality && Speciality.length > 0) {
            var spec1 = SpecialityFunc(array1)
            return spec1;
        }
        // else if (Choosetask && Choosetask.length > 0) {
        //     var task1 = ChoosetaskFunc(array1)
        //     return task1;
        // }
        else {
            return fullData;
        }
    }
    var findData = userFunc(fullData)
    return findData;
}

export const MultiFilter2 = (users, specialities, statusValue, fullData) => {
    let user = users
    let Speciality = specialities
    let status = statusValue

    const statusFunc = (array1) => {
        let stats = []
        stats = stats.map((item) => {
            return item?.value
        })
        let array2 = array1.filter((item) => {
            stats.includes(item?.status?.label)
        })
        return array2;
    }

    // const SpecialityFunc = (array1) => {
    //     // let SpecialityNew = []
    //     // SpecialityNew = Speciality.map((item) => {
    //     //     return item?.value
    //     // })

    //     // let array3 = array1.filter((item) => SpecialityNew.includes(item?.speciality?._id))
    //     return array1;
    // }
    const userFunc = () => {
        if (user && user.length > 0) {
            let usersNew = []
            usersNew = user.map((item) => {
                return item?.value
            })
            var array1 = fullData.filter((item) =>
                usersNew.includes(item?.patient?.profile_id))
            if (status && status.length > 0) {
                var status = statusFunc(array1)
                return status;
            }
            else {
                return array1;
            }
        }

        else if (status && status.length > 0) {
            var stat = statusFunc(fullData)
            return stat;
        }
        else {
            return fullData;
        }
    }
    var findData = userFunc(fullData)
    return findData;

}

export const PatientFlowFilter = (patient, doctor, Speciality, wardData, roomData, fullData) => {
    const roomFunc = (data) => {
        let selectedRoom = []
        selectedRoom.push(roomData.value)

        let list4 = []
        for (let i = 0; i <= data.length; i++) {
            let result = data[i]?.case_numbers?.filter((item) => selectedRoom.includes(item && item?.rooms && item?.rooms?._id
            ))
            if (result && result.length > 0) {
                list4.push({ 'case_numbers': result, 'step_name': data[i]?.step_name, '_id': data[i]?._id })
            }
        }
        return list4;

    }
    const wardFunc = (data) => {
        let selectedWard = []
        selectedWard.push(wardData.value)

        let list3 = []
        for (let i = 0; i <= data.length; i++) {
            let result = data[i]?.case_numbers?.filter((item) => selectedWard.includes(item && item?.wards && item?.wards?._id
            ))
            if (result && result.length > 0) {
                list3.push({ 'case_numbers': result, 'step_name': data[i]?.step_name, '_id': data[i]?._id })
            }
        }
        if (roomData) {
            let roomReturn = roomFunc(list3)
            return roomReturn;
        }
        else {
            return list3;
        }
    }
    const specFunc = (data) => {
        let selectedSpec = []
        selectedSpec.push(Speciality.value)

        let list2 = []
        for (let i = 0; i <= data.length; i++) {
            let result = data[i]?.case_numbers?.filter((item) => selectedSpec.includes(item && item?.speciality && item?.speciality?._id
            ))
            if (result && result.length > 0) {
                list2.push({ 'case_numbers': result, 'step_name': data[i]?.step_name, '_id': data[i]?._id })
            }
        }
        if (wardData) {
            let wardReturn = wardFunc(list2);
            return wardReturn;
        }
        else if (roomData) {
            let roomReturn = roomFunc(list2)
            return roomReturn;
        }
        else {
            return list2;
        }
    }

    const docFunc = (data) => {
        let docData = []
        docData = doctor.map((item) => {
                return item?.value
            })
            let listNew = []
            for (let i = 0; i <= data.length; i++) {
                let result = data[i]?.case_numbers?.filter((item) => docData.includes(item && item?.assinged_to && item?.assinged_to[0]?.user_id
                ))
                if (result && result.length > 0) {
                    listNew.push({ 'case_numbers': result, 'step_name': data[i]?.step_name, '_id': data[i]?._id })
                }
            }
        let docReturn = listNew

        if (Speciality) {
            let returnData = specFunc(docReturn);
            return returnData;
        }
        else if (wardData) {
            let wardReturn = wardFunc(docReturn);
            return wardReturn;
        }
        else if (roomData) {
            let roomReturn = roomFunc(docReturn)
            return roomReturn;
        }
        else {
            return docReturn;
        }
    }
    const patFunc = () => {
        if (patient && patient.length > 0) {
            let usersNew = []
            usersNew = patient.map((item) => {
                return item?.value
            })
            let list = []
            for (let i = 0; i <= fullData.length; i++) {
                let data = fullData[i]?.case_numbers?.filter((item) => usersNew.includes(item?.patient_id
                ))
                if (data && data.length > 0) {
                    list.push({ 'case_numbers': data, 'step_name': fullData[i]?.step_name, '_id': fullData[i]?._id })
                }
            }
            if (doctor && doctor.length > 0) {
                let returnData = docFunc(list);
                return returnData;
            }
            else if (Speciality) {
                let returnData = specFunc(list);
                return returnData;
            }
            else if (wardData) {
                let wardReturn = wardFunc(list);
                return wardReturn;
            }
            else if (roomData) {
                let roomReturn = roomFunc(list)
                return roomReturn;
            }
            else {
                return list;
            }
        }
        else if (doctor && doctor.length > 0) {
            let returnData = docFunc(fullData);
            return returnData;
        }
        else if (Speciality) {
            let returnData = specFunc(fullData);
            return returnData;
        }
        else if (wardData) {
            let wardReturn = wardFunc(fullData);
            return wardReturn;
        }
        else if (roomData) {
            let roomReturn = roomFunc(fullData)
            return roomReturn;
        }
        else {
            return fullData;
        }
    }
    var findData = patFunc(fullData)
    return findData;
}