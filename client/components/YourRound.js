import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import dummyData from '../userData.json';


const drinksImage = require('../assets/drinks.png');
const waiterImage = require('../assets/waiter2.png');

const YourRound = () => {
  const whoBuying = useSelector(state => state.whoBuying);
  // const usersOnline = useSelector(state => state.usersOnline);
  const usersOnline = dummyData; // dummy data for testing

  function drinksList() {
    const drinksObject = {};
    usersOnline.forEach((u) => {
      drinksObject[u.drink] = (drinksObject[u.drink]+1) || 1;
    })
    const drinksArray = [];
    for (const drink in drinksObject) {
      drinksArray.push(`${drinksObject[drink]} x ${drink}`)
    }
    return drinksArray;
  }

  return (
    <View>
      <View style={styles.headerTextContainer} data={whoBuying}>
            <Text style={styles.headerText}>Who's Round</Text>
          </View>
      <Text style={styles.h2Text}>Hi {whoBuying}</Text>
      <View>
        <Text style={styles.whoBuyingText}>It's time to get the round!</Text>
        <FlatList data={drinksList()}
        style={styles.drinkList}
        renderItem={({item}) => {
          return (
            <View>
              <Text style={ styles.text }>{item}</Text>
            </View>
          );
        }}
      />
      </View>
    </View>
  )
}

export default YourRound

const styles = StyleSheet.create({
  headerTextContainer: {
    backgroundColor: 'black',
    marginTop: 10,
    marginBottom: 25
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  h2Text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  whoBuyingText: {
    marginVertical: 10,
    textAlign: 'center'
  },
  waiterImage: {
    flex: 1,
    justifyContent: 'flex-start',
    width: 300,
    height: 300,
    marginTop: 20
  },
  text: {
    textAlign: 'center'
  },
  drinkList: {
    marginVertical: 20,
    backgroundColor: 'gray'
  }
})