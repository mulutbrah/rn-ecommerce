import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import Constants from "expo-constants";

const DATA = [
  {
    _id: "5d17899839f5d333b201c5f6",
    name: "Ragnarok Online",
    price: 53000,
    detail:
      "Ragnarok Online is a massive multiplayer online role-playing game created by Gravity based on the manhwa Ragnarok by Lee Myung-jin. It was released in South Korea on 31 August 2002 for Microsoft Windows. The game has spawned an animated series, Ragnarok the Animation, and a sequel game, Ragnarok Online 2: Legend of the Second",
    stock: 94,
    category: "action",
    picture_url:
      "https://storage.googleapis.com/richiebaby_image/1562235509639proxy.duckduckgo.com.jpeg",
    __v: 0,
    createdAt: "2019-07-28T17:53:57.304Z",
    updatedAt: "2019-08-27T09:46:07.033Z"
  }
];

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" }
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );

  return (
    <SafeAreaView>
      <FlatList
        numColumns="2"
        horizontal={false}
        data={DATA}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate("LaunchDetail", item.flight_number)
            }
          >
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.links && { uri: item.links.mission_patch_small }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.missionName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
