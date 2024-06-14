// screens/main/FeedScreen.js

import { StyleSheet, Text, View } from "react-native";
import FeedCard from "../../components/FeedCard";
export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FeedCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
