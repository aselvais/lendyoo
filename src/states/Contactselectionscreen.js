import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	View
} from 'react-native';
import {
	Content,
	Left,
	Body,
	ListItem,
	Thumbnail,
	Text,
	Button
} from 'native-base';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Contact from '../shared/models/frontend/Contact';

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
		this.routes.gotTo("lend");
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
							_that.routes.gotTo("lend");
						}
					);
				} else {
					_that.lendyooRegistry.contactCollection.setActiveModel(_fc);
					_that.rootComponent.setLoading(false);
					_that.routes.gotTo("lend");
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
			<Content padder={true}>
			<View>
				<View>
					<Button success onPress={ () => this.onPressAddressbook() } full>
						<Text> Get contact from address book </Text>
					</Button>
				</View>
				<View style={ this.css.contactsglobalContainer }>
					{
						this.state.contactCollectionModels.map((contact) =>
							<ListItem key={contact._id} onPress={ () => this.onPressContact(contact) } avatar>
								{ (false) ? (<Left><Thumbnail
									source={require('../assets/images/bigstock-attractive-young-business-man-43103578.jpg')}
									small/></Left>) : null }
								<Body>
								<Text>{ contact.getFullName() }</Text>
								<Text note>{ contact.email }</Text>
								</Body>
							</ListItem>
						)
					}
				</View>
			</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Contactselectionscreen', () => Contactselectionscreen);

export default Contactselectionscreen;