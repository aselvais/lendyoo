import {Platform} from 'react-native';
import _ from 'lodash';
import variable from '../variables/platform';
import {colors} from '../../styles/Mainstyle';

export default (variables = variable) => {
	const pickerTheme = {
		'.note': {
			color: '#8F8E95',
		},
		width: 90,
		marginRight: -4,
	};


	return pickerTheme;
};
