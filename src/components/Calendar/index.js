import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";

const calendarTextStyles = {
  color: "black",
  fontFamily: "Quicksand_600SemiBold",
};

export const Calendar = () => {
  const localeBrazil = {
    name: "pt-BR",
    config: {
      months:
        "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
          "_"
        ),
      monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
      weekdays:
        "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split(
          "_"
        ),
      weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
      weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY [às] LT",
        LLLL: "dddd, D [de] MMMM [de] YYYY [às] LT",
      },
      calendar: {
        sameDay: "[Hoje às] LT",
        nextDay: "[Amanhã às] LT",
        nextWeek: "dddd [às] LT",
        lastDay: "[Ontem às] LT",
        lastWeek: "dddd [da última semana às] LT",
        sameElse: "L",
      },
      relativeTime: {
        future: "em %s",
        past: "há %s",
        s: "segundos",
        m: "um minuto",
        mm: "%d minutos",
        h: "uma hora",
        hh: "%d horas",
        d: "um dia",
        dd: "%d dias",
        M: "um mês",
        MM: "%d meses",
        y: "um ano",
        yy: "%d anos",
      },
      ordinalParse: /\d{1,2}º/,
      ordinal: function (number) {
        return number + "º";
      },
      meridiemParse: /[AP]\/[M]\./,
      isPM: function (input) {
        return input.charAt(0) === "P";
      },
      meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? "AM" : "PM";
      },
      week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan  6th is the first week of the year.
      },
    },
  };

  return (
    <CalendarStrip
      style={{
        minHeight: 90,
        width: "100%",
      }}
      minDayComponentSize={45}
      maxDayComponentSize={50}
      scrollable
      selectedDate={moment()}
      locale={localeBrazil}
      highlightDateContainerStyle={{ backgroundColor: "#60BFC5" }}
      calendarHeaderStyle={{
        alignSelf: "flex-start",
        color: "black",
        fontFamily: "MontserratAlternates_600SemiBold",
        fontSize: 20,
      }}
      header
      calendarHeaderContainerStyle={{ paddingLeft: 30 }}
      iconLeft={false}
      iconRight={false}
      dateNumberStyle={{
        fontSize: 16,
        ...calendarTextStyles,
      }}
      dateNameStyle={{
        fontSize: 12,
        ...calendarTextStyles,
      }}
      highlightDateNumberStyle={{
        ...calendarTextStyles,
        fontSize: 16,
        color: "white",
      }}
      highlightDateNameStyle={{
        ...calendarTextStyles,
        fontSize: 12,
        color: "white",
      }}
    />
  );
};
