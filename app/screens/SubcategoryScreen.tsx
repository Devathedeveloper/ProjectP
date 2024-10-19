// app/screens/subcategory-screen.tsx

import React from "react"
import { View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native"
import { observer } from "mobx-react-lite"
import { Text, Header } from "../components"
import { spacing, colors } from "../theme"
import { FlashList, FlashListProps } from "@shopify/flash-list"

// Define the type for a subcategory item
interface Subcategory {
  id: number
  name: string
  imageUrl: string | ImageSourcePropType
}

// Static values for category name and ID
const categoryId = 1
const categoryName = "Example Category"

// Static data for subcategories
const subcategories: Subcategory[] = [
  {
    id: 101,
    name: "Subcategory 1",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Subcategory+1",
  },
  {
    id: 102,
    name: "Subcategory 2",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Subcategory+2",
  },
  {
    id: 103,
    name: "Subcategory 3",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Subcategory+3",
  },
  {
    id: 104,
    name: "Subcategory 4",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Subcategory+4",
  },
  // Add more placeholder subcategories as needed
]

export const SubcategoryScreen: React.FC = observer(function SubcategoryScreen() {
  // Since we're using static values, we don't need navigation or route parameters

  const renderSubcategoryItem: FlashListProps<Subcategory>["renderItem"] = ({ item }) => (
    <TouchableOpacity
      style={styles.subcategoryItem}
      onPress={() => {
        // Handle the subcategory selection
        console.log(`Selected Subcategory: ${item.name}`)
        // You can add static navigation or actions here if needed
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.subcategoryImage} />
      <View style={styles.subcategoryOverlay}>
        <Text style={styles.subcategoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* <Header
        title={categoryName}
        leftIcon="arrow-left"
        onLeftPress={() => {
          // Handle the back action
          console.log("Back button pressed")
          // You can add static navigation or actions here if needed
        }}
        style={styles.header}
        titleStyle={styles.headerTitle}
      /> */}
      <Header
        title="Sub Categories"
        leftIcon="back"
        leftIconColor="red"
        onLeftPress={() => navigation.goBack()}
        style={{ height: 25 }}
        backgroundColor=""
        titleStyle={{ color: colors.text, textAlign: "left" }}
        // rightIcon="settings"
        // onRightPress={() => navigation.navigate("cart")}
      />
      <FlashList
        data={subcategories}
        renderItem={renderSubcategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.palette.primary,
  },
  headerTitle: {
    color: colors.text,
  },
  listContent: {
    padding: spacing.medium,
  },
  subcategoryItem: {
    flex: 1,
    margin: spacing.small,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  subcategoryImage: {
    width: "100%",
    height: "100%",
  },
  subcategoryOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    alignItems: "center",
  },
  subcategoryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
