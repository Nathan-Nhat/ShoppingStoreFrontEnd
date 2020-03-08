import {makeStyles} from '@material-ui/core'

const useDialogStyle = makeStyles({
    content : {
        width: "400px", 
        height : "530px",
    },
    closeBtn : {
        position : "absolute",
        right : 0,
    },
    imageContainer : {
        marginTop : "40px"
    },
    image : {
        width : "130px",
        height : "130px",
        display: "block",
        margin: "auto",
        borderRadius : "50%"
    },
    nameContainer : {
        marginTop : "20px",
        textAlign : "center"
    },
    name : {
        fontSize : "25px",
        fontWeight: "bold",
    },
    email : {
        display : "flex",
        flexDirection :"row",
        justifyContent:"center"
    },
    detail :{
        marginTop : "20px",
        height : "180px", 
        backgroundColor : "#f5f5f5",
        padding : "30px"
    },
    action : {
        marginTop : "20px",
        textAlign : "center"
    },
    detailBtn : {
    }
})
export default useDialogStyle;