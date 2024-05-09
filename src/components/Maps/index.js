import { mapskey } from "./../../utils/mapsKey";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import {
  requestForegroundPermissionsAsync, // Solicita a permissão de localização
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy, // Pega a posição atual do usuário
} from "expo-location";
import { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { ActivityIndicator, View } from "react-native";
import { Title } from "../Title";

export const Maps = ({ clinica }) => {
  const mapsReference = useRef(null);

  const [initialPosition, setInitialPosition] = useState(null);
  const finalPosition = {
    latitude: clinica.endereco.latitude,
    longitude: clinica.endereco.longitude,
  };

  async function CapturarLocalizacao() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      setInitialPosition(currentPosition);
    }
  }

  async function RecarregarVisualizacaoMapa() {
    if (mapsReference.current) {
      await mapsReference.current.fitToCoordinates(
        [
          {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude,
          },
          {
            latitude: finalPosition.latitude,
            longitude: finalPosition.longitude,
          },
        ],
        {
          edgePadding: {
            top: 60,
            right: 60,
            bottom: 60,
            left: 60,
          },
          animated: true,
        }
      );
    }
  }

  useEffect(() => {
    CapturarLocalizacao();

    // Capturar localização em tempo real
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      async (response) => {
         setInitialPosition(response);

        mapsReference.current.animateCamera({
          pitch: 60,
          center: response.coords,
        });
      }
    );
  }, [1000]);

  useEffect(() => {
    RecarregarVisualizacaoMapa();
  }, [initialPosition]);

  return initialPosition != null ? (
    <MapView
      ref={mapsReference}
      style={{
        flex: 1,
        width: "100%",
        minHeight: 300,
        maxHeight: 300,
        height: "100%",
      }}
      initialRegion={{
        latitude: finalPosition.latitude,
        longitude: finalPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={PROVIDER_GOOGLE}
    >
      {/* Criando um marcador no mapa */}
      <Marker
        coordinate={{
          latitude: finalPosition.latitude,
          longitude: finalPosition.longitude,
        }}
        title="Senai Paulo Skaf"
        description="Melhor escola de tecnologia do Brasil"
        pinColor="purple"
      />

      <MapViewDirections
        origin={initialPosition.coords}
        destination={{
          latitude: finalPosition.latitude,
          longitude: finalPosition.longitude,
        }}
        apikey={mapskey}
        strokeWidth={5}
        strokeColor="purple"
      />
    </MapView>
  ) : (
    <View style={{ height: 300 }}>
      <Title text="Localização não encontrada" />

      <ActivityIndicator size={64} />
    </View>
  );
};