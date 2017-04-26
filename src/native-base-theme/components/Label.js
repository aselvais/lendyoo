import {Platform} from 'react-native';
import _ from 'lodash';
import variable from '../variables/platform';
import {colors} from '../../styles/Mainstyle';

export default (variables = variable) => {
	const labelTheme = {
		'.focused': {
			width: 0,
		},
		fontSize: 17,
	};


	return labelTheme;
};
