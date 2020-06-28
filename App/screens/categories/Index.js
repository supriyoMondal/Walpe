import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'


const Categories = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <Fragment>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.dark }}>
                <Text style={{ color: "#fff" }}>Categories</Text>
            </View>
        </Fragment>
    )
}

export default Categories

const styles = StyleSheet.create({})
