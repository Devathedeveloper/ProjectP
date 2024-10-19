// app/screens/product-listing-screen.tsx

import React, { useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../components"
import { spacing, colors } from "../theme"
import { AntDesign, Feather } from "@expo/vector-icons"
import { FilterScreen } from "./FilterScreen" // Import the FilterScreen component

interface Product {
  id: number
  name: string
  category: string
  price: string
  originalPrice?: string
  imageUrl: string | ImageSourcePropType
  rating: number
  isFavorite: boolean
  description: string
  availability: string
  deliveryDate: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Dasheri Mango",
    category: "Dasheri",
    price: "$29.99",
    originalPrice: "$39.99",
    imageUrl: "https://via.placeholder.com/120x120.png?text=Dasheri+Mango",
    rating: 4.5,
    isFavorite: false,
    description: "Sweet and aromatic mangoes from India.",
    availability: "In Stock",
    deliveryDate: "Get it by Tomorrow, Oct 20",
  },
  {
    id: 2,
    name: "Japanese Mango",
    category: "Japanese",
    price: "$49.99",
    originalPrice: "$59.99",
    imageUrl: "https://via.placeholder.com/120x120.png?text=Japanese+Mango",
    rating: 4.0,
    isFavorite: true,
    description: "Premium mangoes with exceptional taste.",
    availability: "Only 5 left in stock - order soon.",
    deliveryDate: "Get it by Monday, Oct 23",
  },
  {
    id: 3,
    name: "Chilli Mango",
    category: "Chilli",
    price: "$19.99",
    originalPrice: "$24.99",
    imageUrl: "https://via.placeholder.com/120x120.png?text=Chilli+Mango",
    rating: 4.8,
    isFavorite: false,
    description: "A spicy twist to the classic mango flavor.",
    availability: "In Stock",
    deliveryDate: "Get it by Tomorrow, Oct 20",
  },
  {
    id: 4,
    name: "Miyazaki Mango",
    category: "Miyazaki",
    price: "$99.99",
    originalPrice: "$129.99",
    imageUrl: "https://via.placeholder.com/120x120.png?text=Miyazaki+Mango",
    rating: 4.9,
    isFavorite: true,
    description: "World's most expensive mango from Japan.",
    availability: "In Stock",
    deliveryDate: "Get it by Sunday, Oct 22",
  },
  // Add more products as needed
]

const filterTags = [
  "Dasheri",
  "Japanese",
  "Katimon",
  "Chilli",
  "Miyazaki",
  "Banginapalli",
  "Hapus",
  "Artificial",
]

export const ProductListingScreen: React.FC = observer(function ProductListingScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState<"priceLowToHigh" | "priceHighToLow" | "rating">(
    "priceLowToHigh",
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterAndSortProducts(query, selectedTag, sortOption)
  }

  const handleTagPress = (tag: string) => {
    const newTag = tag === selectedTag ? "" : tag
    setSelectedTag(newTag)
    filterAndSortProducts(searchQuery, newTag, sortOption)
  }

  const handleSort = (option: "priceLowToHigh" | "priceHighToLow" | "rating") => {
    setSortOption(option)
    filterAndSortProducts(searchQuery, selectedTag, option)
  }

  const filterAndSortProducts = (
    query: string,
    tag: string,
    sortOption: "priceLowToHigh" | "priceHighToLow" | "rating",
  ) => {
    let filtered = products

    // Filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Filter by tag
    if (tag) {
      filtered = filtered.filter((product) => product.category === tag)
    }

    // Sort products
    if (sortOption === "priceLowToHigh") {
      filtered.sort(
        (a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")),
      )
    } else if (sortOption === "priceHighToLow") {
      filtered.sort(
        (a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")),
      )
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <AntDesign
              key={index}
              name={index < Math.floor(item.rating) ? "star" : "staro"}
              size={14}
              color="#FFA41C"
            />
          ))}
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
        {item.originalPrice && (
          <Text style={styles.discountText}>
            You Save: {calculateDiscount(item.originalPrice, item.price)}%
          </Text>
        )}
        <Text style={styles.deliveryText}>{item.deliveryDate}</Text>
        <Text style={styles.availabilityText}>{item.availability}</Text>
        <Text style={styles.productDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            // Handle add to cart action (static for now)
            console.log(`Added to cart: ${item.name}`)
          }}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  // Helper function to calculate discount percentage
  const filterTags = ["Artificial", "Live", "Cactus", "Food", "Home Decor", "Indoor", "Pots", "Bamboo", "Stand", "Aparajita"]

  const calculateDiscount = (originalPrice: string, salePrice: string) => {
    const original = parseFloat(originalPrice.replace("$", ""))
    const sale = parseFloat(salePrice.replace("$", ""))
    const discount = ((original - sale) / original) * 100
    return discount.toFixed(0)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar and Filter */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search products"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <AntDesign name="close" size={20} color="#888" style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tags */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTagsContent}
        >
          <TouchableOpacity
            key={"tag"}
            style={styles.filterTag}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filterTagText}>{"Filter"}</Text>
          </TouchableOpacity>
          {filterTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.filterTag, selectedTag === tag && styles.selectedFilterTag]}
              onPress={() => handleTagPress(tag)}
            >
              <Text
                style={[styles.filterTagText, selectedTag === tag && styles.selectedFilterTagText]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filter Options */}
      {showFilters && (
        <View style={styles.filterOptionsContainer}>
          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => handleSort("priceLowToHigh")}
          >
            <Text
              style={[
                styles.filterOptionText,
                sortOption === "priceLowToHigh" && styles.selectedFilterOptionText,
              ]}
            >
              Price: Low to High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => handleSort("priceHighToLow")}
          >
            <Text
              style={[
                styles.filterOptionText,
                sortOption === "priceHighToLow" && styles.selectedFilterOptionText,
              ]}
            >
              Price: High to Low
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption} onPress={() => handleSort("rating")}>
            <Text
              style={[
                styles.filterOptionText,
                sortOption === "rating" && styles.selectedFilterOptionText,
              ]}
            >
              Rating
            </Text>
          </TouchableOpacity>
        </View>
      )}
