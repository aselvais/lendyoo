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
class Settingsscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Settingsscreen.render()');
		return (
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Settingsscreen
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Settingsscreen', () => Settingsscreen);

export default Settingsscreen;