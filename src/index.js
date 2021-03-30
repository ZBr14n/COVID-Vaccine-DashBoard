import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/components/AccordionNotice.scss"


import App from './App';
import reportWebVitals from './reportWebVitals';


import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


ReactDOM.render(
  <React.StrictMode>
         
          <Accordion className={'important-notice'} defaultExpanded={true}>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
          >
              <Typography className={''}>IMPORTANT INFORMATION</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography>
                      <a href="http://" target="_blank" rel="noopener noreferrer">Check if you are eligible to get vaccinated now</a> and <a href="http://" target="_blank" rel="noopener noreferrer">prepare for your appointment.</a> 

                      Use this page to find a COVID-19 vaccination location. All vaccination locations are listed, but appointment availability is currently only shown for some local Board of Health sites and CVS. For locations not providing their availability, click "Details" to visit their scheduling link for appointment information.

                      If you are eligible for a vaccination you can preregister to be notified when an appointment is available to schedule at one of the 7 mass vaccination locations. <a href="http://" target="_blank" rel="noopener noreferrer">Learn more about preregistration.</a>

                      States receives a limited supply of COVID-19 vaccine doses from the federal government each week. Due to high demand and very limited supply, there are only a small number of available appointments.
              </Typography>
              </AccordionDetails>
          </Accordion>
        

        
          <App />
        
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
