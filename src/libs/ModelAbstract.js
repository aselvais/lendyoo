// import Console from '../libs/Console';

/**
 * parent class of all models, will contain access to the DB for data sync.
 *
 */
class ModelAbstract
{

	constructor(data=null)
	{
		// this.Console = new Console();
		if (data)
		{
			for (var k in data)
			{
				this[k] = data[k];
			}
		}
	}


}

export default ModelAbstract;