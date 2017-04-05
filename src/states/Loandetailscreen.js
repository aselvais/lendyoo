import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	View,
	Image
} from 'react-native';
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
	componentDidMount()
	{
		this.rootComponent.setLoading(false);
		this.init();
	}

	/**
	 *
	 */
	init()
	{
		var _that = this;
		_that.rootComponent.setLoading(true);
		var _contact = new Contact();
		var _photo = new Photo();
		_contact.populateDataFromRemote(this.loan.Contact_id).then(
			function(d) {
				_that.setState({ contact: _contact});
			}
		);
		_photo.populateDataFromRemoteByLoanId(_that.loan._id).then(
			function(d) {
				_that.rootComponent.setLoading(false);
				_that.setState({ photo: _photo});
				_that.setState({ base64image: 'data:image/jpg;base64,'+_photo.data});

			},
			function(errr)
			{
				// console.log(errr);
			}
		);

	}

	/**
	 *
	 * @returns {*}
	 */
	getFromName()
	{
		this.console.log('Loandetailscreen.getFromName()');
		if (!this.loan.fromId)
		{
			return this.user.fullName;
		}
		else
		{
			return '???';
		}
	}

	/**
	 *
	 */
	save()
	{
		this.console.log('Loandetailscreen.save()');
		// this.loan.save();
		// redirect
		this.routes.gotTo("history");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Loandetailscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>
				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Loan saved { (this.loan && this.loan.title) ? "\n\"" + this.loan.title + "\"" : "" }
					</Text>
				</View>
				<ScrollView>

				<View style={localStyles.RegisterContainer}>
					{
						(this.state.base64image) ?
							(<Image style={{overflow: 'visible',
								width: this.state.photo.width,
								height: this.state.photo.height
							}} source={{uri: this.state.base64image }}></Image>)
							:
							(<Text>No Image ...</Text>)
					}
					<Text style={localStyles.data}>{
						"Loan Title : " + this.loan.title + "\n" +
						"Loan photo : " + this.loan.photo + "\n" +
						"Loan from : " + this.getFromName() + "\n" +
						"Loan to : " + ((this.state.contact && this.state.contact.getFullName) ? this.state.contact.getFullName() : '' ) + "\n\n" +
						"Loan isSaved : " + this.loan.isSaved + "\n" +
						"Loan detail : " + this.loan.detail + "\n" +
						"Loan sendReminders : " + this.loan.sendReminders + "\n" +
						"Loan remindersFrequency : " + this.loan.remindersFrequency + " days \n\n" +
						"Loan loanDate : " + "\n" + this.loan.loanDate + "\n" +
						"Loan loanExpirationDate : " + "\n" + this.loan.loanExpirationDate + "\n" +
						"Loan lastReminderSent : " + "\n" + this.loan.lastReminderSent + "\n"
					}</Text>

					<View style={localStyles.socialViews}>
						<Icon.Button ref="2" name="thumbs-o-up" style={localStyles.buttonSaveLend} backgroundColor="#FF9100"
									 onPress={ () => this.save() } title="Lend an item">Confirm / update loan</Icon.Button>
					</View>
				</View>
			</ScrollView>
			</View>
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
		padding: 50
	},
	socialButton: {
		margin: 5
	}
});

AppRegistry.registerComponent('Loandetailscreen', () => Loandetailscreen);

export default Loandetailscreen;