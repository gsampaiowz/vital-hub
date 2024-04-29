import { useState } from "react";

import { Calendar, LocaleConfig } from "react-native-calendars";

const CalendarComponent = ({
  data,
  selected,
  setSelected,
  setDataSelecionada,
  dataSelecionada,
}) => {
  LocaleConfig.locales["pt-br"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  };
  LocaleConfig.defaultLocale = "pt-br";

  return (
    <Calendar
      style={{
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#FAFAFA",
      }}
      onDayPress={(date) => setDataSelecionada(date.dateString)}
      current={data.toString()}
      markedDates={{
        [dataSelecionada]: {
          selected: true,
          disableTouchEvent: true,
        },
      }}
      minDate={data.toString()}
      theme={{
        calendarBackground: "#FAFAFA",
        arrowColor: "#49B3BA",
        textDisabledColor: "#C6C5CE",
        todayTextColor: "#5F5C6B",
        selectedDayTextColor: "#FAFAFA",
        selectedDayBackgroundColor: "#60BFC5",
        textSectionTitleColor: "#5F5C6B",

        textDayFontSize: 16,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 12,

        textDayStyle: { color: "#5F5C6B" },
        textDayFontFamily: "Quicksand_600SemiBold",
        textDayHeaderFontFamily: "Quicksand_600SemiBold",
        textMonthFontFamily: "MontserratAlternates_600SemiBold",
      }}
    />
  );
};

export default CalendarComponent;
