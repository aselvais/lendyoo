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
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Loans history/list
 */
class Loanhistoryscreen extends ComponentAbstract {


	/**
	 *
	 */
	lendItem()
	{
		this.console.log('Authenticationscreen.lendItem()');
		this.lendyooRegistry.routes.gotTo("lend");
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Loanhistoryscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Items you've lent
					</Text>
				</View>

				<View style={localStyles.RegisterContainer}>
					<View style={localStyles.socialViews}>
						<Icon.Button name="thumbs-o-up" style={localStyles.socialButton} backgroundColor="#FF9100"
									 onPress={ () => this.lendItem() } title="Lend an item">Lend an item</Icon.Button>
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
		paddingTop: 25,
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
AppRegistry.registerComponent('Loanhistoryscreen', () => Loanhistoryscreen);

export default Loanhistoryscreen;