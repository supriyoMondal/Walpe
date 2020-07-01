import 'react-native-gesture-handler';
import React, { Fragment } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer, useTheme, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home/Index';
import { Icon } from 'native-base';
import Categories from '../screens/categories/Index';
import { colors } from '../assets/colors'
import { images } from '../assets/images';
import { connect } from 'react-redux'
import { toggleModalVisibility } from '../actions/wallpaperActions';
import SelectedCategory from '../screens/categories/SelectedCategory';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


const drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabs = () => {
    const { colors: { darkLight, textLight, textDark } } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={{
                backgroundColor: darkLight
            }}
            activeColor={textLight}
            inactiveColor={textDark}
        >
            <Tab.Screen

                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const color = focused ? textLight : textDark;
                        return <View style={{ width: 60, height: 60, alignItems: 'center' }}>
                            <Icon type='Entypo' name="home"
                                style={{ color, fontSize: 22 }}
                            />
                        </View>
                    }
                }}>

            </Tab.Screen>
            <Tab.Screen
                name="Categories"
                component={Categories}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const color = focused ? textLight : textDark;
                        return <View style={{ width: 60, height: 60, alignItems: 'center' }}>
                            <Icon type='Entypo' name="grid"
                                style={{ color, fontSize: 22 }}
                            />
                        </View>
                    }
                }}>

            </Tab.Screen>

        </Tab.Navigator>
    )
}

const AppScreens = ({ toggleModalVisibility }) => {
    const { colors: { darkLight, textLight, textDark } } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: 'Wallpapers',
                headerStyle: {
                    backgroundColor: darkLight
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    letterSpacing: 1, color: colors.textLight, fontFamily: 'Lato-Regular'
                }
            }}>
            <Stack.Screen
                name="HomePage"
                options={{
                    headerRight: () => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                                <TouchableOpacity
                                    onPress={() => toggleModalVisibility()}
                                    activeOpacity={0.7}
                                    style={{ marginHorizontal: 5 }}>
                                    <Icon name="ios-options"
                                        type="Ionicons" style={{ color: textLight, fontSize: 24 }} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={{ marginHorizontal: 15 }}>
                                    <Icon name="search"
                                        type="Ionicons" style={{ color: textLight, fontSize: 24 }} />
                                </TouchableOpacity>
                            </View>
                        )
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}>
                                <Image source={images.fire} style={{ width: 24, height: 24, marginLeft: 25 }} />
                            </TouchableOpacity>
                        )
                    }
                }}
            >
                {(props) => <CustomTabs {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="SelectedCategory"
                options={{
                    headerTitle: null,
                    headerTransparent: true
                }}
            >
                {(props) => <SelectedCategory {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const MainNavigator = ({ toggleModalVisibility }) => {
    const myTheme = {
        ...DefaultTheme,
        colors: {
            ...colors
        }
    }
    return (
        <Fragment>
            <StatusBar backgroundColor={colors.darkLight} barStyle='light-content' />
            <NavigationContainer theme={myTheme}>
                <AppScreens toggleModalVisibility={toggleModalVisibility} />
            </NavigationContainer>
        </Fragment>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { toggleModalVisibility })(MainNavigator);

const styles = StyleSheet.create({})
