import React ,{useState, useEffect}from 'react';
import {Paper, Container, Box, Input, Typography, TextField, Select, Button } from '@material-ui/core'
import {GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import themes from '../../../../Themes/DrawerThemes'
import {useAddProductStyles} from './AddProduct.styles'
import {FormControl, InputLabel, MenuItem, CircularProgress, DialogContent, Dialog} from '@material-ui/core'
import {postData, getData, putData} from '../../../../API/Api'
import {useHistory} from 'react-router-dom'
import CardImage from '../../../../Components/Main/CardImage';
const initState = {
    id : '',
    name : '',
    price : 0,
    category: 1,
    description : ''
}
const initDetailImage = {
    detailImage_1: {
        image : null,
        preview_image: null,
    },
    detailImage_2: {
        image : null,
        preview_image: null,
    },
    detailImage_3: {
        image : null,
        preview_image: null,
    },
    detailImage_4: {
        image : null,
        preview_image: null,
    },
    detailImage_5: {
        image : null,
        preview_image: null,
    },
    detailImage_6: {
        image : null,
        preview_image: null,
    },
}
const initContentImage = {
    image: null,
    preview_image : null
}
const AddProductPage = ({id}) => {
    const classes = useAddProductStyles(themes);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [state, setState] = useState(initState);
    const [contenImage, setContentImage] = useState(initContentImage);
    const [detailImage, setDetailImage] = useState(initDetailImage);
    const [category, setCategory] = useState([{
        id : 1,
        name : null
    }]);
    const handleChange = (e) => {
        e.preventDefault()
        let name = e.target.name;
        let value = e.target.value;
        console.log(value);
        setState({
            ...state,
            [name]: value
        })
    }

    const history = useHistory();
    const handleImageChange = (e) => {
        let value = e.target.files[0];
        e.preventDefault()
        if (value === undefined) return;        
        setContentImage({
            image : value,
            preview_image : URL.createObjectURL(value)
        })
    }
    const setImage = (index, state)=> {
        switch(index){
            case 1:
                setDetailImage({
                    ...detailImage,
                    detailImage_1 : state,
                })
                break;
            case 2:
                setDetailImage({
                    ...detailImage,
                    detailImage_2 : state,
                })
                break;
            case 3:
                setDetailImage({
                    ...detailImage,
                    detailImage_3 : state,
                })
                break;
            case 4:
                setDetailImage({
                    ...detailImage,
                    detailImage_4 : state,
                })
                break;
            case 5:
                setDetailImage({
                ...detailImage,
                detailImage_5 : state,
                })
                break;
            case 6:
                setDetailImage({
                    ...detailImage,
                    detailImage_6 : state,
                })
                break;
            default:
                break;
        }
    }
    const handleDetailImageChange = (e, index) => {
        e.preventDefault()
        let value = e.target.files[0];
        console.log(value);
        if (value === undefined) return;
        let tempState = {
            image : value,
            preview_image: URL.createObjectURL(value)
        }
        setImage(index, tempState);
    }

    const handleDelete = (e, index) => {
        console.log(index);
        e.preventDefault();
        let tempState = {
            image : null,
            preview_image: null
        }
        setImage(index, tempState);
    }
    async function handleSubmit(e){
        e.preventDefault();
        const data = {
                id : state.id,
                name : state.name,
                price : state.price,
                description : state.description,
                category : {id  : state.category},
        }
        const formData = new FormData();
        formData.append('properties', new Blob([JSON.stringify(data)], {type :'application/json'}));
        formData.append('files',contenImage.image);
        console.warn(data);
        try {
            const data = {
                id : state.id,
                image0: contenImage.preview_image === null ? false : true,
                image1: detailImage.detailImage_1.preview_image === null ? false: true,
                image2: detailImage.detailImage_2.preview_image === null ? false: true,
                image3: detailImage.detailImage_3.preview_image === null ? false: true,
                image4: detailImage.detailImage_4.preview_image === null ? false: true,
                image5: detailImage.detailImage_5.preview_image === null ? false: true,
                image6: detailImage.detailImage_6.preview_image === null ? false: true,
            }
            var response = await putData(`/api/admin/products/updateImage`, data, true);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
        formData.append("detailFiles1", detailImage.detailImage_1.image);
        formData.append("detailFiles2", detailImage.detailImage_2.image);
        formData.append("detailFiles3", detailImage.detailImage_3.image);
        formData.append("detailFiles4", detailImage.detailImage_4.image);
        formData.append("detailFiles5", detailImage.detailImage_5.image);
        formData.append("detailFiles6", detailImage.detailImage_6.image);
        // formData.append("deletedImage", );
        setOpen(true);
        try{
            const response = await putData(`/api/admin/products/`, formData, true);
            setOpen(false);
            setSuccess(true)
        } catch (error) {
            setOpen(false);
            setFail(true)
        }
       
    }
    const setDataFromResponse = (response) => {
        console.log(response)
        let tempState = {
            id : response.data.id,
            name : response.data.name,
            price : response.data.price,
            category: response.data.category.id,
            description : response.data.description,
        }
        setState(tempState);

        setContentImage({
            image : null,
            preview_image : response.data.imageMain});
        let tempDetailImage = {
        detailImage_1: {
            image : null,
            preview_image: response.data.imageDetailProduct.imageDetails1,
        },
        detailImage_2: {
            image : null,
            preview_image: response.data.imageDetailProduct.imageDetails2,
        },
        detailImage_3: {
            image : null,
            preview_image: response.data.imageDetailProduct.imageDetails3,
        },
        detailImage_4: {
            image : null,
            preview_image: response.data.imageDetailProduct.imageDetails4,
        },
        detailImage_5: {
            image : null,
            preview_image: response.data.imageDetailProduct.imageDetails5,
        },
        detailImage_6: {
            image : null,
            preview_image: response.data.imageDetailProduct.imageDetails6,
        },
    }
        setDetailImage(tempDetailImage);
    }
    useEffect(()=>{
        getData(`/api/admin/products/${id}`, true)
        .then(response => setDataFromResponse(response))
        .catch(error => console.log(error))
        getData('/api/admin/category', true)
        .then(res => setCategory(res.data))
        .catch(err => console.log(err));
    },[]);
    return (
        <Container className = {classes.container}>
            <form onSubmit = {handleSubmit}>
            <Paper className = {classes.paper}>
                <Box className = {classes.boxContainer}>
                    <Box className = {classes.boxLeft}>
                        <img src = {contenImage.preview_image !== null? contenImage.preview_image  : "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"} className = {classes.img}/>
                        <TextField className = {classes.contentImage} type = "file" name = "contentImage" onChange = {handleImageChange}></TextField>
                    </Box> 
                    <Box className = {classes.boxRight}>
                        <TextField label = "Name" type = "text" name = "name" value = {state.name} onChange = {handleChange} required></TextField>
                        <Box style = {{display : "flex", justifyContent : "space-between"}}>
                            <TextField required label = "Price" type = "number" name = "price" value = {state.price} style = {{width : "47%", marginTop : "8px"}} onChange = {handleChange}></TextField>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label" required>
                                    Catergory
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={category[0].id}
                                name = "category"
                                value = {state.category}
                                onChange={handleChange}
                                // labelWidth={labelWidth}
                                >
                                    {category.map((item, index) => 
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            id="standard-multiline-static"
                            label="Description"
                            multiline
                            rows="11"
                            variant = "outlined"
                            name = "description"
                            value = {state.description}
                            style = {{marginTop : "60px"}}
                            onChange = {handleChange}
                            />       
                    </Box>
                </Box>
                <div className={classes.rootGridList}>
                    <CardImage onImageChange = {(e)=>handleDetailImageChange(e,1)} imgSrc = {detailImage.detailImage_1.preview_image} 
                           onImageDelete = {(e) => handleDelete(e, 1)} idComp = "add1" />
                    <CardImage onImageChange = {(e)=>handleDetailImageChange(e,2)} imgSrc = {detailImage.detailImage_2.preview_image} 
                            onImageDelete = {(e) => handleDelete(e, 2)} idComp = "add2" />
                    <CardImage onImageChange = {(e)=>handleDetailImageChange(e,3)} imgSrc = {detailImage.detailImage_3.preview_image} 
                            onImageDelete = {(e) => handleDelete(e, 3)} idComp = "add3" />
                    <CardImage onImageChange = {(e)=>handleDetailImageChange(e,4)} imgSrc = {detailImage.detailImage_4.preview_image} 
                            onImageDelete = {(e) => handleDelete(e, 4)} idComp = "add4" />
                    <CardImage onImageChange = {(e)=>handleDetailImageChange(e,5)} imgSrc = {detailImage.detailImage_5.preview_image} 
                            onImageDelete = {(e) => handleDelete(e, 5)} idComp = "add5" />
                    <CardImage onImageChange = {(e)=>handleDetailImageChange(e,6)} imgSrc = {detailImage.detailImage_6.preview_image} 
                            onImageDelete = {(e) => handleDelete(e, 6)} idComp = "add6"/>
                </div>
                <Button type = "submit" variant = "contained" color = "primary">Update</Button>
            </Paper>
            
            </form>
            <Dialog
                open={open}
            >
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
            <Dialog
                open={success}
            >
                <DialogContent>
                    <Box>
                        <Typography>Save Product Success</Typography>
                        <Button color = "primary" onClick = {()=>{setSuccess(false);  history.push("/products") }}>Yes</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog
                open={fail}
            >
                <DialogContent>
                    <Box>
                        <Typography>Fail to add Product. Do you want to try again?</Typography>
                        <Button color = "primary" onClick = {()=>{setFail(false); }}>Yes</Button>
                        <Button color = "secondary" onClick = {()=>{setFail(false); history.push("/products");}}>No</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default AddProductPage;