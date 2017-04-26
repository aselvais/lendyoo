import React from 'react';
import {
	StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

var {width, height} = Dimensions.get('window');
var photodimension = Dimensions.get('window').height - 350;

var css = {
	lightGrey: '#F5FCFF',
	white: '#F5FCFF',
	black: '#000000',
	grey: '#555555',
	orange: '#FF9100',
	c1: '#16A494',
	c2: '#107267',
	c2: '#6EE7D8',
	c2: '#A5DAD3'
};

var cssall = {
	contactsglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	tabText: {
		fontSize: 10
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: css.lightGrey,
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
	homeRegisterContainer: {
		flex: .7
	},
	homeor: {
		textAlign: 'center',
		padding: 20
	},
	homebuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: css.white
	},
	homesocialViewsCntr: {
		flex: 1,
		flexDirection: 'row'
	},
	homesocialViews: {
		paddingTop: 20
	},
	loandetphotoText: {
		textAlign: 'center',
		fontSize: 40,
		color: css.grey,
		padding: 40
	},
	loandetglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	loandetRegisterContainer: {
		flex: .7
	},
	loandetsocialViews: {
		paddingTop: 20
	},
	loandetbuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: css.white
	},
	loanhistRegisterContainer: {
		flex: .7
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
	mainoverlay: {
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
		color: css.white
	},
	makeloantoFromBar: {
		flex: .1
	},
	makeloanfromToText: {
		paddingTop: 20,
		fontSize: 20,
		color: css.black
	},
	makeloanarrow: {
		fontSize: 40,
		color: css.black
	},
	makeloanphotoText: {
		textAlign: 'center',
		fontSize: 40,
		color: css.white
	},
	makeloanimageSpace: {
		height: photodimension,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	makeloanadddetailSpace: {
		flex: .13
	},
	menubarcontainerStyle: {
		flex: 1,
		backgroundColor: css.white
	},
	menubarglobalText: {
		color: css.black,
		paddingTop: 22,
		fontSize: 22,
		textAlign: 'left',
		paddingLeft: 25
	},
	profileglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	profileRegisterContainer: {
		flex: .7
	},
	profilebuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: css.white
	},
	regglobalContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	regwelcomeContainer: {
		flex: .1,
		backgroundColor: css.orange
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
		color: css.white
	},
	regRegisterContainer: {
		flex: .7
	},
	regor: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: css.lightGrey
	},
	regformTextField: {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: css.lightGrey,
		borderWidth: 1,
		color: css.grey
	}
};

/**
 * Main Styles
 */
export default StyleSheet.create(cssall);
