import React, { useState } from 'react';
import axios from 'axios';
// MUI Components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// Util imports
import { makeStyles } from '@material-ui/core/styles';
// Custom Components
import sitedata from 'sitedata';
import { getLanguage } from 'translations/index';
import { confirmAlert } from 'react-confirm-alert';
import Loader from 'Screens/Components/Loader/index';
import { commonHeader } from 'component/CommonHeader/index';
const CURRENCY = 'USD';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
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
  let translate = getLanguage(props.languageType);
  let {
    done,
    cancel,
    recEmp_Emailaddress,
    email_rcv_update_reciept,
    something_wrong,
    paymnt_processed,
    ok,
    paymnt_err,
  } = translate;
  const [email, setEmail] = useState('');
  const [showError, setshowError] = useState('');
  const [loaderImage, setLoaderImage] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const fromEuroToCent = (amount) => parseInt(amount * 100);

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoaderImage(true);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      setLoaderImage(false);
      setshowError('Please fill the full or correct information of CARD');
    } else {
      const res = await axios.post(
        sitedata.data.path + '/lms_stripeCheckout/intent',
        {
          currency: CURRENCY,
          amount: fromEuroToCent(99),
          payment_method_types: ['card'],
        }
      );
      // eslint-disable-next-line camelcase

      const client_secret = res?.data?.data;
      const PaymentIntent = await stripe.confirmCardPayment(
        client_secret.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      if (PaymentIntent.paymentIntent.status === 'succeeded') {
        setLoaderImage(false);
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div
                className={
                  props.settings &&
                  props.settings.setting &&
                  props.settings.setting.mode === 'dark'
                    ? 'dark-confirm react-confirm-alert-body'
                    : 'react-confirm-alert-body'
                }
              >
                <h1>{paymnt_processed}</h1>
                <div className="react-confirm-alert-button-group">
                  <button
                    onClick={() => {
                      onClose();
                      props.saveOnDB(client_secret);
                    }}
                  >
                    {ok}
                  </button>
                </div>
              </div>
            );
          },
        });
      } else {
        setLoaderImage(false);
        let translate = getLanguage(props.languageType);
        let { ok, paymnt_err } = translate;
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div
                className={
                  props.setting &&
                  props.setting.setting &&
                  props.setting.setting.mode === 'dark'
                    ? 'dark-confirm react-confirm-alert-body'
                    : 'react-confirm-alert-body'
                }
              >
                <h1>{paymnt_err}</h1>
                <div className="react-confirm-alert-button-group">
                  <button
                    onClick={() => {
                      onClose();
                    }}
                  >
                    {ok}
                  </button>
                </div>
              </div>
            );
          },
        });
      }
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing="3"
    >
      <div className="err_message">{showError}</div>
      {loaderImage && <Loader />}
      {/* <Grid item xs={12} md={6}> */}
      {props.show2 && (
        <div className="payment_sec_extra_ser1">
          {/* <TextField
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
        /> */}

          <CardElement options={CARD_ELEMENT_OPTIONS} />
          <div className="sbu_button">
            <button
              onClick={(e) => {
                handleSubmitSub(e);
              }}
            >
              {done}
            </button>

            <button
              onClick={() => {
                props.CancelClick();
              }}
            >
              {cancel}
            </button>
          </div>
        </div>
      )}
      {/* </Grid> */}
    </Grid>
  );
}

export default HomePage;
