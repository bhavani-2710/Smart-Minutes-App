import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const CustomHeader = ({ title = "Title", style = {} }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white',
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        ...style,
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color="#071952" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 16 }} className="text-[#071952] text-center">
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
