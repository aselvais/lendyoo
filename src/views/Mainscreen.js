import React, {Component} from 'react';
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
	Drawer,
	Footer,
	FooterTab,
	Content
} from 'native-base';
import getTheme from '../native-base-theme/components';
import LendyooRegistry from '../libs/LendyooRegistry';
import MenuBar from './MenuBar';
import {colors, Mainstyle} from '../styles/Mainstyle';

/**
 * Welcome/help screen
 */
class Mainscreen extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.colors = colors;
		this.css = Mainstyle;
		this.lendyooRegistry = new LendyooRegistry();
		this.lendyooRegistry.setRootComponent(this);
		this.console = this.lendyooRegistry.Console;
		this.console.log('Mainscreen.constructor()', props);
		this.routes = this.lendyooRegistry.routes;
		this.routes.setGlobalContainer(this);
		this.iOS = this.lendyooRegistry.isIOS();
		this.state = {
			isAuth: false, //this.lendyooRegistry.isAuthenticated,
			selectedView: this.routes._currentView,
			loading: false,
			routeName: 'lendtakepict'
		};
		this.menuItems = this.routes.getRoutes();
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.resetAuthState(this.lendyooRegistry.isAuthenticated);
		this.setState({routeName: 'lendtakepict'});
	}

	/**
	 *
	 */
	resetAuthState(s)
	{
		this.setState({isAuth: s, routeName: 'lend'});
	}

	/**
	 *
	 * @param elemId
	 */
	onPressTextbox(elemId = 0) {
		this.console.log('Mainscreen.onPressTextbox()', elemId);
		this.routes.getViewById(elemId);
		if (elemId.name) {
			this.setState({routeName: elemId.name});
		}
		this.setState({selectedView: this.routes.getCurrentView()});
		this.hideMenu();
	}

	/**
	 *
	 */
	showMenu() {
		this._drawer._root.open();
	}

	/**
	 *
	 */
	hideMenu() {
		try {
			this._drawer._root.close();
		} catch (er) {
			console.log('Error, must be a logout');
		}
	}

	/**
	 *
	 */
	toggleMenu() {
		this._drawer._root.toggle();
	}

	/**
	 *
	 * @returns {XML}
	 */
	getNavigationItem() {
		this.console.log('Mainscreen.getNavigationItem()');
		if (this.state.selectedView.showBackButton)
			return <Text style={ this.css.maintopBarText } onPress={ () => this.routes.goBack() }><Icon name="chevron-left" /></Text>;
		else
			return <Text style={ this.css.maintopBarText } onPress={ () => this.showMenu() }><Icon name="bars"/></Text>;
	}

	/**
	 *
	 * @param l
	 */
	setLoading(l = false) {
		this.setState({loading: l});
	}

	/**
	 *
	 * @param v
	 */
	setAuth(v) {
		this.setState({isAuth: v});
	}

	onPressTabElement(routeName) {
		this.setState({routeName: routeName});
		this.routes.goTo(routeName);
	}

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