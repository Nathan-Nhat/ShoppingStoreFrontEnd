import React ,{useState, useEffect}from 'react';
import {Paper, Container, Box, Input, Typography, TextField, Select, Button } from '@material-ui/core'
import {GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import themes from '../../../../Themes/DrawerThemes'
import {useAddProductStyles} from './AddProduct.styles'
import {FormControl, InputLabel, MenuItem, CircularProgress, DialogContent, Dialog} from '@material-ui/core'
import {postData, getData, putData} from '../../../../API/Api'
import {useHistory} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
const initState = {
    name : '',
    price : 0,
    contentImage : null,
    detailImage: [null, null, null, null, null, null],
    previewContentImage : '',
    previewDetailImage : [
        '', '', '', '', '', ''
    ],
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
    const handleDetailImageChange = (e, index) => {
        e.preventDefault()
        console.log(index);
        let value = e.target.files[0];
        var imageDetail = state.detailImage;
        var stateImageDetail = state.previewDetailImage;
        imageDetail[index] = e.target.files[0];
        stateImageDetail[index] = URL.createObjectURL(value);
        console.log("test================");
        setState({
            ...state,
            detailImage : imageDetail,
            previewDetailImage1: stateImageDetail,
        })
    }

    const handleDelete = (e, index) => {
        console.log(index);
        var stateImageDetail = state.previewDetailImage;
        var imageDetail = state.imageDetail;
        imageDetail[index] = null;
        stateImageDetail[index] = '';
        setState({
            ...state,
            detailImage : imageDetail,
            previewDetailImage1: stateImageDetail,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
                id : "8ec525c7-b442-4838-9674-d9edcb42da4c",
                name : state.name,
                price : state.price,
                description : state.description,
                category : {id  : state.category},
        }
        const formData = new FormData();
        formData.append('properties', new Blob([JSON.stringify(data)], {type :'application/json'}));
        formData.append('files',state.contentImage);
        console.warn(data);
        console.log(state.detailImage)
        state.detailImage.map(image => {
            formData.append("detailFiles", image);
        })
        console.log(state.detailImage)
        setOpen(true);
        putData('/api/admin/products/', formData, true)
        .then(response=> {
            setOpen(false);
            setSuccess(true)})
        .catch(err => {
            setOpen(false);
            setFail(true)
        });
       
    }
    useEffect(()=>{
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
                { [0,1,2,3,4,5].map((item, index) =>
                    {
                    return (<Card className={classes.root} key = {index}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="200"
                            image= {state.previewDetailImage[index] !== '' ? state.previewDetailImage[index] : "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"}
                            title="Contemplative Reptile"
                            />
                        </CardActionArea>
                        <CardActions>
                        <label htmlFor= {`upload-photo-${item}`} style = {{cursor : "pointer", background: "red"}}>Browse...</label>
                        <input style = {{ zIndex: -1,
                                            position: "absolute",
                                        }}
                            type="file" name="photo" id= {`upload-photo-${item}`} 
                            onChange = {(e)=>handleDetailImageChange(e, index)}/>
                            <Button size="small" color="primary" onClick = {(e)=> handleDelete(e, index)}>
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>)}
                )}
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
                        <Button color = "primary" onClick = {()=>{setSuccess(false); setState(initState); }}>Yes</Button>
                        <Button color = "secondary" onClick = {()=>{setSuccess(false); history.push("/products");}}>No</Button>
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