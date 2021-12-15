import React from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaInsetsContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { viewStyles, textStyles } from './styles';
import Calendar from './components/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchEngine from './Search'
import Main from './Main.js';
import editScreen from './Edit';

function CalendarScreen(){
    return (
        <SafeAreaView style={viewStyles.container}>
            <Calendar />
        </SafeAreaView>
    )
}

function SearchScreen(){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <SearchEngine/>
        </SafeAreaView>
    )
}

function categoryScreen(){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <Category/>
        </SafeAreaView>
    )
}

function mainScreen({route, navigation}){
    return (
        <Main route={route} navigation={navigation}/>
    )
}

function EditScreen(){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <editScreen/>
        </SafeAreaView>
    )
}

const Stack = createStackNavigator();

export default function App(){
    return (
        <SafeAreaProvider>
        <NavigationContainer >
                <StatusBar barStyle="light-content" style={textStyles.statusBar}/>
                <Stack.Navigator initialRouteName="calendar" screenOptions = {{headerShown: true}}>
                    <Stack.Screen name = "calendar" component = {CalendarScreen} />
                    <Stack.Screen name = "SearchScreen" component = {SearchScreen} />
                    <Stack.Screen name = "MainScreen" component = {mainScreen} />
                    <Stack.Screen name = "editScreen" component = {EditScreen} />
                </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
    );
};