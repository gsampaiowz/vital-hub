import { Modal } from "react-native"
import styled from "styled-components/native";
import { Subtitle } from "../Subtitle";
import { Button } from "../Button";
import { Group } from "../Group";

const SairContaModal = styled.View`
flex: 1;
height: 100%;
width: 100%;
position: absolute;
background-color: rgba(0, 0, 0, 0.5);

align-items: center;
justify-content: center;

`;

const ModalContent = styled.View`
  width: 90%;
  gap: 20px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;

  align-items: center;
`;

export const ModalSairConta = ({
    setShowModalSairConta,
    navigation,
    visible = false,
    Logout,
    ...rest
}) => {
    return (
        <Modal {...rest} transparent visible={visible} animationType="fade">
            <SairContaModal>
                <ModalContent>
                    <Subtitle text="Tem certeza que deseja sair da sua Conta?"></Subtitle>

                    <Group row={window.innerHeight <= 350 ? false : true}>
                        {/* BOTÃO PARA SAIR DO MODAL */}
                        <Button outlined text="Cancelar"  onPress = {() => setShowModalSairConta(false)}></Button>
                        {/* BOTÃO PARA SAIR DA CONTA */}
                        <Button text="Sair" onPress={() => Logout()}></Button>
                    </Group>
                </ModalContent>
            </SairContaModal>
        </Modal>
    )
}