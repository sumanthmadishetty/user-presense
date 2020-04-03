import React, { Component } from 'react';
import { Snackbar, SnackbarContent, Button } from '@material-ui/core';
import { verifyUser } from 'actions/API';
import Cookies from 'js-cookie';
import { navigate } from '@reach/router';

export const UserDataContext = React.createContext();

const UserDataProvider = UserDataContext.Provider;
export const UserDataConsumer = UserDataContext.Consumer;

const DEFAULT_FLASH_MESSAGE_OBJ = { message: '', type: '' };

class UserData extends Component {
  state = {
    userData: {},
    isAuthenticated: false,
    isLoaded: false,
    flashMessage: { ...DEFAULT_FLASH_MESSAGE_OBJ }
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      verifyUser().then(({ success, data }) => {
        if (success && data._id) {
          return this.setState({ isAuthenticated: true, userData: data, isLoaded: true });
        }
        return this.setState(
          {
            isLoaded: true,
            isAuthenticated: false,
            flashMessage: { message: 'Please login to continue' }
          },
          () => navigate('/login')
        );
      });
    } else {
      this.setState({
        isLoaded: true,
        isAuthenticated: false
      });
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState(
      {
        userData: {},
        isAuthenticated: false,
        flashMessage: { message: 'Successfully loggedout' }
      },
      () => navigate('/login')
    );
  };

  changeFlashMessage = (flashMessage = DEFAULT_FLASH_MESSAGE_OBJ) => {
    this.setState({ flashMessage });
  };

  setUserData = userData => {
    this.setState({ userData });
  };

  setAuthenticated = isAuthenticated => {
    this.setState({ isAuthenticated });
  };

  handleUserLogin = userData => {
    if (userData && userData._id) {
      this.setState({ userData, isAuthenticated: true }, () => navigate('/'));
    }
  };

  render() {
    const { flashMessage, isLoaded } = this.state;
    const { children } = this.props;
    return (
      <UserDataProvider
        value={{
          ...this.state,
          displayFlash: this.changeFlashMessage,
          setUserData: this.setUserData,
          setAuthenticated: this.setAuthenticated,
          handleUserLogin: this.handleUserLogin,
          handleLogout: this.handleLogout
        }}
      >
        <Toast {...flashMessage} handleCloseSnackbar={this.changeFlashMessage} />
        {isLoaded ? children : undefined}
      </UserDataProvider>
    );
  }
}

export default UserData;

function Toast({ message, handleCloseSnackbar }) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={300000}
      onClose={handleCloseSnackbar}
      open={!!message}
    >
      <SnackbarContent
        action={
          <Button onClick={handleCloseSnackbar} color="secondary" size="small">
            X
          </Button>
        }
        message={message}
      />
    </Snackbar>
  );
}
