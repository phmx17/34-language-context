// using hook version as well as an HOC to wrap this component
import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,  
  Typography,
  InputBase,
  Switch,
  withStyles  // higher order component; or 'wrapper' used as export of this component
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'; // no { } !!
import styles from '../styles/navBarStyles';  // jss 
import { ThemeContext } from '../context/ThemeProvider';  // import data export from context provider; don't forget to wrap parent component of this
// import { LanguageContext } from '../context/LanguageProvider';  // import data export from context provider; don't forget to wrap parent component of this
import { withLanguageContext } from '../context/LanguageProvider'  // this is the HOC version; using it here with hooks also

const content = {
  english: {
    search: 'Search',
    flag: 'flag gb uk',
    language: 'english'
  },
  german: {
    search: 'Suchen',
    flag: 'flag de',
    language: 'german'
  },
  french: {
    search: 'Chercher',
    flag: 'flag fr',
    language: 'french'
  },
  spanish: {
    search: 'Buscar',
    flag: 'flag es',
    language: 'spanish'
  },
  dutch: {
    search: 'Zoeken',
    flag: 'flag nl',
    language: 'dutch'
  }
}

const Navbar = (props) => {

    const { classes } = props;
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);  // hook verson; consuming context data and toggleTheme property that triggers toggleTheme method defined in ThemeProvider
    const { currentLanguage } = props.language // from props.language.currentLanguage
    const { search, flag, language } = content[currentLanguage];
   
    return (
      <div className={classes.root}>       
        <AppBar position="static" color={isDarkMode ? 'default' : 'primary'} >
          <Toolbar>              
            <Typography className={classes.title} variant="h6" color="inherit">
                Language
            </Typography>
            <div style={{ marginLeft: '20px', marginTop: '4px' }}>
              {currentLanguage === language && <i className={flag} /> }                 
            </div>

            <Typography className={classes.themeTitle} variant="h6" color="inherit">
              Theme   
            </Typography>
            <Switch className={classes.themeSwitch} onChange={toggleTheme} />  {/* toggle theme button; triggers method in ThemeProvider */}

            <div className={classes.grow} />
            <div className={classes.search}> 
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder={search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }} 
              />
            </div>            
          </Toolbar>
        </AppBar>
      </div>
    );
};
// wrapping with HOC which is nicer than wrapping large jsx code block
export default withLanguageContext(withStyles(styles)(Navbar));