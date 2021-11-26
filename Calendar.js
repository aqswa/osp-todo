import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { theme } from "../theme";
import { Calendar, CalndarList, Agenda, LocaleConfig } from "react-native-calendars";


LocaleConfig.locales['fr'] = {
    monthNames: ['January','Féburary','March','April','May','June','July','August','September','October','November','Décember'],
    monthNamesShort: ['Jan.','Fév.','Mar.','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일', '월','화','수','목','금','토'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  const calendar  = () => {
      <View style = {calendarStyle.style}>
          <Calendar
          current = {'2021-11-26'}
          minDate = {'2020-01-01'}
          maxDate = {'2022-12-31'}

          onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<Arrow/>)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={true}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={true}
            // Disable right arrow. Default = false
            disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            /** Replace default month and year title with custom one. the function receive a date as parameter. */
            //renderHeader={(date) => {/*Return JSX*/}}
            renderHeader={(date) => {/*Return JSX*/}}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />

      </View>
  } 


  const calendarStyle = StyleSheet.create({
    style:{
        width: Dimensions.get('window').width-20,
        height: 100,
        marginTop: 300
    }
  })

  export default Calendar;