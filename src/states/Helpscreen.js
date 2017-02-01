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
class Helpscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Helpscreen.render()');
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Helpscreen
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Helpscreen', () => Helpscreen);

export default Helpscreen;