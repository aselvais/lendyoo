import ModelAbstract from '../libs/ModelAbstract';

/**
 * Contact model.
 * Person you can lend an item to
 *
 */
class Contact extends ModelAbstract
{

	constructor(data=null)
	{
		super(data);

		if (!this.id) this.id= '';
		if (!this.firstName) this.firstName = '';
		if (!this.lastName) this.lastName = '';
		if (!this.email) this.email = '';
		if (!this.picture) this.picture = '';
	}

	/**
	 *
	 * @returns {string}
	 */
	getFullName()
	{
		return this.firstName + ' ' + this.lastName;
	}

}

export default Contact;
