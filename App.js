import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const keyExtractor = (item) => item.uid.toString();
  const apiLink = "https://random-data-api.com/api/v2/users?size=20";
  const oneUserApi = "https://random-data-api.com/api/users/random_user";

  useEffect(() => {
    fetchAllUser();
  });

  const fetchAllUser = () => {
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
  };

  //rendering the data
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.outerContainer}>
        <TouchableOpacity>
          <View style={styles.grpCard}>
            <View style={styles.imgContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.count}>{index + 1}</Text>
            <View style={styles.txt}>
              <Text>{item.first_name}</Text>
              <Text>{item.last_name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onRefresh = async () => {
    setRefresh(true);
    await fetchAllUser();
    setRefresh(false);
  };

  const fetchOneUser = () => {
    axios
      .get(oneUserApi)
      .then((res) => {
        setData((prevUsers) => [res.data, ...prevUsers]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const alertMsg = () => {
  //   <View>
  //     <Text>Loading...</Text>
  //   </View>;
  // };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refresh={refresh}
              onRefresh={onRefresh}
              // alertMsg={alertMsg}
            />
          }
          alertTitle="Fetching Data"
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
  },
  grpCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 30,
    margin: 0,
    borderBottomWidth: 1,
    gap: 150,
  },
  // count: {
  //   paddingLeft: 40,
  // },
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 15,
  },
  imgContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  txt: {
    color: "black",
    width: 75,
    display: "flex",
    flexDirection: "column",
  },
  fab: {
    position: "absolute",
    right: 40,
    bottom: 40,
    backgroundColor: "green",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
