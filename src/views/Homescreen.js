import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View,
	Alert,
	ScrollView
} from 'react-native';
import {
	Button,
	Icon,
	Form,
	Item,
	Input,
	Label
} from 'native-base';
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');

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
			showLendyooLogin: true,
			showCreateAccount: true,
			email: '',
			password: '',
			password2: ''
		};

		this.console.log('Authenticationscreen.constructor()', props);
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
							_that.lendyooRegistry.routes.gotTo("lend");
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
		this.console.log('Authenticationscreen.createAccount()');
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
								_that.lendyooRegistry.routes.gotTo("lend");
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
		this.console.log('Authenticationscreen.facebookLogin()');
		this.displayErrorAlert('Not implemented yet');
	}

	/**
	 *
	 */
	twitterLogin() {
		this.console.log('Authenticationscreen.twitterLogin()');
		this.displayErrorAlert('Not implemented yet');
	}

	/**
	 *
	 */
	googleLogin() {
		this.console.log('Authenticationscreen.googleLogin()');
		this.displayErrorAlert('Not implemented yet');
	}

	/**
	 *
	 * @param nextField
	 */
	focusNextField(nextField) {
		this.refs[nextField].focus();
	};

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Authenticationscreen.render()');
		return (
			<ScrollView contentContainerStyle={{minHeight: height - 70}} style={{backgroundColor: this.colors.c1}}>
				<View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
					<Text style={{color: this.colors.white, fontSize: 50}}>Lendyoo</Text>
					<Text style={{color: this.colors.c4, fontSize: 15, paddingTop: 5}}>Know where your stuff is.</Text>
				</View>
				<View style={{flex: 1, paddingBottom: 50, justifyContent: 'center', alignItems: 'center'}}>
					{
						(!this.state.showLendyooLogin) ?
							(
								<View>
									<Button iconLeft onPress={ () => this.facebookLogin() }
											style={{
												width: 200,
												marginBottom: 10,
												alignSelf: 'center',
												backgroundColor: this.colors.fbcolor
											}}>
										<Icon name="logo-facebook"/><Text style={{color: '#FFF'}}>Login with
										Facebook</Text>
									</Button>
									<Button iconLeft onPress={ () => this.googleLogin() }
											style={{
												width: 200,
												marginBottom: 10,
												alignSelf: 'center',
												backgroundColor: '#db4a39'
											}}>
										<Icon name="logo-google"/><Text style={{color: '#FFF'}}>Login with
										Google+</Text>
									</Button>
									<Button iconLeft onPress={ () => this.twitterLogin() }
											style={{
												width: 200,
												marginBottom: 10,
												alignSelf: 'center',
												backgroundColor: '#0084b4'
											}}>
										<Icon name="logo-twitter"/><Text style={{color: '#FFF'}}>Login with
										Twitter</Text>
									</Button>
								</View>
							) : (
							<View style={{width: width - 30}}>
								<Form>
									<Item>
										<Label style={{color: this.colors.white}}>e-mail</Label>
										<Input
											style={{color: this.colors.c3}}
											ref="1"
											spellCheck={false}
											keyboardType="email-address"
											onChangeText={(email) => this.setState({email})}
											value={this.state.email}
											blurOnSubmit={false}
											autoCapitalize="none"
										/>
									</Item>
									<Item>
										<Label style={{color: this.colors.white}}>Password</Label>
										<Input
											style={{color: this.colors.c3}}
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
									{
										(!this.state.showCreateAccount) ? (<Item>
											<Label style={{color: this.colors.white}}>Re-type password</Label>
											<Input
												style={{color: this.colors.c3}}
												ref="3"
												spellCheck={false}
												keyboardType="default"
												returnKeyType="next"
												autoCapitalize="none"
												secureTextEntry={true}
												onChangeText={(password2) => this.setState({password2})}
												value={this.state.password2}
												blurOnSubmit={false}
												onSubmitEditing={() => this.logIn()}
											/>
										</Item>) : null
									}
									<Button style={{marginTop: 20}} ref="3" success full onPress={ () => this.logInPressed() }>
										{
											(this.state.showCreateAccount) ?
												(<Text style={this.css.homebuttonText}>Log-in</Text>)
												:
												(<Text style={this.css.homebuttonText}>Create account</Text>)
										}
									</Button>
								</Form>
								{
									(this.state.showCreateAccount) ? (
										<Text style={this.css.homeor}
											  onPress={ () => this.setState({showCreateAccount: false}) }>
											Not a member yet? <Text style={{textDecorationLine: 'underline'}}>Create an
											account</Text>
										</Text>
									) : (
										<Text style={this.css.homeor}
											  onPress={ () => this.setState({showCreateAccount: true}) }>
											Already enrolled? <Text style={{textDecorationLine: 'underline'}}>Sign
											in</Text>.
										</Text>
									)
								}

							</View>)
					}
				</View>
				<View style={{height: 80}}>
					{
						(this.state.showLendyooLogin) ?
							(<Text style={this.css.homeor}
								   onPress={ () => this.setState({showLendyooLogin: false}) }>
									OR use your <Text style={{textDecorationLine: 'underline'}}>Facebook
									account</Text>
								</Text>
							)
							:
							(<Text style={this.css.homeor}
								   onPress={ () => this.setState({showLendyooLogin: true}) }>
									OR authenticate with a <Text style={{textDecorationLine: 'underline'}}>Lendyoo
									account</Text>
								</Text>
							)
					}
				</View>
			</ScrollView>
		);
	}
}

AppRegistry.registerComponent('Authenticationscreen', () => Authenticationscreen);

export default Authenticationscreen;
