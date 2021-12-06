import React, {useContext, useState} from 'react';
import {StatusBar, Text, Dimensions, ScrollView, View} from 'react-native';
import { SafeAreaInsetsContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ViewStyles, textStyles } from './styles';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import Calendar from './components/Calendar';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchEngine from './components/Search_App'
import { ScreenStack } from 'react-native-screens';
import Category from './components/Category';
import Main from './components/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CalendarScreen(){
    return (
        <SafeAreaView style={ViewStyles.container}>
            <Calendar />
        </SafeAreaView>
    )
}

function SearchScreen(){
    return (
        <SafeAreaView style = {ViewStyles.container}>
            <SearchEngine/>
        </SafeAreaView>
    )
}

function categoryScreen(){
    return (
        <SafeAreaView style = {ViewStyles.container}>
            <Category />
        </SafeAreaView>
    )
}

function mainScreen(){
    return (
        <SafeAreaView style = {ViewStyles.container}>
            <Main />
        </SafeAreaView>
    )
}

const Stack = createStackNavigator();




export default function App(props){


    return (
        <SafeAreaProvider>
        <NavigationContainer >
                <StatusBar barStyle="light-content" style={textStyles.statusBar}/>
                <Stack.Navigator initialRouteName="calendar" screenOptions = {{headerShown: false}}>
                    <Stack.Screen name = "calendar" component = {CalendarScreen} />
                    <Stack.Screen name = "SearchScreen" component = {SearchScreen} />
                    <Stack.Screen name = "CategoryScreen" component = {categoryScreen} />
                    <Stack.Screen name = "MainScreen" component = {mainScreen} />
                </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
       
    );
};