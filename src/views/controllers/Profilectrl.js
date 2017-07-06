import React from 'react';
import ComponentAbstract from '../../libs/ComponentAbstract';

/**
 *
 */
class Profilectrl extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			user: this.user,
			group: this.group,
			fname: this.user.fname,
			lname: this.user.lname,
			gender: this.user.gender
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		var _that = this;
		_that.rootComponent.setLoading(true);
		this.user.populateDataFromRemote(this.lendyooRegistry.User_id).then(
			function (d) {
				if (d) {
					_that.setState({user: _that.user});
					_that.group.populateDataFromRemote(_that.user.Group_id).then(
						function (dd) {
							_that.rootComponent.setLoading(false);
							if (dd)
								_that.setState({group: _that.group});
						},
						function () {
							_that.rootComponent.setLoading(false);
						}
					);
				}
			},
			function () {
				_that.rootComponent.setLoading(false);
			}
		);
	}

	/**
	 *
	 */
	editGroup() {

	}

	/**
	 *
	 */
	editUser() {
		this.state.user.fname = this.state.fname;
		this.state.user.lname = this.state.lname;
		this.state.user.gender = this.state.gender;
		this.user.save();
	}

}

export default Profilectrl;
