import React, {Component} from 'react';
import LendyooRegistry from '../libs/LendyooRegistry';

/**
 *
 */
class ComponentAbstract extends Component
{

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.lendyooRegistry = new LendyooRegistry();
		this.console = this.lendyooRegistry.Console;
		this.user = this.lendyooRegistry.user;
		this.routes = this.lendyooRegistry.routes;
		this.loan = this.lendyooRegistry.loanCollection.getActiveModel();


	}

}

export default ComponentAbstract