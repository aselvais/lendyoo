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
		this.state = {
			isAuthenticated: false
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.lendyooRegistry.setMenuBarComponent(this);
		this.console.log('MenuBar.componentDidMount()');
	}

	setAuthState(st=false)
	{
		this.setState({isAuthenticated:st});
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
		var _that = this;
		return (
			<View style={ localStyles.containerStyle }>
				<ScrollView>
				{ this.props.parentComponent.menuItems.map((o, i) => {
						var _show = true;
						if (!_that.state.isAuthenticated)
							_show = !o.showWhenAuth;
						else
							_show = o.showWhenAuth;
						if (_show)
							return <Text key={ i } onPress={ () => this.onPressTextbox(i) }
							  style={ localStyles.globalText }><Icon name={ o.icon }
								style={ localStyles.globalText }/> { o.label }</Text>;
						else
							return null;
					}
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
		paddingTop: 22
	},
	globalText: {
		color: '#000000',
		paddingTop: 22,
		fontSize: 22,
		textAlign: 'left',
		paddingLeft: 25
	}
});

AppRegistry.registerComponent('MenuBar', () => MenuBar);

export default MenuBar;