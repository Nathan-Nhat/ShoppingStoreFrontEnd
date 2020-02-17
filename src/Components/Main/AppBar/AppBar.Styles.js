const AppBarStyles = (theme) => {
    return ({
          menuButton: {
            marginRight: 36,
            '&:hover' : {
              backgroundColor : 'transparent'
            }
          },
          AppBar: {
            zIndex: theme.zIndex.drawer + 1,
            height : "75px",
            backgroundColor : "white",
            justifyContent : "center",
          },
        toolbar: theme.mixins.toolbar,
        space: {
          flexGrow: 1,
        }
          })    
};

export default AppBarStyles;