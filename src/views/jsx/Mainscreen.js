import React from 'react';
import Mainctrl from '../controllers/Mainctrl';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import {
	StyleProvider,
	Spinner,
	Container,
	Header,
	Title,
	Button,
	Body,
	Icon,
	Footer,
	FooterTab
} from 'native-base';
import getTheme from '../../native-base-theme/components/index';

/**
 * Welcome/help screen
 */
class Mainscreen extends Mainctrl {

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		var spinner;
		if (this.iOS && this.state.loading)
			spinner = <View style={ this.css.mainoverlay }><View style={ this.css.mainspinner }><Spinner color='black'/></View></View>;

		return (
			<StyleProvider style={getTheme()}>
				<Container>
					<Header>
						<Body>
						<Title>
							{ this.state.selectedView.label }
						</Title>
						</Body>
					</Header>
					{ spinner }
					{ this.state.selectedView.component }
					{
						this.state.isAuth ? <Footer>
							<FooterTab>

								<Button active={(this.state.routeName == 'lendtakepict')}
										onPress={ () => this.onPressTabElement("lendtakepict") }>
									<Icon name="camera"/>
									<Text style={ this.css.tabText }>Lend</Text>
								</Button>

								<Button active={(this.state.routeName == 'history')}
										onPress={ () => this.onPressTabElement("history") }>
									<Icon name="list-box"/>
									<Text style={ this.css.tabText }>Loans</Text>
								</Button>

								<Button active={(this.state.routeName == 'profile')}
										onPress={ () => this.onPressTabElement("profile") }>
									<Icon name="contact"/>
									<Text style={ this.css.tabText }>Account</Text>
								</Button>
								<Button active={(this.state.routeName == 'settings')}
										onPress={ () => this.onPressTabElement("settings") }>
									<Icon name="construct"/>
									<Text style={ this.css.tabText }>Settings</Text>
								</Button>
							</FooterTab>
						</Footer>
							:
							null
					}
				</Container>
			</StyleProvider>
		);
	}

}

AppRegistry.registerComponent('Mainscreen', () => Mainscreen);

export default Mainscreen;