import React, {useContext, useState, useEffect} from 'react';
import {StatusBar, Text, Dimensions, ScrollView, View} from 'react-native';
import { SafeAreaInsetsContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { viewStyles, textStyles } from './styles';
import Calendar from './Calendar';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchEngine from './components/Search_App'
import { ScreenStack } from 'react-native-screens';
import Main from './components/Main';
import Edit from './components/Edit';
import Category from './components/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CalendarScreen({navigation, route}){
    return (
        <SafeAreaView style={viewStyles.container} >
            <Calendar navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}

function SearchScreen({navigation, route}){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <SearchEngine navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}

function mainScreen({navigation, route}){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <Main navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}

function editScreen({navigation, route}){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <Edit navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}

function categoryScreen(){
    return (
        <SafeAreaView style = {viewStyles.container}>
            <Category />
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
                    <Stack.Screen name = "calendar" component = {CalendarScreen}  />
                    <Stack.Screen name = "SearchScreen" component = {SearchScreen} />
                    <Stack.Screen name = {"MainScreen"} component ={mainScreen} />
                    <Stack.Screen name = "editScreen" component = {editScreen} />
                    <Stack.Screen name = "CategoryScreen" component = {categoryScreen} />
                </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
    );
};

