import React from 'react';
import Lendconfirmloanctrl from '../controllers/Lendconfirmloanctrl';
import {
	AppRegistry,
	Dimensions,
	Text,
	View,
	Image
} from 'react-native';
import {
	Content,
	Picker,
	Button,
	Form,
	Item,
	Input,
	Label
} from 'native-base';
/**
 *
 */
class Lendconfirmloanscreen extends Lendconfirmloanctrl {

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Loandetailscreen.render()');
		return (
			<Content padder={true}>
				<View style={ this.css.loandetglobalContainer }>
					<View style={this.css.loandetRegisterContainer}>
						<Form>
							<Item>
								<Label>Title</Label>
								<Input value={this.state.newloan.title} onValueChange={(val) => this.onFormElementChange('title', val)}/>
							</Item>
							<Item>
								<Label>To</Label>
								<Input value={((this.state.contact && this.state.contact.getFullName) ? this.state.contact.getFullName() : '' )}/>
							</Item>
							<Image
								style={{overflow: 'hidden', width: Dimensions.get('window').width, height: 400}}
								source={{uri: this.state.newphoto.localpath }}></Image>
							<Item>
								<Label>Detail</Label>
								<Input value={this.state.newloan.detail} onValueChange={(val) => this.onFormElementChange('detail', val)}/>
							</Item>
							<Item>
								<Label>Return date</Label>
								<Input value={this.state.newloan.dateExpiration} onValueChange={(val) => this.onFormElementChange('dateExpiration', val)}/>
							</Item>
						</Form>

						<View style={this.css.loandetsocialViews}>
							<Button primary full ref="2" onPress={ () => this.save() }>
								<Text style={this.css.loandetbuttonText}>Update loan</Text>
							</Button>
						</View>
					</View>
				</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Lendconfirmloanscreen', () => Lendconfirmloanscreen);

export default Lendconfirmloanscreen;