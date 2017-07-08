import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';
import {
	Alert
} from 'react-native';

/**
 *
 */
class Lendtakepictctrl extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Makeloanscreen.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
		this.state = {
			loan: this.newloan,
			photo: this.newphoto.data ? this.newphoto.data : false,
			localpath: this.newphoto.localpath ? this.newphoto.localpath : false,
			title: (this.newphoto.title) ? this.newphoto.title : '',
			saving: false,
			isMounted: false,
			cameraside: 'back'
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.setState({isMounted: true});
	}

	/**
	 *
	 * @param msg
	 */
	displayErrorAlert(msg = '') {
		Alert.alert(
			'Error',
			msg,
			[{text: 'OK', onPress: () => this.console.log('OK Pressed')}],
			{cancelable: false}
		);
	}

	/**
	 *
	 * @param e
	 */
	onPressSave() {
		if ((!this.newloan.title || this.newloan.title == '') && (!this.newphoto.localpath || this.newphoto.localpath == '')) {
			this.displayErrorAlert('Please add a title for this loan');
		}
		else {
			this.routes.goTo('lendchoosecontact');
		}
	}

	/**
	 *
	 */
	takePicture() {
		console.log('Clicked take picture');
		const options = {};
		var _that = this;
		if (this.camera && this.camera.capture) {
			try {
				this.camera.capture({metadata: options}).then(
					function (data) {
						if (data.path) {
							try {
								_that.newloan.photo = data.path;
								_that.newphoto.cameradata = data;
								_that.newphoto.localpath = data.path;
								_that.newphoto.initImage().then(
									function (d) {
										_that.setState({
											photo: _that.newphoto.data,
											localpath: _that.newphoto.localpath
										});
									}
								);
							} catch (err) {
								_that.setState({photo: false});
							}
						} else {
							_that.setState({photo: false});
						}
					},
					function (err) {
						_that.setState({photo: false});
						_that.displayErrorAlert('Problem with the camera...');
						//console.log(JSON.stringify(err));
					}
				);
			} catch (err) {
				_that.setState({photo: false});
				// console.log(err);
			}
		}
	}

	/**
	 * Access the image gallery for selecting an existing picture
	 */
	loadGallery() {
		// this.displayErrorAlert('Gallery access not implemented yet');
		this.routes.goTo("lendpictgallery");
	}

	/**
	 * Discard the selected pictire
	 * @todo Add a confirmation "are you sure you want to discard"
	 */
	discardPicture() {
		this.newphoto.data = null;
		this.newphoto.localpath = false;
		this.setState({photo: false, localpath: false});

	}

	/**
	 * When changing descritpion in the text field
	 * @param {string} title
	 */
	onChangeTitle(title = '') {
		this.newloan.title = title;
		this.setState({title});
	}

	/**
	 * Reverse the camera
	 */
	reverseCamera() {
		(this.state.cameraside == 'back') ? this.setState({cameraside: 'front'}) : this.setState({cameraside: 'back'});
	}

	/**
	 *
	 */
	readBarCode(e) {
		this.displayErrorAlert('Barcode detected!' + "\n" +
			'This feature will be available soon :)' +
			"\nType: " + e.type + "\nData: " + e.data);
	}

}

export default Lendtakepictctrl;