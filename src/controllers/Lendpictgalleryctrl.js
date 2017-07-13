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
		this.state = {
			images: [],
			selected: '',
			fetchParams: {first: 50},
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
	_selectImage(image) {
		this.setState({ selected: image.uri });

		this.newphoto.localpath = image.uri;
		if (image.fileName) this.newphoto.filename = image.fileName;
		if (image.type) this.newphoto.ext = image.type.toLowerCase();
		if (image.fileSize) this.newphoto.size = image.fileSize;
		if (image.width) this.newphoto.width = image.width;
		if (image.height) this.newphoto.height = image.height;
		this.newphoto.initImage();
		this.routes.goTo("lendtakepict");

	}

}

export default Lendpictgalleryctrl;