import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Text, Button, TextField } from "../components";
import { Ionicons } from '@expo/vector-icons';
import { spacing, colors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from '@shopify/flash-list';

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
];

export const CartScreen = () => {
  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleRemoveItem = (productId: number) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: () => setCartItems(cartItems.filter((item) => item.product.id !== productId)),
      },
    ]);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

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
  );

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
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
        RightAccessory={() => <Ionicons name="qr-code-sharp" size={20} color="#888" style={styles.qrCodeIcon} />}
      />

      <FlashList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>
              Subtotal ({cartItems.length} items):{" "}
              <Text style={styles.subtotalAmount}>${subtotal}</Text>
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Button
              text="Proceed to Checkout"
              style={styles.checkoutButton}
              textStyle={styles.checkoutButtonText}
              onPress={() => Alert.alert("Proceeding to checkout")}
            />
          </View>
        )}
        contentContainerStyle={styles.cartItemsContainer}
        estimatedItemSize={150} // Adjust based on the average height of your items
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  actionSeparator: {
    color: "#565959",
    marginHorizontal: spacing.small,
  },
  actionText: {
    color: "#007185",
    fontSize: 14,
  },
  actionsContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  availabilityText: {
    color: "#007600",
    fontSize: 14,
    marginBottom: spacing.tiny,
  },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: spacing.medium,
    padding: spacing.medium,
  },
  cartItemsContainer: {
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
  },
  checkoutButton: {
    backgroundColor: "#FFD814",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
  checkoutButtonText: {
    color: "#0F1111",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#EAEDED",
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.large,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    marginBottom: spacing.large,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#fff",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    padding: spacing.medium,
  },
  itemRow: {
    flexDirection: "row",
  },
  productDetails: {
    flex: 1,
  },
  productImage: {
    backgroundColor: "#f0f0f0",
    height: 100,
    marginRight: spacing.medium,
    width: 100,
  },
  productName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: spacing.tiny,
  },
  productPrice: {
    color: "#B12704",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: spacing.small,
  },
  qrCodeIcon: {
    marginRight: spacing.sm,
  },
  quantityButton: {
    borderColor: "#A6A6A6",
    borderWidth: 1,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
  },
  quantityButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  quantityContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: spacing.small,
  },
  quantityText: {
    color: colors.text,
    fontSize: 16,
    marginHorizontal: spacing.medium,
  },
  searchInput: {
    // Style for search input
  },
  searchWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    marginHorizontal: spacing.sm,
    paddingHorizontal: spacing.medium,
  },
  sellerText: {
    color: "#565959",
    fontSize: 14,
    marginBottom: spacing.tiny,
  },
  shopDealsButton: {
    backgroundColor: "#FFD814",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: spacing.huge,
  },
  subtotalAmount: {
    color: "#B12704",
    fontWeight: "bold",
  },
  subtotalContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
  },
  subtotalText: {
    color: colors.text,
    fontSize: 18,
  },
})
// Styles remain the same as previously defined
