import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles({
  root: {
    display: "flex", 
    flexDirection : "column", 
    marginTop : "10px",
    boxShadow: "0px -1px 33px -10px rgba(0,0,0,0.75)",
    borderRadius : "10px"
  },
  img : {
    height : "300px", 
    width : "300px",
    objectFit : "cover",
    borderRadius : "10px"
  },
  action : {
    display :"flex", 
    flexDirection : "row", 
    justifyContent : "space-between", 
    padding : "10px"
  },
  labelBrs : {
    cursor : "pointer", 
    background: "green", 
    borderRadius : "5px", 
    padding :"10px",
    width : "100px",
    display : "flex",
    boxShadow: "0px -1px 33px -10px rgba(0,0,0,1)",
  },
  inputBrs : {
    zIndex: -1,
    position: "absolute",
    opacity : 0
  },


});

export default function ImgMediaCard({imgSrc, onImageChange, onImageDelete, idComp }) {
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      <img src = {imgSrc !== null ? imgSrc : "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"}
          className = {classes.img}/>
      <div className = {classes.action}>
        <label className = {classes.labelBrs} for= {idComp}>
          <AddIcon/><span style = {{marginTop : "3px"}}>ADD</span>
          </label>
        <input className = {classes.inputBrs}
          type="file" name="photo" id={idComp}
          onChange = {onImageChange}/>
          <Button variant = "contained" style = {{backgroundColor : "Red"}}
          onClick = {onImageDelete}><DeleteSweepIcon/><span style = {{marginTop : "3px"}}>Delete</span></Button>
        </div>
    </div>
  )
}