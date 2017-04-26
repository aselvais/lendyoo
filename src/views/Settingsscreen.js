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
class Settingsscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Settingsscreen.render()');
		return (
			<Content padder={true}>
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Settingsscreen
				</Text>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Settingsscreen', () => Settingsscreen);

export default Settingsscreen;