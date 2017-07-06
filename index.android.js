import React, {Component} from 'react';
import {
	AppRegistry
} from 'react-native';
import Mainscreen from './src/views/jsx/Mainscreen';

/**
 * Bootstraping Android
 */
class lendyoo extends Component {
	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
            <Mainscreen/>
		);
	}
}
AppRegistry.registerComponent('lendyoo', () => lendyoo);
export default lendyoo;
