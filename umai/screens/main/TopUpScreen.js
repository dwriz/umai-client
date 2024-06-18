import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from "react-native-paper";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";

export default function TopUpScreen({ navigation }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const stripe = useStripe();
  const { setIsLoggedIn } = useContext(AuthContext);

  const amounts = [
    { amount: 10, price: 500 },
    { amount: 20, price: 800 },
    { amount: 50, price: 2000 },
    { amount: 100, price: 3000 },
  ];

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

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
    <KeyboardAwareScrollView
    innerRef={ref => {
      this.scroll = ref
    }}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.umaiHeaderContainer}>
          <Image
            style={styles.umaiImage}
            source={require("../../assets/umai_text.png")}
          ></Image>
        </View>
        <View style={styles.logoutContainer}>
          <Button
            icon="logout"
            mode="contained"
            buttonColor="#c07f24"
            textColor="#FFEDD3"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </Button>
        </View>
      </View>

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
            backgroundColor: "#FFFBDE",
            textColor: "#536E2C",
          }}
          style={{
            width: "90%",
            height: 50,
            marginVertical: 20,
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
    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    color: "#536E2C",
  },
  amountButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#B0C654",
    marginVertical: 15,
    width: "90%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#6C8D3B",
  },
  amountText: {
    color: "#fff",
    fontSize: 16,
  },
  buyButton: {
    marginTop: 30,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#9F691D",
    width: "90%",
    alignItems: "center",
  },
  buyButtonText: {
    color: "#F1ECCD",
    fontSize: 16,
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flex: 1 / 10,
    marginTop: 0,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#D4D768",
    borderColor: "#B7D88C",
  },
  umaiHeaderContainer: {
    flex: 1,
  },
  umaiImage: {
    width: 120,
    height: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 60,
    marginBottom: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
  listContainer: {
    justifyContent: "space-between",
  },
  logoutButton: {
    marginBottom: 0,
  },
  buttonText: {
    color: "#F9EFAE",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
