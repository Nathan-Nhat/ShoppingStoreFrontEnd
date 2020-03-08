import { makeStyles } from "@material-ui/core";

const useAppBarStyle = makeStyles((theme) => {
    return ({
          AppBar: {
            zIndex: theme.zIndex.drawer + 1,
            justifyContent : "center",
          },
        space: {
          flexGrow: 1,
        }
          })    
});

export default useAppBarStyle;