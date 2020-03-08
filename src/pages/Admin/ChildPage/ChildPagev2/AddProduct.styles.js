import {makeStyles} from '@material-ui/core'
export const useAddProductStyles = makeStyles(theme => ({
    container : {
        padding: "50px",
    },
      labelBtn : {
        display : "flex",
        flexDirection : "row",
        '&:hover': {
            cursor : "pointer"
        }
      },
      instruct :{ 
        position : "sticky",
        width : "25%", 
        marginLeft : "30px", 
        height : "180px",
        top : "80px",
        minWidth : "250px",
        padding : "10px"
      },
      childElement :{
        fontSize : "16px",
        cursor : "pointer",
        '&:hover' : {
          textDecoration : "underline",
          color : "blue"
        },
        '&:actove' : {
          fontWeight : "bold"
        }
      }
}));