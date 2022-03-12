import React, { useState, useEffect } from "react"
import axios from "axios"
import sitedata from "sitedata";

export const S3Image = ({ imgUrl }) => {
    const [image, setimage] = useState(null)

    useEffect(() => {
        getDocImage(imgUrl)
    }, [imgUrl])

    function getDocImage  (profile_image) {
        if(profile_image){
            let find = profile_image.split(".com/")[1];
            axios.get(sitedata.data.path + "/aws/sign_s3?find=" + find)
                .then((response) => {
                    if (response.data.hassuccessed) {
                        setimage(response.data.data)
                    }
                });
        }
        else{
            setimage(require('assets/images/avatar.png')) 
        }
    }

    return (
        <>
            <img src={image} />
        </>
    )
}