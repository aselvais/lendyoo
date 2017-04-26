import {Platform} from 'react-native';
import _ from 'lodash';
import variable from '../variables/platform';
import {colors} from '../../styles/Mainstyle';

export default (variables = variable) => {
	const iconTheme = {
		fontSize: variables.iconFontSize,
		color: '#000',
	};


	return iconTheme;
};
