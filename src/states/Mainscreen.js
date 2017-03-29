import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text
} from 'react-native';

import { Container, Header, Title, Button, Left, Right, Body, Icon, Drawer } from 'native-base';

import LendyooRegistry from '../libs/LendyooRegistry';
import MenuBar from './MenuBar';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

/**
 * Welcome/help screen
 */
class Mainscreen extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.lendyooRegistry = new LendyooRegistry();
		this.console = this.lendyooRegistry.Console;
		this.console.log('Mainscreen.constructor()', props);
		this.routes = this.lendyooRegistry.routes;
		this.routes.setGlobalContainer(this);

		this.state = {
			selectedView: this.routes._currentView
		};
		this.menuItems = this.routes.getRoutes();
	}

	/**
	 *
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.console.log('Mainscreen.onPressTextbox()', elemId);
		this.routes.getViewById(elemId);
		this.setState({selectedView: this.routes.getCurrentView()});
		this.hideMenu();
	}

	/**
	 *
	 */
	showMenu() {
		this._drawer._root.open();
	}

	hideMenu()
	{
		this._drawer._root.close();
	}

	toggleMenu()
	{
		this._drawer._root.toggle();
	}


	/**
	 *
	 * @returns {XML}
	 */
	getNavigationItem() {
		this.console.log('Mainscreen.getNavigationItem()');
		if (this.state.selectedView.showBackButton)
			return <Text style={ localStyles.topBarText } onPress={ () => this.routes.goBack() }><IconAwesome
				name="chevron-left" style={ localStyles.topBarIcon }/></Text>;
		else
			return <Text style={ localStyles.topBarText } onPress={ () => this.showMenu() }><IconAwesome name="bars"
																								  style={ localStyles.topBarIcon }/></Text>;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.toggleMenu()}>
							<Icon name='menu'/>
						</Button>
					</Left>
					<Body>
					<Title><IconAwesome name={ this.state.selectedView.icon } style={ localStyles.topBarIcon } /> { this.state.selectedView.label }</Title>
					</Body>
					<Right />
				</Header>
				<Drawer ref={(ref) => { this._drawer = ref; }} content={<MenuBar menuItems={this.menuItems} parentComponent={this}></MenuBar>} onClose={() => this.hideMenu()}>
						{ this.state.selectedView.component }
				</Drawer>
			</Container>

		);
	}

}


const localStyles = StyleSheet.create({
	topBarIcon: {
		paddingTop: 5,
		textAlign: 'center',
		fontSize: 20
	},
	topBarText: {
		paddingTop: 10,
		textAlign: 'center'
	},
	topBarContainer: {
		height: 45,
		backgroundColor: '#000000',
		alignItems: 'center',
		flexDirection: 'row'
	}
});


AppRegistry.registerComponent('Mainscreen', () => Mainscreen);

export default Mainscreen;