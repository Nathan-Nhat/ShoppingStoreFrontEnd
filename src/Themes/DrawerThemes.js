import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const Themes = createMuiTheme({
    colorMain : {
      drawer : "#6681FF"
    },
    palette:  { 
        // type : 'dark',
        // primary : {
        //     main : "#ffffff",
        //     dark : "#000000"
        // },
        // secondary : {
        //     main : "#000000",
        //     dark : "#ffffff"
        // },
        background: {
          paper: '#fff',
          default: "rgb(219, 219, 219)"
        },
  },
   typography: {
    fontSize: 13,
    fontFamily:  ['Roboto', 'sans-serif'].join(",")
  },
});

export default Themes;