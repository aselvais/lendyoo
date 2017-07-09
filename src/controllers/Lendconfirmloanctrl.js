import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';

/**
 *
 */
class Lendconfirmloanctrl extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Loandetailscreen.constructor()', props);

		this.init();

		this.state = {
			contact: this.lendyooRegistry.contactCollection.getActiveModel(),
			newloan: this.newloan,
			newphoto: this.newphoto
		};

	}

	/**
	 * Do some initialization of data
	 */
	init()
	{
		// sets expiration 1 month in the future
		this.newloan.dateExpiration = new Date();
		this.newloan.dateExpiration.setMonth(this.newloan.dateExpiration.getMonth()+1);
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
	}

	/**
	 *
	 */
	save() {
		this.console.log('Loandetailscreen.save()');
		this.console.log(this.loan);
		// this.loan.save();
		// redirect
		// this.routes.goTo("history");
	}

	/**
	 *
	 * @param key
	 * @param val
	 */
	onFormElementChange(key, val) {
		var _o = {};
		_o[key] = val;
		this.console.log(JSON.stringify(_o));
		this.loan[key] = val;
		this.setState(_o);
	}

	/**
	 *
	 */
	clickedReturnedDate()
	{

	}

	/**
	 * @todo Save the other model params before going back to the contact selection
	 */
	clickedNamed()
	{
		this.routes.goTo('lendchoosecontact');
	}

}

export default Lendconfirmloanctrl;