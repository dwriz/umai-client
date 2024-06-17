import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonDonate from "../components/ButtonDonate";
import ButtonPlaceHolder from "../components/ButtonPlaceholder";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* container untuk profile picture dan nama */}
      <View style={styles.container1}>
        <ImageBackground
          style={styles.imageContainer1}
          source={{
            uri: "https://cdn1-production-images-kly.akamaized.net/uBuE5OD3B9pUTVNJd81cB819z7Y=/0x194:5616x3359/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3048436/original/030475400_1581499756-shutterstock_413580649.jpg",
          }}
          imageStyle={{ opacity: 0.15 }}
        >
          <Image
            style={styles.profilepicture}
            source={{
              uri: "https://w7.pngwing.com/pngs/638/424/png-transparent-nichijou-anime-fan-art-nichijou-child-face-hand-thumbnail.png",
            }}
          />
          <View style={styles.subContainer1}>
            <Text style={styles.text1SubContainer1}>Nama</Text>
            <Text style={styles.text2SubContainer1}>Username</Text>
          </View>
          <View style={styles.subContainer2}>
            <ButtonDonate />
            <ButtonPlaceHolder />
          </View>
        </ImageBackground>
      </View>
      {/* container untuk card */}

      <View style={styles.container3}>
        <ScrollView scrollEnabled style={styles.contentContainerFlatListStyle}>
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
        </ScrollView>
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
    flex: 6,
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d768",
  },
  imageContainer1: {
    resizeMode: "cover",
    height: 230,
    width: 400,
  },
  subContainer1: {
    justifyContent: "center",
    alignItems: "center",
  },
  text1SubContainer1: {
    marginTop: 3,
    fontWeight: "bold",
    fontSize: 20,
  },
  text2SubContainer1: {
    marginTop: 3,
    fontSize: 20,
  },
  text2SubContainer2: {
    position: "absolute",
    fontWeight: "bold",
  },
  subContainer2: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 20
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
    paddingBottom: 15,
    backgroundColor: "#f3e9a9",
  },
  profilepicture: {
    width: 80,
    height: 80,
    marginTop: 12,
    marginLeft: 160,
    marginBottom: 2,
    marginRight: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#b0c654",
  },
  imageContainer3: {
    width: 320,
    height: 150,
    borderRadius: 35,
    marginTop: 20,
    marginLeft: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  textAbsoluteContainer3: {
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  contentContainerFlatListStyle: {
    height: "100%",
  },
});
