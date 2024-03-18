import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { MediaLibrary } from "expo-media-library";
import styled from "styled-components/native";
import {
  AntDesign,
  Ionicons,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";

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

const TakeVideo = styled(AntDesign)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`;

export const MyCamera = ({ setIsPhotoSaved, setPhoto }) => {
  const cameraRef = useRef(null);

  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const [zoom, setZoom] = useState(0);

  const [isRecording, setIsRecording] = useState(false);

  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  async function CapturePhoto() {
    if (cameraRef) {
      const options = {
        quality: 1,
        isImageMirror: false,
      };

      const fotoTirada = await cameraRef.current.takePictureAsync(options);

      await setPhoto(fotoTirada.uri);

      console.log(fotoTirada);

      setInCamera(false);
      setModalOpen(true);
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
            color="#49B3BA"
            onPress={() => setInCamera(false)}
          />
          <ToggleCamera
            onPress={() =>
              setType(
                type === CameraType.front ? CameraType.back : CameraType.front
              )
            }
          >
            <FontAwesome6 name="camera-rotate" size={40} color="#49B3BA" />
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
            color="#49B3BA"
          />
          <TakePhoto
            onPress={() => {
              CapturePhoto();
              setIsPhotoSaved(false);
            }}
          >
            <FontAwesome name="camera" size={50} color="#49B3BA" />
          </TakePhoto>
          <TakeVideo
            onPress={() =>
              isRecording
                ? cameraRef.current.stopRecording()
                : cameraRef.current.recordAsync()
            }
            name="videocamera"
            size={24}
            color={isRecording ? "red" : "#49B3BA"}
          />
        </Camera>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};
