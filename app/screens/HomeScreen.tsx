// app/screens/home-screen.tsx

import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native"
import { Header, Text, TextField } from "../components"
import { useNavigation } from "@react-navigation/native"
import { spacing, colors } from "../theme"
import { useStores } from "../models"
import Icon from "react-native-vector-icons/Feather"

const { width } = Dimensions.get("window")

export const HomeScreen: React.FC<any> = observer(function HomeScreen() {
  const navigation = useNavigation()
  // const { productStore } = useStores()

  // useEffect(() => {
  //   productStore.fetchHomeData()
  // }, [])

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("productList", { categoryId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <Header
        title={"Home"}
        leftIcon="menu"
        leftIconColor={"red"}
        onLeftPress={() => navigation.goBack()}
        // onRightPress={() => Alert.alert("pressed")}
        style={{ height: 25 }}
        backgroundColor=""
        titleStyle={{ color: colors.text, textAlign: "left" }}
        // titleContainerStyle={{alignContent:"flex-start"}}
        rightIcon="settings"
        onRightPress={() => navigation.navigate("cart")}
      />

      <ScrollView>
        {/* Promotional Banners */}
        <View style={styles.bannerContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {[
              {
                id: 1,
                imageUrl: "https://via.placeholder.com/1000x200",
              },
              {
                id: 2,
                imageUrl: "https://via.placeholder.com/1000x200",
              },
              {
                id: 3,
                imageUrl: "https://via.placeholder.com/1000x200",
              },
              {
                id: 4,
                imageUrl: "https://via.placeholder.com/1000x200",
              },
              {
                id: 5,
                imageUrl: "https://via.placeholder.com/1000x200",
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate("promotion", { id: item.id })}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <FlatList
            data={[
              {
                id: 1,
                name: "Category 1",
                imageUrl: "https://via.placeholder.com/80",
              },
              {
                id: 2,
                name: "Category 2",
                imageUrl: "https://via.placeholder.com/80",
              },
              {
                id: 3,
                name: "Category 3",
                imageUrl: "https://via.placeholder.com/80",
              },
              {
                id: 4,
                name: "Category 4",
                imageUrl: "https://via.placeholder.com/80",
              },
              {
                id: 5,
                name: "Category 5",
                imageUrl: "https://via.placeholder.com/80",
              },
            ]}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={[
              {
                id: 1,
                name: "Product 1",
                imageUrl: "https://via.placeholder.com/100",
                price: 100,
              },
              {
                id: 2,
                name: "Product 2",
                imageUrl: "https://via.placeholder.com/100",
                price: 150,
              },
              {
                id: 3,
                name: "Product 3",
                imageUrl: "https://via.placeholder.com/100",
                price: 200,
              },
              {
                id: 4,
                name: "Product 4",
                imageUrl: "https://via.placeholder.com/100",
                price: 250,
              },
              {
                id: 5,
                name: "Product 5",
                imageUrl: "https://via.placeholder.com/100",
                price: 300,
              },
            ]}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          />
        </View>

        {/* Recommended for You */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={[
              {
                id: 1,
                name: "Product 1",
                imageUrl: "https://via.placeholder.com/100",
                price: 100,
              },
              {
                id: 2,
                name: "Product 2",
                imageUrl: "https://via.placeholder.com/100",
                price: 150,
              },
              {
                id: 3,
                name: "Product 3",
                imageUrl: "https://via.placeholder.com/100",
                price: 200,
              },
              {
                id: 4,
                name: "Product 4",
                imageUrl: "https://via.placeholder.com/100",
                price: 250,
              },
              {
                id: 5,
                name: "Product 5",
                imageUrl: "https://via.placeholder.com/100",
                price: 300,
              },
            ]}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.palette.primary,
    alignItems: "center",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: spacing.small,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: spacing.small,
    height: 40,
  },
  searchWrapper: {
    borderBottomWidth: 0,
  },
  bannerContainer: {
    marginTop: spacing.small,
  },
  bannerImage: {
    width: width,
    height: 200,
    resizeMode: "cover",
  },
  section: {
    marginTop: spacing.large,
  },
  sectionTitle: {
    marginHorizontal: spacing.medium,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  categoryList: {
    paddingHorizontal: spacing.small,
    marginTop: spacing.small,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: spacing.small,
    width: 80,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
  },
  categoryText: {
    marginTop: spacing.tiny,
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
  },
  productList: {
    paddingHorizontal: spacing.small,
    marginTop: spacing.small,
  },
  productItem: {
    marginHorizontal: spacing.small,
    width: 140,
  },
  productImage: {
    width: "80%",
    height: 100,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  productName: {
    marginTop: spacing.tiny,
    fontSize: 14,
    color: colors.text,
  },
  productPrice: {
    fontSize: 12,
    color: "#888",
    // fontWeight: "bold",
  },
})
