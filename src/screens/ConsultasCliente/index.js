import moment from "moment";
import { ContainerScroll } from "../../components/Container";
import { HeaderConsultas } from "./../../components/HeaderConsultas/index";
import CalendarStrip from "react-native-calendar-strip";

export const ConsultasCliente = ({ navigation }) => {
  return (
    <ContainerScroll
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
        marginHorizontal: "5%",
      }}
    >
      <HeaderConsultas
        image={require("./../../assets/img/UserImage.jpg")}
        nome={"Romário"}
      />
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        style={{ height: 80, width: "100%" }}
        scrollerPaging
        scrollable
        selectedDate={moment()}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: "white",
        }}
        // locale={"pt"}
        highlightDateContainerStyle={{ backgroundColor: "#60BFC5" }}
        calendarHeaderStyle={{ alignSelf: "flex-start", color: "black", fontSize: 16 }}
        iconLeftStyle={{display: "none"}}
        iconRightStyle={{display: "none"}}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
        disabledDateNameStyle={{ color: "grey" }}
        disabledDateNumberStyle={{ color: "grey" }}
        iconContainer={{ flex: 0.1 }}
      />
    </ContainerScroll>
  );
};
