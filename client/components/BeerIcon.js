import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const beerImage = require('../assets/beer.png');
const beerEmptyImage = require('../assets/beer-empty.png');

const BeerIcon = () => {

  const userFinished = useSelector(state => state.userFinished);
  const dispatch = useDispatch();

  return (
    <>
    {userFinished ? (
      <View style={styles.beerImageContainer}>
        <TouchableOpacity  onPress={() => {
        dispatch({type: 'server/finished', isFinished: "Finished ✔️"});
        }}
        >
        <Image style={styles.beerImage} source={beerEmptyImage} resizeMode='contain' />
        <Text style={styles.buttonText}>Waiting on Your Slow Friends</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity style={styles.beerImageContainer} onPress={() => {
        dispatch({type: 'server/finished', isFinished: "Finished ✔️"});
      }}
      >
        <Image style={styles.beerImage} source={beerImage} resizeMode='contain' />
        <Text style={styles.buttonText}>Press Beer Icon when finished Drink</Text>
      </TouchableOpacity>
    )}
    </>
  )
}

export default BeerIcon

const styles = StyleSheet.create({
  beerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  beerImage: {
    width: 300,
    height: 300
  },
  buttonText: {
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center'
  }
})