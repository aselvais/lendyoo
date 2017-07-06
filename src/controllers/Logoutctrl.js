import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';

/**
 *
 */
class Logoutctrl extends ComponentAbstract {

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.rootComponent.resetAuthState(false);
		this.lendyooRegistry.setAuthStatus(false);
		this.lendyooRegistry.didLogOut = true;
		this.routes.goTo("home");
	}

}

export default Logoutctrl;