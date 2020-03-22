import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    img: props => ({
        position: "absolute",
        width: props.width,
        height: props.height,
        borderRadius: "50%",
        border: "3px solid white"
    }),
})

export default function ImageOrders({ productsImg, height, width }) {
    const classes = useStyles({ height, width });
    function getImageArra() {
        var array = [];
        let i = 0;
        for (i = 0; i < productsImg.length; i++) {
            if (i > 2) {
                let remain = productsImg.length - 3;
                array.push(
                    <div style={{ display : "flex", flexDirection : "column", justifyContent :"center", position: "absolute", width: width, height: height, 
                    border: "3px solid white", backgroundColor: "red", borderRadius: "50%", left: `${i * 20}px`}}>
                        <div style = {{fontSize : "15px"}}>
                        {`+ ${remain}`}
                        </div>
                    </div>
                )
                break;
            }
            else
            {
                array.push(<img key = {i} src={productsImg[i]} className={classes.img} style={{ left: `${i * 20}px` }} />)
            }
        }
        return array;
    }
    const image = getImageArra();
    return (
        <div style={{ position: "relative", display : "flex", flexDirection : "column", justifyContent: "center", height : height}}>
            {image}
        </div>
    )
}
