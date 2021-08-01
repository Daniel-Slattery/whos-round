import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useSelector } from 'react-redux';

const drinksImage = require('../assets/drinks.png');
const waiterImage = require('../assets/waiter2.png');



const NextRound = () => {

  const whoBuying = useSelector(state => state.whoBuying);

  return (
    <View>
      <View style={styles.headerTextContainer} data={whoBuying}>
            <Text style={styles.headerText}>Who's Round</Text>
          </View>
      <Text style={styles.h2Text}>Next Round Coming</Text>
      <View>
        <Text style={styles.whoBuyingText}>{whoBuying} is getting the drinks!</Text>
        <Image style={styles.waiterImage} source={waiterImage} resizeMode='contain' />
      </View>
    </View>
  )
}

export default NextRound

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
})