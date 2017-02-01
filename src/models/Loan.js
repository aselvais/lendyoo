import ModelAbstract from '../libs/ModelAbstract';

/**
 * Loan model
 */
class Loan extends ModelAbstract
{

	/**
	 *
	 * @param data
	 */
	constructor(data=[])
	{
		super(data);

		if (!this.id) this.id = '';
		if (!this.fromId) this.fromId = null;
		if (!this.toId) this.toId = null;
		if (!this.photo) this.photo = null;
		if (!this.isSaved) this.isSaved = false;
		if (!this.title) this.title = '';
		if (!this.detail) this.detail = '';
		if (!this.loanDate) this.loanDate = null;
		if (!this.loanExpirationDate) this.loanExpirationDate = '';
		if (!this.lastReminderSent) this.lastReminderSent = '';
		if (!this.sendReminders) this.sendReminders = true;
		if (!this.remindersFrequency) this.remindersFrequency = 7;
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
