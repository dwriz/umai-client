// screens/main/RankScreen.js

import { StyleSheet, Text, View } from "react-native";
import RankCard from "../../components/RankCard";

export default function RankScreen() {
  return (
    <View style={styles.container}>
      <RankCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
