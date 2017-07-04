import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	ScrollView,
	View
} from 'react-native';
import {
	Content,
	Left,
	Body,
	ListItem,
	Thumbnail,
	Icon,
	Text,
	Button
} from 'native-base';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Contact from '../shared/models/frontend/Contact';
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
/**
 *
 */
class Lendchoosecontactcreen extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Contactselectionscreen.constructor()', props);
		this.nextScreen = 'lendconfirmloan';
		this.state = {
			contactCollectionModels: this.lendyooRegistry.contactCollection.models
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.setContactList();
	}

	/**
	 *
	 */
	setContactList() {
		var _that = this;
		_that.rootComponent.setLoading(true);
		this.lendyooRegistry.contactCollection.setRemoteContactsFromUser(this.user._id).then(
			function (d) {
				_that.rootComponent.setLoading(false);
				_that.setState({contactCollectionModels: _that.lendyooRegistry.contactCollection.models});
			}
		);
	}

	/**
	 *
	 * @param id
	 */
	onPressContact(contact) {
		this.console.log('Contactselectionscreen.onPressContact()');
		this.rootComponent.setLoading(true);
		this.lendyooRegistry.contactCollection.setActiveModel(contact);
		this.routes.goTo(this.nextScreen);
	}

	/**
	 *
	 */
	onPressAddressbook() {
		var _that = this;
		ContactsWrapper.getContact()
			.then((contact) => {
				_that.rootComponent.setLoading(true);

				var _fc = _that.lendyooRegistry.contactCollection.getModelByName(contact.name);
				if (!_fc) {
					var _c = new Contact();
					_c.Group_id = this.user.Group_id;
					_c.User_id = this.user._id;
					_c.name = contact.name;
					_c.email = contact.email;
					_c.phone = contact.phone;
					_c.save().then(
						function (c) {
							_that.lendyooRegistry.contactCollection.addModel(_c);
							_that.lendyooRegistry.contactCollection.setActiveModel(_c);
							_that.setState({contactCollectionModels: _that.lendyooRegistry.contactCollection.models});
							_that.rootComponent.setLoading(false);
							_that.routes.goTo(_that.nextScreen);
						}
					);
				} else {
					_that.lendyooRegistry.contactCollection.setActiveModel(_fc);
					_that.rootComponent.setLoading(false);
					_that.routes.goTo(_that.nextScreen);
				}
			})
			.catch((error) => {
				this.console.log("ERROR CODE: ", error.code);
				this.console.log("ERROR MESSAGE: ", error.message);
			});
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Contactselectionscreen.render()');
		return (
			<Content padder={false} scrollEnabled={false} style={{backgroundColor: '#FFFFFF'}}>
				<View>
					<Text style={{
						color: this.colors.c2,
						padding: 10
					}}>Recent contacts</Text>
					<ScrollView style={{ height: height-210 }}>
						{
							this.state.contactCollectionModels.map((contact) =>
								<ListItem key={contact._id} onPress={ () => this.onPressContact(contact) } avatar>
									<Left>
										<Icon name="contact" style={{
											color: '#888',
											fontSize: 25
										}}/>
									</Left>
									<Body>
									<Text style={{ color: '#888' }}>{ contact.getFullName() }</Text>

									{
										(contact.email) ?
											(<Text style={{ color: '#111' }} note>{ contact.email }</Text>)
											:
											(<Text style={{ color: '#111' }} note>{ contact.phone }</Text>)
									}

									</Body>
								</ListItem>
							)
						}
					</ScrollView>


					<View>
						<Button success onPress={ () => this.onPressAddressbook() } full>
							<Text style={{
								color: '#FFFFFF'
							}}> Get contact from address book </Text>
						</Button>
					</View>

				</View>

			</Content>
		);
	}
}

AppRegistry.registerComponent('Lendchoosecontactcreen', () => Lendchoosecontactcreen);

export default Lendchoosecontactcreen;