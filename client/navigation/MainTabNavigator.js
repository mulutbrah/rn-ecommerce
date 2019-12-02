import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LoginScreen from "../screens/LoginScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

LoginStack.path = "";

const ProductStack = createStackNavigator({
  Product: {
    screen: ProductsScreen,
    navigationOptions: () => ({
      title: "Product List",
      headerStyle: {
        backgroundColor: "#fff"
      }
    })
  },
  ProductDetail: {
    screen: ProductDetailScreen,
    navigationOptions: () => ({
      title: "back",
      headerStyle: {
        backgroundColor: "#fff"
      }
    })
  }
});

ProductStack.navigationOptions = {
  tabBarLabel: "Products",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

ProductStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  LoginStack,
  ProductStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
