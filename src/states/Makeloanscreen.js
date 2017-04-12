import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View,
	Image,
	TouchableHighlight,
	Alert
} from 'react-native';
import {
	Content,
	Form,
	Item,
	Input,
	Label,
	Button,
	Icon
} from 'native-base';
import Camera from 'react-native-camera';
import Loan from '../shared/models/frontend/Loan';
import Photo from '../shared/models/frontend/Photo';

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
		this.activeContact = this.contactCollection.getActiveModel();
		this.state = {
			direction: '>',
			loan: this.newloan,
			photo: this.newphoto.data ? this.newphoto.data : false,
			title: this.newloan.title ? this.newloan.title : '',
			saving: false
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
		else if ((!this.newloan.title || this.newloan.title == '') && (!this.newloan.photo || this.newloan.photo == '')) {
			this.displayErrorAlert('Please add a description or take a picture');
		}
		else {
			var _that = this;
			this.console.log('Makeloanscreen.onPressSave()');
			var _loan = _that.newloan;
			_loan.Group_id = this.user.Group_id;
			_loan.User_id = this.user._id;
			_loan.Contact_id = this.activeContact._id;
			_loan.isSaved = true;
			_loan.detail = '';
			// @todo: do that on the server side
			_loan.dateCreated = new Date();
			_that.rootComponent.setLoading(true);
			_that.setState({saving: true});
			_loan.save().then(
				function (d) {
					if (d === true) {
						try {
							_that.loanCollection.addModel(_loan);
							_that.loanCollection.setActiveModel(_loan);
						} catch (e) {
							//console.error(_loan);
						}
						if (_loan.photo) {
							_that.newphoto.Loan_id = _loan._id;
							_that.newphoto.localpath = _loan.photo;
							_that.newphoto.filename = 'someRandomName.jpg';
							_that.newphoto.save().then(
								function (photodata) {
									_that.rootComponent.setLoading(false);
									_that.setState({saving: false});
									_that.lendyooRegistry.newloan = new Loan();
									_that.lendyooRegistry.newphoto = new Photo();
									_that.routes.gotTo("detail");
								},
								function (e) {
									_that.rootComponent.setLoading(false);
									_that.setState({saving: false});
									this.console.log('Error saving loan', e);
								}
							);
						}
						else {
							_that.rootComponent.setLoading(false);
							_that.lendyooRegistry.newloan = new Loan();
							_that.lendyooRegistry.newphoto = new Photo();
							// _that.setState({ saving: false });
							_that.routes.gotTo("detail");
						}
					}
					//else
					//console.error('Error saving loan', d);
				},
				function (e) {
					_that.rootComponent.setLoading(false);
					_that.setState({saving: false});
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
	getIconDirectionName(d) {
		this.console.log('Makeloanscreen.getIconDirectionName()', d);
		if (d == '>')
			return 'arrow-dropright';
		else
			return 'arrow-round-back';
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
										_that.setState({photo: _that.newphoto.data});
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
	 *
	 * @param title
	 */
	changeTitle(title) {
		this.newloan.title = title;
		this.setState({title: title});
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Makeloanscreen.render()');
		return (
			<Content padder={true}>
				<View style={ this.css.makeloanglobalContainer }>
					<View style={this.css.makeloantoFromBar}>
						<View style={{flex: 1, flexDirection: 'row'}}>
							<View style={{flex: .4, alignItems: 'center'}}>
								<TouchableHighlight onPress={ () => this.onPressFrom() }>
									<Text style={ this.css.makeloanfromToText }>{ this.user.fullName }</Text>
								</TouchableHighlight>
							</View>
							<View style={{flex: .4, alignItems: 'center'}}>
								<TouchableHighlight onPress={ () => this.routes.gotTo("contacts") }>
									<Text style={ this.css.makeloanfromToText }>{ this.getContactName() }</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>

					<View >
						{
							(this.state.photo !== false) ?
								(<Image source={{uri: 'data:image/png;base64,' + this.state.photo}} style={this.css.makeloanimageSpace}></Image>)
								:
								(<Camera
									ref={(cam) => { this.camera = cam; }}
									captureTarget={Camera.constants.CaptureTarget.disk}
									captureQuality={Camera.constants.CaptureQuality["720p"]}
									style={this.css.makeloanimageSpace}
									aspect={Camera.constants.Aspect.fill}>
									<Icon name="camera" style={{color: '#FFF', fontSize: 55}} onPress={ () => this.takePicture() }/>
								</Camera>)
						}
					</View>
					<View style={this.css.makeloanadddetailSpace}>
						<Form>
							<Item stackedLabel>
								<Label>Description</Label>
								<Input
									ref="1"
									spellCheck={true}
									onChangeText={ (title) => this.changeTitle(title) }
									value={ this.state.title }
									blurOnSubmit={false}
									autoCapitalize="none"
								/>
							</Item>
						</Form>

					</View>
					<View style={this.css.makeloanbuttonView}>
						{
							this.state.saving ?
								(<Button ref="2" success full><Text
									style={this.css.makeloanbuttonText}>...</Text></Button>) :
								(<Button ref="2" onPress={ () => this.onPressSave() } success full><Text
									style={this.css.makeloanbuttonText}>Lend item</Text></Button>)
						}
					</View>
				</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Makeloanscreen', () => Makeloanscreen);
export default Makeloanscreen;