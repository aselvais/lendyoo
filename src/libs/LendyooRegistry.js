import {Platform} from 'react-native';
import Console from './Console';
import Routes from './Routes';
import User from '../shared/models/frontend/User';
import ContactCollection from '../shared/models/frontend/ContactCollection';
import LoanCollection from '../shared/models/frontend/LoanCollection';


let instance = null;

/**
 * Application Registry singleton which will contain all the objects we
 * might need from anywhere in the app.
 *
 */
class LendyooRegistry {

	constructor()
	{
		if (!instance)
		{
			this.Console = new Console(true);
			this.platform = Platform.OS;
			// @todo write this with the buid and deployment process
			this.appVersion = '0.0.7';
			// date of singleton instanciation
			this.instanceTime = new Date();
			// The authenticated user
			this.user = new User({
				isRegistered: true,
				username: 'aselvais',
				password: 'aselvais11',
				fname: 'Arnaud',
				lname: 'Selvais',
				gender: 'M',
				email: 'raphael.thys@gmail.com'
			});

			this.contactCollection = new ContactCollection();
			this.contactCollection.setContacts(
				[
					{id: 1, firstName: 'Arnaud', lastName: 'Selvais', email: 'arnaud@antidot.ca'},
					{id: 2, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 3, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'},
					{id: 4, firstName: 'Adam', lastName: 'Kecskemeti', email: 'Adam.Kecskemeti@corusent.com'},
					{id: 5, firstName: 'Alain', lastName: 'Haentjens', email: 'alain.haentjens@brain-network.be'},
					{id: 6, firstName: 'Alexis', lastName: 'Spicer', email: 'Alexis.Spicer@corusent.com'},
					{id: 7, firstName: 'Amy', lastName: 'Wang', email: 'amy_march@hotmail.com'},
					{id: 8, firstName: 'Arnaud', lastName: 'Selvais', email: 'arnaud@antidot.ca'},
					{id: 9, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 10, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'},
					{id: 11, firstName: 'Adam', lastName: 'Kecskemeti', email: 'Adam.Kecskemeti@corusent.com'},
					{id: 12, firstName: 'Alain', lastName: 'Haentjens', email: 'alain.haentjens@brain-network.be'},
					{id: 13, firstName: 'Alexis', lastName: 'Spicer', email: 'Alexis.Spicer@corusent.com'},
					{id: 14, firstName: 'Amy', lastName: 'Wang', email: 'amy_march@hotmail.com'},
					{id: 15, firstName: 'Emily', lastName: 'Liu', email: 'emily.sw.liu@gmail.com'},
					{id: 16, firstName: 'Sebastien', lastName: 'Le Grand', email: 'sebastien@antidot.com'},
					{id: 17, firstName: 'Adam', lastName: 'Kecskemeti', email: 'Adam.Kecskemeti@corusent.com'},
					{id: 18, firstName: 'Alain', lastName: 'Haentjens', email: 'alain.haentjens@brain-network.be'},
					{id: 19, firstName: 'Alexis', lastName: 'Spicer', email: 'Alexis.Spicer@corusent.com'}
				]
			);
			this.loanCollection = new LoanCollection();
			this.loanCollection.createNewLoan();

			// The routes
			this.routes = new Routes;

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
