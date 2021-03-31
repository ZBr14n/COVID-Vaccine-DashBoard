import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/Cities.scss"

import { withStyles } from '@material-ui/core/styles';

// tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// search input
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';


// dialog
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';


import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


// const emails = ['username@gmail.com', 'user02@gmail.com'];

const useStyles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },



  root2: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },


  // grid layout
  root3: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },


  // dialog 
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});



class Cities extends Component {
    state = {
        vaxSites_byCity: [],

        // for dialog
        // open: false,
        // selectedValue: emails[1]
    }

    componentDidMount(){
    // capture user selection for cityname to be reuse for fetching state vaccine data.
      document.getElementsByClassName('important-notice')[0].style.display = 'none'
        
     fetch('https://www.vaccinespotter.org/api/v0/states/' + localStorage.getItem('stateCode') + '.json')
        .then(res => res.json())
        .then(data => this.setState( {vaxSites_byCity: [data]} ))
        .then( ()=> console.log(this.state.vaxSites_byCity))
        
    }

    isRetailPharmacy = (providerBrand) => {
      if(providerBrand == 'walmart' || 'walgreens' == providerBrand || 'cvs' == providerBrand ){
        return 'Retail Pharmacy'
      }
      return 'Other'
    }


    handleMoreDetails = () => {
      // window.location.href = '/details'
      window.location.replace(window.location.origin + '/details');
    }

    // handleClickOpen = () => {
    //   this.setState({ open: true })
    // }

    // handleClose = (value) => {
    //   this.setState({ open: false })
    //   this.setState({ selectedValue: value })
    // }

    
    
    render() {
        const {classes} = this.props        
        // console.log( this.state.vaxSites_byCity.map((entry) => entry) )

        return (
            <>
             <TableContainer component={Paper} className={'cities-table-container'}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Location Name (Vaccination Sites in {localStorage.getItem('stateCode')})</TableCell>
                      <TableCell align="center">Site Type</TableCell>
                      <TableCell align="center">Availability</TableCell>
                      <TableCell align="center">More Information</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                        {
                            this.state.vaxSites_byCity.map((entry, key) => {
                              
                              
                                return entry.features.map((entry2, key2) => {
                                  if(entry2.properties?.address !== null){
                                    return(
                                      <TableRow key={entry2.properties.id}>
                                        <TableCell component="th" scope="row">
                                          <Paper className={classes.paper}>
                                            <Link href="#">
                                              {entry2.properties.name + ': ' + entry2.properties.provider_brand_name + ' (' + entry2.properties.city + ', ' + entry2.properties.state + ')'}
                                            </Link>
                                            <br />
                                            {entry2.properties.address + ', ' + entry2.properties.city + ', ' + entry2.properties.state + " " + entry2.properties.postal_code}
                                          </Paper>
                                        </TableCell>

                                        <TableCell align="center">
                                          <Paper className={classes.paper}>{this.isRetailPharmacy(entry2.properties.provider_brand) !== 'Other' ? 'Retail Pharmacy' : 'Other'}</Paper>
                                        </TableCell>

                                        <TableCell align="center">
                                          
                                            <Paper className={classes.paper}>
                                              <div style={entry2.properties.appointments_available === false ? {color:'#EB5757'} : {color:'#6AAB75'}}>
                                                
                                                {entry2.properties.appointments_available === false ? <PeopleIcon /> : <HelpIcon />}
                                                {'  '}
                                                {entry2.properties.appointments_available === false ? 'Currently Full' : 'See Details'}
                                              </div>
                                            </Paper>
                                          
                                        </TableCell>

                                        <TableCell align="center">
                                          <Link to={{
                                            pathname: "/details",
                                            state: { 
                                              address: entry2.properties.address, 
                                              name: entry2.properties.name,
                                              providerBrandName: entry2.properties.provider_brand_name,
                                              city: entry2.properties.city,
                                              stateCode: entry2.properties.state,
                                              postalCode: entry2.properties.postal_code,
                                              appointments: entry2.properties.appointments
                                              
                                            }
                                          }}>
                                            <Button color="primary">DETAILS</Button>
                                          </Link>

                                          <ArrowForwardIosIcon />
                                        </TableCell>                                 
                                      </TableRow>
                                    )
                                  }
                                  
                                })
                                
                              
                            })
                          }

                          {/* <Paper component="form" className={classes.root}>

                            <InputBase
                              className={classes.input}
                              placeholder="Search Google Maps"
                              inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                              <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />

                          </Paper> */}
                      </TableBody>
                    </Table>
                  </TableContainer>


                  {/* <DetailDialog selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} /> */}

                  {/* <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                    <List>
                      <ListItem autoFocus button>
                        <ListItemAvatar>
                          <Avatar>
                            <AddIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                      </ListItem>
                    </List>
                  </Dialog> */}


    </>
        )
    }
}

export default withStyles(useStyles)(Cities)