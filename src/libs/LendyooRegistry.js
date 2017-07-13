import {Platform} from 'react-native';
import Console from './Console';
import Routes from './Routes';
import User from '../shared/models/frontend/User';
import Group from '../shared/models/frontend/Group';
import ContactCollection from '../shared/models/frontend/ContactCollection';
import LoanCollection from '../shared/models/frontend/LoanCollection';
import Loan from '../shared/models/frontend/Loan';
import Photo from '../shared/models/frontend/Photo';
import Config from '../shared/models/frontend/Config';
import LendyooStorage from './LendyooStorage';

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

	/**
	 * Initialization
	 * @param useLocalStorageAuth
	 */
	init(useLocalStorageAuth=true)
	{
		this.isAuthenticated = false;
		this.didLogOut = false;
		if (useLocalStorageAuth) {
			this.config = new Config();
			this.Console = new Console(this.config.debug);
			this.platform = Platform.OS;
			this.appVersion = this.config.APP_VERSION;
			this.rootComponent = null;
			this.menuBarComponent = null;
			this.instanceTime = new Date();
			this.storage = new LendyooStorage();
		}
		this.User_id = false;
		this.user = new User();
		this.group = new Group();
		this.contactCollection = new ContactCollection();
		this.loanCollection = new LoanCollection();
		this.initNewLoanAndPhoto();

		this.routes = new Routes(this.isAuthenticated);

	}

	/**
	 *
	 */
	initNewLoanAndPhoto()
	{
		this.newloan = new Loan();
		this.newphoto = new Photo();
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

	/**
	 * Sets the authentication status
	 * @param s
	 */
	setAuthStatus(s)
	{
		if (this.menuBarComponent && this.menuBarComponent.setAuthState)
			this.menuBarComponent.setAuthState(s);
		this.isAuthenticated = s;
		if (this.isAuthenticated === false)
		{
			this.init(false);
		}
	}

	/**
	 * Sets the root component to a local property
	 * @param r
	 */
	setRootComponent(r)
	{
		this.rootComponent = r;
	}

	/**
	 * Sets the menubar to a local property
	 * @param c
	 */
	setMenuBarComponent(c)
	{
		this.menuBarComponent = c;
	}


}


export default LendyooRegistry;
