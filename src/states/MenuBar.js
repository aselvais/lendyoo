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
import Icon from 'react-native-vector-icons/FontAwesome';


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
		this.console.log('MenuBar.constructor()', this.props.visibility);
		this.state = {
			slideIn: new Animated.Value(-300),
			visibility: this.props.visibility
		};
//		this.setState({ visibility: this.props.visibility });
	}

	/**
	 *
	 */
	componentDidMount() {
		this.console.log('MenuBar.componentDidMount()');
	}

	/**
	 *
	 */
	animateSlide()
	{
		this.console.log('MenuBar.animateSlide()', this.props.visibility);
		Animated.spring(
			this.state.slideIn,
			{
				toValue: (this.props.visibility ? -15 : -300),
				duration: 100
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
		this.console.log('MenuBar.render()', this.props.visibility);
		this.animateSlide();
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
					backgroundColor: '#212121'
				}}>
				{ this.props.parentComponent.menuItems/* .filter(function(e) { return !e.showBackButton; } ) */.map(
					(o, i) => <TouchableHighlight style={ localStyles.touchHighligh } key={i} onPress={ () => this.onPressTextbox(i) }><Text
						style={ localStyles.globalText }><Icon name={ o.icon } style={ localStyles.globalText } /> { o.label }
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
		paddingTop: 18
	},
	globalText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'left'
	}
});

AppRegistry.registerComponent('MenuBar', () => MenuBar);

export default MenuBar;