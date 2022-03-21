import React, {useState} from 'react';
import axios from 'axios';
// MUI Components
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
// stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// Util imports
// Custom Components
import CardInput from './CardInput';
import sitedata from "sitedata";
import { getPriceId } from "./getPriceId";
import { getLanguage } from "translations/index"

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 500,
//     margin: '35vh auto',
//   },
//   content: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignContent: 'flex-start',
//   },
//   div: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignContent: 'flex-start',
//     justifyContent: 'space-between',
//   },
//   button: {
//     margin: '2em auto 1em',
//   },
// });

function HomePage(props) {
  // const classes = useStyles();
  // State
  let translate = getLanguage(props.languageType)
  let { done, cancel, recEmp_Emailaddress, email_rcv_update_reciept, something_wrong} = translate;
  const [email, setEmail] = useState('');
  const [showError, setshowError] = useState('');
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmitSub = async (event, type) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
    
    } else {
    var price_id = getPriceId(type);
    // var price_id = 'price_1IiFEJH4UyTD79BwEEdzAZe1'
      const res = await axios.post(sitedata.data.path + "/stripeCheckout/sub", {
          payment_method: result.paymentMethod.id, email: email,
        price_id: price_id});
      // eslint-disable-next-line camelcase
      const {client_secret, status} = res?.data?.data?.latest_invoice?.payment_intent;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result1) {
          if (result1.error) {
            setshowError(something_wrong);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            props.onToken(type, res?.data?.data)
            // Show a success message to your customer
          }
        });
      } else {
        props.onToken(type, res?.data?.data)
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  return (
    <Grid container direction="row" spacing="3">
        {showError}
    {/* <Grid item xs={12} md={6}> */}
        {(props.show1 || props.show2 ) && <div className="payment_sec_extra_ser1">
        <TextField
          label={recEmp_Emailaddress}
          id='outlined-email-input'
          helperText={email_rcv_update_reciept}
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
          <CardInput />
          <div className="sbu_button">
          {props.show1 && 
            <button
              onClick={(e) => {
              handleSubmitSub(e, "Doc Around The Clock")
              }}
            >
              {done}
            </button>}
          {props.show2 && 
          <button
            onClick={(e) => {
              handleSubmitSub(e, "Data services")
            }}
          >
            {done}
          </button>}&nbsp;&nbsp;
            <button
              onClick={() => {
                props.CancelClick()
              }}
            >
              {cancel}
            </button>
          </div>
        </ div>}
      {/* </Grid> */}
    </Grid>
  );
}

export default HomePage;