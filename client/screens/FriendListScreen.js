import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


const FriendListScreen = () => {
  const usersOnline = useSelector(state => state.usersOnline);
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
                <Text>{item.username}</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})