import {makeStyles} from '@material-ui/styles'
const useMainPageStyles = makeStyles(theme =>({
        content: {
          padding : "50px"
        },
        footer: {
          textAlign : "center",
          position : "sticky",
          bottom : 0
        }
}));

export default useMainPageStyles;