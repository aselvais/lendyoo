import ModelAbstract from './ModelAbstract';
import _schema from '../shared/models/schemas/Contact.json';

/**
 * Contact model.
 * Person you can lend an item to
 *
 */
class Contact extends ModelAbstract
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
