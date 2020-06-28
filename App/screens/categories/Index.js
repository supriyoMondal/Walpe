import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { colors } from '../../assets/colors'
import CustomHeader from '../../components/header'

const Categories = ({ navigation }) => {

    return (
        <Fragment>
            <CustomHeader navigation={navigation} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.dark }}>
                <Text style={{ color: "#fff" }}>Categories</Text>
            </View>
        </Fragment>
    )
}

export default Categories

const styles = StyleSheet.create({})
