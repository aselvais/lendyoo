

let instance = null;

/**
 * Wrapper for the console for debugging
 */
class Console
{

	/**
	 *
	 * @param debug
	 * @returns {*}
	 */
	constructor(debug=true)
	{
		if(!instance){
			// super(data);
			this.debug = debug;
			instance = this;
		}
		return instance;
	}

	/**
	 *
	 */
	log()
	{
		if (this.debug)
		{
			var d = new Date();
			var dd = d.getFullYear() + '-'
				+ (d.getMonth()+1) + '-'
				+ d.getDate() + ' ' +
				+ d.getHours() + ':' +
				+ d.getMinutes() + ':' +
				+ d.getSeconds() + '.' +
				+ d.getMilliseconds();
			var params = [...arguments];
			console.log('[' + dd + ']', ((params.length > 1) ? params : params[0] ) );
		}
	}



}


export default Console;