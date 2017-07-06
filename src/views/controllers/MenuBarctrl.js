import React from 'react';
import ComponentAbstract from '../../libs/ComponentAbstract';
import {
	AppRegistry,
	Text,
	View,
	ScrollView
} from 'react-native';
import {
	Icon
} from 'native-base';

/**
 * Make loan screen (with pict)
 */
class MenuBarctrl extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.props.parentComponent = props.parentComponent;
		this.state = {
			isAuthenticated: false
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.lendyooRegistry.setMenuBarctrlComponent(this);
		this.console.log('MenuBarctrl.componentDidMount()');
	}

	/**
	 *
	 * @param st
	 */
	setAuthState(st = false) {
		this.setState({isAuthenticated: st});
	}

	/**
	 *
	 * @todo clean that
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.rootComponent.setLoading(true);
		this.console.log('MenuBarctrl.onPressTextbox()', elemId);
		this.props.parentComponent.onPressTextbox(elemId);
	}

}

export default MenuBarctrl;