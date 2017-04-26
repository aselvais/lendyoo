import {Platform} from 'react-native';
import _ from 'lodash';
import variable from '../variables/platform';
import {colors} from '../../styles/Mainstyle';

export default (variables = variable) => {
	const h3Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH3,
		lineHeight: variables.lineHeightH3,
	};


	return h3Theme;
};
