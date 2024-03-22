import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ConsultasPaciente } from "./../ConsultasPaciente/index";
import { PacientePerfil } from "./../PacientePerfil/index";
import { ContentIcon, TextIcon } from "./style";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export const Main = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      initialRouteName="ConsultasPaciente"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#fff", height: 80, paddingTop: 10 },
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "ConsultasPaciente") {
            return (
              <>
                <ContentIcon
                  tabBarActiveBackgroundColor={
                    focused ? "#ecf2ff" : "transparent"
                  }
                >
                  <FontAwesome name="calendar" size={18} color="#4e4b59" />
                  {focused && <TextIcon>Agenda</TextIcon>}
                </ContentIcon>
              </>
            );
          } else {
            return (
                <>
                  <ContentIcon
                    tabBarActiveBackgroundColor={
                      focused ? "#ecf2ff" : "transparent"
                    }
                  >
                    <FontAwesome name="user-circle" size={18} color="#4e4b59" />
                    {focused && <TextIcon>Perfil</TextIcon>}
                  </ContentIcon>
                </>
              );
          }
        },
      })}
    >
      <BottomTab.Screen
        name="ConsultasPaciente"
        component={ConsultasPaciente}
      />
      <BottomTab.Screen name="PacientePerfil" component={PacientePerfil} />
    </BottomTab.Navigator>
  );
};
