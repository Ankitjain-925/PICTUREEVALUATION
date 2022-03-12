export const SearchUser = (searchKey, searchInto) => {
    return searchInto.filter(user => {
        searchKey.toLowerCase()
        let email = user.email.toLowerCase().search(searchKey)
        let name = `${user.first_name} ${user.last_name}`
        name = name.toLowerCase().search(searchKey)
        if (name > -1) {
            return user
        }
        else if (email > -1) {
            return user
        }
        else {
            return false
        }
    })
};


