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
class Lendconfirmloanscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Lendconfirmloanscreen.render()');
		return (
			<Content padder={true}>
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Lendconfirmloanscreen
				</Text>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Lendconfirmloanscreen', () => Lendconfirmloanscreen);

export default Lendconfirmloanscreen;