import React, { useState, useEffect, useRef } from 'react';
import { Paper, Container, Box, OutlinedInput, Typography, TextField, Select, Button, Divider } from '@material-ui/core'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import themes from '../../../../Themes/DrawerThemes'
import { useAddProductStyles } from './AddProduct.styles'
import { FormControl, InputLabel, MenuItem, CircularProgress, DialogContent, Dialog } from '@material-ui/core'
import { postData, getData, putData } from '../../../../API/Api'
import { useHistory } from 'react-router-dom'
import CardImage from '../../../../Components/Main/CardImage';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import { InputAdornment } from '@material-ui/core'
import DefaultImage from '../../../../Resource/default.png'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import ImageComponent from '../../../../Components/Main/ImageComponent'
import { StepIcon } from '@material-ui/core';
import { Element, animateScroll as scroll, scroller } from 'react-scroll'
import { useDispatch } from 'react-redux';
import { handleError } from '../../../../redux/Actions/ActionObjects/ActionsObjects';


const initState = {
    name: '',
    price: 0,
    category: 1,
    description: '',
    specification: '',
    salePrice: 0,
}
const initContentImage = {
    image: [],
    preview_image: []
}
const AddProductPage = () => {
    const classes = useAddProductStyles(themes);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [state, setState] = useState(initState);
    const [contenImage, setContentImage] = useState(initContentImage);
    const [category, setCategory] = useState([{
        id: 1,
        name: ''
    }]);
    const dispatch = useDispatch();
    const [boldPos, setBoldPost] = useState(1);
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
        console.log(contenImage.image)
        let value = e.target.files[0];
        e.preventDefault()
        if (value === undefined) return;
        var image = contenImage.image;
        var preview_image = contenImage.preview_image;
        if (image.length === 7) {
            alert("Maximum 7 picture");
            return;
        }
        image.push(value);
        preview_image.push(URL.createObjectURL(value));
        setContentImage({
            image: image,
            preview_image: preview_image
        })
    }

    const handleDelete = (e, index) => {
        console.log(index);
        e.preventDefault();
        let tempState = {
            image: null,
            preview_image: null
        }
    }
    useEffect(() => {
        getData('/api/public/category', true)
            .then(res => setCategory(res.data))
            .catch(err => {
                if(err.response !== undefined)
                dispatch(handleError(err.response.data));
            });
    }, []);

    const handleBtnBackClick = () => {
        history.push("/products")
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            id: state.id,
            name: state.name,
            price: state.price,
            description: state.description,
            category: { id: state.category },
            salePrice: state.salePrice,
            specification: state.specification
        }
        const formData = new FormData();
        formData.append('properties', new Blob([JSON.stringify(data)], { type: 'application/json' }));
        console.log(contenImage.image);
        for (var i = 0; i < contenImage.image.length; i++) {
            formData.append('files', contenImage.image[i]);
        }
        try {
            const response = await postData(`/api/secured/products/`, formData, true);
            setOpen(false);
            setSuccess(true)
        } catch (error) {
            setOpen(false);
            setFail(true);
            dispatch(handleError(error.response.data))
        }
    }

    const scrollToDetails = (e, index) => {
        e.preventDefault();
        setBoldPost(index);
        switch (index) {
            case 1:
                scroller.scrollTo('titleScroll', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                })
                break;
            case 2:
                scroller.scrollTo('priceScroll', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                })
                break;
            case 3:
                scroller.scrollTo('imageScroll', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                })
                break;
            default:
                break;
        }
    }

    const handleDeleteImage = (e, index) => {
        var image = contenImage.image;
        var preview_image = contenImage.preview_image;
        console.log(index);
        image.splice(index, 1);
        preview_image.splice(index, 1);
        setContentImage({
            image: image,
            preview_image: preview_image
        })
    }
    return (
        <Box style={{ padding: "50px" }}>
            <label htmlFor="btnBack" className={classes.labelBtn}>
                <ArrowBackIosRoundedIcon fontSize="small" style={{ marginTop: "2px" }} />
                <Typography style={{ fontSize: "16px" }}>Products</Typography>
            </label>
            <button id="btnBack" style={{ display: "none" }} onClick={handleBtnBackClick}>Product</button>
            <Typography style={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px", marginBottom: "10px" }}>New Products</Typography>
            <form onSubmit={handleSubmit}>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                    <Box style={{ width: "75%", minWidth: "750px" }}>
                        <Element name="titleScroll">
                            <Paper style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
                                <Typography style={{ marginBottom: "5px" }}>Title</Typography>
                                <OutlinedInput placeholder="Title *" type="text" name="name" value={state.name} onChange={handleChange} required
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <AssignmentRoundedIcon />
                                        </InputAdornment>}
                                />
                                <Typography style={{ marginBottom: "5px", marginTop: "20px" }}>Description</Typography>
                                <TextField
                                    id="standard-multiline-static"
                                    placeholder="Description"
                                    multiline
                                    rows="11"
                                    variant="outlined"
                                    name="description"
                                    value={state.description}
                                    style={{ marginTop: "10px" }}
                                    onChange={handleChange}
                                    required
                                />
                                <Typography style={{ marginBottom: "5px", marginTop: "20px" }}>Specification</Typography>
                                <TextField
                                    id="standard-multiline-static"
                                    placeholder="Specification"
                                    multiline
                                    rows="11"
                                    variant="outlined"
                                    name="specification"
                                    value={state.specification}
                                    style={{ marginTop: "10px" }}
                                    onChange={handleChange}
                                />
                            </Paper>
                        </Element>
                        <Element name="priceScroll">
                            <Paper style={{ padding: "30px", marginTop: "30px", display: "flex", flexDirection: "column" }}>
                                <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>Pricing & Category</Typography>
                                <Typography style={{ margin: "20px 0 10px 0", fontSize: "14px" }}>Chose category :</Typography>
                                <FormControl variant="outlined" required>
                                    <Select
                                        name="category"
                                        value={state.category}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Phones</MenuItem>
                                        <MenuItem value={2}>Laptops</MenuItem>
                                        <MenuItem value={3}>Watches</MenuItem>
                                        <MenuItem value={4}>Accessories</MenuItem>
                                        <MenuItem value={5}>Cameras</MenuItem>
                                        <MenuItem value={6}>Sports</MenuItem>
                                    </Select>
                                </FormControl>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div style={{ width: "45%" }}>
                                        <Typography style={{ margin: "20px 0 10px 0", fontSize: "14px" }}>Main price :</Typography>
                                        <OutlinedInput placeholder="Main Price *" type="text" name="price" onChange={handleChange} required type="number"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <AttachMoneyRoundedIcon />
                                                </InputAdornment>}
                                            style={{ width: "100%" }}
                                            value={state.price}
                                        />
                                    </div>
                                    <div style={{ width: "45%" }}>
                                        <Typography style={{ margin: "20px 0 10px 0", fontSize: "14px" }}>Sale price :</Typography>
                                        <OutlinedInput placeholder="Sale Price *" type="text" name="salePrice" onChange={handleChange} type="number"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <AttachMoneyRoundedIcon />
                                                </InputAdornment>}
                                            style={{ width: "100%" }}
                                            value={state.salePrice}
                                        />
                                    </div>
                                </div>
                            </Paper>
                        </Element>
                        <Element name="imageScroll">
                            <Paper style={{ padding: "30px", marginTop: "30px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>Image</Typography>
                                    <label htmlFor="uploadIamge" style={{ color: "blue", fontSize: "16px" }} > Upload images</label>
                                    <input id="uploadIamge" type="file" style={{ display: "none" }} onChange={handleImageChange} />
                                </div>
                                {contenImage.image.length === 0 ?
                                    <div>
                                        <img src={DefaultImage} style={{ height: "150px", width: "150px", opacity: "50%", display: "block", margin: "90px auto 20px auto" }} />
                                        <Typography style={{ fontSize: "20px", fontWeight: "bold", opacity: "70%", marginBottom: "70px" }}> Drop Files to Upload </Typography>
                                    </div> :
                                    <div style={{ padding: "30px", display: "fex", flexDirection: "row" }}>

                                        <div style={{ marginRight: "5px", float: "left" }}>
                                            <ImageComponent src={contenImage.preview_image[0]} width="340px" height="340px" handleDelete={(e) => handleDeleteImage(e, 0)} />
                                        </div>
                                        <div>
                                            {contenImage.preview_image.slice(1).map((item, index) => <div key={index}>
                                                <div style={{ width: "170px", height: "170px", float: "left", marginRight: "5px" }}>
                                                    <ImageComponent src={item} width="170px" height="170px" handleDelete={(e) => handleDeleteImage(e, index + 1)} />
                                                </div>
                                            </div>)}
                                        </div>
                                    </div>
                                }
                            </Paper>
                        </Element>
                        <Divider style={{ marginTop: "30px" }} />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px" }}>
                            <Button variant="contained" color="primary" size="large" type="submit">Save Product</Button>
                            <Button variant="contained" size="large" style={{ backgroundColor: "white", marginLeft: "10px" }} onClick={handleBtnBackClick}>Cancel</Button>
                        </div>
                    </Box>
                    <Paper className={classes.instruct}>
                        <Typography style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "20px" }}>Steps</Typography>
                        <Divider></Divider>
                        <Box style={{ padding: "20px" }}>
                            <div>
                                <label htmlFor="toDetails" className={classes.childElement} style={boldPos === 1 ? { fontWeight: "bold" } : null}>1. Add Details and Description</label>
                                <button id="toDetails" style={{ display: "none" }} onClick={(e) => scrollToDetails(e, 1)}></button>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <label htmlFor="toPrice" className={classes.childElement} style={boldPos === 2 ? { fontWeight: "bold" } : null}>2. Pricing and Category</label>
                                <button id="toPrice" style={{ display: "none" }} onClick={(e) => scrollToDetails(e, 2)}></button>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <label htmlFor="toImage" className={classes.childElement} style={boldPos === 3 ? { fontWeight: "bold" } : null}>3. Images</label>
                                <button id="toImage" style={{ display: "none" }} onClick={(e) => scrollToDetails(e, 3)}></button>
                            </div>

                        </Box>
                    </Paper>
                </Box>
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
                        <Typography>Save Product Success. Do you want to continue add?</Typography>
                        <Button color="primary" onClick={() => { setSuccess(false); setState(initState); setContentImage({ image: [], preview_image: [] }) }}>Yes</Button>
                        <Button color="secondary" onClick={() => { setSuccess(false); history.push("/products"); setState(initState); setContentImage({ image: [], preview_image: [] }) }}>No</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog
                open={fail}
            >
                <DialogContent>
                    <Box>
                        <Typography>Fail to add Product. Do you want to try again?</Typography>
                        <Button color="primary" onClick={() => { setFail(false); }}>Yes</Button>
                        <Button color="secondary" onClick={() => { setFail(false); history.push("/products"); setContentImage({ image: [], preview_image: [] }) }}>No</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AddProductPage;