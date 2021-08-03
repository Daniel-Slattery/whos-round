import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const HeaderLogo = () => {
  return (
    <View style={styles.headerTextContainer}>
      <Text style={styles.headerText}>Who's Round</Text>
    </View>
  )
}

export default HeaderLogo

const styles = StyleSheet.create({
  headerTextContainer: {
    backgroundColor: 'black',
    marginTop: 30,
    marginBottom: 25
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  }
})