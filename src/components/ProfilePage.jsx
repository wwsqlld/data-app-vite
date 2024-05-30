import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../firebase.js';
import { RxAvatar } from "react-icons/rx";
import Cookies from 'js-cookie';

const ProfilePage = () => {

    const profileRef = collection(db, "displayProfiles");


    const [dataAH, setDataAH] = useState();
    const [dataEP, setDataEP] = useState();

    const [displayName, setDisplayName] = useState();


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        const storedDataEP = JSON.parse(localStorage.getItem('dataEP'));

        const getProfile = async () => {
            await getDocs(query(profileRef, where("email", "==", `${storedDataEP.email}`)))
            .then((response) => {
                const dataRN = response.docs.map((doc) => (doc.data()))
                localStorage.setItem('displayName', dataRN[0].displayName);
                setDisplayName(dataRN[0].displayName) 
            })
        }

        if (storedDataEP) {
            getProfile()
            setDataEP(storedDataEP);
            
        } else {
          setDataAH(storedData);  
        }
    },[]);



    // Функция выхода из учетной записи
    const logOut = async () => {
        try {
            await signOut(auth).then(() => {
              Cookies.remove('access_token')
              localStorage.clear()
              window.location.reload()  
            })   
        } catch (err) {
            console.log(err)
        }
    }


    const uploadData = () => {
        if (dataAH) {
           return (
            <>
                <img src={dataAH.photoURL} alt="" width="100px" height="100px"/>
                <p>Name: {dataAH.displayName}</p>
                <p>Email: {dataAH.email}</p>
                <button className='logOutButt' onClick={logOut}>Log Out</button>
                
            </>
           ) 
        } else if (dataEP) {
            return (
            <>
              <RxAvatar size={100}/>
              <p>Name: {localStorage.getItem('displayName') || displayName}</p>
              <p>Email: {dataEP.email}</p>
              <button className='logOutButt' onClick={logOut}>Log Out</button> 
            </> 
            )
        }
        else {
            return (
                null
            )
        }
    }



  return (
    <div className='profile-page'>
        {uploadData()}
    </div>
  )
}

export default ProfilePage
