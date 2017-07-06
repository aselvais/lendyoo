import React from 'react';
import Loanhistoryctrl from '../controllers/Loanhistoryctrl';
import {
	AppRegistry,
	Image,
	View,
	Dimensions
} from 'react-native';
import {
	Content,
	Button,
	Left,
	Right,
	Text,
	Card,
	CardItem,
	Body,
	Tabs,
	Tab
} from 'native-base';

/**
 * Loans history/list
 */
class Loanhistoryscreen extends Loanhistoryctrl {

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
														defaultSource={require('../../assets/images/loading.png')}
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