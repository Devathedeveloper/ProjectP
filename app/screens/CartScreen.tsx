// app/screens/cart-screen.tsx

import React, { useState } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native"
import { Text, Button, Header, TextField } from "../components"
import { Ionicons } from '@expo/vector-icons';
import { spacing, colors } from "../theme"
import { SafeAreaView } from "react-native-safe-area-context"

const DUMMY_CART_ITEMS = [
  {
    id: 1,
    product: {
      id: 1,
      name: "Monstera Deliciosa",
      price: 29.99,
      imageUrl: "https://example.com/product1.jpg",
      seller: "Plant Nursery",
      availability: "In Stock",
    },
    quantity: 1,
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "Snake Plant",
      price: 19.99,
      imageUrl: "https://example.com/product2.jpg",
      seller: "Green Thumb",
      availability: "In Stock",
    },
    quantity: 2,
  },
]

export const CartScreen = () => {
  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    // TODO: Implement search functionality
  }

  const handleRemoveItem = (productId: number) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: () => setCartItems(cartItems.filter((item) => item.product.id !== productId)),
      },
    ])
  }

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    )
  }

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemRow}>
        <Image source={{ uri: item.product.imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.sellerText}>Sold by {item.product.seller}</Text>
          <Text style={styles.availabilityText}>{item.product.availability}</Text>
          <Text style={styles.productPrice}>${item.product.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.product.id, Math.max(1, item.quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => Alert.alert("Save for later")}>
              <Text style={styles.actionText}>Save for later</Text>
            </TouchableOpacity>
            <Text style={styles.actionSeparator}>|</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.product.id)}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header should be search bar with search icon qr scan icon*/}
      <TextField
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoFocus={true}
        style={styles.searchInput}
        inputWrapperStyle={styles.searchWrapper}
        LeftAccessory={() => <Ionicons name="search" size={20} color="#888" />}
        RightAccessory={() => <Ionicons name="qr-code-sharp" size={20} color="#888" style={styles.qrCodeIcon}/>}
      />

      {cartItems.length > 0 ? (
        <>
          <ScrollView style={styles.cartList}>
            {/* Subtotal */}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>
                Subtotal ({cartItems.length} items):{" "}
                <Text style={styles.subtotalAmount}>${subtotal}</Text>
              </Text>
            </View>

            {/* Cart Items */}
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.product.id.toString()}
              contentContainerStyle={styles.cartItemsContainer}
            />
          </ScrollView>

          {/* Proceed to Checkout */}
          <View style={styles.footer}>
            <Button
              text="Proceed to Checkout"
              style={styles.checkoutButton}
              textStyle={styles.checkoutButtonText}
              onPress={() => Alert.alert("Proceeding to checkout")}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your Amazon Cart is empty.</Text>
          <Button
            text="Shop today's deals"
            style={styles.shopDealsButton}
            onPress={() => Alert.alert("Navigate to deals")}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    // height: 40,
    // borderWidth: 1,
    // borderColor: "#ddd",
    // borderRadius: 5,

    // marginTop: spacing.medium,
  },
  qrCodeIcon: {
    marginRight: spacing.sm,
  },
  searchWrapper: {
    borderWidth: 1,
    paddingHorizontal: spacing.medium,
    marginHorizontal: spacing.sm,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    // borderWidth: 1,
    // borderColor: "#ddd",
    // borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#EAEDED",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  cartList: {
    flex: 1,
  },
  subtotalContainer: {
    backgroundColor: "#fff",
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  subtotalText: {
    fontSize: 18,
    color: colors.text,
  },
  subtotalAmount: {
    fontWeight: "bold",
    color: "#B12704",
  },
  cartItemsContainer: {
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
  },
  cartItem: {
    backgroundColor: "#fff",
    marginBottom: spacing.medium,
    padding: spacing.medium,
    borderRadius: 5,
  },
  itemRow: {
    flexDirection: "row",
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
    marginRight: spacing.medium,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.tiny,
  },
  sellerText: {
    fontSize: 14,
    color: "#565959",
    marginBottom: spacing.tiny,
  },
  availabilityText: {
    fontSize: 14,
    color: "#007600",
    marginBottom: spacing.tiny,
  },
  productPrice: {
    fontSize: 16,
    color: "#B12704",
    fontWeight: "bold",
    marginBottom: spacing.small,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.small,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
  },
  quantityButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  quantityText: {
    marginHorizontal: spacing.medium,
    fontSize: 16,
    color: colors.text,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: "#007185",
  },
  actionSeparator: {
    marginHorizontal: spacing.small,
    color: "#565959",
  },
  footer: {
    padding: spacing.medium,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  checkoutButton: {
    backgroundColor: "#FFD814",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
  checkoutButtonText: {
    fontSize: 18,
    color: "#0F1111",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.large,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.large,
    textAlign: "center",
  },
  shopDealsButton: {
    backgroundColor: "#FFD814",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: spacing.huge,
  },
})
