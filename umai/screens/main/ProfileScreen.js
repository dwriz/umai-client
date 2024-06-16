import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* container untuk profile picture dan nama */}
      <View style={styles.container1}>
        <Image
          style={styles.profilepicture}
          source={{
            uri: "https://w7.pngwing.com/pngs/638/424/png-transparent-nichijou-anime-fan-art-nichijou-child-face-hand-thumbnail.png",
          }}
        />
        <View style={styles.subContainer1}>
          <Text style={styles.text1SubContainer1}>Nama</Text>
          <Text style={styles.text2SubContainer2}>Username</Text>
        </View>
        <View style={styles.subContainer2}>
          <Ionicons name="settings" size={24} color="black" />
        </View>
      </View>
      {/* container untuk text Recipe */}
      <View style={styles.container2}>
        <Text style={styles.textContainer2}>Recipe</Text>
      </View>
      {/* container untuk card */}
      <View style={styles.container3}>
        <Pressable
          onPress={() => {
            navigation.navigate("ProfileRecipeScreen");
          }}
        >
          <ImageBackground
            style={styles.imageContainer3}
            source={{
              uri: "https://akcdn.detik.net.id/visual/2021/12/27/siomay-1_43.jpeg?w=720&q=90",
            }}
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.textAbsoluteContainer3}>Siomay Ayam</Text>
            </LinearGradient>
          </ImageBackground>
        </Pressable>

        <Image
          style={styles.imageContainer3}
          source={{
            uri: "https://akcdn.detik.net.id/visual/2021/12/27/siomay-1_43.jpeg?w=720&q=90",
          }}
        />
        <Image
          style={styles.imageContainer3}
          source={{
            uri: "https://akcdn.detik.net.id/visual/2021/12/27/siomay-1_43.jpeg?w=720&q=90",
          }}
        />
        <Image
          style={styles.imageContainer3}
          source={{
            uri: "https://akcdn.detik.net.id/visual/2021/12/27/siomay-1_43.jpeg?w=720&q=90",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container1: {
    flex: 19 / 20,
    flexDirection: "row",
    backgroundColor: "#d4d768",
  },
  subContainer1: {
    flex: 1,
    backgroundColor: "#d4d768",
  },
  text1SubContainer1: {
    marginTop: 6,
    fontWeight: "bold",
  },
  text2SubContainer2: {
    fontWeight: "bold",
  },
  subContainer2: {
    flex: 1,
    backgroundColor: "#d4d768",
    marginTop: 15,
    marginRight: 10,
    alignItems: "flex-end",
  },
  container2: {
    flex: 2 / 3,
    backgroundColor: "#f3e9a9",
  },
  textContainer2: {
    flex: 1,
    marginTop: 12,
    fontSize: 20,
    marginLeft: 25,
    fontWeight: "bold",
    // justifyContent: "center",
    // textAlign: "center",
  },
  container3: {
    flex: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#f3e9a9",
  },
  profilepicture: {
    width: 50,
    height: 50,
    marginTop: 2,
    marginLeft: 10,
    marginBottom: 2,
    marginRight: 10,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#b0c654",
  },
  imageContainer3: {
    width: 150,
    height: 150,
    borderRadius: 35,
    marginTop: 15,
    marginLeft: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  textAbsoluteContainer3: {
    position: "absolute",
    top: 120,
    left: 30,
    right: 0,
    bottom: 0,
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  },
});
