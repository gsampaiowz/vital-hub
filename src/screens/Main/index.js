import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./../Home/index";
import { ContentIcon, TextIcon } from "./style";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Perfil } from "../Perfil";

export const Main = () => {
  //NAVEGADOR DE TELAS INFERIOR
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#fff", height: 80, paddingTop: 10 },
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
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
        name="Home"
        component={Home}
      />
      <BottomTab.Screen name="Perfil" component={Perfil} />
    </BottomTab.Navigator>
  );
};
