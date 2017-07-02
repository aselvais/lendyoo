import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	View,
	Image,
	TouchableHighlight,
	Alert
} from 'react-native';
import {
	Icon,
	Form,
	Item,
	Label,
	Input,
	Right,
	Button,
	Text
} from 'native-base';
import Camera from 'react-native-camera';
import Loan from '../shared/models/frontend/Loan';
import Photo from '../shared/models/frontend/Photo';

/**
 *
 */
class Lendtakepictscreen extends ComponentAbstract {

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
			loan: this.newloan,
			photo: this.newphoto.data ? this.newphoto.data : false,
			localpath: this.newphoto.localpath ? this.newphoto.localpath : false,
			title: (this.newphoto.title) ? this.newphoto.title: '',
			saving: false,
			isMounted: false
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
	 * @param title
	 */
	onChangeTitle( title='' )
	{
		this.newphoto.title = title;
		this.setState({title});
	}


	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Lendtakepictscreen.render()');
		return (
			<View style={{backgroundColor: this.colors.c1, flex: 1, flexDirection: 'column'}}>
				<View style={{flex: .80}}>

					{ (this.state.localpath !== false) ? (
						<Image
							source={{uri: this.newphoto.localpath}}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
								width: '100%',
								height: '100%'
							}}></Image>
					) : null }
					{ (this.state.localpath === false && this.state.isMounted) ?
						(<Camera
							ref={
								(cam) => {
									this.camera = cam
								}
							}
							captureTarget={Camera.constants.CaptureTarget.disk}
							captureQuality={Camera.constants.CaptureQuality["720p"]}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
								width: '100%',
								height: '100%'
							}}
							aspect={Camera.constants.Aspect.fill}/>) : null
					}
				</View>


				{
					(this.state.localpath !== false) ?
						(<View style={{flex: .20, backgroundColor: '#000000', flexDirection: 'row'}}>
							<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
								<TouchableHighlight onPress={ () => this.discardPicture() }>
									<View style={{
										alignItems: 'center',
										justifyContent: 'center',
										width: 40,
										height: 40,
										borderRadius: 40 / 2,
										borderColor: '#FFFFFF',
										borderWidth: 1,
										backgroundColor: '#000'
									}}>
										<Icon name="refresh" style={{
											color: '#FFF',
											fontSize: 30,
											paddingTop: 2
										}}/>
									</View>
								</TouchableHighlight>
							</View>
							<View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>

								<View style={{flex: 2}}>
									<Input placeholder="Title"
										   style={{ color: '#FFF', width: '100%'}}
										   onChangeText={(title) => this.onChangeTitle(title)}
										   value={this.state.title}
										   blurOnSubmit={false}
										   onSubmitEditing={() => this.onPressSave()}
									/>
								</View>
								<View style={{flex: 1}}>
								<Button primary
									onPress={ () => this.onPressSave() }>
									<Text>Go</Text>
								</Button>
								</View>
							</View>

						</View>)
						:
						(<View style={{flex: .20, backgroundColor: '#000000', flexDirection: 'row'}}>
								<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
									<TouchableHighlight onPress={ () => this.discardPicture() }>
										<View style={{
											alignItems: 'center',
											justifyContent: 'center',
											width: 40,
											height: 40,
											borderRadius: 40 / 2,
											borderColor: '#FFFFFF',
											borderWidth: 1,
											backgroundColor: '#000'
										}}>
											<Icon name="refresh" style={{
												color: '#FFF',
												fontSize: 30,
												paddingTop: 2
											}}/>
										</View>
									</TouchableHighlight>
								</View>
								<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
									<TouchableHighlight onPress={ () => this.takePicture() }>
										<View style={{
											width: 60,
											height: 60,
											borderRadius: 60 / 2,
											borderColor: '#4D4D4D',
											borderWidth: 10,
											backgroundColor: '#FFF'
										}}/>
									</TouchableHighlight>
								</View>
								<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
									<TouchableHighlight
										onPress={ () => this.loadGallery() }>
										<View style={{
											alignItems: 'center',
											justifyContent: 'center',
											width: 40,
											height: 40,
											borderRadius: 40 / 2,
											borderColor: '#FFFFFF',
											borderWidth: 1,
											backgroundColor: '#000'
										}}>
											<Icon name="image" style={{
												color: '#FFF',
												fontSize: 25,
												paddingTop: 2
											}}/>
										</View>
									</TouchableHighlight>
								</View>
							</View>)

				}


			</View>
		);
	}
}

AppRegistry.registerComponent('Lendtakepictscreen', () => Lendtakepictscreen);

export default Lendtakepictscreen;