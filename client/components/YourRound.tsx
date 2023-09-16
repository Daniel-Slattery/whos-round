import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import PressableButton from "./PressableButton";

const drinksImage = require("../assets/drinks.png");

const YourRound = ({ usersOnline, whoBuying }) => {
  const dispatch = useDispatch();

  function drinksList() {
    const drinksObject = {};
    usersOnline.forEach((u) => {
      drinksObject[u.drink] = drinksObject[u.drink] + 1 || 1;
    });
    const drinksArray = [];
    for (const drink in drinksObject) {
      drinksArray.push(`${drinksObject[drink]} x ${drink}`);
    }
    return drinksArray;
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.h2Text}>Hi {whoBuying}</Text>
        <View>
          <Text style={styles.whoBuyingText}>Go Buy the Round!</Text>
          <FlatList
            data={drinksList()}
            style={styles.drinkList}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text style={styles.text}>{item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.button}>
        <PressableButton
          title="Next Round"
          onPress={() => {
            dispatch({ type: "server/nextRound" });
          }}
        />
      </View>
      <Image
        style={styles.drinksImage}
        source={drinksImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default YourRound;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fad369",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
    zIndex: 2,
    opacity: 0.9,
  },
  h2Text: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  whoBuyingText: {
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    zIndex: 2,
    opacity: 0.9,
  },
  drinksImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    top: -200,
    zIndex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
  },
  drinkList: {
    marginVertical: 20,
  },
});
