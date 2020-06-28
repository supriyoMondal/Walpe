import React, { useEffect, Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../assets/colors'
import CustomHeader from '../../components/header'

const Home = ({ navigation }) => {

    return (
        <Fragment>
            <CustomHeader navigation={navigation} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.dark }}>
                <Text style={{ color: "#fff" }}>Home</Text>
            </View>
        </Fragment>
    )
}

export default Home

const styles = StyleSheet.create({})
