// app/screens/home-screen.tsx

import React from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import { Header, Text } from "../components"
import { useNavigation } from "@react-navigation/native"
import { spacing, colors } from "../theme"
import { FlashList } from "@shopify/flash-list"

const { width } = Dimensions.get("window")

export const HomeScreen: React.FC<any> = observer(function HomeScreen() {
  const navigation = useNavigation()

  const promotionalBannersData = [
    { id: 1, imageUrl: "https://via.placeholder.com/1000x200" },
    { id: 2, imageUrl: "https://via.placeholder.com/1000x200" },
    { id: 3, imageUrl: "https://via.placeholder.com/1000x200" },
    { id: 4, imageUrl: "https://via.placeholder.com/1000x200" },
    { id: 5, imageUrl: "https://via.placeholder.com/1000x200" },
  ]

  const categoriesData = [
    { id: 1, name: "Category 1", imageUrl: "https://via.placeholder.com/80" },
    { id: 2, name: "Category 2", imageUrl: "https://via.placeholder.com/80" },
    { id: 3, name: "Category 3", imageUrl: "https://via.placeholder.com/80" },
    { id: 4, name: "Category 4", imageUrl: "https://via.placeholder.com/80" },
    { id: 5, name: "Category 5", imageUrl: "https://via.placeholder.com/80" },
  ]

  const productsData = [
    { id: 1, name: "Product 1", imageUrl: "https://via.placeholder.com/100", price: 100 },
    { id: 2, name: "Product 2", imageUrl: "https://via.placeholder.com/100", price: 150 },
    { id: 3, name: "Product 3", imageUrl: "https://via.placeholder.com/100", price: 200 },
    { id: 4, name: "Product 4", imageUrl: "https://via.placeholder.com/100", price: 250 },
    { id: 5, name: "Product 5", imageUrl: "https://via.placeholder.com/100", price: 300 },
  ]

  const sections = [
    { id: "promotionalBanners" },
    { id: "categories" },
    { id: "featuredProducts" },
    { id: "recommendedProducts" },
  ]

  const renderCategoryItem = ({ item }: { item: any }) => (
    <View style={{ marginHorizontal: spacing.small }}>
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => navigation.navigate("productList", { categoryId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  )

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate("productDetails", { productId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }: { item: any }) => {
    switch (item.id) {
      case "promotionalBanners":
        return (
          <View style={styles.bannerContainer}>
            <FlashList
              data={promotionalBannersData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("promotion", { id: item.id })}>
                  <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
                </TouchableOpacity>
              )}
              estimatedItemSize={width}
            />
          </View>
        )
      case "categories":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <FlashList
              data={categoriesData}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: spacing.small, // Only padding and backgroundColor are allowed
                backgroundColor: colors.background, // Example if you needed to set a background color
              }}
              estimatedItemSize={80}
            />
          </View>
        )
      case "featuredProducts":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <FlashList
              data={productsData}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: spacing.small, // Only padding and backgroundColor are allowed
                backgroundColor: colors.background, // Example if you needed to set a background color
              }}
              estimatedItemSize={140}
            />
          </View>
        )
      case "recommendedProducts":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <FlashList
              data={productsData}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={140}
            />
          </View>
        )
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        leftIcon="menu"
        leftIconColor="red"
        onLeftPress={() => navigation.goBack()}
        style={{ height: 25 }}
        backgroundColor=""
        titleStyle={{ color: colors.text, textAlign: "left" }}
        rightIcon="settings"
        onRightPress={() => navigation.navigate("cart")}
      />
      <FlashList
        data={sections}
        renderItem={renderItem}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: spacing.small,
  },
  bannerImage: {
    height: 200,
    resizeMode: "cover",
    width: width,
  },
  categoryImage: {
    backgroundColor: "#f0f0f0",
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: spacing.small,
    width: 80,
  },
  categoryList: {
    marginTop: spacing.small,
    paddingHorizontal: spacing.small,
  },
  categoryText: {
    color: colors.text,
    fontSize: 12,
    marginTop: spacing.tiny,
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  productImage: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    height: 100,
    width: "80%",
  },
  productItem: {
    marginHorizontal: spacing.small,
    width: 140,
  },
  productList: {
    marginTop: spacing.small,
    paddingHorizontal: spacing.small,
  },
  productName: {
    color: colors.text,
    fontSize: 14,
    marginTop: spacing.tiny,
  },
  productPrice: {
    color: "#888",
    fontSize: 12,
  },
  section: {
    marginTop: spacing.large,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: spacing.medium,
  },
})
