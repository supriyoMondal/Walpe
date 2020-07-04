import React, { useState, useEffect, Fragment } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image } from 'react-native'
import { colorsFromUrl } from 'react-native-dominant-color'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../assets/colors';


const Single = ({ navigation, route: { params: { item } } }) => {
    const { largeImageURL, webformatURL } = item;
    const [colorPalate, setColorPalate] = useState(null);
    const getColorPalate = () => {
        try {
            colorsFromUrl(webformatURL, (err, palate) => {
                if (!err) {
                    setColorPalate({
                        average: palate.averageColor,
                        light: palate.lightVibrantColor
                    })
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getColorPalate();
    }, [])

    if (!colorPalate) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkLight }}>
                <ActivityIndicator color="#fff" size="large" />
            </View>
        )
    }
    return (
        <Fragment>
            <StatusBar backgroundColor={colorPalate.light} />
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colorPalate.light, colorPalate.average]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 9,
                    },
                    shadowOpacity: 0.50,
                    shadowRadius: 12.35,
                    elevation: 19,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    width: '77%', height: "80%",
                    borderRadius: 13
                }}>
                    <Image
                        source={{ uri: largeImageURL }}
                        style={{
                            width: '100%', height: '100%',
                            borderRadius: 13
                        }}
                    />
                </View>
            </LinearGradient>
        </Fragment>
    )
}

export default Single

const styles = StyleSheet.create({})
