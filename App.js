import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const keyExtractor = (item) => item.uid.toString();
  const apiLink = "https://random-data-api.com/api/v2/users?size=20";
  const oneUserApi = "https://random-data-api.com/api/users/random_user";

  useEffect(() => {
    axios
      .get(apiLink)
      .then((res) => {
        // console.log(res.data);

        setData(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //rendering the data
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.grpCard}>
        <Text>{index + 1}</Text>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text>First Name : {item.first_name}</Text>
        <Text>Last Name :{item.last_name}</Text>
      </View>
    );
  };

  const fetchOneUser = () => {
    axios
      .get(oneUserApi)
      .then((res) => {
        setData((prevUsers) => [...prevUsers, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={fetchOneUser}>
          <Icon name="add" size={30} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  grpCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "green",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
