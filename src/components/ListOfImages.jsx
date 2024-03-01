import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { storage } from '../firebase.js';
import { ref, getDownloadURL, getMetadata } from "firebase/storage";
import ImgFromList from './ImgFromList.jsx';

const ListOfImages = (props) => {

    const [listImgProp] = useState(props.listImgInUser);

    const [newListDat, setNewListDat] = useState([])

    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        const lenghOfArray = listImgProp.length;
        for (let i = 0; i < lenghOfArray; i++) {
            const listRef1 = ref(storage, `${cookies.access_token}/${listImgProp[i]}`);
            const fetchDa = async () => {
             try {
                const getDatUrl = await getDownloadURL(listRef1)
                    // const rezult = getDatUrl
                    
                const getDatName = await getMetadata(listRef1)
                    // const rezult2 = await getDatName;

                    setNewListDat((prevData => [...prevData, { src: getDatUrl, name: getDatName.name }]))
                } catch (err) {
                    console.log(err)
                }    
                }
                fetchDa() 
            }  
        
    }, []);



    const uniqueData = newListDat.filter(
        (item, index, array) => array.findIndex(obj => obj.src === item.src) === index
    );

  return (
    <div className='home-cont-for-img-and-btn'>
        <div className='cont-only-for-img'>
        {uniqueData.map((item) => {
            return (
                <ImgFromList 
                url={item.src} 
                changeButt={props.changeButt} 
                name={item.name} 
                listImgInUser={listImgProp}
                />
            )        
        })}
        </div>
    </div>
  )
}

export default ListOfImages