import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button,
	ScrollView,
	TextInput,
	Alert
} from 'react-native';
import styles from '../styles/Mainstyle';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Authentication
 */
class Authenticationscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.console.log('Authenticationscreen.constructor()', props);
	}

	/**
	 *
	 */
	logIn()
	{
		var _that = this;
		this.console.log('Authenticationscreen.logIn()');
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.state.email || !this.state.password) {
			_that.displayErrorAlert('All fields have to be filled in');
		}
		else if (!re.test(this.state.email))
		{
			_that.displayErrorAlert('The email address is not valid');
		}
		else
		{
			this.user.authenticate(this.state.email, this.state.password).then(
				function(data){
					if (data === true)
					{
						_that.lendyooRegistry.isAuthenticated = true;
						_that.lendyooRegistry.User_id = _that.user._id;
						_that.lendyooRegistry.routes.gotTo("lend");
					} else
						_that.displayErrorAlert('Wrong username or password');
				},
				function(err){
					_that.displayErrorAlert('Unexpected error');
				}
			);
		}
	}

	/**
	 *
	 * @param msg
	 */
	displayErrorAlert(msg='')
	{
		Alert.alert(
			'Error',
			msg,
			[{text: 'OK', onPress: () => console.log('OK Pressed')}],
			{ cancelable: false }
		);
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

	focusNextField(nextField){
		this.refs[nextField].focus();
	};

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Authenticationscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Welcome to Lendyoo v{ this.lendyooRegistry.appVersion } !
					</Text>
				</View>
				<ScrollView>
					<View style={localStyles.RegisterContainer}>
						<Text style={styles.welcome}>
							Authenticate using social medias
						</Text>
						<View style={localStyles.socialViewsCntr}>
							<View style={localStyles.socialViews}>
								<Icon.Button name="facebook" backgroundColor="#3b5998" style={localStyles.socialButton} onPress={ () => this.facebookLogin() }></Icon.Button>
							</View>
							<View style={localStyles.socialViews}>
								<Icon.Button name="twitter" style={localStyles.socialButton} backgroundColor="#1a8bf0" onPress={ () => this.twitterLogin() }></Icon.Button>
							</View>
							<View style={localStyles.socialViews}>
								<Icon.Button name="google" style={localStyles.socialButton} backgroundColor="#DF4A32" onPress={ () => this.googleLogin() }></Icon.Button>
							</View>
						</View>
						<View style={localStyles.socialViews}>
							<Text style={localStyles.or}>
								OR
							</Text>
							<Text style={styles.welcome}>
								Authenticate with a Lendyoo account
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
								onSubmitEditing={() => this.logIn()}
							/>
						</View>
						<View style={localStyles.socialViews}>
							<Icon.Button name="lock" style={localStyles.socialButton} backgroundColor="#FF9100"
										 onPress={ () => this.logIn() }>Log-in</Icon.Button>
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
	RegisterContainer: {
		flex: .7
	},
	data: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	welcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	socialViewsCntr: {
		flex: 1,
		flexDirection: 'row'
	},
	socialViews: {
		padding: 10
	},
	socialButton: {
		margin: 5,
		marginLeft: 15
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

AppRegistry.registerComponent('Authenticationscreen', () => Authenticationscreen);

export default Authenticationscreen;