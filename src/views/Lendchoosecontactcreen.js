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
class Lendchoosecontactcreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Lendchoosecontactcreen.render()');
		return (
			<Content padder={true}>
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Lendchoosecontactcreen
				</Text>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Lendchoosecontactcreen', () => Lendchoosecontactcreen);

export default Lendchoosecontactcreen;