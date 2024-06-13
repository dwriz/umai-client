// screens/main/FeedScreen.js

import { StyleSheet, Text, View } from "react-native";
import CardFeed from "../../components/CardFeed";
export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <CardFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
