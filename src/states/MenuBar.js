import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Animated,
	Easing,
	Dimensions,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	Alert,
	AlertIOS
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';


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
		this.console.log('MenuBar.constructor()', props);
		this.state = {
			slideIn: new Animated.Value(-200)
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.console.log('MenuBar.componentDidMount()');
		Animated.spring(
			this.state.slideIn,
			{
				toValue: -15,
				duration: 200
			}
		).start();
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
		this.console.log('MenuBar.render()');
		return (
			<Animated.View
				style={{
					position: "absolute",
					left: this.state.slideIn,
					top: 45,
					padding: 30,
					width: 250,
					height: 1080,
					zIndex: 1000,
					backgroundColor: '#212121',
				}}>
				{ this.props.parentComponent.menuItems/* .filter(function(e) { return !e.showBackButton; } ) */.map(
					(o, i) => <TouchableHighlight style={ localStyles.touchHighligh } key={i} onPress={ () => this.onPressTextbox(i) }><Text
						style={ localStyles.globalText }>XXX { o.label }
					</Text></TouchableHighlight>
				) }
			</Animated.View>
		);
	}

}

/**
 * Local styles
 */
const localStyles = StyleSheet.create({
	touchHighligh: {
		paddingTop: 15
	},
	globalText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'left'
	}
});

AppRegistry.registerComponent('MenuBar', () => MenuBar);

export default MenuBar;