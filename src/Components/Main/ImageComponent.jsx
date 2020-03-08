import React , {useState} from 'react';
import { IconButton, Button } from '@material-ui/core';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {makeStyles} from '@material-ui/core/styles'
const useStyle = makeStyles({
    container : {
        backgroundImage : props => `url(${props.src})`, 
        backgroundSize: "cover",
        backgroundRepeat : "no-repeat",
        zIndex : 2
    },
    overlay : {
        position: "absolute",
        background: "rgba(0, 0, 0, 0.5)",
        top :0,
        right :0,
        left : 0,
        bottom : 0,
        zIndex: 3
    },none : {
        position: "absolute",
        
        top :0,
        right :0,
        left : 0,
        bottom : 0,
        zIndex: 1
    },
    imgBtnEnter :{
        position :"absolute",
        left : "50%",
        bottom : "5px",
        transform: "translateX(-50%)",
        zIndex : 4
    },
    imgBtnLeave :{
        position :"absolute",
        left : "50%",
        bottom : "5px",
        visibility : "hidden",
    }
})
const ImageComponent = ({src, width, height, handleDelete}) => {
    const classes = useStyle({width, height, src});
    const [hovered, setHovered] = useState(false)
    const handleMouseEnter = () =>{
        setHovered(true);
    }
    const handleMouseLeave = () => {
        setHovered(false)
    }
    return (
        <div style = {{position :"relative"}}  onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>
            <div className = {classes.container} 
            style = {{width : width, height : height}}>
                <IconButton className = {hovered? classes.imgBtnEnter : classes.imgBtnLeave} onClick = {handleDelete} style = {{backgroundColor : "red"}}>
                    <DeleteForeverRoundedIcon fontSize = "small" style = {{color : "white"}}/>
                </IconButton>
            </div>
            <div className = {hovered? classes.overlay : classes.none}></div>
        </div>
    );
};

export default ImageComponent;