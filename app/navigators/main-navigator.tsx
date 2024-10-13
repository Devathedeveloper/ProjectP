// app/navigators/main-navigator.tsx

import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Icon from "react-native-vector-icons/Feather"
import { colors } from "../theme"
import { HomeScreen } from "app/screens/HomeScreen"
import ProfileScreen from "app/screens/ProfileScreen"
import { CartScreen } from "app/screens/CartScreen"
import { SearchScreen } from "app/screens/SearchScreen"

const Tab = createBottomTabNavigator()

export function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string

          if (route.name === "home") {
            iconName = "home"
          } else if (route.name === "search") {
            iconName = "search"
          } else if (route.name === "cart") {
            iconName = "shopping-cart"
          } else if (route.name === "profile") {
            iconName = "user"
          } else {
            iconName = "circle"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="search" component={SearchScreen} options={{ tabBarLabel: "Search" }} />
      <Tab.Screen name="cart" component={CartScreen} options={{ tabBarLabel: "Cart" }} />
      <Tab.Screen name="profile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
    </Tab.Navigator>
  )
}
