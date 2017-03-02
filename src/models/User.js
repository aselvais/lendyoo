import ModelAbstract from '../libs/ModelAbstract';

let instance = null;

/**
 * The application registered used.
 * This is a singleton
 */
class User extends ModelAbstract
{

	constructor(data={})
	{
		if(!instance){
			super(data);
			if (!this.instanceTime) this.instanceTime = new Date();
			if (!this.creationDate) this.creationDate = new Date();
			if (!this.lastLogin) this.lastLogin = new Date();
			if (!this.isRegistered) this.isRegistered = false;
			if (!this.id) this.id = '';
			if (!this.username) this.username = '';
			if (!this.fname) this.fname = '';
			if (!this.lname) this.lname = '';
			if (!this.dob) this.dob = '';
			if (!this.gender) this.gender = '';
			if (!this.password) this.password = '';
			if (!this.email) this.email = '';
			if (!this.lang) this.lang = 'en';
			instance = this;
		}
		return instance;

	}

	/**
	 * Will set the data stored on disk in this model
	 */
	setStoredData()
	{
		this.isRegistered = true;
		this.username = 'aselvais';
		this.password = 'aselvais11';
		this.fname = 'Arnaud';
		this.lname = 'Selvais';
		this.gender = 'M';
		this.email = 'raphael.thys@gmail.com';
	}

	/**
	 * Returns the first and last name combined
	 * @returns {string}
	 */
	getFullName()
	{
		return this.fname + ' ' + this.lname;
	}



}

export default User;
