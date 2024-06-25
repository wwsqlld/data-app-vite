import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { storage } from '../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";

function ProfileImg(props) {


    const [profileImage, setProfileImage] = useState([]);

    const [imgProp] = useState(props.profileImg);

    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
            const listRef1 = ref(storage, `${cookies.access_token}/${imgProp}`);
            try {
                getDownloadURL(listRef1).then((url) => {
                    setProfileImage(url)
                });
            } catch (err) {
                console.log(err)
            }  
    }, []);

    

    return (
        <>
            {profileImage.length === 0 ? (
            <div className='profile-img'></div>
                ) : (
                <div className='profile-img'>
                    <img src={profileImage} width="100%" alt=''/>
                </div>   
            )}                    
                                    
        </>
    )    
}

export default ProfileImg;