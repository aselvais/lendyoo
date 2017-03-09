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

		this.state = {
			user: this.user
		};
		var _that = this;
		this.user.populateDataFromRemote('58be0931785ff104cc252d88').then(
			function(d){
				if (d) _that.setState({ user: _that.user });
			}
		);

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
						Hello { this.state.user.fullName }
					</Text>
					<Text style={localStyles.data}>{
							"Group_id: " + this.state.user.Group_id + "\n" +
							"authType: " + this.state.user.authType + "\n" +
							"isRegistered: " + this.state.user.isRegistered + "\n" +
							"username: " + this.state.user.username + "\n" +
							"password: " + this.state.user.password + "\n" +
							"fname: " + this.state.user.fname + "\n" +
							"lname: " + this.state.user.lname + "\n" +
							"gender: " + this.state.user.gender + "\n" +
							"email: " + this.state.user.email + "\n" +
							"dateOfBirth: " + this.state.user.dateOfBirth + "\n" +
							"dateCreated: " + this.state.user.dateCreated + "\n" +
							"dateUpdated: " + this.state.user.dateUpdated + "\n" +
							"role: " + this.state.user.role + "\n"
						}</Text>
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