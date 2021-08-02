import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import dummyData from '../userData.json';


const FriendList = () => {
  const usersOnline = useSelector(state => state.usersOnline);
  // const usersOnline = dummyData; // dummy data for testing

  useSelector(state => state.usersOnline);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={usersOnline}
        renderItem={({item}) => {
          return (
            <View>
              {item.nextRound ? (
                <View>
                  <Text style={styles.nextRoundText}>NEXT ROUND</Text>
                  <View style={styles.itemsContainerNextRound}>
                    <Image style={styles.avatarImage} source= {{ uri: item.avatar }}/>
                    <View style={ styles.avatarContainer }>
                      <Text style={ styles.text }>{item.username}</Text>
                      <Text style={ styles.text }>{item.drink}</Text>
                      <Text style={ styles.text }>{item.isFinished}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.itemsContainer}>
                  <Image style={styles.avatarImage} source= {{ uri: item.avatar }}/>
                  <View style={ styles.avatarContainer }>
                    <Text style={ styles.text }>{item.username}</Text>
                    <Text style={ styles.text }>{item.drink}</Text>
                    <Text style={ styles.text }>{item.isFinished}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={item => item.userId}
      />
    </View>
  )
}

export default FriendList

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  itemsContainerNextRound: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#26ada2"
  },
  nextRoundText: {
    color: "#26ada2",
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: -4

  },
  avatarImage: {
    width: 75,
    height: 75,
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    paddingHorizontal: 10
  }
})