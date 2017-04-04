import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Alert
} from 'react-native';
import { Content, Button, Icon, Form, Item, Input, Label, H1, H2, H3 } from 'native-base';

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
			email: 'arnaud@antidot.ca',
			password: 'test'

			//email: '',
			//password: ''
		};
		this.console.log('Authenticationscreen.constructor()', props);
		// if (this.lendyooRegistry.isAuthenticated) this.lendyooRegistry.routes.gotTo('history');
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
			_that.rootComponent.setLoading(true);
			this.user.authenticate(this.state.email, this.state.password).then(
				function(data){
					if (data === true)
					{
						_that.rootComponent.setLoading(false);
						_that.lendyooRegistry.setAuthStatus(true);
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
				<Content>

				<View>
					<H1>
						Welcome to Lendyoo v{ this.lendyooRegistry.appVersion } !
					</H1>
				</View>
					<View style={localStyles.RegisterContainer}>
						<H3>
							Authenticate using social medias
						</H3>
						<View style={localStyles.socialViewsCntr}>
							<View style={localStyles.socialViews}>
								<Icon name="logo-facebook" style={{color: '#3b5998'}} onPress={ () => this.facebookLogin() } />
							</View>
							<View style={localStyles.socialViews}>
								<Icon name="logo-twitter" style={{ color: '#1a8bf0' }} onPress={ () => this.twitterLogin() } />
							</View>
							<View style={localStyles.socialViews}>
								<Icon name="logo-googleplus" style={{ color: '#d34836' }} onPress={ () => this.googleLogin() } />
							</View>
						</View>
						<View style={localStyles.socialViews}>
							<Text style={localStyles.or}>
								OR
							</Text>
							<H3>
								Authenticate with a Lendyoo account
							</H3>
						</View>


						<Form>
							<Item>
								<Label>e-mail</Label>
								<Input
									ref="1"
									spellCheck={false}
									keyboardType="email-address"
									onChangeText={(email) => this.setState({email})}
									value={this.state.email}
									blurOnSubmit={false}
									autoCapitalize="none"
								/>
							</Item>
							<Item  last>
								<Label>Password</Label>
								<Input
									ref="2"
									spellCheck={false}
									keyboardType="default"
									returnKeyType="next"
									autoCapitalize="none"
									secureTextEntry={true}
									onChangeText={(password) => this.setState({password})}
									value={this.state.password}
									blurOnSubmit={false}
									onSubmitEditing={() => this.logIn()}
								/>
							</Item>
						</Form>



						<View style={localStyles.socialViews}>
							<Button ref="3" primary block onPress={ () => this.logIn() }>
								<Text style={localStyles.buttonText}>Log-in</Text>
							</Button>
						</View>
					</View>
				</Content>
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
	or: {
		textAlign: 'center',
		padding: 20
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
	buttonText: {
		textAlign: 'center',
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
