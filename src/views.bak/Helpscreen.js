import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';
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
class Helpscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Helpscreen.render()');
		return (
			<Content padder={true}>
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Helpscreen
				</Text>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Helpscreen', () => Helpscreen);

export default Helpscreen;