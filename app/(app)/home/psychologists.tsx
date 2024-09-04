import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Keyboard, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchPsychologists } from '../../../services/fetchPsychologists';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { colors } from '../../../styles/colors';


interface PsychologistMarker {
  name: string
  latitude: number
  longitude: number
  description: string
}

export default function Psychologists() {
  const [region, setRegion] = useState<Region | null>(null)
  const [markers, setMarkers] = useState<PsychologistMarker[]>([])

  //const [city, setCity] = useState<string>('')

  //Busca a localização atual do usúario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permissão para localização negada')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })

      const psychologists = await fetchPsychologists(location.coords)
      const newMarkers = psychologists.map((place) => ({
        name: place.name,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        description: place.vicinity,
      }))

      setMarkers(newMarkers)
    })()
  }, [])

  {/* 
  //Search psycologists from user input city
  const searchCity = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: city,
          key: 'api-key',
        },
      });

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        // Busca os psicólogos na nova região
        const psychologists = await fetchPsychologists(location);
        console.log('Psychologists near user location:', psychologists);
        const newMarkers = psychologists.map((place: any) => ({
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          description: place.vicinity,
        }));

        console.log('New markers based on user location:', newMarkers);
        setMarkers(newMarkers);
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error("Erro ao buscar a cidade:", error);
    }
  };
  */}

  return (
    <View className='flex-1 mt-1'>
      <Text style={{ fontSize: hp(2) }} className='font-Bold text-primary mb-2 text-center'>Psicólogos Próximos</Text>
      <Text style={{ fontSize: hp(1.7) }} className='font-regular text-primary mb-1 px-6 text-center'>Encontre Psicólogos Próximos de Você!</Text>
      {/* 
      <View className='flex-row mb-2 justify-between px-6 items-center'>
        <TextInput
          className='flex-1 border-primary border rounded-3xl px-4 mr-2 font-regular text-neutral-700'
          style={{ fontSize: hp(1.8), height: hp(5) }}
          placeholder="Digite sua cidade"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity onPress={searchCity}>
        <Ionicons name="search-sharp" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      */}
      <View className='flex-1 mb-6 mt-2' style={{borderRadius:20, overflow: 'hidden', }}>
        {region && (
          <MapView
            style={{ flex: 1 ,width: wp(100), height: hp(100) }}
            region={region}
            onRegionChangeComplete={region => setRegion(region)}
            showsUserLocation={true}
            minZoomLevel={15}
            loadingEnabled={true}
            zoomEnabled={true}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                description={marker.description}
              />
            ))}
          </MapView>
        )}
      </View>
    </View>
  )
}


