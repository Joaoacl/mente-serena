import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/authContext'

export default function Profile() {

  const { logout, user } = useAuth()
  const handleLogout = async () => {
    await logout()
  }
  
  return (
    <View>
      <Text>Profile</Text>
      <View className='mt-20'>
        <Pressable onPress={handleLogout}>
          <Text>Sair</Text>
        </Pressable>
      </View>
    </View>
  )
}