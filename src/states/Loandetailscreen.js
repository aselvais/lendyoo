import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
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
		this.console.log(this.loan);

		// this.loan.save();
		// redirect
		// this.routes.gotTo("history");
	}

	/**
	 * @todo put the models where they should be
	 */
	takePicture() {
		this.lendyooRegistry.newloan = this.loan;
		this.lendyooRegistry.contactCollection.setActiveModel(this.state.contact);
		this.routes.gotTo("lend");
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

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Loandetailscreen.render()');
		return (
			<Content padder={true}>
				<View style={ this.css.loandetglobalContainer }>
					<View style={this.css.loandetRegisterContainer}>
						<Form>
							<Item><Label>Title</Label><Input value={this.state.title}
															 onValueChange={(val) => this.onFormElementChange('title', val)}/></Item>
							<Item><Label>Type</Label>
								<Picker mode="dropdown"
										selectedValue={this.state.status}
										onValueChange={(val) => this.onFormElementChange('status', val)}>
									{ this.loan._schema.status.enum.map((v) => <Item key={v} label={v} value={v}/>) }
								</Picker>
							</Item>
							<Item><Label>Loan Date</Label><Input value={this.state.dateCreated}
																 onValueChange={(val) => this.onFormElementChange('dateCreated', val)}/></Item>
							<Item><Label>To</Label><Input
								value={((this.state.contact && this.state.contact.getFullName) ? this.state.contact.getFullName() : '' )}/></Item>
							{
								this.loan.photo ? (
									<Image
										defaultSource={require('../assets/images/loading.png')}
										style={{overflow: 'hidden', width: Dimensions.get('window').width, height: 400}}
										source={{uri: this.lendyooRegistry.config.API_URL + '/api-v2/photo/getloanimage/' + this.loan._id + '/' + Dimensions.get('window').width}}></Image>)
									: <TouchableHighlight onPress={ () => this.takePicture() }><Icon name="camera"
																									 style={ this.css.loandetphotoText }/></TouchableHighlight>
							}
							<Item><Label>Detail</Label><Input value={this.state.detail}
															  onValueChange={(val) => this.onFormElementChange('detail', val)}/></Item>
							<Item><Label>Reminders frequency</Label><Input value={this.state.remindersFrequency}
																		   onValueChange={(val) => this.onFormElementChange('remindersFrequency', val)}/></Item>
							<Item><Label>Expiration date</Label><Input value={this.state.dateExpiration}
																	   onValueChange={(val) => this.onFormElementChange('dateExpiration', val)}/></Item>

						</Form>


						<View style={this.css.loandetsocialViews}>
							<Button primary full ref="2" name="thumbs-o-up" onPress={ () => this.save() }>
								<Text style={this.css.loandetbuttonText}>Update loan</Text>
							</Button>
						</View>
					</View>
				</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Loandetailscreen', () => Loandetailscreen);

export default Loandetailscreen;