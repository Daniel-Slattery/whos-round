import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import dummyData from '../userData.json';


const FriendListScreen = () => {
  const usersOnline = useSelector(state => state.usersOnline);
  //dummyData;
  useSelector(state => state.usersOnline);


  console.log('usersOnline', usersOnline);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={usersOnline}
        renderItem={({item}) => {
          console.log('item', item);
          return (
            <View style={styles.itemsContainer}>
              <Image style={styles.avatarImage} source= {{ uri: item.avatar }}/>
              <View style={ styles.avatarContainer }>
                <Text style={ styles.text }>{item.username}</Text>
                <Text style={ styles.text }>{item.drink}</Text>
                <Text style={ styles.text }>{item.hasFinished}</Text>
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
  itemsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20
  }
})