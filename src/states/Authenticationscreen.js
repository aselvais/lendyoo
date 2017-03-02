import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';
import styles from '../styles/Mainstyle';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Authentication
 */
class Authenticationscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Authenticationscreen.constructor()', props);
	}

	/**
	 *
	 */
	lendItem()
	{
		this.console.log('Authenticationscreen.lendItem()');
		this.lendyooRegistry.routes.gotTo("lend");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Authenticationscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Welcome to Lendyoo v{ this.lendyooRegistry.appVersion } !
					</Text>
				</View>

				<View style={localStyles.RegisterContainer}>
					<Text style={styles.welcome}>
						Hello { this.user.fname }
					</Text>
					<Text style={styles.welcome}>
						Authenticated user data:
					</Text>
					<Text style={localStyles.data}>{
						/*
							"Instance: " + "\n" + this.user.instanceTime + "\n\n" +
							"Is Registered: " + this.user.isRegistered + "\n" +
							"Username: " + this.user.username + "\n" +
							"First Name: " + this.user.fname + "\n" +
							"Last Name: " + this.user.lname + "\n" +
							"DoB: " + this.user.dob + "\n" +
							"Gender: " + this.user.gender + "\n" +
							"e-mail: " + this.user.email
						*/
						}</Text>
					<View style={localStyles.socialViews}>
						<Text style={localStyles.data}>Instance:</Text>
					</View>
					<View style={localStyles.socialViews}>
					<Icon.Button name="thumbs-o-up" style={localStyles.socialButton} backgroundColor="#FF9100"
								 onPress={ () => this.lendItem() } title="Lend an item">Lend an item</Icon.Button>
					</View>
				</View>
			</View>
		);
	}
}


const localStyles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	welcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	RegisterContainer: {
		flex: .7
	},
	data: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	welcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	socialViews: {
		padding: 50
	},
	socialButton: {
		margin: 5
	}
});

AppRegistry.registerComponent('Authenticationscreen', () => Authenticationscreen);

export default Authenticationscreen;