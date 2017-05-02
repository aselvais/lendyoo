import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import {
	Content,
	Button
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
			<Content style={{backgroundColor: this.colors.c1}} padder={true}>
			<View>
				<Text style={this.css.welcome}>
					Settings Screen
				</Text>

				<Button success full style={{ marginTop: 10 }} onPress={ () => this.routes.gotTo('logout') }>
					<Text style={this.css.profilebuttonText}>Log-out</Text>
				</Button>

			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Settingsscreen', () => Settingsscreen);

export default Settingsscreen;