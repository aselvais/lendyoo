import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	ScrollView,
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
class Makeloanscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Makeloanscreen.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
		this.activeContact = this.contactCollection.getActiveModel();
		this.state = {
			direction: '>',
			loan: this.loan,
			loantitle: '',
			photo: false
		};
	}

	/**
	 *
	 */
	onPressLoadDirection() {
		this.console.log('Makeloanscreen.onPressLoadDirection()');
		if (this.state.direction === '>')
			this.setState({direction: '<'});
		if (this.state.direction === '<')
			this.setState({direction: '>'});
	}

	/**
	 *
	 * @param e
	 */
	onPressFrom(e) {
		this.console.log('Makeloanscreen.onPressFrom()', e);
		Alert.alert('To be implemented', 'From pressed');
	}

	/**
	 *
	 * @param e
	 */
	/* onPressPicture(e) {
	 this.console.log('Makeloanscreen.onPressPicture()', e);
	 Alert.alert('To be implemented', 'Picture pressed');
	 } */

	/**
	 *
	 * @param e
	 */
	onPressSave() {
		this.console.log('Makeloanscreen.onPressSave()');
		this.loan.title = this.state.loantitle;
		// @todo save the loan
		this.loan.loanDate = new Date();
		this.loan.setDefaultExpirationDate();
		this.loan.toId = this.activeContact.id;
		this.loan.save();
		this.routes.gotTo("detail");
	}

	/**
	 *
	 * @param e
	 */
	onPressAddDetail(e) {
		this.console.log('Makeloanscreen.onPressAddDetail()', e);
		if (this.lendyooRegistry.isIOS()) {
			AlertIOS.prompt(
				'Loan title',
				'What item are you lending?',
				[
					{text: 'Cancel', style: 'cancel'},
					{
						text: 'OK', onPress: function (itemTitle) {
						that.loan.title = itemTitle;
						that.setState({loan: that.loan});
					}
					}
				],
				'plain-text',
				that.loan.title
			);
		}
		else
		{
			Alert.alert(
				'Alert Title',
				'My platform ' + this.lendyooRegistry.platform,
				[
					{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
					{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			);
		}

	}

	/**
	 *
	 * @param d
	 * @returns {*}
	 */
	getIconeDirectionName(d) {
		this.console.log('Makeloanscreen.getIconeDirectionName()', d);
		if (d == '>')
			return 'arrow-right';
		else
			return 'arrow-left';
	}

	/**
	 *
	 * @returns {*}
	 */
	getContactName() {
		this.console.log('Makeloanscreen.getContactName()');
		if (this.activeContact)
			return this.activeContact.getFullName();
		else
			return 'Choose ...';
	}

	takePicture()
	{
		//styles.container.backgroundImage='../assets/images/user-3.png';
		this.setState({ photo: true });
	}


	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Makeloanscreen.render()');
		return (
			<View style={ localStyles.globalContainer }>
				<View style={localStyles.toFromBar}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: .4, alignItems: 'center'}}>
							<TouchableHighlight onPress={ () => this.onPressFrom() }>
								<Text style={ localStyles.fromToText }>{ this.user.fullName }</Text>
							</TouchableHighlight>
						</View>
						<View style={{flex: .2, alignItems: 'center'}}>
							<TouchableHighlight onPress={ () => this.onPressLoadDirection() }>
								<Icon name={ this.getIconeDirectionName( this.state.direction ) }
									  style={ localStyles.arrow }/>
							</TouchableHighlight>
						</View>
						<View style={{flex: .4, alignItems: 'center'}}>
							<TouchableHighlight onPress={ () => this.routes.gotTo("contacts") }>
								<Text style={ localStyles.fromToText }>{ this.getContactName() }</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
				<View style={localStyles.imageSpace}>
					{
						this.state.photo ?
							(
								<Image source={require('../assets/images/bigstock-attractive-young-business-man-43103578.jpg')} style={styles.backgroundImage}></Image>
							) : (
								<View style={styles.container}>
									<TouchableHighlight onPress={ () => this.takePicture() }>
										<Icon name="camera" style={ localStyles.photoText } />
									</TouchableHighlight>
								</View>
							)
					}
				</View>
				<View style={localStyles.adddetailSpace}>
					<Text style={ localStyles.detailText }>{ this.state.loan.title }</Text>
					<TextInput
						ref="1"
						spellCheck={true}
						style={localStyles.formTextField}
						placeholder="Description"
						returnKeyType="next"
						onChangeText={(loantitle) => this.setState({loantitle})}
						value={this.state.loantitle}
						blurOnSubmit={false}
						autoCapitalize="none"
						onSubmitEditing={() => this.focusNextField('2')}
					/>
				</View>
				<View style={ localStyles.saveButtonContainer }>
					<Icon.Button ref="2" name="thumbs-o-up" style={localStyles.buttonSaveLend} backgroundColor="#FF9100"
								 onPress={ () => this.onPressSave() } title="Lend an item">Lend an item</Icon.Button>
				</View>
			</View>
		);
	}
}

/**
 * Local styles
 */
const localStyles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		// remove width and height to override fixed static size
		width: null,
		height: null,
	},
	globalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	toFromBar: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	fromToText: {
		paddingTop: 20,
		fontSize: 20,
		color: '#FFFFFF'
	},
	photoText: {
		paddingTop: 300,
		fontSize: 40,
		color: '#FFFFFF'
	},
	directionText: {
		fontSize: 50,
		color: '#FFFFFF'
	},
	arrow: {
		padding: 15,
		fontSize: 40,
		color: '#FFFFFF'
	},
	imageSpace: {
		flex: .5,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	adddetailSpace: {
		flex: .13,
		backgroundColor: '#212121'
	},
	addDetailButton: {
		padding: 7,
		textAlign: 'center',
		color: '#FFFFFF',
		backgroundColor: '#FFA726',
		borderRadius: 5
	},
	detailText: {
		padding: 15,
		color: '#E65100',
		fontSize: 17
	},
	guyImage: {
		resizeMode: 'contain',
		opacity: .1
	},
	saveButtonContainer: {
		flex: .07,
		backgroundColor: '#212121',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonSaveLend: {
		padding: 10,
		width: 200,
		//textAlign: 'center',
		//color: '#FFFFFF',
		backgroundColor: '#F57F17',
		borderRadius: 5
	},
	formTextField : {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: '#666',
		borderWidth: 0,
		color: '#FFF'
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	}
});

AppRegistry.registerComponent('Makeloanscreen', () => Makeloanscreen);

export default Makeloanscreen;