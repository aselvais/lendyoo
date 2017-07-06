import React from 'react';
import Lendconfirmloanctrl from '../controllers/Lendconfirmloanctrl';
import {
	AppRegistry,
	Dimensions,
	TouchableHighlight,
	Text,
	View,
	Image
} from 'react-native';
import {
	Content,
	Picker,
	Button,
	Icon,
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
							<Item><Label>Title</Label><Input value={this.state.title}
															 onValueChange={(val) => this.onFormElementChange('title', val)}/></Item>
							<Item><Label>Type</Label>
								<Picker mode="dropdown"
										selectedValue={this.state.status}
										onValueChange={(val) => this.onFormElementChange('status', val)}>
									{ this.loan._schema.status.enum.map((v) => <Item key={v} label={v} value={v}/>) }
								</Picker>
							</Item>
							<Item><Label>Loan Date</Label><Input value={this.state.dateCreated}
																 onValueChange={(val) => this.onFormElementChange('dateCreated', val)}/></Item>
							<Item><Label>To</Label><Input
								value={((this.state.contact && this.state.contact.getFullName) ? this.state.contact.getFullName() : '' )}/></Item>
							{
								this.loan.photo ? (
									<Image
										style={{overflow: 'hidden', width: Dimensions.get('window').width, height: 400}}
										source={{uri: this.lendyooRegistry.config.API_URL + '/api-v2/photo/getloanimage/' + this.loan._id + '/' + Dimensions.get('window').width}}></Image>)
									: <TouchableHighlight onPress={ () => this.takePicture() }><Icon
									name="camera"/></TouchableHighlight>
							}
							<Item><Label>Detail</Label><Input value={this.state.detail}
															  onValueChange={(val) => this.onFormElementChange('detail', val)}/></Item>
							<Item><Label>Reminders frequency</Label><Input value={this.state.remindersFrequency}
																		   onValueChange={(val) => this.onFormElementChange('remindersFrequency', val)}/></Item>
							<Item><Label>Expiration date</Label><Input value={this.state.dateExpiration}
																	   onValueChange={(val) => this.onFormElementChange('dateExpiration', val)}/></Item>

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