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
import {
	Col,
	Row,
	Grid
} from "react-native-easy-grid";

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
			showLendyooLogin: false,
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
		 <Text style={this.css.homeh3s}>Environemnt: { this.lendyooRegistry.config._env} v{ this.lendyooRegistry.appVersion }</Text>
		 */
		this.console.log('Authenticationscreen.render()');
		return (
			<Grid style={{backgroundColor: this.colors.c1}}>

				<Row size={30}  style={{ alignItems: 'center'}}>
					<H1 style={{color: this.colors.white}}>Lendyoo</H1>
				</Row>

				<Row size={70}>
					<Grid>
						<Row size={80} style={{alignItems: 'center'}}>
							{
								(!this.state.showLendyooLogin) ?
									(
										<View style={{}}>
											<Button iconLeft onPress={ () => this.facebookLogin() }
													style={{backgroundColor: this.colors.fbcolor}}>
												<Icon name="logo-facebook"/>
												<Text style={{color: '#FFF'}}>Sign in with Facebook</Text>
											</Button>
										</View>
									) : (
									<View style={{}}>
										<Form>
											<Item>
												<Label style={{color: this.colors.white}}>e-mail</Label>
												<Input
													style={{color: this.colors.white}}
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
												<Label style={{color: this.colors.white}}>Password</Label>
												<Input
													style={{color: this.colors.white}}
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
											<Button ref="3" success full onPress={ () => this.logIn() }>
												<Text style={this.css.homebuttonText}>Log-in</Text>
											</Button>
										</Form>
									</View>)
							}
						</Row>

						<Row size={20}>
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
						</Row>
					</Grid>
				</Row>
			</Grid>
		);
	}
}

AppRegistry.registerComponent('Authenticationscreen', () => Authenticationscreen);

export default Authenticationscreen;
