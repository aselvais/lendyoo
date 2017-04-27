import React from 'react';
import {
	StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

var {width, height} = Dimensions.get('window');
var photodimension = Dimensions.get('window').height - 350;

var colors = {
	lightGrey: '#F5FCFF',
	white: '#F5FCFF',
	black: '#000000',
	grey: '#555555',
	orange: '#FF9100',
	c1: '#16A494',
	c2: '#107267',
	c3: '#6EE7D8',
	c4: '#A5DAD3',
	fbcolor: '#3b5998'
};

var cssall = {
	contactsglobalContainer: {
//		flex: 1,
//		flexDirection: 'column'
	},
	tabText: {
		fontSize: 10
	},
	container: {
//		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
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
//		flex: 1,
//		flexDirection: 'column'
	},
	homeRegisterContainer: {
//		flex: .7
	},
	homeor: {
		textAlign: 'center',
		padding: 20,
		color: colors.white
	},
	homebuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: colors.c2
	},
	homesocialViewsCntr: {
		alignItems:'center'
	},
	homesocialViews: {
		paddingTop: 20,
		alignItems:'center'
	},
	loandetphotoText: {
		textAlign: 'center',
		fontSize: 40,
		color: colors.grey,
		padding: 40
	},
	loandetglobalContainer: {
//		flex: 1,
//		flexDirection: 'column'
	},
	loandetRegisterContainer: {
//		flex: .7
	},
	loandetsocialViews: {
		paddingTop: 20
	},
	loandetbuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: colors.white
	},
	loanhistRegisterContainer: {
//		flex: .7
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
//		flex: 1,
//		flexDirection: 'row',
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
//		flex: 1,
//		flexDirection: 'column'
	},
	makeloanbuttonView: {
		paddingTop: 30
	},
	makeloanbuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: colors.c2
	},
	makeloantoFromBar: {
//		flex: .1
	},
	makeloanfromToText: {
		paddingTop: 20,
		fontSize: 20,
		color: colors.white
	},
	makeloanarrow: {
		fontSize: 40,
		color: colors.white
	},
	makeloanphotoText: {
		textAlign: 'center',
		fontSize: 40,
		color: colors.white
	},
	makeloanimageSpace: {
		height: photodimension,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	makeloanadddetailSpace: {
//		flex: .13
	},
	menubarcontainerStyle: {
//		flex: 1,
		backgroundColor: colors.white
	},
	menubarglobalText: {
		color: colors.black,
		paddingTop: 22,
		fontSize: 22,
		textAlign: 'left',
		paddingLeft: 25
	},
	profileglobalContainer: {
//		flex: 1,
//		flexDirection: 'column'
	},
	profileRegisterContainer: {
//		flex: .7
	},
	profilebuttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: colors.c2
	},
	regglobalContainer: {
//		flex: 1,
//		flexDirection: 'column'
	},
	regwelcomeContainer: {
//		flex: .1,
		backgroundColor: colors.orange
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
		color: colors.white
	},
	regRegisterContainer: {
//		flex: .7
	},
	regor: {
		textAlign: 'center',
		paddingTop: 25,
		fontSize: 20,
		color: colors.lightGrey
	},
	regformTextField: {
		fontSize: 16,
		padding: 7,
		height: 35,
		borderColor: colors.lightGrey,
		borderWidth: 1,
		color: colors.grey
	}
};

/**
 * Main Styles
 */
// export default { colors: colors, Mainstyle: StyleSheet.create(cssall) };
exports.colors=colors;
exports.Mainstyle=StyleSheet.create(cssall);