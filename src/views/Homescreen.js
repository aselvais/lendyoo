import React from 'react';
import Homectrl from '../controllers/Homectrl';
import {
	AppRegistry,
	Text,
	View,
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
class Homescreen extends Homectrl {

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Homescreen.render()');
		return (
			<ScrollView contentContainerStyle={{minHeight: height - 70}} style={{backgroundColor: this.colors.c1}}>
				<View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
					<Text style={{color: this.colors.white, fontSize: 50}}>Hello</Text>
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

AppRegistry.registerComponent('Homescreen', () => Homescreen);

export default Homescreen;
