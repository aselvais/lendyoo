import React from 'react';
import Lendtakepictctrl from '../controllers/Lendtakepictctrl';
import {
	AppRegistry,
	View,
	Image,
	TouchableHighlight
} from 'react-native';
import {
	Icon,
	Input
} from 'native-base';
import Camera from 'react-native-camera';

/**
 *
 */
class Lendtakepictscreen extends Lendtakepictctrl {

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Lendtakepictscreen.render()');
		return (
			<View style={{backgroundColor: this.colors.c1, flex: 1, flexDirection: 'column'}}>
				<View style={{flex: .80}}>

					{ (this.state.localpath !== false) ? (
						<Image
							source={{uri: this.newphoto.localpath}}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
								width: '100%',
								height: '100%'
							}}></Image>
					) : null }
					{ (this.state.localpath === false && this.state.isMounted) ?
						(<Camera
							ref={
								(cam) => {
									this.camera = cam
								}
							}
							captureTarget={Camera.constants.CaptureTarget.disk}
							captureQuality={Camera.constants.CaptureQuality["1080p"]}
							type={ this.state.cameraside }
							onBarCodeRead={ (e) => this.readBarCode(e) }
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
								width: '100%',
								height: '100%'
							}}
							aspect={Camera.constants.Aspect.fill}/>) : null
					}
				</View>


				{
					(this.state.localpath !== false) ?
						(<View style={{flex: .20, backgroundColor: '#000000', flexDirection: 'row'}}>
							<View style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#000000'
							}}>
								<Icon name="arrow-round-back" style={{
									color: '#FFF',
									fontSize: 40,
									paddingTop: 2
								}} onPress={ () => this.discardPicture() }/>
							</View>
							<View style={{
								flex: 2,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#000000'
							}}>

								<View style={{flex: 2}}>
									<Input placeholder="Loan title"
										   style={{color: '#FFF', width: '100%', textAlign: 'center'}}
										   onChangeText={(title) => this.onChangeTitle(title)}
										   value={this.state.title}
										   blurOnSubmit={false}
										   onSubmitEditing={() => this.onPressSave()}
									/>
								</View>
								<View style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#000000'
								}}>
									<Icon name="arrow-round-forward" style={{
										color: '#FFF',
										fontSize: 40,
										paddingTop: 2
									}} onPress={ () => this.onPressSave() }/>
								</View>
							</View>

						</View>)
						:
						(<View style={{flex: .20, backgroundColor: '#000000', flexDirection: 'row'}}>

							<View style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#000000'
							}}>
								<Icon name="images" style={{
									color: '#FFF',
									fontSize: 40,
									paddingTop: 2
								}} onPress={ () => this.loadGallery() }/>
							</View>


							<View style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#000000'
							}}>
								<TouchableHighlight onPress={ () => this.takePicture() }>
									<View style={{
										width: 60,
										height: 60,
										borderRadius: 60 / 2,
										borderColor: '#4D4D4D',
										borderWidth: 10,
										backgroundColor: '#FFF'
									}}/>
								</TouchableHighlight>
							</View>


							<View style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#000000'
							}}>
								<Icon name="reverse-camera" style={{
									color: '#FFF',
									fontSize: 40,
									paddingTop: 2
								}} onPress={ () => this.reverseCamera() }/>
							</View>


						</View>)

				}


			</View>
		);
	}
}

AppRegistry.registerComponent('Lendtakepictscreen', () => Lendtakepictscreen);

export default Lendtakepictscreen;