
import CollectionAbstract from '../libs/CollectionAbstract';
import Contact from './Contact';

/**
 * Collection of contacts
 */
class ContactCollection extends CollectionAbstract
{

	constructor()
	{
		super();
	}


	/**
	 *
	 * @param contacts
	 */
	setContacts( contacts=[] )
	{
		for (var i=0; i < contacts.length; i++)
		{
			this.addModel( new Contact(contacts[i]) );
		}
	}

}

export default ContactCollection;
