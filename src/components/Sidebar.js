import React, { Component } from 'react'
import {Link, Switch, BrowserRouter as Router, Route} from 'react-router-dom'

import Dashboard from './Dashboard'
import Cities from './Cities'
import User from './User'


import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FilterListIcon from '@material-ui/icons/FilterList';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MoreDetails from './MoreDetails'

const useStyles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});


class Sidebar extends Component {

    state = {
        open: true
    }
    handleToggleOpen = () => {
        this.setState({open: !this.state.open})
    }

    render() {

        const {classes} = this.props

        return (
            <Router>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        COVID-19 VACCINE FINDER
                        </ListSubheader>
                    }
                    className={classes.root}
                >
                    
                    <Link to="/">
                        <ListItem button>

                            <ListItemIcon>
                                <PublicIcon />
                            </ListItemIcon>

                            <ListItemText primary="Search By State" />
                        </ListItem>
                    </Link>
                    

                    <Link to="/cities">
                        <ListItem button>
                            <ListItemIcon>
                                <LocationCityIcon />
                            </ListItemIcon>

                            <ListItemText primary="Search Cities By State" />
                        </ListItem>
                    </Link>


                    <ListItem button onClick={this.handleToggleOpen}>
                        <ListItemText primary="Filters" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>


                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <FilterListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </List>

                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </List>

                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>






                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    
                    <Route path="/cities">
                        <Cities />
                    </Route>

                    <Route path="/details">
                        <MoreDetails />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default withStyles(useStyles)(Sidebar)