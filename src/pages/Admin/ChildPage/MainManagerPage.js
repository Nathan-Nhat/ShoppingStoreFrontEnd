import React, {useEffect} from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios'
import {Cameras} from './data'
import {postData} from '../../../API/Api'
const MainManagerPage = () => {
    useEffect(()=>{
        for (var item of Cameras)
        {
            var data = {
                name : item.name,
                price : item.price,
                imageMain : `https://cf.shopee.vn/file/${item.image}`,
                category : {id  : 5},
                imageDetailProduct : {
                    imageDetails1 : item.images[0] === undefined ? null :`https://cf.shopee.vn/file/${item.images[0]}`,
                    imageDetails2 :  item.images[1] === undefined ? null :`https://cf.shopee.vn/file/${item.images[1]}`,
                    imageDetails3 :  item.images[2] === undefined ? null :`https://cf.shopee.vn/file/${item.images[2]}`,
                    imageDetails4 :  item.images[3] === undefined ? null :`https://cf.shopee.vn/file/${item.images[3]}`,
                    imageDetails5 :  item.images[4] === undefined ? null : `https://cf.shopee.vn/file/${item.images[4]}`,
                    imageDetails6 :  item.images[5] === undefined ? null :`https://cf.shopee.vn/file/${item.images[5]}`,
                }
            }
            // postData('/api/secured/products/test', data, true)
            // .then(response=> {
            //     console.log(response)})
            // .catch(err => {
            //    console.warn(err)
            // });
        }
    })
    return (
        <Typography>
            In the heat of the
        </Typography>
    );
};

export default MainManagerPage;
