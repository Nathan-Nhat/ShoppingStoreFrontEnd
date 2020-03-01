import React, {useEffect} from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios'
import dataJson from './data.json'
import {postData} from '../../../API/Api'
const MainManagerPage = () => {
    useEffect(()=>{
        for (var item of dataJson.items)
        {
            console.log(item)
            var data = {
                name : item.name,
                price : item.price,
                imageMain : `https://cf.shopee.vn/file/${item.image}`,
                category : {id  : 1},
                imageDetailProduct : {
                    imageDetails1 : `https://cf.shopee.vn/file/${item.images[0]}`,
                    imageDetails2 : `https://cf.shopee.vn/file/${item.images[1]}`,
                    imageDetails3 : `https://cf.shopee.vn/file/${item.images[2]}`,
                    imageDetails4 : `https://cf.shopee.vn/file/${item.images[3]}`,
                    imageDetails5 : `https://cf.shopee.vn/file/${item.images[4]}`,
                    imageDetails6 : `https://cf.shopee.vn/file/${item.images[5]}`,
                }
            }
            // postData('/api/admin/products/test', data, true)
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