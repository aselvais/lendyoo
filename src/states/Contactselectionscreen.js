import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	//Text,
	ScrollView,
	TouchableHighlight,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Text } from 'native-base';

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
		this.state = {
			contactCollectionModels: this.lendyooRegistry.contactCollection.models
		};
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.setContactList();
	}

	/**
	 *
	 */
	setContactList()
	{
		var _that = this;
		_that.rootComponent.setLoading(true);
		this.lendyooRegistry.contactCollection.setRemoteContactsFromUser( this.user._id ).then(
			function(d) {
				_that.rootComponent.setLoading(false);
				_that.setState({contactCollectionModels: _that.lendyooRegistry.contactCollection.models });
			}
		);
	}

	/**
	 *
	 * @param id
	 */
	onPressContact(contact)
	{
		this.console.log('Contactselectionscreen.onPressContact()');
		this.lendyooRegistry.contactCollection.setActiveModel(contact);
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
			<Content>
			<View style={ localStyles.globalContainer }>

				{
					this.state.contactCollectionModels.map((contact) =>
						<ListItem key={contact._id} onPress={ () => this.onPressContact(contact) } avatar>
							<Left>
								<Thumbnail source={require('../assets/images/bigstock-attractive-young-business-man-43103578.jpg')} small/>
							</Left>
							<Body>
							<Text>{ contact.getFullName() }</Text>
							<Text note>{ contact.email }</Text>
							</Body>
						</ListItem>
					)
				}
			</View>
			</Content>
		);
	}
}

/*
 <ScrollView style={localStyles.RegisterContainer}>
 {
 this.state.contactCollectionModels.map((contact) =>
 <View key={contact._id} style={localStyles.element} >
 <TouchableHighlight key={contact._id} onPress={ () => this.onPressContact(contact) }>
 <Text key={contact._id} style={localStyles.data}>
 <Icon name="user" style={localStyles.dataIcon} />
 { "  " + contact.getFullName() } { "\n      <" + contact.email + ">" }
 </Text>
 </TouchableHighlight>
 </View>
 )
 }
 </ScrollView>
*/
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