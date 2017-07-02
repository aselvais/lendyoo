import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import {
	Content
} from 'native-base';
/**
 *
 */
class Logoutscreen extends ComponentAbstract {

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.rootComponent.resetAuthState(false);
		this.lendyooRegistry.setAuthStatus(false);
		this.routes.goTo("home");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Logoutscreen.render()');
		return (
			<Content padder={true}>
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Bye bye :)
				</Text>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Logoutscreen', () => Logoutscreen);

export default Logoutscreen;