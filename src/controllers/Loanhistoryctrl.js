import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';

/**
 * Loans history/list
 */
class Loanhistoryctrl extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Contactselectionscreen.constructor()', props);
		this.state = {
			loanCollectionModels: this.lendyooRegistry.loanCollection.models,
			noitemtext: 'Loading...'
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		this.setLoansList();
	}

	/**
	 *
	 */
	setLoansList() {
		this.rootComponent.setLoading(true);
		this.setState({loanCollectionModels: []});
		var _that = this;
		this.lendyooRegistry.loanCollection.setRemoteLoansFromUser(this.user._id).then(
			function (d) {
				_that.setState({loanCollectionModels: _that.lendyooRegistry.loanCollection.models});
				_that.setState({noitemtext: 'No loan yet ...'});
				_that.rootComponent.setLoading(false);
			},
			function (d) {
				_that.setState({noitemtext: 'No loan yet ...'});
				_that.rootComponent.setLoading(false);
			}
		);
	}


	/**
	 *
	 * @param loan
	 */
	onPressLoan(loan) {
		this.lendyooRegistry.loanCollection.setActiveModel(loan);
		this.routes.goTo("detail");
	}

	/**
	 *
	 * @param loan
	 */
	toggleLoanStatus(loan) {
		var _that = this;
		_that.rootComponent.setLoading(true);
		(loan.status == 'open') ? loan.status = 'closed' : loan.status = 'open';
		loan.save().then(
			(d) => {
				_that.rootComponent.setLoading(false);
				_that.updateLoanList();
			},
			(er) => _that.rootComponent.setLoading(false)
		);
	}

	/**
	 *
	 */
	updateLoanList() {
		this.setState({loanCollectionModels: this.lendyooRegistry.loanCollection.models});
	}

	/**
	 *
	 * @param d
	 * @returns {string}
	 */
	getFormatedDate(d) {
		var d = new Date(d);
		return d.toLocaleDateString();
	}

	/**
	 * @todo Put this thing somewhere else
	 * @returns {*}
	 */
	getContactName(_loan) {
		if (_loan && _loan.Contact_id && this.lendyooRegistry.contactCollection.models && this.lendyooRegistry.contactCollection.models.length > 0) {
			var toret = this.lendyooRegistry.contactCollection.getModelById(_loan.Contact_id);
			if (toret && toret.getFullName)
				return toret.getFullName();
			else
				return '';
		}
		else
			return '';
	}

}

export default Loanhistoryctrl;