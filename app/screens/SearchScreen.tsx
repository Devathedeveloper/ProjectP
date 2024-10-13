// app/screens/search-screen.tsx

import React, { useState } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native"
import { Text } from "../components"
import Icon from "react-native-vector-icons/Feather"
import { spacing, colors } from "../theme"

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 29.99,
    imageUrl: "https://example.com/product1.jpg",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 19.99,
    imageUrl: "https://example.com/product2.jpg",
    rating: 4.0,
    reviews: 85,
  },
  // Add more products as needed
]

export const SearchScreen = () => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      const filteredResults = DUMMY_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredResults)
      setLoading(false)
    }, 500) // Simulate a network request
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFA41C" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.primeText}>Prime</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => alert("Back to previous screen")}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Results */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.palette.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            query.length > 0 && (
              <View style={styles.emptyContainer}>
                <Text>No results found for "{query}"</Text>
              </View>
            )
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.palette.primary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    paddingTop:60
  },
  searchInput: {
    flex: 1,
    marginHorizontal: spacing.small,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: spacing.small,
    height: 40,
    color: colors.text,
  },
  loader: {
    marginTop: spacing.large,
  },
  resultsList: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  productItem: {
    flexDirection: "row",
    marginBottom: spacing.medium,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
  },
  productInfo: {
    flex: 1,
    padding: spacing.small,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.tiny,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.tiny,
  },
  ratingText: {
    fontSize: 14,
    color: "#FFA41C",
    marginLeft: spacing.tiny,
  },
  reviewsText: {
    fontSize: 14,
    color: "#565959",
    marginLeft: spacing.tiny,
  },
  productPrice: {
    fontSize: 16,
    color: "#B12704",
    fontWeight: "bold",
    marginBottom: spacing.tiny,
  },
  primeText: {
    fontSize: 12,
    color: "#00A8E1",
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: spacing.large,
  },
})
