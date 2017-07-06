import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';
import {
	Alert,
} from 'react-native';

/**
 * Authentication
 */
class Homectrl extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			showLendyooLogin: true,
			showCreateAccount: true,
			email: '',
			password: '',
			password2: ''
		};

		this.console.log('Homectrl.constructor()', props);
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.rootComponent.setLoading(false);
		var _that = this;
		this.storage.getData().then(
			function(dd) {
				if (dd.email && dd.password)
				{
					_that.setState({
						email: dd.email,
						password: dd.password
					});
					if (_that.lendyooRegistry.didLogOut === false)
					{
						_that.logIn();
					}
				}
			}
		);
	}

	/**
	 *
	 * @returns {*}
	 */
	logInPressed()
	{
		if (this.state.showCreateAccount)
			return this.logIn();
		else
			return this.createAccount();
	}

	/**
	 *
	 */
	logIn() {
		var _that = this;
		this.console.log('Homectrl.logIn()');
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.state.email || !this.state.password) {
			_that.displayErrorAlert('All fields have to be filled in');
		}
		else if (!re.test(this.state.email)) {
			_that.displayErrorAlert('The email address is not valid');
		}
		else {
			_that.rootComponent.setLoading(true);
			this.user.authenticate(this.state.email, this.state.password).then(
				function (data) {
					if (data === true) {
						_that.storage.setData(
							{
								email: _that.state.email,
								password: _that.state.password,
							}
						).then(function(){
							_that.rootComponent.setLoading(false);
							_that.rootComponent.setAuth(true);
							_that.lendyooRegistry.setAuthStatus(true);
							_that.lendyooRegistry.User_id = _that.user._id;
							_that.lendyooRegistry.routes.goTo("lendtakepict");
						});
					} else {
						_that.rootComponent.setLoading(false);
						_that.displayErrorAlert('Wrong username or password');
					}
				},
				function (err) {
					_that.rootComponent.setLoading(false);
					_that.displayErrorAlert('Unexpected error');
				}
			);
		}
	}

	/**
	 *
	 */
	createAccount() {
		this.console.log('Homectrl.createAccount()');
		var _that = this;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.state.email || !this.state.password || !this.state.password2) {
			_that.displayErrorAlert('All fields have to be filled in');
		}
		else if (!re.test(this.state.email)) {
			_that.displayErrorAlert('The email address is not valid');
		}
		else if (this.state.password != this.state.password2) {
			_that.displayErrorAlert('Both password do not match');
		}
		else {
			this.user.username = this.state.email;
			this.user.email = this.state.email;
			this.user.password = this.state.password;

			this.user.save(this.state.email, this.state.password).then(
				function (data) {
					if (data === true) {
						_that.storage.setData(
							{
								email: _that.state.email,
								password: _that.state.password,
							}
						).then(
							function(dd)
							{
								_that.lendyooRegistry.setAuthStatus(true);
								_that.lendyooRegistry.User_id = _that.user._id;
								// _that.displayErrorAlert('Account created');
								_that.lendyooRegistry.routes.goTo("lendtakepict");
							}
						);
					} else {
						_that.displayErrorAlert('Something went wrong...');
					}
				},
				function (err) {
					_that.displayErrorAlert('Unexpected error');
				}
			);
		}
	}
	/**
	 *
	 * @param msg
	 */
	displayErrorAlert(msg = '') {
		Alert.alert(
			'Error',
			msg,
			[{text: 'OK', onPress: () => console.log('OK Pressed')}],
			{cancelable: false}
		);
	}

	/**
	 *
	 */
	facebookLogin() {
		this.console.log('Homectrl.facebookLogin()');
		this.displayErrorAlert('Not implemented yet');
	}

	/**
	 *
	 */
	twitterLogin() {
		this.console.log('Homectrl.twitterLogin()');
		this.displayErrorAlert('Not implemented yet');
	}

	/**
	 *
	 */
	googleLogin() {
		this.console.log('Homectrl.googleLogin()');
		this.displayErrorAlert('Not implemented yet');
	}

	/**
	 *
	 * @param nextField
	 */
	focusNextField(nextField) {
		this.refs[nextField].focus();
	};


}

// AppRegistry.registerComponent('Homescreen', () => Homectrl);

export default Homectrl;
