import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import styles from '../styles/Mainstyle';

/**
 * Loans history/list
 */
class Loanhistoryscreen extends ComponentAbstract {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Loanhistoryscreen.render()');
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Loanhistoryscreen
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Loanhistoryscreen', () => Loanhistoryscreen);

export default Loanhistoryscreen;