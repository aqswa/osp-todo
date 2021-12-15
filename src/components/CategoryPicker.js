import React from 'react';
import {
    Dimensions, StyleSheet, Text, View,
    TouchableOpacity, ScrollView
} from 'react-native';

const CATEOPTIONS = ['Study', 'Daily', 'Health', 'Work', 'Buddy', 'Etc'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CategoryPicker = ({props, updateCate, cTask, category, changeCateVisibility, setCate}) => {

    const onPressCate = (cateoption) => {
        changeCateVisibility(false);
        setCate(cateoption);
    }

    const cateoption = CATEOPTIONS.map((item, index) => {
        return(
            <TouchableOpacity
                style={styles.cateoption}
                key={index}
                onPress={() => onPressCate(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return(
        <TouchableOpacity
            onPress={() => props.changeCateVisibility(false)}   
            style={styles.container}     
        >
            <View style={[styles.modal, {width: WIDTH-20, height: HEIGHT-20}]}>
                <ScrollView>
                    {cateoption}
                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal:{
        backgroundColor: 'white',
        borderRadius: 10
    },
    cateoption:{
        alignItems: 'flex-start'
    },
    text:{
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export {CategoryPicker}