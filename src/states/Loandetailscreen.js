import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';
import styles from '../styles/Mainstyle';
// import Icon from 'react-native-vector-icons/FontAwesome';

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
		// @todo save here
		this.lendyooRegistry.loanCollection.createNewLoan();
		this.loan.save();

		// redirect
		this.routes.gotTo("auth");
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

				<View style={localStyles.RegisterContainer}>
					<Text style={styles.welcome}>
						PHOTO
					</Text>
					<Text style={localStyles.data}>{
						"Loan Title : " + this.loan.title + "\n" +
						"Loan from : " + this.getFromName() + "\n" +
						"Loan to : " + this.contactCollection.getModelById(this.loan.toId).getFullName() + "\n\n" +
						"Loan isSaved : " + this.loan.isSaved + "\n" +
						"Loan detail : " + this.loan.detail + "\n" +
						"Loan sendReminders : " + this.loan.sendReminders + "\n" +
						"Loan remindersFrequency : " + this.loan.remindersFrequency + " days \n\n" +
						"Loan loanDate : " + "\n" + this.loan.loanDate + "\n" +
						"Loan loanExpirationDate : " + "\n" + this.loan.loanExpirationDate + "\n" +
						"Loan lastReminderSent : " + "\n" + this.loan.lastReminderSent + "\n"
					}</Text>
					<View style={localStyles.socialViews}>
						<Button name="thumbs-o-up" style={localStyles.socialButton} backgroundColor="#FF9100"
									 onPress={ () => this.save() } title="Confirm / update loan"></Button>
					</View>
				</View>
			</View>
		);
	}
}

const localStyles = StyleSheet.create({
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