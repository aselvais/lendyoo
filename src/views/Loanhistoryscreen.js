import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Image,
	View,
	Switch,
	Dimensions
} from 'react-native';
import {
	Content,
	Button,
	Left,
	Right,
	ListItem,
	Thumbnail,
	Text,
	H2,
	Badge,
	Card,
	CardItem,
	Icon,
	Body,
	Header,
	Tabs,
	Tab
} from 'native-base';

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
			loanCollectionModels: this.lendyooRegistry.loanCollection.models,
			noitemtext: 'Loading...'
		};
	}

	/**
	 *
	 */
	componentDidMount() {
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
				_that.setState({noitemtext: 'No loan yet ...'});
				_that.rootComponent.setLoading(false);
			},
			function (d) {
				_that.setState({noitemtext: 'No loan yet ...'});
				_that.rootComponent.setLoading(false);
			}
		);
	}

	/**
	 *
	 */
	lendItem() {
		this.console.log('Authenticationscreen.lendItem()');
		this.lendyooRegistry.routes.goTo("lendtakepict");
	}

	/**
	 *
	 * @param loan
	 */
	onPressLoan(loan) {
		this.lendyooRegistry.loanCollection.setActiveModel(loan);
		this.routes.goTo("detail");
	}

	/**
	 *
	 * @param loan
	 */
	toggleLoanStatus(loan)
	{
		var _that = this;
		if (loan.status == 'open')
		{
			loan.status = 'closed';
		}
		else
		{
			loan.status = 'open';
		}
		loan.save().then(
			function(d) {
				console.log(d);
			},
			function(er) {
				console.log(er);
			}
		).then(function(){
		});
		_that.setState({loanCollectionModels: _that.lendyooRegistry.loanCollection.models});
	}

	/**
	 *
	 * @param d
	 * @returns {string}
	 */
	getFormatedDate(d) {
		var d = new Date(d);
		return d.toLocaleDateString();
	}

	/**
	 *
	 * @param status open|close|expired
	 * @returns {XML}
	 */
	getLoanListView( status='open' ) {
		var nbrEntries = 0;
		return <View style={this.css.loanhistRegisterContainer}>
			{
				(!this.state.loanCollectionModels || this.state.loanCollectionModels.length <= 0) ?
					(<View>
						<Card>
							<CardItem>
								<Left>
									<Body>
									<Text>{ this.state.noitemtext }</Text>
									</Body>
								</Left>
							</CardItem>
						</Card>
					</View>)
					:
					(<View>
						{
							this.state.loanCollectionModels.filter(function(loan){
								if (loan.status == status )
								{
									nbrEntries++;
									return true;
								}
								return false;
							}).map((loan, idx, orAr) =>
								<Card key={loan._id}>

									<CardItem>
										<Left>
											<Body>
											<Text>{ loan.title }</Text>
											<Text note>lent to { this.getContactName(orAr[idx]) }</Text>
											</Body>
										</Left>
										<Right>
											<Text note>{ this.getFormatedDate(loan.dateCreated) }</Text>
										</Right>
									</CardItem>

									<CardItem>
										<Body>
										{
											loan.photo ?
												(<Image onPress={ () => this.onPressLoan(orAr[idx]) }
														defaultSource={require('../assets/images/loading.png')}
														style={{
															resizeMode: 'cover',
															overflow: 'hidden',
															width: Dimensions.get('window').width - 60,
															height: 200
														}}
														source={{uri: this.lendyooRegistry.config.API_URL + '/api-v2/photo/getloanimage/' + loan._id + '/' + (Dimensions.get('window').width - 60)}}></Image>
												)
												: null
										}
										</Body>
									</CardItem>

									<CardItem>
										<Left>
											<Text>{ loan.detail }</Text>
											<Button transparent onPress={ () => this.onPressLoan(orAr[idx]) }>
												<Text style={{ color: this.colors.c2, textDecorationLine: 'underline' }}>Detail</Text>
											</Button>
										</Left>
										<Right>
											<Button primary onPress={ () => this.toggleLoanStatus(orAr[idx]) }>
												<Text>{ (loan.status == 'open') ? 'Returned' : 'Re-open' }
												</Text>
											</Button>
										</Right>
									</CardItem>

								</Card>
							)
						}
					</View>)
			}
		</View>
	}

	/**
	 * @todo Put this thing somewhere else
	 * @returns {*}
	 */
	getContactName(_loan) {
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
			<Tabs>
				<Tab heading="Lent"><Content padder={true} style={{backgroundColor: this.colors.c1}}>{ this.getLoanListView('open') }</Content></Tab>
				<Tab heading="Returned"><Content padder={true} style={{backgroundColor: this.colors.c1}}>{ this.getLoanListView('closed') }</Content></Tab>
			</Tabs>
		);
	}
}

AppRegistry.registerComponent('Loanhistoryscreen', () => Loanhistoryscreen);

export default Loanhistoryscreen;