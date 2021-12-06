import {StyleSheet} from 'react-native';
import {theme} from './theme';

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export const textStyles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: theme.main,
        alignItems: 'flex-start',
        marginTop: 0,
        marginLeft: 0,
    },
    select: {
        fontSize: 15,
        fontWeight: '300',
        color: theme.main,
        marginTop: 0,
        marginLeft: 0,
        textAlign: 'left',
    },
});

export const barStyles = StyleSheet.create({
    statusbar: {
        backgroundColor: theme.background,
    },
    
});


export const btnStyles = StyleSheet.create({
    bottomicon:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    selectall:{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    emotionIcon:{
        tintColor: theme.text, //changes the color of all the non-transparent pixels to the tintColor
        width: 30,
        height: 30,
        margin: 10,
        fontSize: 30,
    }
});