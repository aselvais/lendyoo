import ModelAbstract from './ModelAbstract';
import _schema from '../shared/models/schemas/Loan.json';

/**
 * Loan model
 */
class Loan extends LoanAbstract
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
	 */
	setDefaultExpirationDate()
	{
		this.loanExpirationDate = this.loanDate.setMonth(this.loanDate.getMonth()+2);
	}

	/**
	 * @todo implement this thing
	 */
	save()
	{
		// this.Console.log('Loan.save() Save the thing ...');
	}



}

export default Loan;
