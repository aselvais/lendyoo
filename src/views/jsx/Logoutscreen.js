import React from 'react';
import Logoutctrl from '../controllers/Logoutctrl';
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
class Logoutscreen extends Logoutctrl {

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