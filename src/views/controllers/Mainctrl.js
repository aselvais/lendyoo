import React, {Component} from 'react';
import {
	Text
} from 'react-native';
import {
	Icon
} from 'native-base';
import LendyooRegistry from '../../libs/LendyooRegistry';
import {colors, Mainstyle} from '../../styles/Mainstyle';

/**
 * Welcome/help screen
 */
class Mainctrl extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.colors = colors;
		this.css = Mainstyle;
		this.lendyooRegistry = new LendyooRegistry();
		this.lendyooRegistry.setRootComponent(this);
		this.console = this.lendyooRegistry.Console;
		this.console.log('Mainctrl.constructor()', props);
		this.routes = this.lendyooRegistry.routes;
		this.routes.setGlobalContainer(this);
		this.iOS = this.lendyooRegistry.isIOS();
		this.state = {
			isAuth: false, //this.lendyooRegistry.isAuthenticated,
			selectedView: this.routes._currentView,
			loading: false,
			routeName: 'lendtakepict'
		};
		this.menuItems = this.routes.getRoutes();
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.resetAuthState(this.lendyooRegistry.isAuthenticated);
		this.setState({routeName: 'lendtakepict'});
	}

	/**
	 *
	 */
	resetAuthState(s)
	{
		this.setState({isAuth: s, routeName: 'lend'});
	}

	/**
	 *
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.console.log('Mainctrl.onPressTextbox()', elemId);
		this.routes.getViewById(elemId);
		if (elemId.name) {
			this.setState({routeName: elemId.name});
		}
		this.setState({selectedView: this.routes.getCurrentView()});
		this.hideMenu();
	}

	/**
	 *
	 */
	showMenu() {
		this._drawer._root.open();
	}

	/**
	 *
	 */
	hideMenu() {
		try {
			this._drawer._root.close();
		} catch (er) {
			console.log('Error, must be a logout');
		}
	}

	/**
	 *
	 */
	toggleMenu() {
		this._drawer._root.toggle();
	}

	/**
	 *
	 * @returns {XML}
	 */
	getNavigationItem() {
		this.console.log('Mainctrl.getNavigationItem()');
		if (this.state.selectedView.showBackButton)
			return <Text style={ this.css.maintopBarText } onPress={ () => this.routes.goBack() }><Icon name="chevron-left" /></Text>;
		else
			return <Text style={ this.css.maintopBarText } onPress={ () => this.showMenu() }><Icon name="bars"/></Text>;
	}

	/**
	 *
	 * @param l
	 */
	setLoading(l = false) {
		this.setState({loading: l});
	}

	/**
	 *
	 * @param v
	 */
	setAuth(v) {
		this.setState({isAuth: v});
	}

	onPressTabElement(routeName) {
		this.setState({routeName: routeName});
		this.routes.goTo(routeName);
	}

}

export default Mainctrl;