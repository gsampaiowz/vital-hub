import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  AntDesign,
  Ionicons,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { Image } from "react-native";

const CloseCamera = styled(AntDesign)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

const ToggleCamera = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const TakePhoto = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -25px;
  z-index: 10;
`;
const FlashIcon = styled(Ionicons)`
  left: 50%;
  top: 10px;
  margin-left: -20px;
  z-index: 10;
`;

// const TakeVideo = styled(AntDesign)`
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   z-index: 10;
// `;

const LastPhoto = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`;

export const MyCamera = ({
  setIsPhotoSaved = () => {},
  setPhoto,
  setInCamera,
  setModalOpen,
  inCamera,
  getMediaLibrary = false,
}) => {
  const cameraRef = useRef(null);

  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const [zoom, setZoom] = useState(0);

  // const [isRecording, setIsRecording] = useState(false);

  const [type, setType] = useState(CameraType.back);

  const [lastPhoto, setLastPhoto] = useState(null);

  useEffect(() => {
    setPhoto(null);

    if (getMediaLibrary) {
      GetLatestPhoto();
    }
  }, [inCamera]);

  async function GetLatestPhoto() {
    const { assets } = await MediaLibrary.getAssetsAsync({
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      first: 1,
    });

    if (assets.length > 0) {
      setLastPhoto(assets[0].uri);
    }

    console.log(assets);
  }

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
    console.log(lastPhoto);
  }, []);

  async function CapturePhoto() {
    if (cameraRef) {
      const options = {
        quality: 1,
        isImageMirror: false,
      };

      const fotoTirada = await cameraRef.current.takePictureAsync(options);

      await setPhoto(fotoTirada.uri);

      setInCamera(false);
      setModalOpen(true);
      scrollTo(750, 0);
    }
  }

  async function SelectImageGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);

      setInCamera(false);
    }
  }

  const changeZoom = (event) => {
    if (event.nativeEvent.scale > 1 && zoom < 1) {
      setZoom(zoom + 0.1);
    }
    if (event.nativeEvent.scale < 1 && zoom > 0) {
      setZoom(zoom - 0.1);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
        <Camera
          autoFocus={Camera.Constants.AutoFocus.on}
          zoom={zoom}
          flashMode={flash}
          isIma
          ref={cameraRef}
          type={type}
          ratio="15:9"
          style={{
            flex: 1,
          }}
        >
          <CloseCamera
            name="closecircle"
            size={40}
            color="white"
            onPress={() => {
              setInCamera(false);
              setModalOpen(false);
            }}
          />
          <ToggleCamera
            onPress={() =>
              setType(
                type === CameraType.front ? CameraType.back : CameraType.front
              )
            }
          >
            <FontAwesome6 name="camera-rotate" size={40} color="white" />
          </ToggleCamera>
          <FlashIcon
            onPress={() =>
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : flash === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              )
            }
            name={
              flash === Camera.Constants.FlashMode.off
                ? "flash-off"
                : flash === Camera.Constants.FlashMode.torch
                ? "flashlight"
                : "flash"
            }
            size={40}
            color="white"
          />
          <TakePhoto
            onPress={() => {
              CapturePhoto();
              setIsPhotoSaved(false);
            }}
          >
            <FontAwesome name="camera" size={50} color="white" />
          </TakePhoto>
          {/* <TakeVideo
            onPress={() =>
              isRecording
                ? cameraRef.current.stopRecording()
                : cameraRef.current.recordAsync()
            }
            name="videocamera"
            size={24}
            color={isRecording ? "red" : "white"}
          /> */}
          {lastPhoto != null ? (
            <LastPhoto onPress={() => SelectImageGallery()}>
              <Image
                borderRadius={5}
                width={60}
                height={60}
                source={{ uri: lastPhoto }}
              />
            </LastPhoto>
          ) : null}
        </Camera>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};
