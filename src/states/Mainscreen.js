import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Alert
} from 'react-native';

import LendyooRegistry from '../libs/LendyooRegistry';
import MenuBar from './MenuBar';
import Icon from 'react-native-vector-icons/FontAwesome';

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
			selectedView: this.routes._currentView,
			visible: false
		};
		this.menuItems = this.routes.getRoutes();
	}

	/**
	 *
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.console.log('Mainscreen.onPressTextbox()', elemId);
		this.routes.getViewById( elemId );
		this.setState({selectedView: this.routes.getCurrentView() });
		this.setState({visible: false});
	}

	/**
	 *
	 */
	showMenu() {
		this.console.log('Mainscreen.showMenu()');
		this.setState({visible: true});
	}

	/**
	 *
	 * @returns {XML}
	 */
	getNavigationItem()
	{
		this.console.log('Mainscreen.getNavigationItem()');
		if (this.state.selectedView.showBackButton)
			return <Text style={ localStyles.topBarText } onPress={ () => this.routes.goBack() }><Icon name="chevron-left" style={ localStyles.topBarIcon } /></Text>;
		else
			return <Text style={ localStyles.topBarText } onPress={ () => this.showMenu() }><Icon name="bars" style={ localStyles.topBarIcon } /></Text>;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Mainscreen.render()');
		return (
			<View style={{flex: 1}}>
				<StatusBar hidden={true}/>
				<MenuBar visibility={this.state.visible} menuItems={this.menuItems} parentComponent={this}></MenuBar>
				<View style={ localStyles.topBarContainer }>
					<View style={{flex: 1}}>
						{ this.getNavigationItem() }
					</View>
					<View style={{flex: 3}}><Text style={ localStyles.topBarText }>
						<Icon name={ this.state.selectedView.icon } style={ localStyles.topBarText } /> { this.state.selectedView.label }
					</Text></View>
					<View style={{flex: 1}}><Text style={ localStyles.topBarText }></Text></View>
				</View>
				{ this.state.selectedView.component }
			</View>
		);
	}
}


const localStyles = StyleSheet.create({
	topBarIcon: {
		paddingTop: 5,
		color: '#FFFFFF',
		textAlign: 'center',
		fontSize: 20
	},
	topBarText: {
		paddingTop: 10,
		color: '#FFFFFF',
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