import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../components/login';
import Modal from '../../components/modal';
import {
  hideModal,
  loginReset,
  showModal
} from '../../actions';
import {
  login
} from '../../api';

class LoginModal extends Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.handleClose();
    }
  }

  render() {
    const {
      isAuthenticated,
      isLoading,
      error,
      handleClose,
      showRegister,
      handleLogin
    } = this.props;

    return isAuthenticated ? null : (
      <Modal
        onClose={handleClose}
      >
        <Login
          handleLogin={handleLogin}
          showRegister={showRegister}
          loading={isLoading}
          error={error}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  handleLogin: (username, password) => {
    dispatch(login(username, password));
  },
  handleClose: () => {
    dispatch(hideModal());
    dispatch(loginReset());
  },
  showRegister: () => {
    dispatch(showModal('REGISTER', {}));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
