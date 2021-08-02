import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import dummyData from '../userData.json';

const drinksImage = require('../assets/drinks.png');

const YourRound = () => {
  const whoBuying = useSelector(state => state.whoBuying);
  const usersOnline = useSelector(state => state.usersOnline);

  // const usersOnline = dummyData; // dummy data for testing

  const dispatch = useDispatch();

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
      <View style={styles.container}>
        <Text style={styles.h2Text}>Hi {whoBuying}</Text>
        <View>
          <Text style={styles.whoBuyingText}>Go Buy the Round!</Text>
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
      <View style={styles.button}>

        <Button title='Next Round'
          onPress={() => {dispatch({type: 'server/nextRound'})}}/>
        </View>
      <Image style={styles.drinksImage} source={drinksImage} resizeMode='contain' />
    </View>
  )
}

export default YourRound

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fad369',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
    zIndex: 2,
    opacity: 0.9
  },
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
  button: {
    zIndex: 2,
    opacity: 0.9
  },
  drinksImage: {
    flex: 1,
    justifyContent: 'flex-start',
    width: 300,
    height: 300,
    marginTop: 20,
    top: -200,
    zIndex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10
  },
  drinkList: {
    marginVertical: 20,
  }
})