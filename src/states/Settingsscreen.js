import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import styles from '../styles/Mainstyle';

/**
 *
 */
class Settingsscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Settingsscreen.render()');
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Settingsscreen
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Settingsscreen', () => Settingsscreen);

export default Settingsscreen;