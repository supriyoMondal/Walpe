import React, { useState, useEffect, Fragment } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native'
import { colorsFromUrl } from 'react-native-dominant-color'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../assets/colors';
import { Icon } from 'native-base';


const Single = ({ navigation, route: { params: { item } } }) => {
    const { largeImageURL, webformatURL } = item;
    const [colorPalate, setColorPalate] = useState(null);
    const [isFullScreen, setFullScreen] = useState(false);
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
        return setFullScreen(false);
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
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colorPalate.light, colorPalate.average]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                {isFullScreen ? <Image
                    source={{ uri: largeImageURL }}
                    style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
                /> : <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 9,
                    },
                    shadowOpacity: 0.50,
                    shadowRadius: 12.35,
                    elevation: 19,
                    backgroundColor: 'rgba(255,255,255,.2)',
                    width: '77%', height: "80%",
                    borderRadius: 13,
                    overflow: 'hidden'
                }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colorPalate.light, colorPalate.average]}
                            style={{
                                width: '100%', height: '100%'
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                            >
                                <Image
                                    source={{ uri: largeImageURL }}
                                    style={{
                                        width: '100%', height: '100%',
                                        borderRadius: 13
                                    }}
                                />
                            </TouchableOpacity>
                        </LinearGradient>

                    </View>
                }
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30 }}>
                    <Icon name="heart" type='Entypo'
                        style={{ marginHorizontal: 15, color: colors.darkLight }}
                    />
                    {isFullScreen ?
                        <Icon name="eye-with-line" type="Entypo"
                            style={{ marginHorizontal: 15, color: colors.darkLight }}
                            onPress={() => setFullScreen(false)}
                        /> :
                        <Icon name="eye" type="Entypo"
                            style={{ marginHorizontal: 15, color: colors.darkLight }}
                            onPress={() => setFullScreen(true)}
                        />}
                    <Icon name="cellphone-screenshot" type='MaterialCommunityIcons'
                        style={{ marginHorizontal: 15, color: colors.darkLight }}
                    />
                </View>

            </LinearGradient>
        </Fragment>
    )
}

export default Single

const styles = StyleSheet.create({})
