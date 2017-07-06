import React from 'react';
import Profilectrl from '../controllers/Profilectrl';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import {
	Content,
	Picker,
	Button,
	Form,
	Item,
	Input,
	Label,
	H2
} from 'native-base';

/**
 *
 */
class Profilescreen extends Profilectrl {

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Profilescreen.render()');
		return (
			<Content style={{backgroundColor: this.colors.c1}} padder={true}>
				<View style={ this.css.profileglobalContainer }>

					<View style={this.css.profileRegisterContainer}>

						<View>
							<H2 style={{color: this.colors.white, marginBottom: 20}}>Profile</H2>

							<Form>
								<Item ><Label style={{color: this.colors.white}}>Username</Label>
									<Text style={{color: this.colors.c3}}>{this.state.user.username}</Text></Item>
								<Item ><Label style={{color: this.colors.white}}>First Name</Label>
									<Input style={{color: this.colors.c3}} onChangeText={(fname) => this.setState({fname: fname})} value={this.state.fname}/></Item>
								<Item ><Label style={{color: this.colors.white}}>Last Name</Label>
									<Input style={{color: this.colors.c3}} onChangeText={(lname) => this.setState({lname: lname})} value={this.state.lname}/></Item>
								<Item ><Label style={{color: this.colors.white}}>Gender</Label>
									<Picker mode="dropdown"
											selectedValue={this.state.gender}
											onValueChange={(gender) => this.setState({gender: gender})}>
										{ this.user._schema.gender.enum.map((v) => <Item  style={{color: this.colors.c3}} key={v} label={v} value={v}/>) }
									</Picker>
								</Item>
								<Item ><Label style={{color: this.colors.white}}>E-mail</Label><Input style={{color: this.colors.c3}} value={this.state.user.email}/></Item>
								<Item ><Label style={{color: this.colors.white}}>Date of birth</Label><Input style={{color: this.colors.c3}} value={this.state.user.dateOfBirth}/></Item>
							</Form>

							<Button success full name="pencil" style={{marginTop: 20}} onPress={ () => this.editUser() }>
								<Text style={this.css.profilebuttonText}>Update</Text>
							</Button>
						</View>

						{
							(false) ?
								(<View>
									<H2>Company / Group</H2>
									<Form>
										<Item><Label>Name</Label><Input value={this.state.group.name}/></Item>
										<Item><Label>email</Label><Input value={this.state.group.email}/></Item>
										<Item><Label>address</Label><Input value={this.state.group.address}/></Item>
										<Item><Label>zipcode</Label><Input value={this.state.group.zipcode}/></Item>
										<Item><Label>state</Label><Input value={this.state.group.state}/></Item>
										<Item><Label>country</Label><Input value={this.state.group.country}/></Item>
										<Item><Label>Type</Label>
											<Picker mode="dropdown"
													selectedValue={this.state.group.type}
													onValueChange={(type) => this.setState({type: type})}>
												{ this.group._schema.type.enum.map((v) => <Item key={v} label={v} value={v}/>) }
											</Picker>
										</Item>
									</Form>
									<Button primary full name="pencil" onPress={ () => this.editGroup() }>
										<Text style={this.css.profilebuttonText}>Update group</Text>
									</Button>
								</View>) : null
						}

					</View>

				</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Profilescreen', () => Settingsscreen);

export default Profilescreen;
