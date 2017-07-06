import React from 'react';
import MenuBarctrl from '../controllers/MenuBarctrl';
import {
	AppRegistry,
	Text,
	View,
	ScrollView
} from 'react-native';
import {
	Icon
} from 'native-base';

/**
 * Make loan screen (with pict)
 */
class MenuBar extends MenuBarctrl {

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
											 style={ this.css.menubarglobalText }><Icon name={ o.icon }/> { o.label }
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