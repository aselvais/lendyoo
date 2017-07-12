import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';
// import RNFetchBlob from 'react-native-fetch-blob';

/**
 *
 */
class Lendconfirmloanctrl extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Loandetailscreen.constructor()', props);

		this.init();

		this.state = {
			contact: this.lendyooRegistry.contactCollection.getActiveModel(),
			newloan: this.newloan,
			newphoto: this.newphoto
		};

	}

	/**
	 * Do some initialization of data
	 */
	init() {
		// sets expiration 1 month in the future
		this.newloan.dateExpiration = new Date();
		this.newloan.dateExpiration.setMonth(this.newloan.dateExpiration.getMonth() + 1);
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
	}

	/**
	 *
	 */
	save() {
		this.console.log('Lendconfirmloanctrl.save()');
		var _that = this;
		this.rootComponent.setLoading(true);

		// _that.newphoto.data = pic[1];

		_that.newloan.isSaved = true;
		_that.newloan.photo = _that.newphoto.localpath;
		_that.newloan.dateCreated = new Date();
		_that.newloan.save().then(
			function (d) {
				this.console.log('Loan saved');
				_that.newphoto.Loan_id = _that.newloan._id;
				_that.newphoto.initFilename();
				_that.newphoto.save().then(
					function (pd) {
						// upload image only when we have the _id back
						_that.newphoto.uploadImage();

						this.console.log('Photo saved ... redirecting');
						_that.routes.goTo("history");
					},
					function (epd) {
						this.console.log('Error saving photo');
					},
				);


			},
			function (er) {
				this.console.log('Error saving loan');
			}
		);


	}

	/**
	 *
	 * @param url
	 * @param callback
	 */
	toDataURL(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			var reader = new FileReader();
			reader.onloadend = function () {
				callback(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}

	/**
	 *
	 * @param key
	 * @param val
	 */
	onFormElementChange(key, val) {
		var _that = this;
		switch (key) {
			case 'title':
				_that.newloan.title = val;
				break;
			case 'detail':
				_that.newloan.detail = val;
				break;
		}
		this.setState({newloan: this.newloan});
	}

	/**
	 *
	 */
	clickedReturnedDate() {

	}

	/**
	 * @todo Save the other model params before going back to the contact selection
	 */
	clickedNamed() {
		this.routes.goTo('lendchoosecontact');
	}

}

export default Lendconfirmloanctrl;