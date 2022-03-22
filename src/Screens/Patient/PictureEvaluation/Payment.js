import React, {useState} from 'react';
import axios from 'axios';
// MUI Components
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
// stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// Util imports
import {makeStyles} from '@material-ui/core/styles';
// Custom Components
import sitedata from "sitedata";
import { getLanguage } from "translations/index"
import { confirmAlert } from "react-confirm-alert";
import { commonHeader } from 'component/CommonHeader/index';
const CURRENCY = "USD";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      'color': '#32325d',
      'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
      'fontSmoothing': 'antialiased',
      'fontSize': '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

function HomePage(props) {
  const classes = useStyles();
  // State
  let translate = getLanguage(props.languageType)
  let { done, cancel, recEmp_Emailaddress, email_rcv_update_reciept, something_wrong,  paymnt_processed,
    ok,
    paymnt_err,} = translate;
  const [email, setEmail] = useState('');
  const [showError, setshowError] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const fromEuroToCent = (amount) => parseInt(amount * 100);

  const handleSubmitSub = async (event) => {
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
    // var price_id = getPriceId(type);
    // var price_id = 'price_1IiFEJH4UyTD79BwEEdzAZe1'
    console.log('result', result)
      const res = await axios.post(sitedata.data.path + "/lms_stripeCheckout", {
        source:  result.paymentMethod.id, currency: CURRENCY, amount: fromEuroToCent(99)});
      // eslint-disable-next-line camelcase
      console.log('res', res)
      const {client_secret, status} = res?.data?.data?.latest_invoice?.payment_intent;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result1) {
          if (result1.error) {
            setshowError(something_wrong);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log('res?.data?.data', res?.data?.data)
            // props.onToken(type, res?.data?.data)
            // Show a success message to your customer
          }
        });
      } else {
        console.log('res?.data?.data1111', res?.data?.data)
        // props.onToken(type, res?.data?.data)
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };
    
  return (
    <Grid container direction="row" spacing="3">
        {showError}
    {/* <Grid item xs={12} md={6}> */}
    {(props.show2 ) && <div className="payment_sec_extra_ser1">
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
           <CardElement options={CARD_ELEMENT_OPTIONS} />
          <div className="sbu_button">
          
            <button
              onClick={(e) => {
                handleSubmitSub(e)
              }}
            >
              {done}
            </button>
         
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