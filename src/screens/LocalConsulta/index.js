import styled from "styled-components/native";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title/index";
import { Subtitle } from "../../components/Subtitle/index";
import { Input } from "../../components/Input/index";
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
import { ActivityIndicator } from "react-native";

const MapsImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 50px;
`;

export const LocalConsulta = () => {
  const mapsReference = useRef(null);

  const [initialPosition, setInitialPosition] = useState(null);
  const finalPosition = {
    latitude: -23.686959,
    longitude: -46.44311019,
  };

  async function CapturarLocalizacao() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      await setInitialPosition(currentPosition);
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
        await setInitialPosition(response);

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

  return (
    <>
      {initialPosition != null ? (
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
          customMapStyle={grayMapStyle}
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
        <>
          <Title text="Localização não encontrada" />

          <ActivityIndicator size={64} />
        </>
      )}
      <ContainerScroll contentContainerStyle={{ paddingBottom: 20 }}>
        <ContainerSpacing style={{ paddingTop: 20 }}>
          <Title text="Clinica" />
          <Subtitle text="São Paulo, SP" />
          <Input
            border={false}
            label="Endereço"
            inputValue="Rua Vicenso Silva, 987"
          />
          <Input border={false} label="Número" inputValue="578" />
          <Input border={false} label="Bairro" inputValue="Moema-SP" />
        </ContainerSpacing>
      </ContainerScroll>
    </>
  );
};

const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
];
