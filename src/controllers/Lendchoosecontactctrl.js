import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Contact from '../shared/models/frontend/Contact';
/**
 *
 */
class Lendchoosecontactctrl extends ComponentAbstract {
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
		this.newloan.Contact_id = contact._id;
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
					_c.Group_id = _that.user.Group_id;
					_c.User_id = _that.user._id;
					_c.name = contact.name;
					_c.email = contact.email;
					_c.phone = contact.phone;
					_c.save().then(
						function (c) {
							_that.lendyooRegistry.contactCollection.addModel(_c);
							_that.lendyooRegistry.contactCollection.setActiveModel(_c);
							_that.setState({contactCollectionModels: _that.lendyooRegistry.contactCollection.models});
							_that.newloan.Contact_id = _c._id;
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

}

// AppRegistry.registerComponent('Lendchoosecontactctrl', () => Lendchoosecontactctrl);

export default Lendchoosecontactctrl;