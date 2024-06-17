import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TopUpScreen({ navigation }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const stripe = useStripe();

  const amounts = [
    { amount: 10, price: 500 },
    { amount: 20, price: 800 },
    { amount: 50, price: 2000 },
    { amount: 100, price: 3000 },
  ];

  const handleTopUp = async () => {
    if (!selectedAmount) {
      Alert.alert("Error", "Please select an amount to top up.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: selectedAmount.price }),
        }
      );

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmPayment(clientSecret, {
        type: "Card",
        paymentMethodType: "Card",
        paymentMethod: {
          card: {
            number: "4242 4242 4242 4242",
            expMonth: 12,
            expYear: 34,
            cvc: "123",
          },
        },
      });

      if (error) {
        console.error("Error during payment process:", error);
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Payment was successful!");
        navigation.navigate("ProfileScreen");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      Alert.alert("Error", "Something went wrong during the payment process.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Amount to Top Up</Text>
      {amounts.map((item) => (
        <TouchableOpacity
          key={item.amount}
          style={[
            styles.amountButton,
            selectedAmount?.amount === item.amount && styles.selectedButton,
          ]}
          onPress={() => setSelectedAmount(item)}
        >
          <Text style={styles.amountText}>
            {item.amount} - ${item.price / 100}
          </Text>
        </TouchableOpacity>
      ))}
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
      <TouchableOpacity style={styles.buyButton} onPress={handleTopUp}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amountButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#0077b5",
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#005f8a",
  },
  amountText: {
    color: "#fff",
    fontSize: 16,
  },
  buyButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF7F50",
    width: "100%",
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
