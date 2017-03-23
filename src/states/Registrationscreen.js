import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	ScrollView,
	Alert
} from 'react-native';
import styles from '../styles/Mainstyle';
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
						_that.lendyooRegistry.isAuthenticated = true;
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
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Welcome to Lendyoo !
					</Text>
				</View>
				<ScrollView>
					<View style={localStyles.RegisterContainer}>
						<Text style={styles.welcome}>
							Register using
						</Text>
						<View style={localStyles.socialViews}>
							<Icon.Button name="facebook" backgroundColor="#3b5998" style={localStyles.socialButton}
										 onPress={ () => this.facebookLogin() }>My Facebook Account</Icon.Button>
						</View>
						<View style={localStyles.socialViews}>
							<Icon.Button name="twitter" style={localStyles.socialButton} backgroundColor="#1a8bf0"
										 onPress={ () => this.twitterLogin() }>My Twitter Account</Icon.Button>
						</View>
						<View style={localStyles.socialViews}>
							<Icon.Button name="google" style={localStyles.socialButton} backgroundColor="#DF4A32"
										 onPress={ () => this.googleLogin() }>My Google Account</Icon.Button>
						</View>

						<View style={localStyles.socialViews}>
							<Text style={localStyles.or}>
								OR
							</Text>
							<Text style={styles.welcome}>
								Create an account
							</Text>
						</View>


						<View style={localStyles.socialViews}>
							<TextInput
								ref="1"
								spellCheck={false}
								style={localStyles.formTextField}
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
						<View style={localStyles.socialViews}>
							<TextInput
								ref="2"
								style={localStyles.formTextField}
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
						<View style={localStyles.socialViews}>
							<TextInput
								ref="3"
								style={localStyles.formTextField}
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


						<View style={localStyles.socialViews}>
							<Icon.Button name="thumbs-o-up" style={localStyles.socialButton} backgroundColor="#FF9100"
										 onPress={ () => this.createAccount() }>Create Lendyoo account</Icon.Button>
						</View>
					</View>
				</ScrollView>

			</View>
		);
	}
}


const localStyles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	welcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	socialViews: {
		padding: 5
	},
	socialButton: {
		margin: 5
	},
	welcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	RegisterContainer: {
		flex: .7
	},
	or: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#BDBDBD'
	},
	formTextField: {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		color: '#757575'
	}
});


AppRegistry.registerComponent('Registrationscreen', () => Registrationscreen);

export default Registrationscreen;