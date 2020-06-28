import React, { Fragment } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { colors } from '../../assets/colors'
import { images } from '../../assets/images'

const CustomHeader = ({ navigation, children }) => {

    return (
        <Fragment>
            <StatusBar backgroundColor={colors.darkLight} barStyle='light-content' />
            <View
                style={styles.headerStyle}
            >
                <View style={styles.leftIconStyle}>
                    <Image source={images.fire} style={styles.iconImage} />
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.title}>Wallpapers</Text>
                </View>
                <View style={{ flex: 3 }}>
                    {children}
                </View>

            </View>
        </Fragment>
    )
}

export default CustomHeader;

const styles = StyleSheet.create({
    headerStyle: { backgroundColor: colors.darkLight, height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    leftIconStyle: { alignItems: 'center', flex: 2 },
    iconImage: { width: 24, height: 24 },
    title: { fontSize: 23, letterSpacing: 1, color: colors.textLight, fontFamily: 'Lato-Regular' }
})
