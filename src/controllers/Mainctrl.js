import React, {Component} from 'react';
import LendyooRegistry from '../libs/LendyooRegistry';
import {colors, Mainstyle} from '../styles/Mainstyle';

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
	componentDidMount() {
		this.resetAuthState(this.lendyooRegistry.isAuthenticated);
		// this.setState({routeName: 'lendtakepict'});
	}

	/**
	 *
	 */
	resetAuthState(s) {
		this.setState({isAuth: s}); //, routeName: 'lend'});
	}

	/**
	 *
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.console.log('Mainctrl.onPressTextbox()', elemId);
		var cv = this.routes.getViewById(elemId);
		this.setState({selectedView: this.routes.getCurrentView()});
		this.hideMenu();
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

	/**
	 *
	 * @param rn
	 */
	/* setRouteName(rn='')
	{
		var authroutes = ['lendtakepict','history','profile','settings'];
		if (authroutes.indexOf(rn) >= 0)
		{
			this.console.log('Mainctrl.setRouteName: ' + rn);
			this.setState({ routeName: rn});
		}
	} */

	/**
	 *
	 * @param routeName
	 */
	onPressTabElement(routeName) {
		// this.setState({routeName: routeName});
		this.routes.goTo(routeName);
	}

}

export default Mainctrl;