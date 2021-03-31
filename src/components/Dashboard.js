import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import "../styles/components/Dashboard.scss"

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Button from '@material-ui/core/Button';

const useRowStyles = (theme) => ({

    root: {
        '& > *': {
        borderBottom: 'unset',
        },
    }
})


class Dashboard extends Component {
    state = {

        stateVaccineSites: [],
        open: false,
        expanded: {},
        selectedKey: ""
    }
    componentDidMount(){
        // https://www.vaccinespotter.org/api/v0/states.json       

        // this.setState({ expanded: {...this.state.expanded, ['isOpen']: this.state.open} })

        fetch('https://www.vaccinespotter.org/api/v0/states.json')
            .then(response => response.json())
            .then(data => this.setState({stateVaccineSites: data}))
            .then( ()=> {console.log(this.state.stateVaccineSites)})
        
    }
    
    toggleCollapseButton = (key) => {
        
        if(this.state.selectedKey === key){
            this.setState({ selectedKey: "" })
        }else{
            this.setState({ selectedKey: key })
        }
        
    }

    storeStateCode_SessionStorage = (stateCode) => {
        // sessionStorage.setItem('stateCode', stateCode)
        localStorage.setItem('stateCode', stateCode)

        // window.location.href = '/cities'
        
        window.location.replace(window.location.origin + '/cities');
        
    }


    render() {

        const history = [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ]
        
        return (
            <div>
                <TableContainer component={Paper} className={'dashboard-table-container'}>
                    <Table aria-label="collapsible table">

                        <TableHead>
                            <TableRow key={'table-header'}>
                                <TableCell />
                                <TableCell align="left">State Name</TableCell>
                                <TableCell align="left">State Code</TableCell>
                                <TableCell align="left">Appointment Last Fetched</TableCell>

                                <TableCell align="left">
                                    Vaccination Sites
                                </TableCell>
                               
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {/* populate data with map() here */}
                            {
                                this.state.stateVaccineSites.map((entry, key) => (
                                    <>
                                        <TableRow key={key}>
                                            <TableCell>
                                                <IconButton aria-label="expand row" size="small" onClick={() => this.toggleCollapseButton( key )}>
                                                    {this.state.selectedKey === key ?  <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                                                </IconButton>
                                            </TableCell>
                                            
                                            <TableCell>{entry.name}</TableCell>
                                            <TableCell>{entry.code}</TableCell>
                                            <TableCell>{entry.appointments_last_fetched}</TableCell>

                                            <TableCell>
                                                <Button color="primary" onClick={() => this.storeStateCode_SessionStorage( entry.code ) } >Learn More</Button>
                                            </TableCell>

                                        </TableRow>

                                        {/* when user expands the list */}
                                        <TableRow key={entry.code}>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>


                                                <Collapse in={this.state.selectedKey === key} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Provider Brand Links
                                                    </Typography>


                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow key={'table-header-expanded'}>
                                                                <TableCell align="left">Name</TableCell>
                                                                <TableCell align="left">Status</TableCell>
                                                                <TableCell align="center">Provider URL</TableCell>
                                                                <TableCell align="center">Appointsments last updated</TableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        <TableBody>
                                                            
                                                                {entry.provider_brands && entry.provider_brands.map(( {id, status, name, url, appointments_last_fetched} ) => (
                                                                    <>

                                                                        <TableRow key={id}>
                                                                                <TableCell key={name} component="th" scope="row">{name}</TableCell>

                                                                                <TableCell key={status}>{status}</TableCell>

                                                                                <TableCell key={url} align="right"><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></TableCell>

                                                                                <TableCell key={appointments_last_fetched} align="right">
                                                                                    {appointments_last_fetched}
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    <Button color="primary" onClick={()=> this.storeStateCode_SessionStorage(entry.code)}>Learn More</Button>
                                                                                </TableCell>
                                                                            

                                                                        </TableRow>
                                                                    </>
                                                                ))}
                                                                



                                                                {/* {
                                                                    history.map((entry2,key2) => (
                                                                        <TableRow key={entry.date}>
                                                                            <TableCell component="th" scope="row">
                                                                                {entry2.date}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                } */}
                                                                
                                                                
                                                            

                                                        </TableBody>
                                                    </Table>


                                                    </Box>
                                                </Collapse>


                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            }
                            
                            

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}



export default withStyles(useRowStyles)(withRouter(Dashboard))