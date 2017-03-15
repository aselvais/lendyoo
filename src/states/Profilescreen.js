import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View,
	StyleSheet,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 *
 */
class Profilescreen extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.state = {
			user: this.user,
			group: this.group
		};
		var _that = this;
		this.user.populateDataFromRemote(this.lendyooRegistry.User_id).then(
			function(d){
				if (d)
				{
					_that.setState({ user: _that.user });
					_that.group.populateDataFromRemote(_that.user.Group_id).then(
						function(dd) {
							if (dd)
								_that.setState({ group: _that.group });
						}
					);
				}
			}
		);
	}

	/**
	 *
	 */
	editGroup()
	{

	}

	/**
	 *
	 */
	editUser()
	{

	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Profilescreen.render()');
		return (

		<View style={ localStyles.globalContainer }>

			<View style={localStyles.welcomeContainer}>
				<Text style={localStyles.welcomeText}>
					Hello { this.state.user.fullName }
				</Text>
			</View>
			<ScrollView>
			<View style={localStyles.RegisterContainer}>
				<View>
					<Text style={localStyles.dataTitle}>
						Company / Group
					</Text>
					<Text style={localStyles.data}>{
					"isActive: " + this.state.group.isActive + "\n" +
					"name: " + this.state.group.name + "\n" +
					"email: " + this.state.group.email + "\n" +
					"address: " + this.state.group.address + "\n" +
					"zipcode: " + this.state.group.zipcode + "\n" +
					"state: " + this.state.group.state + "\n" +
					"country: " + this.state.group.country + "\n" +
					"dateCreated: " + this.state.group.dateCreated + "\n" +
					"dateUpdated: " + this.state.group.dateUpdated + "\n" +
					"type: " + this.state.group.type
					}</Text>
					<Icon.Button name="pencil" style={localStyles.socialButton} backgroundColor="#FF9100"
								 onPress={ () => this.editGroup() }>Edit group</Icon.Button>
				</View>

				<View>
					<Text style={localStyles.dataTitle}>
						Profile
					</Text>
					<Text style={localStyles.data}>{
						"authType: " + this.state.user.authType + "\n" +
						"isRegistered: " + this.state.user.isRegistered + "\n" +
						"username: " + this.state.user.username + "\n" +
						"fname: " + this.state.user.fname + "\n" +
						"lname: " + this.state.user.lname + "\n" +
						"gender: " + this.state.user.gender + "\n" +
						"email: " + this.state.user.email + "\n" +
						"dateOfBirth: " + this.state.user.dateOfBirth + "\n" +
						"dateCreated: " + this.state.user.dateCreated + "\n" +
						"dateUpdated: " + this.state.user.dateUpdated + "\n" +
						"role: " + this.state.user.role + "\n"
					}</Text>
					<Icon.Button name="pencil" style={localStyles.socialButton} backgroundColor="#FF9100"
								 onPress={ () => this.editUser() }>Edit user</Icon.Button>
				</View>
			</View>
			</ScrollView>
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
	dataTitle: {
		textAlign: 'left',
		padding: 10,
		fontSize: 18,
		color: '#FFFFFF',
		backgroundColor: '#000000'
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
		margin: 3
	}
});

AppRegistry.registerComponent('Profilescreen', () => Settingsscreen);

export default Profilescreen;
