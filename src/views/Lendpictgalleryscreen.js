import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	CameraRoll,
	Image,
	TouchableHighlight,
	View
} from 'react-native';
import {
	Content
} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';

/**
 *
 */
class Lendpictgalleryscreen extends ComponentAbstract {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		var controls = props.controls;
		this.state = {
			images: [],
			selected: '',
			fetchParams: {first: 25},
			groupTypes: 'SavedPhotos'
		};
		this._storeImages = this._storeImages.bind(this);
		this._selectImage = this._selectImage.bind(this);
	}

	/**
	 *
	 */
	componentDidMount() {
		// get photos from camera roll
		CameraRoll.getPhotos(this.state.fetchParams, this._storeImages);
	}

	/**
	 * callback which processes received images from camera roll and stores them in an array
	 * @param data
	 * @private
	 */
	_storeImages(data) {
		const assets = data.edges;
		const images = assets.map(asset => asset.node.image);
		this.setState({
			images: images,
		});
	}

	/**
	 *
	 * @param uri
	 * @private
	 */
	_selectImage(uri) {
		// define whatever you want to happen when an image is selected here
		this.setState({
			selected: uri,
		});

		this.newphoto.cameradata = RNFetchBlob.wrap("RNFetchBlob-file://" + uri);
		this.newphoto.localpath = uri;
		this.routes.gotTo("lendtakepict");

	}

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
								<TouchableHighlight onPress={() => this._selectImage(image.uri)}>
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