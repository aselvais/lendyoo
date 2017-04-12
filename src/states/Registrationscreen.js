import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	TextInput,
	View,
	ScrollView,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Registration
 */
class Registrationscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Registrationscreen.constructor()', props);
		this.state = {
			email: '',
			password: '',
			password2: ''
		};
		// if (this.lendyooRegistry.isAuthenticated) this.lendyooRegistry.routes.gotTo('history');
	}

	/**
	 *
	 */
	facebookLogin() {
		this.console.log('Registrationscreen.facebookLogin()');
	}

	/**
	 *
	 */
	twitterLogin() {
		this.console.log('Registrationscreen.twitterLogin()');
	}

	/**
	 *
	 */
	googleLogin() {
		this.console.log('Registrationscreen.googleLogin()');
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
	createAccount() {
		this.console.log('Registrationscreen.createAccount()');
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
						_that.lendyooRegistry.setAuthStatus(true);
						_that.lendyooRegistry.User_id = _that.user._id;
						_that.displayErrorAlert('Account created');
//						_that.lendyooRegistry.routes.gotTo("lend");
					} else
						_that.displayErrorAlert('Something went wrong...');
				},
				function (err) {
					_that.displayErrorAlert('Unexpected error');
				}
			);
		}
	}


	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Registrationscreen.render()');
		return (
			<View style={ this.css.regglobalContainer }>

				<View style={this.css.regwelcomeContainer}>
					<Text style={this.css.regwelcomeText}>
						Welcome to Lendyoo !
					</Text>
				</View>
				<ScrollView>
					<View style={this.css.regRegisterContainer}>
						<Text style={this.css.welcome}>
							Register using
						</Text>
						<View style={this.css.regsocialViews}>
							<Icon.Button name="facebook" backgroundColor="#3b5998" style={this.css.regsocialButton}
										 onPress={ () => this.facebookLogin() }>My Facebook Account</Icon.Button>
						</View>
						<View style={this.css.regsocialViews}>
							<Icon.Button name="twitter" style={this.css.regsocialButton} backgroundColor="#1a8bf0"
										 onPress={ () => this.twitterLogin() }>My Twitter Account</Icon.Button>
						</View>
						<View style={this.css.regsocialViews}>
							<Icon.Button name="google" style={this.css.regsocialButton} backgroundColor="#DF4A32"
										 onPress={ () => this.googleLogin() }>My Google Account</Icon.Button>
						</View>

						<View style={this.css.regsocialViews}>
							<Text style={this.css.regor}>
								OR
							</Text>
							<Text style={this.css.welcome}>
								Create an account
							</Text>
						</View>


						<View style={this.css.regsocialViews}>
							<TextInput
								ref="1"
								spellCheck={false}
								style={this.css.regformTextField}
								keyboardType="email-address"
								placeholder="e-mail"
								returnKeyType="next"
								onChangeText={(email) => this.setState({email})}
								value={this.state.email}
								blurOnSubmit={false}
								autoCapitalize="none"
								onSubmitEditing={() => this.focusNextField('2')}
							/>
						</View>
						<View style={this.css.regsocialViews}>
							<TextInput
								ref="2"
								style={this.css.regformTextField}
								spellCheck={false}
								keyboardType="default"
								placeholder="Password"
								returnKeyType="next"
								autoCapitalize="none"
								secureTextEntry={true}
								onChangeText={(password) => this.setState({password})}
								value={this.state.password}
								blurOnSubmit={false}
								onSubmitEditing={() => this.focusNextField('3')}
							/>
						</View>
						<View style={this.css.regsocialViews}>
							<TextInput
								ref="3"
								style={this.css.regformTextField}
								spellCheck={false}
								keyboardType="default"
								placeholder="Re-type password"
								returnKeyType="next"
								autoCapitalize="none"
								secureTextEntry={true}
								onChangeText={(password2) => this.setState({password2})}
								value={this.state.password2}
								blurOnSubmit={false}
								onSubmitEditing={() => this.createAccount()}
							/>
						</View>


						<View style={this.css.regsocialViews}>
							<Icon.Button name="thumbs-o-up" style={this.css.regsocialButton} backgroundColor="#FF9100"
										 onPress={ () => this.createAccount() }>Create Lendyoo account</Icon.Button>
						</View>
					</View>
				</ScrollView>

			</View>
		);
	}
}

AppRegistry.registerComponent('Registrationscreen', () => Registrationscreen);

export default Registrationscreen;