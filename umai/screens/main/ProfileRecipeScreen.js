import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  
  export default function Profile({ navigation }) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* container untuk profile picture dan nama */}
        <View style={styles.container1}>
          <View style={styles.icon1}>
            <Pressable
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </Pressable>
          </View>
          <View style={styles.subContainer1}>
            <Text style={styles.text1SubContainer1}>Siomay Ayam</Text>
          </View>
          <View style={styles.subContainer2}>
            <Ionicons name="settings" size={24} color="black" />
          </View>
        </View>
        {/* container untuk Foto Makanan */}
        <View style={styles.container2}>
          <Image
            style={styles.imageContainer2}
            source={{
              uri: "https://akcdn.detik.net.id/visual/2021/12/27/siomay-1_43.jpeg?w=720&q=90",
            }}
          ></Image>
        </View>
        {/* container untuk Text */}
        <View style={styles.container3}>
          <Text>
            =======================================
          </Text>
          <Text style={styles.textContainer3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla iaculis
            neque eget mi cursus, a vestibulum enim tempus. Nulla et nibh justo.
            Etiam eu dictum lorem, ac facilisis lectus. Pellentesque arcu ex,
            porta a suscipit vitae, ultricies vel quam. Duis vitae justo rhoncus,
            feugiat sem et, vestibulum risus. Mauris scelerisque odio dolor, id
            placerat risus convallis sed. Pellentesque ullamcorper purus
            consectetur eros dapibus vehicula. Nam blandit lobortis maximus.
            Curabitur suscipit mauris a mi mattis accumsan. Aliquam imperdiet
            tortor eu metus faucibus, non tempor dolor eleifend. Nunc placerat,
            odio id sollicitudin molestie, neque diam ornare ante, porttitor
            interdum velit dui id neque. Phasellus tempus lectus eget auctor
            egestas. Vivamus nibh nibh, scelerisque in mauris malesuada, tristique
            varius lorem. Vestibulum aliquet fringilla sem ac ultrices. Integer
            quis est id turpis consequat facilisis a quis enim. Aliquam erat
            volutpat. Etiam sit amet nisl sit amet purus vulputate efficitur at et
            metus. Morbi ac lectus est. Phasellus tincidunt consequat pharetra.
            Vivamus dapibus lobortis enim, vitae sollicitudin tortor venenatis ac.
            Sed sed elit elit. Curabitur tempus tortor vel quam facilisis, eu
            finibus mauris efficitur. Suspendisse non congue eros. Fusce vitae
            sodales augue. Pellentesque aliquam enim eget massa volutpat congue.
            Morbi sit amet leo purus. Etiam sed tincidunt mauris. Nam tempor ipsum
            dui, vitae laoreet odio fringilla dictum. Integer ultricies at nunc a
            laoreet. Cras sit amet nulla massa. In id sollicitudin enim. Morbi ut
            molestie ligula. Curabitur mattis turpis et lacus laoreet, ac sagittis
            turpis sagittis. Sed maximus, nunc vitae elementum auctor, dui felis
            lacinia magna, vitae mattis est libero non eros. Vivamus laoreet ante
            lacus, et vulputate dolor consectetur nec. Aliquam faucibus facilisis
            laoreet. Fusce condimentum lectus nec urna tincidunt ornare. Mauris
            non ligula iaculis, iaculis erat at, pellentesque elit. Sed vel purus
            aliquam, eleifend sapien ac, convallis dolor. Vestibulum vitae pretium
            nisi. Praesent vehicula lobortis lacinia. Donec placerat neque urna,
            in facilisis nibh maximus in. Aenean at accumsan velit. Integer eget
            eros eu risus dignissim tempus non id lorem.
          </Text>
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
      flex: 4 / 3,
      paddingBottom: 10,
      flexDirection: "row",
      backgroundColor: "#d4d768",
    },
    icon1: {
      marginTop: 14,
      marginLeft: 15,
    },
    subContainer1: {
      flex: 1,
      backgroundColor: "#d4d768",
    },
    text1SubContainer1: {
      fontWeight: "bold",
      marginTop: 15,
      marginLeft: 15,
      fontSize: 20,
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
      flexGrow: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3e9a9",
    },
    textContainer2: {
      flex: 1,
      marginTop: 12,
      fontSize: 20,
      marginLeft: 25,
      fontWeight: "bold",
    },
    imageContainer2: {
      width: 300,
      height: 300,
      borderRadius: 10
    },
    container3: {
      flex: 10,
      flexWrap: "wrap",
      flexDirection: "row",
      paddingLeft: 30,
      paddingRight: 30,
      textAlign: "center",
      justifyContent: "center",
      backgroundColor: "#f3e9a9",
    },
    textContainer3: {
      marginTop: 10,
      fontSize: 20
    }
  });
  