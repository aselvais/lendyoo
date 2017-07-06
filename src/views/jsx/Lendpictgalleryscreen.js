import React from 'react';
import Lendpictgalleryctrl from '../controllers/Lendpictgalleryctrl';
import {
	AppRegistry,
	Image,
	TouchableHighlight,
	View
} from 'react-native';
import {
	Content
} from 'native-base';

/**
 *
 */
class Lendpictgalleryscreen extends Lendpictgalleryctrl {
	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<Content padder={false}>
				<View style={this.css.container}>
					<View style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center'
					}}>
						{ this.state.images.map(image => {
							return (
								<TouchableHighlight key={image.uri} onPress={() => this._selectImage(image.uri)}>
									<Image style={{
										width: 100,
										height: 100,
										margin: 1
									}} source={{uri: image.uri}}/>
								</TouchableHighlight>
							);
						})}
					</View>
				</View>
			</Content>
		);
	}


}

AppRegistry.registerComponent('Lendpictgalleryscreen', () => Lendpictgalleryscreen);

export default Lendpictgalleryscreen;