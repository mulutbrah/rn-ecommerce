import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

export default function ProductDetailScreen() {
  return (
    <ScrollView>
      <View>
        {/* <View>
          <Image
            source={launch.links && { uri: launch.links.mission_patch_small }}
            style={{ width: 125, height: 125 }}
          />
        </View> */}
        <View>
          <Text>God Of War</Text>
          <Text>Action</Text>
        </View>
      </View>
      <View>
        <Text>Launch Details</Text>
        <Text>God Of War 3 wkwwkwkwkwkwkwkwkwkk</Text>
      </View>
    </ScrollView>
  );
}
