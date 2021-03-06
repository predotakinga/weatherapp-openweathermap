import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import "react-native-gesture-handler";
import axios from "axios";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imagebg: {
    flex: 1,
    flexDirection: "column",
  },
  row1: {
    flexDirection: "row",
    marginVertical: 15,
  },
  row2: {
    flexDirection: "row",
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 15,
    marginVertical: 80,
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#164a7d",
  },
  infoView: {
    alignItems: "center",
  },
  cityCountryText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  dateText: {
    color: "#FFF",
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: "#FFF",
    marginVertical: 10,
  },
  description: {
    fontSize: 22,
    color: "#FFF",
    marginVertical: 10,
    fontWeight: "500",
  },
  tale: {
    backgroundColor: "#FFF",
    width: 100,
    height: 100,
    alignItems: "center",
    marginHorizontal: 8,
    borderRadius: 10,
  },
  icons: {
    width: 50,
    height: 50,
  },
  taleText: {
    fontSize: 13,
  },
});

const HomeView = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  if(data.name === undefined){
  axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=Gliwice&units=metric&appid=3b5242d0892bb8c4a6c017e32fe97136`,
  })
    .then((res) => {
      setData(res.data);
    })
  };
  const api = {
    key: "3b5242d0892bb8c4a6c017e32fe97136",
    baseUrl: "htttp://api.openweathermap.org/data/2.5/",
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        style={styles.imagebg}
      >
        <View>
          <TextInput
            placeholder="Enter city name and press return..."
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholderTextColor={"#000"}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#000" />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text
              style={styles.cityCountryText}
            >{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toDateString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp
            )}??C`}</Text>
            <Text style={styles.description}>{`${
              data.weather ? data?.weather[0]?.description : undefined
            }`}</Text>

            <View style={styles.row1}>
              <View style={styles.tale}>
                <Image
                  style={styles.icons}
                  source={require("../assets/sunrise.png")}
                />
                <Text style={styles.taleText}>
                  {new Date(`${data?.sys?.sunrise}` * 1000)
                    .toTimeString()
                    .slice(0, 5)}
                </Text>
                <Text style={styles.taleText}>Sunrise</Text>
              </View>
              <View style={styles.tale}>
                <Image
                  style={styles.icons}
                  source={require("../assets/sunset.png")}
                />
                <Text style={styles.taleText}>
                  {new Date(`${data?.sys?.sunset}` * 1000)
                    .toTimeString()
                    .slice(0, 5)}
                </Text>
                <Text style={styles.taleText}>Sunset</Text>
              </View>
              <View style={styles.tale}>
                <Image
                  style={styles.icons}
                  source={require("../assets/humidity.png")}
                />
                <Text style={styles.taleText}>{`${data?.main?.humidity}`}</Text>
                <Text style={styles.taleText}>Humidity</Text>
              </View>
            </View>

            <View style={styles.row2}>
              <View style={styles.tale}>
                <Image
                  style={styles.icons}
                  source={require("../assets/wind.png")}
                />
                <Text style={styles.taleText}>{`${data?.wind?.speed}`}</Text>
                <Text style={styles.taleText}>Wind</Text>
              </View>
              <View style={styles.tale}>
                <Image
                  style={styles.icons}
                  source={require("../assets/pressure.png")}
                />
                <Text style={styles.taleText}>{`${data?.main?.pressure}`}</Text>
                <Text style={styles.taleText}>Pressure</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("SeniorView")}
              >
                <View style={styles.tale}>
                  <Image
                    style={styles.icons}
                    source={require("../assets/search.png")}
                  />
                  <Text style={styles.taleText}>Senior's</Text>
                  <Text style={styles.taleText}>View</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default HomeView;
