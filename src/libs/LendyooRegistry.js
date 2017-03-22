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
				this.user.populateDataFromRemote(this.User_id).then((d) => _that.group.populateDataFromRemote(_that.user.Group_id));
			}

			this.contactCollection = new ContactCollection();
			this.loanCollection = new LoanCollection();
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
