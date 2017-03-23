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
			this.init();
			instance = this;
		}
		return instance;
	}

	init()
	{
		var _that = this;
		this.config = new Config();
		this.Console = new Console(true);
		this.platform = Platform.OS;
		this.appVersion = this.config.APP_VERSION;
		this.isAuthenticated = false;
		this.User_id = false;
		this.instanceTime = new Date();
		this.user = new User();
		this.group = new Group();
		this.contactCollection = new ContactCollection();
		this.loanCollection = new LoanCollection();

		// do the stored auth here
		this.isAuthenticated = true;

		if (this.isAuthenticated) {
			this.User_id = '58be0931785ff104cc252d88'; // to store locally
			this.user.populateDataFromRemote(this.User_id).then((d) => _that.group.populateDataFromRemote(_that.user.Group_id));
		}

		this.routes = new Routes(this.isAuthenticated);


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
