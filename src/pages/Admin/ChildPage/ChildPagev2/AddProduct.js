import React ,{useState, useEffect}from 'react';
import {Paper, Container, Box, Input, Typography, TextField, Select, Button } from '@material-ui/core'
import {GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import themes from '../../../../Themes/DrawerThemes'
import {useAddProductStyles} from './AddProduct.styles'
import {FormControl, InputLabel, MenuItem, CircularProgress, DialogContent, Dialog} from '@material-ui/core'
import {postData, getData} from '../../../../API/Api'
import {useHistory} from 'react-router-dom'
var detailImageObject = [];
var previewDetailImageObj = [];
const initState = {
    name : '',
    price : 0,
    contentImage : null,
    detailImage : [],
    previewContentImage : '',
    previewDetailImage : [],
    category: 1,
    description : ''
}
const AddProductPage = () => {
    const classes = useAddProductStyles(themes);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [state, setState] = useState(initState);
    const [category, setCategory] = useState([{
        id : 1,
        name : ''
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

        setState({
            ...state,
            contentImage : value,
            previewContentImage : URL.createObjectURL(value)
        })
    }
    const handleDetailImageChange = (e) => {
        e.preventDefault()
        let value = e.target.files[0];
        detailImageObject.push(value)
        previewDetailImageObj.push(URL.createObjectURL(value));
        console.log(state);
        setState({
            ...state,
            detailImage : detailImageObject,
            previewDetailImage: previewDetailImageObj,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
                name : state.name,
                price : state.price,
                description : state.description,
                category : {id  : state.category},
        }
        const formData = new FormData();
        formData.append('properties', new Blob([JSON.stringify(data)], {type :'application/json'}));
        formData.append('files',state.contentImage);
        console.warn(data);
        state.detailImage.map(image => {
            formData.append("detailFiles", image);
        })
        console.log(state.detailImage)
        setOpen(true);
        postData('/api/admin/products/', formData, true)
        .then(response=> {
            setOpen(false);
            setSuccess(true)})
        .catch(err => {
            setOpen(false);
            setFail(true)
        });
       
    }
    useEffect(()=>{
        setDefault();
        getData('/api/admin/category', true)
        .then(res => setCategory(res.data))
        .catch(err => console.log(err));
    },[]);
    const setDefault = ()=>{
        detailImageObject = [];
        previewDetailImageObj = [];
    }
    return (
        <Container className = {classes.container}>
            <form onSubmit = {handleSubmit}>
            <Paper className = {classes.paper}>
                <Box className = {classes.boxContainer}>
                    <Box className = {classes.boxLeft}>
                        <img src = {state.previewContentImage !== ''? state.previewContentImage  : "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"} className = {classes.img}/>
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
                    <GridList className={classes.gridList} cols={3.5}>
                        {[0, 1, 2, 3, 4].map((item, index)=><GridListTile key = {index}>
                           <img src= {state.previewDetailImage[index]? state.previewDetailImage[index] : "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"} /> 
                        </GridListTile>
                        )}
                    </GridList>
                    <TextField type = "file" style = {{right : "0"}} onChange = {handleDetailImageChange}/>
                    
                </div>
                <Button type = "submit" variant = "contained" color = "primary">Upload</Button>
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
                        <Typography>Save Product Success. Do you want to continue add?</Typography>
                        <Button color = "primary" onClick = {()=>{setSuccess(false); setState(initState); setDefault()}}>Yes</Button>
                        <Button color = "secondary" onClick = {()=>{setSuccess(false); history.push("/products"); setDefault()}}>No</Button>
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
                        <Button color = "secondary" onClick = {()=>{setFail(false); history.push("/products"); setDefault()}}>No</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default AddProductPage;