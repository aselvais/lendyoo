import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	Text,
	View,
	Image
} from 'react-native';
import {
	Content,
	Picker,
	Button,
	CheckBox,
	Form,
	Item,
	Input,
	Label,
	H2
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contact from '../shared/models/frontend/Contact';
import Photo from '../shared/models/frontend/Photo';

/**
 * Load detailed information
 */
class Loandetailscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Loandetailscreen.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
		this.state = {
			contact: null,
			photo: null,
			base64image: null
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
		this.console.log('Loandetailscreen.getFromName()');
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
		this.console.log('Loandetailscreen.save()');
		// this.loan.save();
		// redirect
		this.routes.gotTo("history");
	}

	takePicture()
	{

	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Loandetailscreen.render()');
		return (
			<Content>
				<View style={ localStyles.globalContainer }>
					<View style={localStyles.RegisterContainer}>
						<Form>
							<Item><Label>Title</Label><Input value={this.loan.title}/></Item>
							<Item><Label>Type</Label>
								<Picker mode="dropdown"
										selectedValue={this.loan.status}
										onValueChange={(status) => this.setState({type: status})}>
									{ this.loan._schema.status.enum.map((v) => <Item key={v} label={v} value={v}/>) }
								</Picker>
							</Item>
							<Item><Label>Loan Date</Label><Input value={this.loan.dateCreated}/></Item>
							<Item><Label>To</Label><Input value={((this.state.contact && this.state.contact.getFullName) ? this.state.contact.getFullName() : '' )}/></Item>
							{
								this.loan.photo ? (
									<Image
										defaultSource={require('../assets/images/loading.png')}
										style={{overflow: 'hidden', width: Dimensions.get('window').width, height: 400}}
										source={{uri: this.lendyooRegistry.config.API_URL + '/api-v2/photo/getloanimage/' + this.loan._id + '/' + Dimensions.get('window').width}}></Image>)
									: <TouchableHighlight onPress={ () => this.takePicture() }><Icon name="camera" style={ localStyles.photoText }/></TouchableHighlight>
							}

							<Item><Label>Detail</Label><Input value={this.loan.detail}/></Item>
							<Item><Label>Reminders frequency</Label><Input value={this.loan.remindersFrequency}/></Item>
							<Item><Label>Expiration date</Label><Input value={this.loan.dateExpiration}/></Item>

						</Form>


						<View style={localStyles.socialViews}>
							<Button primary full ref="2" name="thumbs-o-up" onPress={ () => this.save() }>
								<Text style={localStyles.buttonText}>Update loan</Text>
							</Button>
						</View>
					</View>
				</View>
			</Content>
		);
	}
}

const localStyles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		// remove width and height to override fixed static size
		width: null,
		height: null,
	},
	photoText: {
		textAlign: 'center',
		fontSize: 40,
		color: '#555555',
		padding: 40
	},
	globalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	welcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	RegisterContainer: {
		flex: .7
	},
	data: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	welcomeText: {
		textAlign: 'center',
		paddingTop: 10,
		fontSize: 20,
		color: '#FFFFFF'
	},
	socialViews: {
		paddingTop: 20
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#FFFFFF'
	},
	socialButton: {
		margin: 5
	}
});

AppRegistry.registerComponent('Loandetailscreen', () => Loandetailscreen);

export default Loandetailscreen;