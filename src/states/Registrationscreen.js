import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button
} from 'react-native';
import styles from '../styles/Mainstyle';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Registration
 */
class Registrationscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Registrationscreen.constructor()', props);
		this.state = {};
	}

	/**
	 *
	 */
	facebookLogin() {
		this.console.log('Registrationscreen.facebookLogin()');
	}

	/**
	 *
	 */
	twitterLogin() {
		this.console.log('Registrationscreen.twitterLogin()');
	}

	/**
	 *
	 */
	googleLogin() {
		this.console.log('Registrationscreen.googleLogin()');
	}

	/**
	 *
	 */
	createAccount() {
		this.console.log('Registrationscreen.createAccount()');
	}


	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Registrationscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Welcome to Lendyoo !
					</Text>
				</View>

				<View style={localStyles.RegisterContainer}>
					<Text style={styles.welcome}>
						Register using
					</Text>
					<View style={localStyles.socialViews}>
						<Icon.Button name="facebook" backgroundColor="#3b5998" style={localStyles.socialButton}
									 onPress={ () => this.facebookLogin() }>My Facebook Account</Icon.Button>
					</View>
					<View style={localStyles.socialViews}>
						<Icon.Button name="twitter" style={localStyles.socialButton} backgroundColor="#1a8bf0"
									 onPress={ () => this.twitterLogin() }>My Twitter Account</Icon.Button>
					</View>
					<View style={localStyles.socialViews}>
						<Icon.Button name="google" style={localStyles.socialButton} backgroundColor="#DF4A32"
									 onPress={ () => this.googleLogin() }>My Google Account</Icon.Button>
					</View>

					<View style={localStyles.socialViews}>
						<Text style={localStyles.or}>
							OR
						</Text>
						<Text style={styles.welcome}>
							Create an account
						</Text>
					</View>

					<View style={localStyles.socialViews}>
						<TextInput style={localStyles.formTextField} value="e-mail"/>
					</View>
					<View style={localStyles.socialViews}>
						<TextInput style={localStyles.formTextField} value="password"/>
					</View>
					<View style={localStyles.socialViews}>
						<TextInput style={localStyles.formTextField} value="repeat password"/>
					</View>
					<View style={localStyles.socialViews}>
						<Icon.Button name="thumbs-o-up" style={localStyles.socialButton} backgroundColor="#FF9100"
									 onPress={ () => this.createAccount() }>Create Lendyoo account</Icon.Button>
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
	socialViews: {
		padding: 5
	},
	socialButton: {
		margin: 5
	},
	welcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	RegisterContainer: {
		flex: .7
	},
	or: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#BDBDBD'
	},
	formTextField: {
		borderColor: '#E0E0E0',
		padding: 20,
		borderWidth: 1,
		fontSize: 12,
		color: '#757575'
	}
});


AppRegistry.registerComponent('Registrationscreen', () => Registrationscreen);

export default Registrationscreen;