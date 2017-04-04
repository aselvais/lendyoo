import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	ScrollView,
	View
} from 'react-native';
import styles from '../styles/Mainstyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Text, H1, H2, Badge } from 'native-base';

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
		this.rootComponent.setLoading(false);
		this.setLoansList();
	}

	/**
	 *
	 */
	setLoansList() {
		this.rootComponent.setLoading(true);
		this.setState({loanCollectionModels: []});
		var _that = this;
		this.lendyooRegistry.loanCollection.setRemoteLoansFromUser(this.user._id).then(
			function (d) {
				_that.setState({loanCollectionModels: _that.lendyooRegistry.loanCollection.models});
				_that.rootComponent.setLoading(false);
			},
			function (d) {
				_that.rootComponent.setLoading(false);
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
	 * @param d
	 * @returns {string}
	 */
	getFormatedDate(d)
	{
		var d = new Date(d);
		return d.toLocaleDateString();
	}

	/**
	 * @todo Put this thing somewhere else
	 * @returns {*}
	 */
	getContactName(_loan)
	{
		if (_loan && _loan.Contact_id && this.lendyooRegistry.contactCollection.models && this.lendyooRegistry.contactCollection.models.length > 0) {
			var toret = this.lendyooRegistry.contactCollection.getModelById(_loan.Contact_id);
			console.log(toret);
			if (toret && toret.getFullName)
				return toret.getFullName();
			else
				return '';
		}
		else
			return '';
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Loanhistoryscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>

				<View >
					<H1>
						Items you've lent
					</H1>
				</View>

				<View style={localStyles.RegisterContainer}>
					{
						(!this.state.loanCollectionModels || this.state.loanCollectionModels.length <= 0) ?
							(<View>
								<H2>
									No active loan for the moment ...
								</H2>
							</View>)
							:
							(<ScrollView style={localStyles.RegisterContainer}>
								{
									this.state.loanCollectionModels.map((loan) =>
									<ListItem key={loan._id} onPress={ () => this.onPressLoan(loan) } avatar>
										<Left>
											<Thumbnail square size={80} source={require('../assets/images/bigstock-attractive-young-business-man-43103578.jpg')}/>
										</Left>
										<Body>
										<Text>{ loan.title }</Text>
										<Text note>{ this.getContactName(loan) }</Text>
										</Body>
										<Right>
											<Badge danger>
												<Text>{ loan.status }</Text>
											</Badge>
											<Text note>{ this.getFormatedDate(loan.dateCreated) }</Text>
										</Right>
									</ListItem>

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