export const commonHeader = (user_token) => {
    let Header = {
        headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
            // authorization: 
        }
    }
    return Header
}

export const commonNoTokentHeader = () => {
    let Header = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // authorization:
            // authorization: "Aimedis23"
        }
    }
    return Header
}

export const commonCometHeader = () => {
    let Header = {
        headers: {
            'appId': process.env.REACT_APP_APPID,
            'apiKey': process.env.REACT_APP_APIKEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return Header
}

export const commonCometDelHeader = () => {
    let Header = { 
    'appId': process.env.REACT_APP_APPID,
    'apiKey': process.env.REACT_APP_APIDELKEY, 
    'Content-Type': 'application/json'
  }
  return Header
}
export const commonHeaderToken = () => {
    let Header = {
        headers: {
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluc3RhZmYxQGdtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbjEgU3RhZmYiLCJpZCI6IjYwZmFjMDZkYjMzOTQ1MzNmN2Y5YTcxNiIsInR5cGUiOiJhZG1pbnN0YWZmIiwiaWF0IjoxNjI3NDczNzM1LCJleHAiOjE2MzAwNjU3MzUsImF1ZCI6Imh0dHA6Ly9teXNvZnRjb3JwLmluIiwiaXNzIjoiTXlzb2Z0IGNvcnAiLCJzdWIiOiJzb21lQHVzZXIuY29tIn0.FbR13U5__D4K9Vp8qcSyLpNgUIxX7Kp7r-v86syKYS2xButW0e8HgKV_dxJn0j3DbPuf2inh-pjzwu4aMXCWzA",
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    return Header
}