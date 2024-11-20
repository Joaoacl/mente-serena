import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import HomeHeader from '../../../components/homeheader/homeHeader';
import { colors } from '../../../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontFamily } from '../../../styles/fontFamily';

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: hp(10), 
          borderTopRightRadius: wp(8),
          borderTopLeftRadius: wp(8),
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          paddingVertical: hp(1.5), 
          paddingHorizontal: wp(5), 
        },
        tabBarLabelStyle: {
          fontSize: wp(3.5), 
          fontFamily: fontFamily.medium,
          fontWeight: 'normal',
          marginBottom: hp(1), 
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.white,
      }}
    >
      {/* Tab Home */}
      <Tabs.Screen
        name='index'
        options={{
          header: () => <HomeHeader />,
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Entypo name="home" size={wp(5)} color={focused ? colors.secondary : colors.white} />
          ),
        }}
      />

      {/* Tab Tips */}
      <Tabs.Screen
        name='tips'
        options={{
          header: () => <HomeHeader />,
          title: 'Dicas',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="brain" size={wp(5)} color={focused ? colors.secondary : colors.white} />
          ),
        }}
      />

      {/* Tab Emergency */}
      <Tabs.Screen
        name='emergency'
        options={{
          header: () => <HomeHeader />,
          title: 'Crise',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="call" size={wp(5)} color={focused ? colors.secondary : colors.white} />
          ),
        }}
      />

      {/* Tab Profile */}
      <Tabs.Screen
        name='profile'
        options={{
          header: () => <HomeHeader />,
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={wp(5)} color={focused ? colors.secondary : colors.white} />
          ),
        }}
      />
    </Tabs>
  );
}
