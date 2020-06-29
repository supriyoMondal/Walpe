import React, { useEffect, Fragment } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { colors } from '../../assets/colors'
import { Icon } from 'native-base'
import { useTheme } from '@react-navigation/native'

const Home = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <Fragment>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.dark }}>
                <Text style={{ color: "#fff" }}>Home</Text>
            </View>
        </Fragment>
    )
}

export default Home

const styles = StyleSheet.create({})
