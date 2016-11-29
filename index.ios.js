/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, {Component} from 'react';
 import {ReactNative,
   AppRegistry,
   ListView,
   StyleSheet,
   Text,
   View,
   TouchableHighlight,
   AlertIOS } from 'react-native';
 import * as firebase from 'firebase';
 const StatusBar = require('./components/StatusBar');
 const ActionButton = require('./components/ActionButton');
 const ListItem = require('./components/ListItem');
 const styles = require('./styles.js');


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZYwWIxiJRIWNPrwbbRwvEX6rv_keclK8",
  authDomain: "janetestinggroceryproject.firebaseapp.com",
  databaseURL: "https://janetestinggroceryproject.firebaseio.com",
  storageBucket: "janetestinggroceryproject.appspot.com",
  messagingSenderId: "352175272018"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);



class GroceryApp extends Component {

  constructor(props) {
  super(props);

  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
  this.itemsRef = this.getRef().child('items');
}

getRef() {
    return firebaseApp.database().ref();
  }


componentDidMount() {
  this.listenForItems(this.itemsRef);
}

listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }



_renderItem(item) {
    return (
      <ListItem item={item}  />
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        style={styles.listview}
        />

        <ActionButton title="Add" />

      </View>
    );
  }

}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
