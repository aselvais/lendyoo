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
		this.rootComponent = this.lendyooRegistry.rootComponent;
		this.menuBarComponent = this.lendyooRegistry.menuBarComponent;
		this.console = this.lendyooRegistry.Console;
		this.user = this.lendyooRegistry.user;
		this.group = this.lendyooRegistry.group;
		this.routes = this.lendyooRegistry.routes;
		this.loanCollection = this.lendyooRegistry.loanCollection;
		this.loan = this.lendyooRegistry.loanCollection.getActiveModel();
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.rootComponent.setLoading(false);
	}




}

export default ComponentAbstract