import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux'

import ProfileStore from './ProfileStore'
import ProfilePage1 from './ProfilePage1';
import ProfilePage2 from './ProfilePage2';

export default class ProfileTab extends Component {
  static navigationOptions = {
    title: 'Profile Tab',
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  _get_view(page){
    switch(page) {
      case 1:
        return <ProfilePage1 onToggle={this._togglePage}/>
        break;        
      case 2:
        return <ProfilePage2 onToggle={ this._togglePage }/>
        break;
      default:
        return <Text style={{paddingTop:200}}>Error in Page: {page}</Text>;
    } 
  }

  _togglePage = () => {
    const page = this.state.page === 1 ? 2 : 1;
    this.setState({ page: page });
  }

  render() {
    console.log("render profile tab. props...", this.props);
    const {navigate} = this.props.navigation;
    return (
      <Provider store={ProfileStore}>
        {this._get_view(this.state.page)}
      </Provider>
    );
  }
}