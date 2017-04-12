import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	View
} from 'react-native';
import {
	Content,
	Button,
	Left,
	Body,
	Right,
	ListItem,
	Thumbnail,
	Text,
	H2,
	Badge
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
		this.lendyooRegistry.routes.gotTo("lend");
	}

	/**
	 *
	 * @param loan
	 */
	onPressLoan(loan) {
		this.lendyooRegistry.loanCollection.setActiveModel(loan);
		this.routes.gotTo('detail');
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
				<View>
					<View style={this.css.loanhistRegisterContainer}>
						{
							(!this.state.loanCollectionModels || this.state.loanCollectionModels.length <= 0) ?
								(<View>
									<H2>{ this.state.noitemtext }</H2>
								</View>)
								:
								(<View>
									{
										this.state.loanCollectionModels.map((loan) =>
											<ListItem key={loan._id} onPress={ () => this.onPressLoan(loan) } avatar>
												<Left>
													{
														loan.photo ?
															(<Thumbnail
																defaultSource={require('../assets/images/loading.png')}
																source={{uri: this.lendyooRegistry.config.API_URL + '/api-v2/photo/getloanimage/' + loan._id + '/80'}}/>)
															:
															(<Thumbnail
																defaultSource={require('../assets/images/loading.png')}
																size={80}
																source={require('../assets/images/no-image-half-landscape.png')}/>)
													}
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
								</View>)
						}
					</View>
				</View>
		);
	}
}

AppRegistry.registerComponent('Loanhistoryscreen', () => Loanhistoryscreen);

export default Loanhistoryscreen;