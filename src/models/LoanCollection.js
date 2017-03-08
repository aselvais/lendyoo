import CollectionAbstract from './CollectionAbstract';
import Loan from './Loan';

/**
 * Collection of loans
 */
class LoanCollection extends CollectionAbstract
{

	constructor()
	{
		super();
	}

	/**
	 *
	 */
	createNewLoan()
	{
		this.setActiveModel( new Loan() );
	}

}

export default LoanCollection;
