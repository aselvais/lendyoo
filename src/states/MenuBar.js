import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

/**
 * Make loan screen (with pict)
 */
class MenuBar extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.props.parentComponent = props.parentComponent;
	}

	/**
	 *
	 */
	componentDidMount() {
		this.console.log('MenuBar.componentDidMount()');
	}

	/**
	 *
	 * @todo clean that
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.console.log('MenuBar.onPressTextbox()', elemId);
		this.props.parentComponent.onPressTextbox(elemId);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<View style={ localStyles.containerStyle }>
				<ScrollView>
				{ this.props.parentComponent.menuItems/* .filter(function(e) { return !e.showBackButton; } ) */.map(
					(o, i) => <Text key={ i } onPress={ () => this.onPressTextbox(i) }
						style={ localStyles.globalText }><Icon name={ o.icon } style={ localStyles.globalText } /> { o.label }
					</Text>
				) }
				</ScrollView>
			</View>
		);
	}

}

/**
 * Local styles
 */
const localStyles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	},
	touchHighligh: {
		paddingTop: 18
	},
	globalText: {
		paddingTop: 18,
		fontSize: 20,
		textAlign: 'left',
		paddingLeft: 20
	}
});

AppRegistry.registerComponent('MenuBar', () => MenuBar);

export default MenuBar;