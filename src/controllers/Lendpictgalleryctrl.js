import React from 'react';
import ComponentAbstract from '../libs/ComponentAbstract';
import {
	CameraRoll
} from 'react-native';

/**
 *
 */
class Lendpictgalleryctrl extends ComponentAbstract {

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
		CameraRoll.getPhotos(this.state.fetchParams).done(
			(data) => {
				this._storeImages(data);
			},
			(error) => {
				// console.warn(error);
			}
		);
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

		// this.newphoto.cameradata = RNFetchBlob.wrap("RNFetchBlob-file://" + uri);
		this.newphoto.localpath = uri;
		this.routes.goTo("lendtakepict");

	}

}

export default Lendpictgalleryctrl;