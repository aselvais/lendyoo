import React, {Component} from 'react';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import {
	Spinner,
	Container,
	Header,
	Title,
	Button,
	Left,
	Right,
	Body,
	Icon,
	Drawer,
	Footer,
	FooterTab
} from 'native-base';

import LendyooRegistry from '../libs/LendyooRegistry';
import MenuBar from './MenuBar';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Mainstyle from '../styles/Mainstyle';
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
		this.css = Mainstyle;
		this.lendyooRegistry = new LendyooRegistry();
		this.lendyooRegistry.setRootComponent(this);
		this.console = this.lendyooRegistry.Console;
		this.console.log('Mainscreen.constructor()', props);
		this.routes = this.lendyooRegistry.routes;
		this.routes.setGlobalContainer(this);
		this.iOS = this.lendyooRegistry.isIOS();
		this.state = {
			isAuth: false,
			selectedView: this.routes._currentView,
			loading: false,
			routeName: null
		};
		this.menuItems = this.routes.getRoutes();
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
			return <Text style={ this.css.maintopBarText } onPress={ () => this.routes.goBack() }><IconAwesome
				name="chevron-left" style={ this.css.maintopBarIcon }/></Text>;
		else
			return <Text style={ this.css.maintopBarText } onPress={ () => this.showMenu() }><IconAwesome name="bars"
																										  style={ this.css.maintopBarIcon }/></Text>;
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

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		var spinner;
		if (this.iOS && this.state.loading)
			spinner = <View style={ this.css.mainoverlay }><View style={ this.css.mainspinner }><Spinner color='black'/></View></View>;

		return (
			<Container>
				<Header>
					<Left>

						<Button transparent onPress={() => this.toggleMenu()}>
							<Icon name='menu'/>
						</Button>

					</Left>
					<Body>
					<Title><IconAwesome name={ this.state.selectedView.icon }
										style={ this.css.maintopBarIcon }/> { this.state.selectedView.label }</Title>
					</Body>
					<Right>
						{ (!this.iOS && this.state.loading) ? (<Spinner color='white'/>) : null }
					</Right>
				</Header>
				<Drawer ref={(ref) => {
					this._drawer = ref;
				}} content={<MenuBar menuItems={this.menuItems} parentComponent={this}></MenuBar>}
						onClose={() => this.hideMenu()}>
					{ spinner }
					{ this.state.selectedView.component }
				</Drawer>
				{
					this.state.isAuth ? <Footer>
						<FooterTab>
							<Button onPress={ () => this.routes.gotTo('history') }>
								<Icon name="list"/>
								<Text>Loans</Text>
							</Button>

							<Button onPress={ () => this.routes.gotTo('lend') }>
								<Icon name="camera"/>
								<Text>Lend</Text>
							</Button>
							<Button onPress={ () => this.routes.gotTo('profile') }>
								<Icon name="person"/>
								<Text>Account</Text>
							</Button>
							<Button onPress={ () => this.routes.gotTo('settings') }>
								<Icon name="settings"/>
								<Text>Settings</Text>
							</Button>
						</FooterTab>
					</Footer>
						:
						null
				}


			</Container>

		);
	}

}

AppRegistry.registerComponent('Mainscreen', () => Mainscreen);

export default Mainscreen;