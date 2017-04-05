import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Dimensions,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	Alert
} from 'react-native';
import {Content, Form, Item, Input, Label, Button} from 'native-base';
import Camera from 'react-native-camera';

import Loan from '../shared/models/frontend/Loan';
import Photo from '../shared/models/frontend/Photo';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Make loan screen (with pict)
 */
class Makeloanscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Makeloanscreen.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
		if (!this.loan || (this.routes.getPreviousViewName() != 'contacts' && this.routes.getPreviousViewName() != 'detail')) {
			this.loan = new Loan();
			this.photo = new Photo();
			this.loanCollection.setActiveModel(this.loan);
			this.contactCollection.setActiveModel(null);
		}
		this.activeContact = this.contactCollection.getActiveModel();
		this.state = {
			direction: '>',
			loan: this.loan,
			photo: this.loan.photo ? this.loan.photo : false
		};

	}

	/**
	 *
	 */
	onPressLoadDirection() {
		this.console.log('Makeloanscreen.onPressLoadDirection()');
		if (this.state.direction === '>')
			this.setState({direction: '<'});
		if (this.state.direction === '<')
			this.setState({direction: '>'});
	}

	/**
	 *
	 * @param e
	 */
	onPressFrom(e) {
		this.console.log('Makeloanscreen.onPressFrom()', e);
		Alert.alert('To be implemented', 'From pressed');
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

		if (!this.activeContact || !this.activeContact._id || !this.user || !this.user.Group_id) {
			this.displayErrorAlert('Please choose a contact');
		}
		else {
			var _that = this;
			this.console.log('Makeloanscreen.onPressSave()');
			var _loan = _that.loan;
			_loan.Group_id = this.user.Group_id;
			_loan.User_id = this.user._id;
			_loan.Contact_id = this.activeContact._id;
			// _loan.photo = '';
			_loan.isSaved = true;
			_loan.detail = '';
			_loan.dateCreated = new Date();
			_that.rootComponent.setLoading(true);
			_loan.save().then(
				function (d) {
					if (d === true) {
						try {
							_that.loanCollection.addModel(_loan);
							_that.loanCollection.setActiveModel(_loan);
						} catch (e) {
							//console.error(_loan);
						}
						if (_loan.photo)
						{
							_that.photo.Loan_id = _loan._id;
							_that.photo.localpath = _loan.photo;
							_that.photo.filename = 'someRandomName.jpg';
							_that.photo.save().then(
								function(photodata) {
									_that.rootComponent.setLoading(false);
									_that.routes.gotTo("detail");
								},
								function (e) {
									_that.rootComponent.setLoading(false);
									this.console.log('Error saving loan', e);
								}
							);
						}
						else
						{
							_that.rootComponent.setLoading(false);
							_that.routes.gotTo("detail");
						}
					}
					//else
					//console.error('Error saving loan', d);
				},
				function (e) {
					_that.rootComponent.setLoading(false);
					//console.error('Error saving loan', e);
				}
			);
		}
	}

	/**
	 *
	 * @param d
	 * @returns {*}
	 */
	getIconeDirectionName(d) {
		this.console.log('Makeloanscreen.getIconeDirectionName()', d);
		if (d == '>')
			return 'arrow-right';
		else
			return 'arrow-left';
	}

	/**
	 *
	 * @returns {*}
	 */
	getContactName() {
		this.console.log('Makeloanscreen.getContactName()');
		if (this.activeContact)
			return this.activeContact.getFullName();
		else
			return 'Choose ...';
	}

	/**
	 *
	 */
	takePicture() {
		const options = {location: true};
		var _that = this;
		if (this.camera && this.camera.capture) {
			try {
				this.camera.capture({metadata: options}).then(
					function(data) {
						// _that.displayErrorAlert('SUCCESS!');
						if (data.path)
						{
							_that.loan.photo = data.path;
							_that.photo.cameradata = data;
							_that.photo.localpath = data.path;
							_that.photo.initImage();

							_that.setState({photo: data.path});
						} else {
							_that.setState({photo: false});
						}
					},
					function(err) {
						_that.setState({photo: false});
						_that.displayErrorAlert('Problem with the camera...');
						//console.log(JSON.stringify(err));
					}
				);
			} catch(err) {
				_that.setState({photo: false});
				// console.log(err);
			}

		}
	}

	/**
	 *
	 * @param title
	 */
	changeTitle(title) {
		this.loan.title = title;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Makeloanscreen.render()');
		return (
			<Content>

				<View style={ localStyles.globalContainer }>
					<View style={localStyles.toFromBar}>
						<View style={{flex: 1, flexDirection: 'row'}}>
							<View style={{flex: .4, alignItems: 'center'}}>
								<TouchableHighlight onPress={ () => this.onPressFrom() }>
									<Text style={ localStyles.fromToText }>{ this.user.fullName }</Text>
								</TouchableHighlight>
							</View>
							<View style={{flex: .2, alignItems: 'center'}}>
								<TouchableHighlight onPress={ () => this.onPressLoadDirection() }>
									<Icon name={ this.getIconeDirectionName(this.state.direction) }
										  style={ localStyles.arrow }/>
								</TouchableHighlight>
							</View>
							<View style={{flex: .4, alignItems: 'center'}}>
								<TouchableHighlight onPress={ () => this.routes.gotTo("contacts") }>
									<Text style={ localStyles.fromToText }>{ this.getContactName() }</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>

					<View >
						{
							(this.state.photo !== false) ?
								(
									<Image source={{uri: this.state.photo}} style={localStyles.imageSpace}></Image>
								)
								:
								(<Camera
										ref={(cam) => { this.camera = cam; }}
										captureTarget={Camera.constants.CaptureTarget.disk}
										captureQuality={Camera.constants.CaptureQuality["720p"]}
										style={localStyles.imageSpace}
										aspect={Camera.constants.Aspect.fill}>
										<Icon name="camera" style={ localStyles.photoText } onPress={ () => this.takePicture() }/>
									</Camera>)
						}
					</View>
					<View style={localStyles.adddetailSpace}>
						<Form>
							<Item floatingLabel>
								<Label>Description</Label>
								<Input
									ref="1"
									spellCheck={true}
									onChangeText={ (title) => this.changeTitle(title) }
									value={this.loan.title}
									blurOnSubmit={false}
									autoCapitalize="none"
								/>
							</Item>
						</Form>

					</View>
					<View style={localStyles.buttonView}>
						<Button ref="2" primary block onPress={ () => this.onPressSave() }>
							<Text style={localStyles.buttonText}>Lend item</Text>
						</Button>

					</View>
				</View>

			</Content>
		);
	}
}

/**
 * Local styles
 */
const localStyles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	buttonView: {
		padding: 30
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#FFFFFF'
	},
	toFromBar: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	fromToText: {
		paddingTop: 20,
		fontSize: 20,
		color: '#FFFFFF'
	},
	arrow: {
		fontSize: 40,
		color: '#FFFFFF'
	},
	photoText: {
		textAlign: 'center',
		fontSize: 40,
		color: '#FFFFFF'
	},
	imageSpace: {
		height: Dimensions.get('window').height - 300,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	adddetailSpace: {
		flex: .13
	}
});

AppRegistry.registerComponent('Makeloanscreen', () => Makeloanscreen);
export default Makeloanscreen;