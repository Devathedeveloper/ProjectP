import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  // Sample user data (replace with real data)
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null, // Add image URL if available
  };

  const handleLogout = () => {
    // Implement logout logic here
    alert('Logged out');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {user.profileImage ? (
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>
              {user.fullName.charAt(0)}
            </Text>
          </View>
        )}
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.actionList}>
        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.actionText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Addresses')}>
          <Text style={styles.actionText}>Saved Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('PaymentMethods')}>
          <Text style={styles.actionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AccountSettings')}>
          <Text style={styles.actionText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('HelpSupport')}>
          <Text style={styles.actionText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 24,
    marginTop: 10,
  },
  email: {
    color: '#888',
    marginBottom: 20,
  },
  actionList: {
    // Optional styling
  },
  actionItem: {
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  actionText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default ProfileScreen;
