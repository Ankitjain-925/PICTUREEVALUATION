import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';

var letter = /([a-zA-Z])+([ -~])*/,
  number = /\d+/,
  specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const ChangePass = (e, current) => {
  const state = current.state.Password;
  state[e.target.name] = e.target.value;
  if (
    e.target.value &&
    e.target.value.length > 0 &&
    e.target.name === 'current_pass'
  ) {
    axios
      .post(
        sitedata.data.path + '/UserProfile/Users/checkPass',
        {
          password: current.state.Password.current_pass,
        },
        commonHeader(current.props.user_token)
      )
      .then((responce) => {
        if (responce.data.data) {
          current.setState({ notmatch: false, fillall: false });
        } else {
          current.setState({ notmatch: true, fillall: false });
        }
      });
  }
  current.setState({ Password: state });
};

//For Change Password
export const ChangePassword = (current) => {
  if (
    current.state.Password.new_pass &&
    current.state.Password.new_pass !== '' &&
    current.state.Password.current_pass &&
    current.state.Password.current_pass !== ''
  ) {
    if (!current.state.notmatch) {
      if (
        current.state.Password.new_pass !== '' &&
        current.state.Password.new_pass ===
          current.state.Password.new_pass_comfirm
      ) {
        current.setState({
          notVlidpass: false,
          notmatchCon: false,
          loaderImage: true,
          fillall: false,
        });
        if (
          current.state.Password.new_pass.match(letter) &&
          current.state.Password.new_pass.match(number) &&
          current.state.Password.new_pass.match(specialchar)
        ) {
          axios
            .put(
              sitedata.data.path + '/UserProfile/Users/changePass',
              {
                password: current.state.Password.new_pass,
              },
              commonHeader(current.props.user_token)
            )
            .then((responce) => {
              current.setState({ PassDone: true, loaderImage: false });
              setTimeout(() => {
                current.setState({ PassDone: false });
              }, 5000);
            });
        } else {
          current.setState({
            notmatchCon: false,
            notVlidpass: true,
            loaderImage: false,
            fillall: false,
          });
        }
      } else {
        current.setState({ notmatchCon: true, fillall: false });
      }
    }
  } else {
    current.setState({ fillall: true });
  }
};

// for Enable/Disable 2fa
export const Change2fa = (current) => {
  current.setState({ is2fa: !current.state.is2fa }, () => {
    current.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + '/UserProfile/Users/update',
        {
          is2fa: current.state.is2fa,
        },
        commonHeader(current.props.user_token)
      )
      .then((responce) => {
        current.setState({ is2faDone: true, loaderImage: false });
        setTimeout(() => {
          current.setState({ is2faDone: false });
        }, 5000);
      });
  });
};

// for follow/unfollow newsletter
export const ChangenewsLetter = (current) => {
  current.setState(
    {
      Aimedis_health_newletter: !current.state.Aimedis_health_newletter,
      newsletter_last_update_date: new Date(),
    },
    () => {
      current.setState({ loaderImage: true });
      axios
        .put(
          sitedata.data.path + '/UserProfile/Users/update',
          {
            Aimedis_health_newletter: current.state.Aimedis_health_newletter,
            newsletter_last_update_date: new Date(),
          },
          commonHeader(current.props.user_token)
        )
        .then((responce) => {
          current.setState({ health_newletterDone: true, loaderImage: false });
          setTimeout(() => {
            current.setState({ health_newletterDone: false });
          }, 5000);
        });
    }
  );
};
