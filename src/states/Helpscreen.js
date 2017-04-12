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
class Helpscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Helpscreen.render()');
		return (
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Helpscreen
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Helpscreen', () => Helpscreen);

export default Helpscreen;