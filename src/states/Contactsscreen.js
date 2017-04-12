import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';

/**
 * Connected contact view
 * (list of persons I am connected with whom I exchange items and status on the items)
 */
class Contactsscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Contactsscreen.constructor()', props);
		this.ContactCollection = this.lendyooRegistry.contactCollection;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Contactsscreen.render()');
		return (
			<View style={this.css.container}>
				<Text style={this.css.welcome}>
					Contactsscreen {"\n"}
					{ JSON.stringify( this.ContactCollection.models ) }
				</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('Contactsscreen', () => Contactsscreen);

export default Contactsscreen;