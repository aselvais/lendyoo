import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	View,
	Button,
	Image
} from 'react-native';
import styles from '../styles/Mainstyle';
import Icon from 'react-native-vector-icons/FontAwesome';

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

	getContactName()
	{
		if (this.contactCollection.models && this.contactCollection.models.length > 0)
			return this.contactCollection.getModelById(this.loan.Contact_id).getFullName();
		else
			return '@TODO@ get name here';
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
						Loan saved { "\n\"" + this.loan.title + "\"" }
					</Text>
				</View>
				<ScrollView>

				<View style={localStyles.RegisterContainer}>
					<Image source={require('../assets/images/bigstock-attractive-young-business-man-43103578.jpg')} style={styles.backgroundImage}></Image>
					<Text style={localStyles.data}>{
						"Loan Title : " + this.loan.title + "\n" +
						"Loan from : " + this.getFromName() + "\n" +
						"Loan to : " + this.getContactName() + "\n\n" +
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