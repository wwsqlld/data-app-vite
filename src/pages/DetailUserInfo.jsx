import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import ProfileImg from '../components/ProfileImg.jsx';
import { db } from '../firebase.js';
import { AiOutlineUser } from "react-icons/ai";

import { GoPencil } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";
import { GoTrash } from "react-icons/go";

import AddImgInUserBtn from '../components/AddImgInUserBtn.jsx';

import ErrorBlock from '../components/ErrorBlock.jsx';

import ListOfImages from '../components/ListOfImages.jsx';



export const IndPerson = () => {
    const { id } = useParams();
    const docRef = doc(db, "people", `${id}`);
    const navigate = useNavigate();


    const [dataListOfUser, setDataListOfUser] = useState([]);

    const [listImgInUser, setListImgInUser] = useState();

    const [profileImg, setProfileImg] = useState(null);

    const [areaData, setAreaData] = useState('')
    const [changeButt, setChangeButt] = useState(false);
    

    const [uniqueDesc, setUniqueDesc] = useState([]);


    const [errorMenu, setErrorMenu] = useState(false);
    const [errorT, setErrorT] = useState('');
    const [errorB, setErrorB] = useState(false);


    // Функция поменять состояние кнопки
    const onChangeButt = () => {
        setChangeButt(!changeButt)
    }


    // Функция изменить описание
    const goChangeDesc = async () => {
        if (areaData === '') {
            setChangeButt(false)
        } else {
            const descRef = doc(db, "people", `${id}`);
            try {
                await updateDoc(descRef, {
                    description: areaData
                });
                setChangeButt(false)
                showError("Description has been changed", true)
            } catch (err) {
                console.log(err)
            } 
        }  
    }

    // Функция удалить данные
    const deleteDataInUser = async () => {
        try {
            await deleteDoc(doc(db, "people", `${id}`)).then(() => {
                showError1("Data has been deleted", true)
            })
        } catch (err) {
            console.log(err)
        }
        
    }


    // функция для отображения ошибки
    const showError = (title, boo) => {
        setErrorMenu(true)
        setErrorT(title)
        setErrorB(boo)
        setTimeout(() => {
            setErrorMenu(false)
            window.location.reload()
        }, 1000)
    }


    // функция для отображения ошибки 2 вариант
    const showError1 = (title, boo) => {
        setErrorMenu(true)
        setErrorT(title)
        setErrorB(boo)
        setTimeout(() => {
            setErrorMenu(false)
            navigate('/')
        }, 1500)
    }
    
    // Взять данные
    useEffect(() => {
        const getPeople = async () => {
            try {
                await getDoc(docRef).then((response) => {
                    if (response.data().description) {
                       setUniqueDesc(response.data().description.split('\n')); 
                    }
                    if (response.data().images) {
                        setListImgInUser(response.data().images);
                    }
                    if (response.data().profileImg) {
                        setProfileImg(response.data().profileImg);
                    }
                    setDataListOfUser(response.data());
                            
                })
            } catch (err) {
                console.log(err)
            } 
        }

        getPeople();
    }, []);



    return (
        <div className="home">
            {
          errorMenu ? (
          <ErrorBlock title={errorT} boolen={errorB}/>      
          ) : (
          <></>
          )   
      }
                    <div className='home-container' key={dataListOfUser.id} >
                        <div className='home-cont-small-1-1'>
                            {profileImg ? ( 
                                <>
                                    <ProfileImg profileImg={profileImg} />
                                </>
                            ) : (
                            <div className='profile-img' style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <AiOutlineUser size={100} color="black"/>
                            </div>
                            )}
                            <div className='profile-data'>
                                <p className='txt-data-user'>Full Name: {dataListOfUser.fullName}</p>
                                <p className='txt-data-user'>Country: {dataListOfUser.country}</p>
                                <p className='txt-data-user'>Date of Birthday: {dataListOfUser.dateOfBirth}</p>
                                <p className='txt-data-user'>Phone Number: {dataListOfUser.phone}</p>
                            </div>
                        </div>
                        <div className='home-cont-small-2'>

                            <div className='cont-for-desc'>
                                {!changeButt ? (
                                    <p className='txt-data-user'>
                                        Description:
                                    <br />
                                    <br />
                                    {uniqueDesc.map((para, index) => (
                                        <React.Fragment key={index}>
                                            {para}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                    </p>
                                ) : (
                                    <textarea className='change-data-area' onChange={(e) => setAreaData(e.target.value)}>{dataListOfUser.description}</textarea>
                                )}
                                
                            </div>
                        </div>
                        {listImgInUser ? (
                           <ListOfImages listImgInUser={listImgInUser} changeButt={changeButt}/> 
                        ) : (
                            <p style={{ marginLeft: '10px' }}>No images yet</p>
                        )}
                        
                        
                        <div className='chg-big-cont'>
                            <div className='cont-for-butt-change'>
                                {!changeButt ? (
                                        <div className='change-butt-with-ani' onClick={onChangeButt} >
                                            <GoPencil color='black' size="25px"/>  
                                        </div>
                                ) : (
                                    <div className='goOrNo'>
                                        <div className='cont-cencel-change ani-change' onClick={onChangeButt}><GoX color='black' size="20px" /></div>
                                        <div className='cont-change-go ani-change' onClick={goChangeDesc} ><GoCheck color='black' size="20px" /></div>
                                    </div>
                                )}
                            </div>
                            <AddImgInUserBtn listImgInUser={listImgInUser}/>
                            <button className='delete-btn-cont' onClick={() => deleteDataInUser()}>
                                <GoTrash color='red' size="25px" />
                            </button>
                        </div>    
                    </div>  
        </div>
    )
}