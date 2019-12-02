import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image
} from "react-native";

import ProductService from "../services/ProductsService";

import styles from "./styles";

function Item({ data, index, onPressHandle }) {
  return (
    <TouchableOpacity key={index} style={styles.card} onPress={onPressHandle}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={data.links && { uri: data.links.mission_patch_small }}
            style={styles.image}
          />
        </View>
        <Text>{data.name}</Text>
        <Text>{data.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const DATA = [
  {
    _id: "5d17899839f5d333b201c5f6",
    name: "Ragnarok Online",
    price: 53000,
    detail:
      "Ragnarok Online is a massive multiplayer online role-playing game created by Gravity based on the manhwa Ragnarok by Lee Myung-jin. It was released in South Korea on 31 August 2002 for Microsoft Windows. The game has spawned an animated series, Ragnarok the Animation, and a sequel game, Ragnarok Online 2: Legend of the Second",
    stock: 94,
    category: "action",
    picture_url: "https://placehold.it/250x150",
    __v: 0,
    createdAt: "2019-07-28T17:53:57.304Z",
    updatedAt: "2019-08-27T09:46:07.033Z"
  },
  {
    _id: "5d1789ed39f5d333b201c5f7",
    name: "God Of War",
    price: 540000,
    detail:
      "God of War[a] is an action-adventure video game developed by Santa Monica Studio and published by Sony Interactive Entertainment (SIE). Released on April 20, 2018, for the PlayStation 4 (PS4) console, it is the eighth installment in the God of War series, the eighth chronologically, and the sequel to 2010's God of War III. Unlike previous games, which were loosely based on Greek mythology, this installment is loosely based on Norse mythology, with the majority of it set in ancient Norway in the realm of Midgard. For the first time in the series, there are two protagonists: Kratos, the former Greek God of War who remains the only playable character, and his young son Atreus; at times, the player may passively control him. Following the death of Kratos' second wife and Atreus' mother, they journey to fulfill her promise to spread her ashes at the highest peak of the nine realms. Kratos keeps his troubled past a secret from Atreus, who is unaware of his divine nature. Along their journey, they encounter monsters and gods of the Norse world.\n\nDescribed by creative director Cory Barlog as a reimagining of the franchise, a major gameplay change is that Kratos prominently uses a magical battle axe instead of his signature double-chained blades. God of War also uses an over-the-shoulder free camera, with the game in one shot, as opposed to the fixed cinematic camera of the previous entries. This was the first time a three-dimensional AAA game utilized a one-shot camera. The game also includes role-playing video game elements, and Kratos' son Atreus provides assistance in combat. The majority of the original game's development team worked on God of War and designed it to be accessible and grounded. A separate short text-based game, A Call from the Wilds, was released in February 2018 and follows Atreus on his first adventure.",
    stock: 492,
    category: "action",
    picture_url: "https://placehold.it/250x150",
    __v: 0,
    createdAt: "2019-08-31T17:14:07.973Z",
    updatedAt: "2019-08-31T17:14:07.973Z"
  },
  {
    _id: "5d1901d3b260be1a0845cf87",
    name: "Devil May Cry 2",
    price: 450000,
    detail:
      "Devil May Cry 5[a] is an action-adventure hack and slash video game developed and published by Capcom. It is the sixth installment in the franchise and the fifth installment of the mainline Devil May Cry series, and was released for Microsoft Windows, PlayStation 4, and Xbox One on March 8, 2019. The game takes place five years after Devil May Cry 4 and follows a trio of warriors with demonic powers Dante, Nero and a new protagonist named V as they attempt to stop the Demon King Urizen, from destroying the human world. Across the game, the player can use either of these three characters in different missions with each character having their own way of fighting and becoming stronger. As this happens the mystery behind V is revealed alongside his connnection with Urizen.\n\nDevil May Cry 5 was directed by Hideaki Itsuno who aimed to make this installment his best work. He aimed to make the game balanced to both newcomers and returning gamers by providing an adequate difficult and new demons. Capcom also wanted to bring a more realistic design inspired by the \"RE Engine\" provided in their previous work, Resident Evil 7: Biohazard. As a result, models were used to make the character's faces. The plot was written by returning writer Bingo Morihashi while the setting was based on various locations from London. Multiple composers worked together in the making of the game's audio, creating three main themes centered around the playable characters.\n\nDevil May Cry 5 received positive reviews from critics with many lauding it as a return to form for the franchise and for revitalising the character-action genre of games, praising the variety of techniques the three characters bring with V standing out thanks to his distinctive style of commanding underlings. The plot was noted to be appealing but some writers still felt it was too cheesy for rookie players. The game has sold over 2 million copies less than a month after its release. A light novel and manga related to the game have also been released.",
    stock: 76,
    category: "action",
    picture_url: "https://placehold.it/250x150",
    __v: 0,
    createdAt: "2019-08-31T17:18:49.283Z",
    updatedAt: "2019-08-31T17:19:29.444Z"
  }
];

export default function Home(props) {
  const [products, setProducts] = useState();

  async function fetchProducts() {
    try {
      const { data } = await ProductService.getProducts();
      const products = data;

      setProducts(products);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        numColumns="2"
        horizontal={false}
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            data={item}
            index={index}
            onPressHandle={() => props.navigation.navigate("ProductDetail", 1)}
          />
        )}
      />
    </SafeAreaView>
  );
}
