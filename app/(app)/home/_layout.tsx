import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import HomeHeader from '../../../components/homeheader/homeHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontFamily } from '../../../styles/fontFamily';
import CardHeader from '../../../components/cardheader/cardHeader';

export default function _layout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        height: hp(10),
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: colors.primary,
        borderTopWidth: hp(0),
        paddingVertical: hp(1),
        paddingHorizontal: hp(3.5),
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: fontFamily.medium,
        fontWeight: "normal",
        marginBottom: 10,
      },
      tabBarActiveTintColor: colors.secondary,
      tabBarInactiveTintColor: colors.white,
    }}>
      {/* Tab home */}
      <Tabs.Screen
        name='index'
        options={{
          header: () => <HomeHeader />,
          title: "Home",
          tabBarIcon: ({ focused, size }) => {
            if (focused) {
              return <FontAwesome name="home" size={size} color={colors.secondary} />
            }
            return <FontAwesome name="home" size={size} color={colors.white} />
          },
        }}
      />

      {/* Tab tips */}
      <Tabs.Screen
        name='tips'
        options={{
          header: () => <HomeHeader />,
          title: "Dicas",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <FontAwesome5 name="brain" size={size} color={colors.secondary} />
            }
            return <FontAwesome5 name="brain" size={size} color={colors.white} />
          },
        }}
      />

      {/* Tab emergency */}
      <Tabs.Screen
        name='emergency'
        options={{
          header: () => <HomeHeader />,
          title: "Crise",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name="call" size={size} color={colors.secondary} />
            }
            return <Ionicons name="call" size={size} color={colors.white} />
          },
        }}
      />

      {/* Tab Profile */}
      <Tabs.Screen
        name='profile'
        options={{
          header: () => <HomeHeader />,
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <FontAwesome name="user" size={size} color={colors.secondary} />
            }
            return <FontAwesome name="user" size={size} color={colors.white} />
          },
        }}
      />

      {/* Tabs Cards */}
      <Tabs.Screen
        name='exercises'
        options={{
          header: () => <CardHeader />,
          href: null
        }} />

      <Tabs.Screen
        name='psychologists'
        options={{
          header: () => <CardHeader />,
          href: null
        }} />

      <Tabs.Screen
        name='videos'
        options={{
          header: () => <CardHeader />,
          href: null
        }} />

      <Tabs.Screen
        name='infopanel'
        options={{
          header: () => <CardHeader />,
          href: null
        }} />

   
    </Tabs>
  )
}