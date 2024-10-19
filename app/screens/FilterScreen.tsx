import React, { useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  ScrollView,
  Switch,
} from "react-native"
import { colors, spacing } from "../theme"

interface FilterCategory {
  id: number
  name: string
  options: string[]
}

const filterCategories: FilterCategory[] = [
  {
    id: 1,
    name: "Suggested Filters",
    options: ["Artificial", "Indoor", "Live", "Pots", "Cactus", "Bamboo", "Food", "Stand", "Home Decoration", "Aparajita"],
  },
  {
    id: 2,
    name: "Prime & Delivery",
    options: ["Prime Eligible", "Free Delivery"],
  },
  {
    id: 3,
    name: "Customer Reviews",
    options: ["4 Stars & Up", "3 Stars & Up", "2 Stars & Up", "1 Star & Up"],
  },
  {
    id: 4,
    name: "Price and Deals",
    options: ["Under $1000", "Today's Deals"],
  },
  {
    id: 5,
    name: "Categories",
    options: ["Indoor Plants", "Outdoor Plants", "Herbs", "Flowers"],
  },
  // Add more filter categories as needed
]

export const FilterScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [primeEnabled, setPrimeEnabled] = useState<boolean>(false)

  const handleCategoryPress = (id: number) => {
    setSelectedCategory(id)
  }

  const renderLeftMenuItem = ({ item }: { item: FilterCategory }) => (
    <TouchableOpacity
      style={[
        styles.leftMenuItem,
        selectedCategory === item.id && styles.selectedLeftMenuItem,
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Text style={styles.leftMenuText}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        {/* Left Side Menu */}
        <FlatList
          data={filterCategories}
          renderItem={renderLeftMenuItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.leftMenu}
          showsVerticalScrollIndicator={false}
        />

        {/* Right Side Content */}
        <View style={styles.rightContent}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.filterOptionsContainer}>
            {selectedCategory === 1 && (
              <View>
                <View style={styles.primeSwitchContainer}>
                  <Text style={styles.primeText}>Prime</Text>
                  <Switch
                    value={primeEnabled}
                    onValueChange={(value) => setPrimeEnabled(value)}
                    trackColor={{ false: "#ddd", true: colors.palette.primary }}
                    thumbColor={primeEnabled ? "#fff" : "#888"}
                  />
                </View>
                {filterCategories[0].options.map((option, index) => (
                  <TouchableOpacity key={index} style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedCategory === 2 && (
              <View>
                {filterCategories[1].options.map((option, index) => (
                  <TouchableOpacity key={index} style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedCategory === 3 && (
              <View>
                {filterCategories[2].options.map((option, index) => (
                  <TouchableOpacity key={index} style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedCategory === 4 && (
              <View>
                {filterCategories[3].options.map((option, index) => (
                  <TouchableOpacity key={index} style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedCategory === 5 && (
              <View>
                {filterCategories[4].options.map((option, index) => (
                  <TouchableOpacity key={index} style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftMenu: {
    width: "30%",
    backgroundColor: "#f0f0f0",
  },
  leftMenuItem: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  selectedLeftMenuItem: {
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: colors.palette.primary,
  },
  leftMenuText: {
    fontSize: 12,
    color: "#333",
  },
  rightContent: {
    // flex: 1,
    backgroundColor: "#fff",
    width: "70%",
  },
  filterOptionsContainer: {
    paddingHorizontal: spacing.medium,
  },
  filterOption: {
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  filterOptionText: {
    fontSize: 12,
    color: "#333",
  },
  primeSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: spacing.large,
  },
  primeText: {
    fontSize: 18,
    color: colors.palette.primary,
    fontWeight: "bold",
  },
})
