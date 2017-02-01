import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	ScrollView,
	TouchableHighlight,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Contact selection view
 */
class Contactselectionscreen extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Contactselectionscreen.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
	}

	/**
	 *
	 * @param id
	 */
	onPressContact(contact)
	{
		this.console.log('Contactselectionscreen.onPressContact()', contact);
		this.contactCollection.setActiveModel(contact);
		this.routes.gotTo("lend");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Contactselectionscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Lend the item to
					</Text>
				</View>

				<ScrollView style={localStyles.RegisterContainer}>
					{
						this.contactCollection.models.map((contact) =>
						<View key={contact.id} style={localStyles.element} >
							<TouchableHighlight key={contact.id} onPress={ () => this.onPressContact(contact) }>
								<Text key={contact.id} style={localStyles.data}>
									<Icon name="user" style={localStyles.dataIcon} />
									{ "  " + contact.getFullName() } { "\n      <" + contact.email + ">" }
								</Text>
							</TouchableHighlight>
						</View>
						)
					}
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
	data: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	dataIcon: {
		fontSize: 25
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
	},
	element: {
		borderBottomWidth: 1,
		borderBottomColor: '#DDDDDD'

	}
});


AppRegistry.registerComponent('Contactselectionscreen', () => Contactselectionscreen);

export default Contactselectionscreen;