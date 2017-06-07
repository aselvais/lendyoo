import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';

/**
 *
 */
class Lendtakepictscreen extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.console.log('Lendtakepictscreen.constructor()', props);
		this.contactCollection = this.lendyooRegistry.contactCollection;
		this.activeContact = this.contactCollection.getActiveModel();
		this.state = {
			direction: '>',
			loan: this.newloan,
			photo: this.newphoto.data ? this.newphoto.data : false,
			title: this.newloan.title ? this.newloan.title : '',
			saving: false,
			isMounted: false
		};
	}

	/**
	 *
	 * @returns {*}
	 */
	getCameraWidget()
	{
		if (this.state.photo !== false) {
			return (<Image source={{uri: 'data:image/png;base64,' + this.state.photo}} style={this.css.makeloanimageSpace}></Image>)
		}
		else if (this.state.isMounted)
		{
			return (<Camera
				ref={(cam) => { this.camera = cam; }}
				captureTarget={Camera.constants.CaptureTarget.disk}
				captureQuality={Camera.constants.CaptureQuality["720p"]}
				style={this.css.makeloanimageSpace}
				aspect={Camera.constants.Aspect.fill}>
				<Icon name="camera" style={{color: '#FFF', fontSize: 55}} onPress={ () => this.takePicture() }/>
			</Camera>)
		} else {
			return null;
		}
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		this.console.log('Lendtakepictscreen.render()');
		return (


				<View style={{backgroundColor: this.colors.c1, flex: 1, flexDirection: 'column'}}>
					<View style={{flex: .85, backgroundColor: '#000000' }}>
						{ this.getCameraWidget() }
					</View>
					<View style={{flex: .15, backgroundColor: '#000000', flexDirection: 'row'}}>
						<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}><Text style={{ color: '#FFF' }}>1</Text></View>
						<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}><Text style={{ color: '#FFF' }}>2</Text></View>
						<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000'}}><Text style={{ color: '#FFF' }}>3</Text></View>
					</View>
				</View>


		);
	}
}

AppRegistry.registerComponent('Lendtakepictscreen', () => Lendtakepictscreen);

export default Lendtakepictscreen;