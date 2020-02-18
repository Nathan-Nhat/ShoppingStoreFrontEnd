import { makeStyles } from "@material-ui/core"; 
const drawerWidth = 240;
const useDrawerStyles = makeStyles((theme) => ({
        drawer: {
            flexShrink: 0,
            whiteSpace: 'nowrap',
            overflowX:"hidden",
            backgroundColor: theme.colorMain.drawer,
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
          drawerClose: {
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            width: theme.spacing(9) + 1,
            [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
            }
          },
          toggleButton: {
            position: "absolute",
            display: 'flex',
            bottom: 0,
            right : 0,
            marginBottom: "25px"
          },
          listIcon : {
            width : "40px"
          },
          listItem: {
            opacity : "50%",
            '&:hover': {
              opacity : "100%",
              backgroundColor: "transparent"
            },
            '&:selection': {
              opacity : "100%"
            }
          },
          center : {
              marginLeft : "9px"
          },
          expandPanelSumary:{
              display : "flex",
              justifyContent: "flex-start",
              left:0,
              transform : "translateX(-22px)"

          },
          expandPanel:{
            boxShadow : "none",
            backgroundColor : "transparent",
            spacing: 0
          },
          divider :{
            backgroundColor : "white",
            opacity : "30%"
          }
}));

export default useDrawerStyles;