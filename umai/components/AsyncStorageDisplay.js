import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StorageViewer() {
  const [storageItems, setStorageItems] = useState([]);

  useEffect(() => {
    const fetchStorageItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        setStorageItems(result);
      } catch (error) {
        console.error("Error fetching AsyncStorage items:", error);
      }
    };

    fetchStorageItems();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {storageItems.map(([key, value]) => (
        <View key={key} style={styles.item}>
          <Text style={styles.key}>{key}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  key: {
    fontWeight: "bold",
  },
  value: {
    marginTop: 5,
  },
});
