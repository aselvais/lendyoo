/**
 *
 */
class CollectionAbstract
{

	/**
	 *
	 */
	constructor()
	{
		// collection of models
		this.models = [];
		// the current model we are working on
		this.activeModel = null;
	}

	/**
	 * Add a model to the collection
	 * @param model
	 */
	addModel( model )
	{
		this.models.push(model);
	}

	/**
	 *
	 * @returns {ModelAbstract|null}
	 */
	getActiveModel()
	{
		return this.activeModel;
	}

	/**
	 *
	 * @param model
	 */
	setActiveModel( model )
	{
		this.activeModel = model;
	}

	/**
	 *
	 * @param id
	 * @returns {string}
	 */
	getModelById( id )
	{
		for (var i=0; i < this.models.length; i++)
		{
			if (this.models[i].id == id)
				return this.models[i];
		}
		return null;
	}

}

export default CollectionAbstract;