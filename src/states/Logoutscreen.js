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
class Logoutscreen extends ComponentAbstract {


	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.lendyooRegistry.setAuthStatus(false);
		this.routes.gotTo('home');
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Logoutscreen.render()');
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Bye bye :)
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Logoutscreen', () => Logoutscreen);

export default Logoutscreen;