import UserAbstract from '../shared/models/UserAbstract';
import _schema from '../shared/models/schemas/User.json';

let instance = null;

/**
 * The application registered used.
 * This is a singleton
 */
class User extends UserAbstract
{

	constructor(params={})
	{
		if(!instance){
			super(params);
			this.setSchema(_schema);
			instance = this;
		}
		return instance;

	}


}

export default User;
