import React from "react";
import { Pressable, StyleSheet, View,Text, Image} from 'react-native';
import { theme } from "../theme";
import PropTypes from 'prop-types';
import { images } from "../images";
import { SafeAreaView } from "react-native-safe-area-context";
import { textStyles, viewStyles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { width } from "dom-helpers";

const FILTER_MAP = {
    0: () => true,
    1: item => item.Category
};

const Category = () => {

    const [tasks, setTasks] = useState({});

    const [sortStateIndex, setSortStateIndex] = useState(0);
    const _setSortStateIndex = () => {
        setSortStateIndex((sortStateIndex+1)%3);
    }
    return(
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style = {textStyles.StatusBar} />
            <ScrollView width={width-20}>
                {Object.values(tasks).filter(FILTER_MAP[sortStateIndex]).filter((item)=> 
                <View key = {item.id} item = {item} />
                )}
            </ScrollView>

        </SafeAreaView>
    )
}

export default Category;