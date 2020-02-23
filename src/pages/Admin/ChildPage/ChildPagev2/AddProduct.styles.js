import {makeStyles} from '@material-ui/core'
export const useAddProductStyles = makeStyles(theme => ({
    container : {
        padding: "50px",
    },
    form : {
        display : "flex",
        flexDirection : "column",
    },
    paper: {
          margin: "auto",
          minWidth : 650,
          minHeight : 600,
          display : "flex",
          flexDirection : "column",
          '& > *' : {
              height : "100%"
          }
      },
    boxContainer : {
        display : "flex",
        flexDirection : "row",
    },
    boxLeft : {
        width : "40%",
        display : "flex",
        flexDirection : "column",
    },
    boxRight : {
        width : "60%",
        display : "flex",
        flexDirection : "column",
        '& > *' : {
            marginTop :"10px"
        },
        marginRight: "10px"
    },
    img : {
        height: "300px",
        width : "80%",
        margin : "30px auto"
    },
    contentImage : {
        width : "80%",
        margin : "0px auto"
    },
    rootGridList: {
        padding :"50px",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }, 
    gridList : {
        flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    formControl : {
        width : "47%",
    }
}));