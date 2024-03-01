import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase.js';
import {useCookies} from 'react-cookie';
import { StaticInfoUser } from '../components/StaticInfoUser';
import GetStarted from '../components/GetStarted.jsx';
import { RiLoader2Line } from "react-icons/ri";

export const Home = () => {

    const [cookies] = useCookies(["access_token"]); 

    const [dataList, setDataList] = useState([]);
    const [dataWithMarkList, setDataWithMarkList] = useState([]);
    const [dataWithoutMarkList, setDataWithoutMarkList] = useState([]);

    
    // Реф ссылка для базы
    const peopleCollectionRef = collection(db, "people");


    
    // Юс еффект берет данные и дальше распределяет их по двум массивам в зависимости от закладки
    useEffect(() => {
        const getPeople = async () => {
            await getDocs(query(peopleCollectionRef, where("owner", "==", `${cookies.access_token}`))).then((response) => {
                const dataList = response.docs.map((doc) => ({...doc.data(), id: doc.id }));
                const dataWith = dataList.filter(doc => doc.bookmark === true);
                const dataWithout = dataList.filter(doc => doc.bookmark === false);
                setDataWithMarkList(dataWith)
                setDataWithoutMarkList(dataWithout)  
                setDataList(dataList) 
            })
        }
        getPeople();
    }, []);

    




    return (
        <div className='home'>
            {!cookies.access_token ? (
                <GetStarted />
            ) : (
            <>
            {Array.isArray(dataList) && dataList.length > 0 && typeof dataList[0] === 'object' ? (
                <>
                <div className='bookmarked-place'>
                    {dataWithMarkList.map((data) => {
                    return (
                        <StaticInfoUser 
                    id={data.id} 
                    fullName={data.fullName} 
                    country={data.country} 
                    dateOfBirth={data.dateOfBirth} 
                    phone={data.phone} 
                    description={data.description} 
                    images={data.images}
                    bookmark={data.bookmark}
                    />    
                    )
                })}
            </div>
            <div className='regular-place'>
              {dataWithoutMarkList.map((data) => {
                return (
                    <StaticInfoUser 
                    id={data.id} 
                    fullName={data.fullName} 
                    country={data.country} 
                    dateOfBirth={data.dateOfBirth} 
                    phone={data.phone} 
                    description={data.description} 
                    images={data.images}
                    bookmark={data.bookmark}
                    />    
                )
            })}  
            </div>
                </>
            ) : (
                <>
                <div className='no-data-home-page'>
                    <RiLoader2Line size={25} className="load-spin" />
                    <p>No cards yet</p>
                </div>
                </>
            )}
               
            </> 
        )}
        </div>
    )
}
