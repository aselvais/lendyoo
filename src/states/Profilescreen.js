import React from 'react';
import ComponentAbstract from './ComponentAbstract';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import {
	Content,
	Picker,
	Button,
	CheckBox,
	Form,
	Item,
	Input,
	Label,
	H2
} from 'native-base';

/**
 *
 */
class Profilescreen extends ComponentAbstract {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			user: this.user,
			group: this.group
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		this.rootComponent.setLoading(false);
		var _that = this;
		_that.rootComponent.setLoading(true);
		this.user.populateDataFromRemote(this.lendyooRegistry.User_id).then(
			function (d) {
				if (d) {
					_that.setState({user: _that.user});
					_that.group.populateDataFromRemote(_that.user.Group_id).then(
						function (dd) {
							_that.rootComponent.setLoading(false);
							if (dd)
								_that.setState({group: _that.group});
						},
						function () {
							_that.rootComponent.setLoading(false);
						}
					);
				}
			},
			function () {
				_that.rootComponent.setLoading(false);
			}
		);
	}

	/**
	 *
	 */
	editGroup() {

	}

	/**
	 *
	 */
	editUser() {
		console.log(this.user._schema.gender.enum);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		this.console.log('Profilescreen.render()');
		return (
			<Content padder={true}>
				<View style={ this.css.profileglobalContainer }>

					<View style={this.css.profileRegisterContainer}>

						<View>
							<H2>Profile</H2>

							<Form>
								<Item ><Label>Registered</Label><CheckBox
									checked={this.state.user.isRegistered}/></Item>
								<Item ><Label>Username</Label><Input value={this.state.user.username}/></Item>
								<Item ><Label>First Name</Label><Input value={this.state.user.fname}/></Item>
								<Item ><Label>Last Name</Label><Input value={this.state.user.lname}/></Item>
								<Item ><Label>Gender</Label>
									<Picker mode="dropdown"
											selectedValue={this.state.user.gender}
											onValueChange={(gender) => this.setState({gender: gender})}>
										{ this.user._schema.gender.enum.map((v) => <Item key={v} label={v}
																						 value={v}/>) }
									</Picker>
								</Item>
								<Item ><Label>E-mail</Label><Input value={this.state.user.email}/></Item>
								<Item ><Label>Date of birth</Label><Input value={this.state.user.dateOfBirth}/></Item>
							</Form>

							<Button primary full name="pencil" onPress={ () => this.editUser() }>
								<Text style={this.css.profilebuttonText}>Update user</Text>
							</Button>
						</View>

						<View>
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
						</View>


					</View>

				</View>
			</Content>
		);
	}
}

AppRegistry.registerComponent('Profilescreen', () => Settingsscreen);

export default Profilescreen;
