import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	TouchableHighlight,
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
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Contactselectionscreen.constructor()', props);
		this.state = {
			loanCollectionModels: this.lendyooRegistry.loanCollection.models
		};
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.setLoansList();
	}

	/**
	 *
	 */
	setLoansList() {
		this.setState({loanCollectionModels: []});
		var _that = this;
		this.lendyooRegistry.loanCollection.setRemoteLoansFromUser(this.user._id).then(
			function (d) {
				_that.setState({loanCollectionModels: _that.lendyooRegistry.loanCollection.models});
			}
		);
	}

	/**
	 *
	 */
	lendItem() {
		this.console.log('Authenticationscreen.lendItem()');
		this.lendyooRegistry.routes.gotTo("lend");
	}

	/**
	 *
	 * @param loan
	 */
	onPressLoan(loan) {
		this.lendyooRegistry.loanCollection.setActiveModel( loan );
		this.routes.gotTo('detail');
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Loanhistoryscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View style={localStyles.welcomeContainer}>
					<Text style={localStyles.welcomeText}>
						Items you've lent
					</Text>
				</View>

				<View style={localStyles.RegisterContainer}>
					{
						(!this.state.loanCollectionModels || this.state.loanCollectionModels.length <= 0) ?
							(<View>
								<Text style={localStyles.welcomeText2}>
									No active loan for the moment ...
								</Text>
							</View>)
							:
							(<ScrollView style={localStyles.RegisterContainer}>
								{
									this.state.loanCollectionModels.map((loan) =>
										<View key={'view-'+loan._id} style={localStyles.element}>
											<TouchableHighlight key={'touch-'+loan._id} onPress={ () => this.onPressLoan(loan) }>
												<Text key={'text-'+loan._id} style={localStyles.data}>
													<Icon key={'icon-'+loan._id} name="pencil" style={localStyles.dataIcon}/>
													{ "  " + loan.title } { "\n      <" + loan.dateCreated + ">" }
												</Text>
											</TouchableHighlight>
										</View>
									)
								}
							</ScrollView>)
					}
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
	welcomeText2: {
		textAlign: 'center',
		paddingTop: 50,
		fontSize: 20,
		color: '#000'
	},
	socialViews: {
		padding: 50
	},
	socialButton: {
		margin: 5
	},
	element: {
		borderBottomWidth: 1,
		borderBottomColor: '#DDDDDD'
	}
});
AppRegistry.registerComponent('Loanhistoryscreen', () => Loanhistoryscreen);

export default Loanhistoryscreen;