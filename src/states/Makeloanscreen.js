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
			this.loanCollection.setActiveModel(this.loan);
			this.contactCollection.setActiveModel(null);
		}
		this.activeContact = this.contactCollection.getActiveModel();
		this.state = {
			direction: '>',
			loan: this.loan,
			photo: false
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
			[{text: 'OK', onPress: () => console.log('OK Pressed')}],
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
			_loan.photo = '';
			_loan.isSaved = true;
			_loan.detail = '';
			_loan.dateCreated = new Date();
			_that.rootComponent.setLoading(true);
			_loan.save().then(
				function (d) {
					if (d === true) {
						_that.rootComponent.setLoading(false);
						try {
							_that.loanCollection.addModel(_loan);
							_that.loanCollection.setActiveModel(_loan);
						} catch (e) {
							//console.error(_loan);
						}
						_that.routes.gotTo("detail");
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
		this.setState({photo: true});
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

					<View style={localStyles.imageSpace}>
						{
							this.state.photo ?
								(
									<Image
										source={require('../assets/images/bigstock-attractive-young-business-man-43103578.jpg')}
										style={localStyles.imageSpace}></Image>
								)
								:
								(

									<Camera
										ref={(cam) => { this.camera = cam; }}
										aspect={Camera.constants.Aspect.fill}>
											<Icon name="camera" style={ localStyles.photoText }
												  onPress={ () => this.takePicture() }/>
									</Camera>
								)
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
	backgroundImage: {
		flex: 1,
		// remove width and height to override fixed static size
		width: null,
		height: null,
	},
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
	photoText: {
		textAlign: 'center',
	//	paddingTop: 300,
		fontSize: 40,
		color: '#FFFFFF'
	},
	directionText: {
		fontSize: 50,
		color: '#FFFFFF'
	},
	arrow: {
		padding: 15,
		fontSize: 40,
		color: '#FFFFFF'
	},
	imageSpace: {
		height: Dimensions.get('window').height - 300,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: '#000000'
	},
	adddetailSpace: {
		flex: .13,
//		backgroundColor: '#212121'
	},
	addDetailButton: {
		padding: 7,
		textAlign: 'center',
		color: '#FFFFFF',
		backgroundColor: '#FFA726',
		borderRadius: 5
	},
	detailText: {
		padding: 15,
		color: '#E65100',
		fontSize: 17
	},
	guyImage: {
		resizeMode: 'contain',
		opacity: .1
	},
	saveButtonContainer: {
		flex: .07,
// 		backgroundColor: '#212121',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonSaveLend: {
		padding: 10,
		width: 200,
		//textAlign: 'center',
		//color: '#FFFFFF',
		backgroundColor: '#F57F17',
		borderRadius: 5
	},
	formTextField: {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: '#666',
		borderWidth: 0,
		color: '#E65100'
	}
});


AppRegistry.registerComponent('Makeloanscreen', () => Makeloanscreen);

export default Makeloanscreen;