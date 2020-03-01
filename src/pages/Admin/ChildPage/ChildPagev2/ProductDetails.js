import React from 'react';
import EditProduct from './EditProduct'
import {useParams} from 'react-router-dom'
import SearchComp from '../../../../Components/Main/SearchComp'
const ProductDetails = () => {
    let {id} = useParams();
    console.log(id)
    return (
        <div>
            <EditProduct id = {id}/>
        </div>
    );
};
export default ProductDetails;