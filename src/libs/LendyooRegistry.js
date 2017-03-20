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
			var _that = this;
			this.config = new Config();
			this.Console = new Console(true);
			this.platform = Platform.OS;
			this.appVersion = this.config.APP_VERSION;
			this.isAuthenticated = false;
			this.User_id = false;

			// do the stored auth here
			// ...
			this.isAuthenticated = true;

			// date of singleton instanciation
			this.instanceTime = new Date();
			// The routes
			this.routes = new Routes(this.isAuthenticated);

			// The authenticated user
			this.user = new User({});
			// The group the user is a part of
			this.group = new Group({});

			if (this.isAuthenticated) {
				this.User_id = '58be0931785ff104cc252d88'; // to store locally

				this.user.populateDataFromRemote(this.User_id).then(
					function(d){
						if (d)
						{
							_that.group.populateDataFromRemote(_that.user.Group_id).then(
								function(dd) {
								}
							);
						}
					}
				);

			}

			this.contactCollection = new ContactCollection();
			this.contactCollection.setContacts(
				[
					{id: 1, firstName: 'Arnaud', lastName: 'Selvais', email: 'arnaud@antidot.ca'},
					{id: 2, firstName: 'Kevin', lastName: 'Lame', email: 'steve.lame@gmail.com'},
					{id: 3, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 4, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'},
					{id: 5, firstName: 'Raphael', lastName: 'Thys', email: 'rthys@antidot.ca'},
					{id: 6, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 7, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'},
					{id: 8, firstName: 'Raphael', lastName: 'Thys', email: 'rthys@antidot.ca'},
					{id: 9, firstName: 'Arnaud', lastName: 'Selvais', email: 'arnaud@antidot.ca'},
					{id: 10, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 11, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'},
					{id: 12, firstName: 'Raphael', lastName: 'Thys', email: 'rthys@antidot.ca'},
					{id: 13, firstName: 'Arnaud', lastName: 'Selvais', email: 'arnaud@antidot.ca'}
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
