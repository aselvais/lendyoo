import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View,
	ScrollView
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

	/**
	 *
	 * @param st
	 */
	setAuthState(st = false) {
		this.setState({isAuthenticated: st});
	}

	/**
	 *
	 * @todo clean that
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.rootComponent.setLoading(true);
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
			<View style={ this.css.menubarcontainerStyle }>
				<ScrollView>
					{ this.props.parentComponent.menuItems.map((o, i) => {
							var _show = true;
							if (!_that.state.isAuthenticated)
								_show = !o.showWhenAuth;
							else
								_show = o.showWhenAuth;
							if (_show)
								return <Text key={ i } onPress={ () => this.onPressTextbox(i) }
											 style={ this.css.menubarglobalText }><Icon name={ o.icon }
																						style={ this.css.menubarglobalText }/> { o.label }
								</Text>;
							else
								return null;
						}
					) }
				</ScrollView>
			</View>
		);
	}
}

AppRegistry.registerComponent('MenuBar', () => MenuBar);

export default MenuBar;