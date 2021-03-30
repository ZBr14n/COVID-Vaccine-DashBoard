import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import {Link, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


const useGridStyles = (theme) => ({

  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})


class MoreDetails extends Component {

    componentDidMount(){
        document.getElementsByClassName('important-notice')[0].style.display = 'none'       
    }
    
    render() {
        const {classes} = this.props
        const { match, location, history } = this.props

        return (
            <div className={classes.root}>
                
                
                <Grid container spacing={3}>

                    <Grid container item xs={12} sm={6} spacing={3}>
                        
                        <Grid item xs={4}>

                            <Link to={'/cities'}>Start a New Search</Link>
                            <Paper className={classes.paper}>{location.state.name}</Paper>


                        </Grid>
                    
                    </Grid>

                    <Grid container item xs={12} sm={6} spacing={3}>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>{location.pathname}</Paper>
                        </Grid>
                    </Grid>

                    {/* <h1>{this.location.state.addr}</h1> */}
                
                </Grid>

                {/* iframe works */}
                {/* <iframe
                width="600"
                height="450"
                style={{border:'0'}}
                loading="lazy"
                allowfullscreen
                src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyCWWqtxHJMCfYxFEr-p2T26S_9ypWCIkl0&q=' + `${location.state.address + ',+' + location.state.city + ',+' + location.state.stateCode + ',+' + location.state.postalCode}`}>
                </iframe> */}

            </div>
        )
    }
}

export default withStyles(useGridStyles)(withRouter(MoreDetails))