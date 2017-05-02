import React from 'react';
import {
	AsyncStorage
} from 'react-native';

const STORAGE_KEY = '@LendyooAppStorage:global';

let _instance = null;

/**
 * Wrapper for AsyncStorage
 */
class LendyooStorage {

	constructor() {
		if (!_instance) {
			_instance = this;
		}
		return _instance;
	}

	/**
	 * Returns the data from the local storage
	 * @returns {*|Promise}
	 */
	getData() {
		return AsyncStorage.getItem(STORAGE_KEY).then(
			function (dd) {
				try {
					var _jd = JSON.parse(dd);
					return _jd;
				} catch (e) {
					return null;
				}
			},
			function(er)
			{
				return null;
			}
		);
	}

	/**
	 * Sets data to the local storage
	 * @param _data
	 * @returns {*|Promise}
	 */
	setData(_data) {
		return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_data));
	}


}


export default LendyooStorage;
