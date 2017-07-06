import React from 'react';

// import Makeloanscreen from '../views/Makeloanscreen';

import Lendtakepictscreen from '../views/jsx/Lendtakepictscreen';
import Lendpictgalleryscreen from '../views/jsx/Lendpictgalleryscreen';
import Lendchoosecontactcreen from '../views/jsx/Lendchoosecontactcreen';
import Lendconfirmloanscreen from '../views/jsx/Lendconfirmloanscreen';

import Homescreen from '../views/jsx/Homescreen';
import Profilescreen from '../views/jsx/Profilescreen';
import Settingsscreen from '../views/jsx/Settingsscreen';
// import Contactselectionscreen from '../views/Contactselectionscreen';
import Loandetailscreen from '../views/jsx/Loandetailscreen';
import Loanhistoryscreen from '../views/jsx/Loanhistoryscreen';
// import Helpscreen from '../views/Helpscreen';
import Logoutscreen from '../views/jsx/Logoutscreen';

let instance = null;

/**
 * Singleton containing all the possible views/views of the app.
 *
 */
class Routes
{

	/**
	 *
	 * @returns {*}
	 */
	constructor(isAuthenticated=false)
	{
		if(!instance){
			this.instanceTime = new Date();
			this.isAuthenticated = false;
			this._routes = [
				{ name: 'home', icon: 'home', label: 'Home', component: <Homescreen/>, showBackButton: false, showWhenAuth: false },

//				{ name: 'lend', icon: 'camera', label: 'Make Loan', component: <Makeloanscreen/>, showBackButton: false, showWhenAuth: true },

				{ name: 'lendtakepict', icon: 'camera', label: 'Lend your item', component: <Lendtakepictscreen/>, showBackButton: true, showWhenAuth: false },
				{ name: 'lendpictgallery', icon: 'camera', label: 'Choose a picture', component: <Lendpictgalleryscreen/>, showBackButton: true, showWhenAuth: false },
				{ name: 'lendchoosecontact', icon: 'camera', label: 'Pick the borrower', component: <Lendchoosecontactcreen/>, showBackButton: true, showWhenAuth: false },
				{ name: 'lendconfirmloan', icon: 'camera', label: 'Lend to ', component: <Lendconfirmloanscreen/>, showBackButton: true, showWhenAuth: false },

				{ name: 'history', icon: 'list', label: 'Loans History', component: <Loanhistoryscreen/>, showBackButton: false, showWhenAuth: true },
				{ name: 'profile', icon: 'person', label: 'Profile', component: <Profilescreen/>, showBackButton: false, showWhenAuth: true },
				{ name: 'settings', icon: 'settings', label: 'Settings', component: <Settingsscreen/>, showBackButton: false, showWhenAuth: true },
				{ name: 'detail', icon: 'info', label: 'Loan Detail', component: <Loandetailscreen/>, showBackButton: true, showWhenAuth: true },

//				{ name: 'contacts', icon: 'address-book', label: 'Contact Selection', component: <Contactselectionscreen/>, showBackButton: true, showWhenAuth: true },
//				{ name: 'help', icon: 'question-circle', label: 'About / Help', component: <Helpscreen/>, showBackButton: false, showWhenAuth: false },
//				{ name: 'helpAuth', icon: 'question-circle', label: 'About / Help', component: <Helpscreen/>, showBackButton: false, showWhenAuth: true },

				{ name: 'logout', icon: 'lock', label: 'Log-out', component: <Logoutscreen/>, showBackButton: false, showWhenAuth: true }
			];
			this._currentView = null;
			// @todo Create a stack instead of only one value
			this._previousView = null;
			// default route
			this.setCurrentView( this.getViewByName((isAuthenticated ? 'history' : 'home')));
			// this.setCurrentView( this.getViewByName('lendtakepict'));
			instance = this;
		}
		return instance;
	}

	/**
	 * Sets the component that will display the routed components
	 * @param {Mainscreen} globalContainer
	 */
	setGlobalContainer(globalContainer)
	{
		this._globalContainer = globalContainer;
	}

	/**
	 * Sets the current view and store the previous one
	 * @param view
	 */
	setCurrentView( view )
	{
		this._previousView = this._currentView;
		this._currentView = view;
	}

	/**
	 *
	 * @returns {Array|[*,*,*,*,*,*]}
	 */
	getRoutes()
	{
		return this._routes;
	}

	/**
	 *
	 * @param idx
	 * @returns {{name, component}|*}
	 * @deprecated
	 */
	getViewById( idx=1 )
	{
		// this.setCurrentView( this._routes[idx] );
		this._currentView = this._routes[idx];
		return this._currentView;
	}

	/**
	 *
	 * @returns {null|{name, label, component}|*}
	 */
	getCurrentView()
	{
		return this._currentView;
	}

	/**
	 *
	 * @param name
	 * @returns {null|{name, label, component}|*}
	 */
	getViewByName( name="home" )
	{
		var len = this._routes.length;
		while(len--)
		{
			if (this._routes[len].name == name)
			{
				this.setCurrentView( this._routes[len] );
				break;
			}
		}
		return this._currentView;
	}

	/**
	 * Go to the current view
	 * @todo make something cleaner than that
	 */
	goToCurrentView()
	{
		this._globalContainer.onPressTextbox( this._routes.indexOf(this._currentView) );
	}

	/**
	 * Go to a view by it's route name
	 * @param {string} name Route name
	 */
	goTo( name="auth" )
	{
		this.getViewByName(name);
		this.goToCurrentView();
	}

	/**
	 * Go back to the previous view
	 */
	goBack()
	{
		this.goTo( this._previousView.name );
	}

	/**
	 * Returns the name of the previous view
	 * @returns {*}
	 */
	getPreviousViewName()
	{
		if (this._previousView && this._previousView.name)
			return this._previousView.name;
		else
			return null;
	}



}

export default Routes;