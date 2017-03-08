/**
 * Abstract client model
 */
class ModelAbstract
{

	/**
	 *
	 * @param params
	 */
	constructor(params)
	{
		if (typeof params === 'object')
		{
			for( var e in params)
			{
				if (params[e])
					this[e] = params[e];
			}
		}
	}

	/**
	 * Sets the local props based on the schema
	 * @param schema
	 */
	setSchema(schema)
	{
		this._schema = schema;
		if (typeof params === 'object')
		{
			for (var e in schema)
			{
				if (schema[e])
					this[e] = (schema[e].default ? schema[e].default : null);
			}
		}
	}

}

export default ModelAbstract;
