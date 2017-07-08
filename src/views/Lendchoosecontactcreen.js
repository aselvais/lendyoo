import React from 'react';
import Lendchoosecontactctrl from '../controllers/Lendchoosecontactctrl';
import {
	AppRegistry,
	ScrollView,
	View
} from 'react-native';
import {
	Content,
	Left,
	Body,
	ListItem,
	Icon,
	Text,
	Button
} from 'native-base';
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
/**
 *
 */
class Lendchoosecontactcreen extends Lendchoosecontactctrl {

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Contactselectionscreen.render()');
		return (
			<Content padder={false} scrollEnabled={false} style={{backgroundColor: '#FFFFFF'}}>
				<View>
					<Text style={{
						color: this.colors.c2,
						padding: 10
					}}>Recent contacts</Text>
					<ScrollView style={{ height: height-210 }}>
						{
							this.state.contactCollectionModels.map((contact) =>
								<ListItem key={contact._id} onPress={ () => this.onPressContact(contact) } avatar>
									<Left>
										<Icon name="contact" style={{
											color: '#888',
											fontSize: 25
										}}/>
									</Left>
									<Body>
									<Text style={{ color: '#888' }}>{ contact.getFullName() }</Text>
									{
										(contact.email) ?
											(<Text style={{ color: '#111' }} note>{ contact.email }</Text>)
											:
											(<Text style={{ color: '#111' }} note>{ contact.phone }</Text>)
									}
									</Body>
								</ListItem>
							)
						}
					</ScrollView>


					<View>
						<Button success onPress={ () => this.onPressAddressbook() } full>
							<Text style={{
								color: '#FFFFFF'
							}}> Get contact from address book </Text>
						</Button>
					</View>

				</View>

			</Content>
		);
	}
}

AppRegistry.registerComponent('Lendchoosecontactcreen', () => Lendchoosecontactcreen);

export default Lendchoosecontactcreen;