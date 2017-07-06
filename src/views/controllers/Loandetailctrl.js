import React from 'react';
import ComponentAbstract from '../../libs/ComponentAbstract';
import Contact from '../../shared/models/frontend/Contact';
import Photo from '../../shared/models/frontend/Photo';

/**
 * Load detailed information
 */
class Loandetailctrl extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Loandetailctrl.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
		this.state = {
			contact: null,
			photo: null,
			base64image: null,
			title: null,
			dateCreated: null,
			detail: null,
			remindersFrequency: null,
			dateExpiration: null
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.init();
	}

	/**
	 *
	 */
	init() {
		var _that = this;
		_that.rootComponent.setLoading(true);

		_that.setState({
			title: _that.loan.title,
			dateCreated: _that.loan.dateCreated,
			detail: _that.loan.detail,
			remindersFrequency: _that.loan.remindersFrequency,
			dateExpiration: _that.loan.dateExpiration
		});

		var _contact = new Contact();
		var _photo = new Photo();
		_contact.populateDataFromRemote(this.loan.Contact_id).then(
			function (d) {
				_that.setState({contact: _contact});
			}
		);
		_photo.populateDataFromRemoteByLoanId(_that.loan._id).then(
			function (d) {
				_that.rootComponent.setLoading(false);
				_that.setState({photo: _photo});
				_that.setState({base64image: 'data:image/jpg;base64,' + _photo.data});

			},
			function (errr) {
				// console.log(errr);
			}
		);

	}

	/**
	 *
	 * @returns {*}
	 */
	getFromName() {
		this.console.log('Loandetailctrl.getFromName()');
		if (!this.loan.fromId) {
			return this.user.fullName;
		}
		else {
			return '???';
		}
	}

	/**
	 *
	 */
	save() {
		this.console.log('Loandetailctrl.save()');
		this.console.log(this.loan);

		// this.loan.save();
		// redirect
		// this.routes.goTo("history");
	}

	/**
	 * @todo put the models where they should be
	 */
	takePicture() {
		this.lendyooRegistry.newloan = this.loan;
		this.lendyooRegistry.contactCollection.setActiveModel(this.state.contact);
		this.routes.goTo("lendtakepict");
	}

	/**
	 *
	 * @param key
	 * @param val
	 */
	onFormElementChange(key, val) {
		var _o = {};
		_o[key] = val;

		this.console.log(JSON.stringify(_o));

		this.loan[key] = val;
		this.setState(_o);
	}

}

export default Loandetailctrl;