import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';

import { Spinner, Container, Header, Title, Button, Left, Right, Body, Icon, Drawer } from 'native-base';
import Dimensions from 'Dimensions';

// We can use this to make the overlay fill the entire width
var { width, height } = Dimensions.get('window');

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
		this.lendyooRegistry.setRootComponent(this);
		this.console = this.lendyooRegistry.Console;
		this.console.log('Mainscreen.constructor()', props);
		this.routes = this.lendyooRegistry.routes;
		this.routes.setGlobalContainer(this);

		this.state = {
			selectedView: this.routes._currentView,
			loading: false
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
		try {
			this._drawer._root.close();
		} catch(er)
		{
			console.log('Error, must be a logout');
		}
	}

	toggleMenu()
	{
		this._drawer._root.toggle();
	}


	/**
	 *
	 * @returns {XML}
	 */
	getNavigationItem()
	{
		this.console.log('Mainscreen.getNavigationItem()');
		if (this.state.selectedView.showBackButton)
			return <Text style={ localStyles.topBarText } onPress={ () => this.routes.goBack() }><IconAwesome
				name="chevron-left" style={ localStyles.topBarIcon }/></Text>;
		else
			return <Text style={ localStyles.topBarText } onPress={ () => this.showMenu() }><IconAwesome name="bars" style={ localStyles.topBarIcon }/></Text>;
	}

	setLoading(l=false)
	{
		this.setState({ loading: l });
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		var spinner;
		if (this.state.loading)
			spinner = <View style={ localStyles.overlay }>
				<View style={ localStyles.spinner }>
					<Spinner color='black' />
				</View>
			</View>;

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
					{ spinner }
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
	},
	overlay: {
		alignItems: 'center',
		flex: 1,
		//opacity: 0.5,
		//backgroundColor: '#000000',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		position: 'absolute',
		left: 0,
		top: 0,
		width: width,
		height: height,
		zIndex: 999
	},
	spinner:
	{
		width: 80,
		height: 80,
		borderRadius: 5,
		backgroundColor: 'rgba(255, 255, 255, 0.2)'
	}
});


AppRegistry.registerComponent('Mainscreen', () => Mainscreen);

export default Mainscreen;