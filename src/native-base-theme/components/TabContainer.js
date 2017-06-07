import {Platform} from 'react-native';
import variable from '../variables/platform';
import {colors} from '../../styles/Mainstyle';

export default (variables = variable) => {
	const platformStyle = variables.platformStyle;
	const platform = variables.platform;

	const tabContainerTheme = {
		elevation: 3,
		height: 50,
		flexDirection: 'row',
		shadowColor: undefined,
		shadowOffset: undefined,
		shadowOpacity: undefined,
		shadowRadius: undefined,
		justifyContent: 'space-around',
		borderBottomWidth: variables.borderWidth,
		borderColor: variables.topTabBarBorderColor,
	};


	return tabContainerTheme;
};