<Modal visible={showFilters} animationType="slide">
        <FilterScreen />
        <TouchableOpacity
          style={styles.closeModalButton}
          onPress={() => setShowFilters(false)}
        >
          <Text style={styles.closeModalButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  addToCartButton: {
    alignItems: "center",
    backgroundColor: "#FFD814",
    borderRadius: 5,
    marginTop: spacing.small,
    paddingVertical: spacing.tiny,
  },
  addToCartButtonText: {
    color: "#0F1111",
    fontSize: 14,
    fontWeight: "bold",
  },
  availabilityText: {
    color: "#007600",
    fontSize: 12,
    marginVertical: spacing.tiny,
  },
  clearIcon: {
    marginLeft: spacing.small,
  },
  closeModalButton: {
    backgroundColor: colors.palette.primary,
    borderRadius: 10,
    bottom: 20,
    left: "50%",
    padding: spacing.medium,
    position: "absolute",
    transform: [{ translateX: -50 }],
  },
  closeModalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  deliveryText: {
    color: "#555",
    fontSize: 12,
    marginTop: spacing.tiny,
  },
  discountText: {
    color: "#B12704",
    fontSize: 12,
    marginTop: spacing.tiny,
  },
  filterButton: {
    alignItems: "center",
    backgroundColor: colors.palette.primary,
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: spacing.tiny,
  },
  filterOption: {
    paddingVertical: spacing.small,
  },
  filterOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  filterOptionsContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  filterSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  filterTag: {
    backgroundColor: "#eef1f4",
    borderRadius: 20,
    marginRight: spacing.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.tiny,
  },
  filterTagText: {
    color: "#555",
    fontSize: 14,
  },
  filterTagsContainer: {
    backgroundColor: "#fff",
    paddingVertical: spacing.small,
  },
  filterTagsContent: {
    paddingHorizontal: spacing.medium,
  },
  listContent: {
    paddingBottom: spacing.large,
    paddingHorizontal: spacing.medium,
  },
  originalPrice: {
    color: "#555",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  priceContainer: {
    alignItems: "baseline",
    flexDirection: "row",
  },
  productDescription: {
    color: "#555",
    fontSize: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: spacing.small,
  },
  productImage: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    height: 120,
    width: 120,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: spacing.small,
    borderRadius: 5,
    overflow: "hidden",
    elevation: 1, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
  },
  productName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#B12704",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: spacing.tiny,
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: spacing.tiny,
  },
  ratingText: {
    color: "#555",
    fontSize: 12,
    marginLeft: spacing.tiny,
  },
  searchContainer: {
    alignItems: "center",
    backgroundColor: "#eef1f4",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    marginRight: spacing.small,
    paddingHorizontal: spacing.small,
  },
  searchFilterContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  searchIcon: {
    marginRight: spacing.small,
  },
  searchInput: {
    color: "#000",
    flex: 1,
    height: 40,
  },
  selectedFilterOptionText: {
    color: colors.palette.primary,
    fontWeight: "bold",
  },
  selectedFilterTag: {
    backgroundColor: colors.palette.primary,
  },
  selectedFilterTagText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    height: spacing.medium,
  },
})
