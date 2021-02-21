import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Linking,
  LogBox,
} from "react-native";

const { width, height } = Dimensions.get("window");

LogBox.ignoreAllLogs();

export default class App extends Component {
  state = {
    news: [],
    loading: true,
  };

  fetchnews = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=f0f79d09809f4114ae2e67ab8166bea3"
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          news: response.articles,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchnews();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 35, color: "#000" }}>Sport News</Text>
          </View>
          <View style={styles.news}>
            <FlatList
              data={this.state.news}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <View
                      style={{
                        width: width - 50,
                        height: 200,
                        backgroundColor: "#fff",
                        marginBottom: 15,
                        borderRadius: 15,
                      }}
                    >
                      <Image
                        source={{ uri: item.urlToImage }}
                        style={[StyleSheet.absoluteFill, { borderRadius: 15 }]}
                      />
                      <View style={styles.gradient}>
                        <Text
                          style={{
                            position: "absolute",
                            bottom: 0,
                            color: "#fff",
                            fontSize: 20,
                            padding: 5,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 30,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  news: {
    alignSelf: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
  },
});
