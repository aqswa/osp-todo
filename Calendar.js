import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from "./theme";
import { Calendar, CalndarList, Agenda, LocaleConfig} from "react-native-calendars";
import { images } from './images';
import IconButton from './components/IconButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


LocaleConfig.locales['fr'] = {
    monthNames: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'sat'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const calendar = ({navigation, route}) => {
    //navigation = useNavigation();

    return (
        <View>
            <View style={calStyle.top}>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <IconButton type={images.search} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')}>
                    <IconButton type={images.list} />
                </TouchableOpacity>
            </View>

            <Calendar style={calStyle.container}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    backgroundColor: theme.background,
                    calendarBackground: theme.background,
                    textSectionTitleColor: '#FFD700', //일월화수목금토 
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#B0C4DE',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'white',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'white', //맨 위에 month year 색상
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 15
                }}

                current = {Date()}
                minDate = {'2012-01-01'}
                maxDate = {'2030-12-31'}

                onDayPress = {(day) => navigation.navigate('MainScreen', {
                    dayYear: day.year,
                    dayMonth: day.month,
                    dayDay: day.day,
                })}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => { console.log('month changed', month) }}
            // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
            />
        </View>
    )
}

const calStyle = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 0,
        marginTop: 3
    },

    container: {
        height: 350,
        marginTop: 100,
        width: Dimensions.get('window').width - 50,
        marginLeft: 15
    },
});

export default calendar;