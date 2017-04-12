import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';

/**
 *
 */
class Logoutscreen extends ComponentAbstract {

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.lendyooRegistry.setAuthStatus(false);
		this.routes.gotTo('home');
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Logoutscreen.render()');
		return (
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Bye bye :)
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Logoutscreen', () => Logoutscreen);

export default Logoutscreen;