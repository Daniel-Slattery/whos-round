import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import dummyData from '../userData.json';


const FriendListScreen = () => {
  const usersOnline = dummyData;
  //useSelector(state => state.usersOnline);
  console.log('usersOnline', usersOnline);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={usersOnline}
        renderItem={({item}) => {
          console.log('item', item);
          return (
            <View style={styles.itemContainerStyle}>
              <Image style={styles.avatarImageStyle} source= {{ uri: item.avatar }}/>
              <View style={ styles.avatarNameViewStyle }>
                <Text style={ styles.text }>{item.username}</Text>
                <Text style={ styles.text }>{item.drink}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.userId}
      />
    </View>
  )
}

export default FriendListScreen

const styles = StyleSheet.create({
  itemContainerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  avatarImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarNameViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
})