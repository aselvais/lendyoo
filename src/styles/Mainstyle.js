import React from 'react';
import {
	StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');

/**
 * Main Styles
 */
export default StyleSheet.create({
	contactsglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	homeh3s: {
		padding: 20
	},
	homeglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	homewelcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	homeRegisterContainer: {
		flex: .7
	},
	homeor: {
		textAlign: 'center',
		padding: 20
	},
	homedata: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	homewelcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	homebuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#FFFFFF'
	},
	homesocialViewsCntr: {
		flex: 1,
		flexDirection: 'row'
	},
	homesocialViews: {
		paddingTop: 20
	},
	homesocialButton: {
		margin: 5,
		marginLeft: 15
	},
	homeformTextField: {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		color: '#757575'
	},
	loandetbackgroundImage: {
		flex: 1,
		// remove width and height to override fixed static size
		width: null,
		height: null,
	},
	loandetphotoText: {
		textAlign: 'center',
		fontSize: 40,
		color: '#555555',
		padding: 40
	},
	loandetglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	loandetwelcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	loandetRegisterContainer: {
		flex: .7
	},
	loandetdata: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	loandetwelcomeText: {
		textAlign: 'center',
		paddingTop: 10,
		fontSize: 20,
		color: '#FFFFFF'
	},
	loandetsocialViews: {
		paddingTop: 20
	},
	loandetbuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#FFFFFF'
	},
	loandetsocialButton: {
		margin: 5
	},
	loanhistglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	loanhistwelcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	loanhistRegisterContainer: {
		flex: .7
	},
	loanhistdata: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	loanhistwelcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	loanhistwelcomeText2: {
		textAlign: 'center',
		paddingTop: 50,
		fontSize: 20,
		color: '#000'
	},
	loanhistsocialViews: {
		padding: 50
	},
	loanhistsocialButton: {
		margin: 5
	},
	loanhistelement: {
		borderBottomWidth: 1,
		borderBottomColor: '#DDDDDD'
	},
	maintopBarIcon: {
		paddingTop: 5,
		textAlign: 'center',
		fontSize: 20
	},
	maintopBarText: {
		paddingTop: 10,
		textAlign: 'center'
	},
	maintopBarContainer: {
		height: 45,
		backgroundColor: '#000000',
		alignItems: 'center',
		flexDirection: 'row'
	},
	mainoverlay: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
		width: width,
		height: height,
		zIndex: 999
	},
	mainspinner: {
		width: 80,
		height: 80,
		borderRadius: 5,
		backgroundColor: 'rgba(255, 255, 255, 0.2)'
	},
	makeloanglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	makeloanbuttonView: {
		paddingTop: 30
	},
	makeloanbuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#FFFFFF'
	},
	makeloantoFromBar: {
		flex: .1,
//		backgroundColor: '#FF9100'
	},
	makeloanfromToText: {
		paddingTop: 20,
		fontSize: 20,
		color: '#000000'
	},
	makeloanarrow: {
		fontSize: 40,
		color: '#000000'
	},
	makeloanphotoText: {
		textAlign: 'center',
		fontSize: 40,
		color: '#FFFFFF'
	},
	makeloanimageSpace: {
		height: Dimensions.get('window').height - 350,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	makeloanadddetailSpace: {
		flex: .13
	},
	menubarcontainerStyle: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	},
	menubartouchHighligh: {
		paddingTop: 22
	},
	menubarglobalText: {
		color: '#000000',
		paddingTop: 22,
		fontSize: 22,
		textAlign: 'left',
		paddingLeft: 25
	},
	profileglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	profilewelcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	profileRegisterContainer: {
		flex: .7
	},
	profiledataTitle: {
		textAlign: 'left',
		padding: 10,
		fontSize: 18,
		color: '#FFFFFF',
		backgroundColor: '#000000'
	},
	profiledata: {
		textAlign: 'left',
		padding: 10,
		fontSize: 15,
		color: '#666666'
	},
	profilewelcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	profilesocialViews: {
		padding: 50
	},
	profilebuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#FFFFFF'
	},
	profilesocialButton: {
		margin: 3
	},
	regglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	regwelcomeContainer: {
		flex: .1,
		backgroundColor: '#FF9100'
	},
	regsocialViews: {
		padding: 5
	},
	regsocialButton: {
		margin: 5
	},
	regwelcomeText: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#FFFFFF'
	},
	regRegisterContainer: {
		flex: .7
	},
	regor: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: '#BDBDBD'
	},
	regformTextField: {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		color: '#757575'
	}

});
