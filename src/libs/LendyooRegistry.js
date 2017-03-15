import {Platform} from 'react-native';
import Console from './Console';
import Routes from './Routes';
import User from '../shared/models/frontend/User';
import Group from '../shared/models/frontend/Group';
import ContactCollection from '../shared/models/frontend/ContactCollection';
import LoanCollection from '../shared/models/frontend/LoanCollection';
import Config from '../shared/models/frontend/Config';

let instance = null;

/**
 * Application Registry singleton which will contain all the objects we
 * might need from anywhere in the app.
 *
 */
class LendyooRegistry {

	/**
	 *
	 * @returns {*}
	 */
	constructor()
	{
		if (!instance)
		{
			this.config = new Config();
			this.Console = new Console(true);
			this.platform = Platform.OS;
			this.appVersion = this.config.APP_VERSION;
			this.isAuthenticated = false;
			this.User_id = false;

			// do the stored auth here
			// ...
			//this.isAuthenticated = true;
			//this.User_id = '58be0931785ff104cc252d88'; // to store locally

			// date of singleton instanciation
			this.instanceTime = new Date();
			// The routes
			this.routes = new Routes(this.isAuthenticated);

			// The authenticated user
			this.user = new User({});
			// The group the user is a part of
			this.group = new Group({});

			this.contactCollection = new ContactCollection();
			this.contactCollection.setContacts(
				[
					{id: 1, firstName: 'Arnaud', lastName: 'Selvais', email: 'arnaud@antidot.ca'},
					{id: 2, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 3, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'}
				]
			);
			this.loanCollection = new LoanCollection();
			this.loanCollection.createNewLoan();

			instance = this;
		}

		return instance;
	}

	/**
	 * Returns true if we are using IOS, or false if we assume we are on
	 * Android.
	 * @returns {boolean}
	 */
	isIOS()
	{
		if (this.platform === 'ios')
		{
			return true;
		}
		else
		{
			return false;
		}
	}


}


export default LendyooRegistry;
