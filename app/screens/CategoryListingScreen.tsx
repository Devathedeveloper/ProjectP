// app/screens/category-listing-screen.tsx

import React from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { Text, Header } from "../components"
import { useNavigation } from "@react-navigation/native"
import { spacing, colors } from "../theme"
import { FlashList } from "@shopify/flash-list"

const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Indoor+Plants",
  },
  {
    id: 2,
    name: "Outdoor Plants",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Outdoor+Plants",
  },
  {
    id: 3,
    name: "Succulents",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Succulents",
  },
  {
    id: 4,
    name: "Flowering Plants",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Flowering+Plants",
  },
  {
    id: 5,
    name: "Herbs",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Herbs",
  },
  {
    id: 6,
    name: "Cacti",
    imageUrl: "https://via.placeholder.com/300x300.png?text=Cacti",
  },
  // Add more categories as needed
]

export const CategoryListingScreen: React.FC<any> = observer(function CategoryListingScreen() {
  const navigation = useNavigation()

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("ProductList", { categoryId: item.id })}
    >
      {/* <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} /> */}

      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* <Header
        title="Categories"
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
        style={styles.header}
        titleStyle={styles.headerTitle}
      /> */}
      <Header
        title="Categories"
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
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  categoryImage: {
    height: "100%",
    width: "100%",
  },
  categoryItem: {
    flex: 1,
    margin: spacing.small,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.5)",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
    alignItems: "center",
    justifyContent: "center",
  },
  categoryOverlay: {


    // bottom: 0,
    // paddingHorizontal: spacing.small,
    // paddingVertical: spacing.small,
    // position: "absolute",
    // width: "100%",
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    // fontWeight: "bold",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
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
})
