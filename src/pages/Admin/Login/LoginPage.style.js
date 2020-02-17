import {makeStyles} from '@material-ui/styles'
import { Button } from '@material-ui/core'

export const useLoginStyles = makeStyles({
    root : {
        height : "100%",
        width : "100%",
        position :"relative"
    },
    title : {
        padding : "50px"
    },
    paper: {
        width : "560px",
        height: "560px",
        top: "50%",
        left: "50%",
        position : "absolute",
        transform: "translateY(-50%) translateX(-50%)"
    },

    loginForm : {
        display : "flex",
        flexDirection: "column",
        padding: "0px 50px 0px 50px",
        marginTop : "20px"

    },
    element : {
        marginTop: "20px",
    },
    button : {
        marginTop: "80px"
    }

})