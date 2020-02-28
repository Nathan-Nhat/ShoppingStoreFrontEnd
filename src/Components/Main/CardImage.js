import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard({imgSrc, onChange, onDelete }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image= {imgSrc}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions>
      <label for="upload-photo" style = {{cursor : "pointer", background: "red"}}>Browse...</label>
      <input style = {{ zIndex: -1,
                        position: "absolute",
                       }}
        type="file" name="photo" id="upload-photo" 
        onChange = {onChange}/>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}