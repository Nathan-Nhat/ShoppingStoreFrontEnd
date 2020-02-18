import {makeStyles} from '@material-ui/core'

const useDialogStyle = makeStyles({
    content : {
        width: "800px", 
        height : "600px", 
        display : "flex" ,
        flexDirection : "row"
    },
    boxLeft: {
        display : "flex" ,
        flexDirection : "column"
    },
    image : {
        height : "200px",
        width: "200px"
    },
    boxRight: {
        display : "flex" ,
        flexDirection : "column",
        flexGrow : 1,
        justifyContent : "space-around"
    },
    innerRow : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between"
    }


})
export default useDialogStyle;