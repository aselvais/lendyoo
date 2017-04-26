import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View,
	Alert
} from 'react-native';
import {
	Content,
	Button,
	Icon,
	Form,
	Item,
	Input,
	Label,
	H1,
	H3
} from 'native-base';

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
	logIn() {
		var _that = this;
		this.console.log('Authenticationscreen.logIn()');
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
						_that.rootComponent.setLoading(false);
						_that.rootComponent.setAuth(true);
						_that.lendyooRegistry.setAuthStatus(true);
						_that.lendyooRegistry.User_id = _that.user._id;
						_that.lendyooRegistry.routes.gotTo("lend");
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
		var _that = this;
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

	focusNextField(nextField) {
		this.refs[nextField].focus();
	};

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		/**
		 <View style={this.css.homesocialViews}>
		 <Icon name="logo-twitter" onPress={ () => this.twitterLogin() }/>
		 </View>
		 <View style={this.css.homesocialViews}>
		 <Icon name="logo-googleplus" onPress={ () => this.googleLogin() }/>
		 </View>
		 */
		this.console.log('Authenticationscreen.render()');
		return (
			<Content padder={true}>
			<View style={ this.css.homeglobalContainer }>
					<View>
						<H1>
							Welcome to Lendyoo v{ this.lendyooRegistry.appVersion } !
						</H1>
						<Text style={this.css.homeh3s}>Environemnt: { this.lendyooRegistry.config._env}</Text>
					</View>
					<View style={this.css.homeRegisterContainer}>
						<View style={this.css.homesocialViewsCntr}>
							<View style={this.css.homesocialViews}>
								<Button iconLeft onPress={ () => this.facebookLogin() } style={{ backgroundColor: '#3b5998'}}>
								<Icon name="logo-facebook"/>
									<Text style={{color: '#FFF'}}>Sign in with Facebook</Text>
								</Button>


							</View>
						</View>
						<View style={this.css.homesocialViews}>
							<Text style={this.css.homeor}>
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
							<Item last>
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

						<View style={this.css.homesocialViews}>
							<Button ref="3" primary full onPress={ () => this.logIn() }>
								<Text style={this.css.homebuttonText}>Log-in</Text>
							</Button>
						</View>
					</View>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Authenticationscreen', () => Authenticationscreen);

export default Authenticationscreen;
