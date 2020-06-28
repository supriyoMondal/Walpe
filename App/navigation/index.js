import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer, useTheme, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home/Index';
import { Icon } from 'native-base';
import Categories from '../screens/categories/Index';
import { colors } from '../assets/colors'
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

const AppScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: "#fff"
            }}>
            <Stack.Screen
                name="HomePage">
                {(props) => <CustomTabs {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const MainNavigator = () => {
    const myTheme = {
        ...DefaultTheme,
        colors: {
            ...colors
        }
    }
    return (
        <NavigationContainer theme={myTheme}>
            <AppScreens />
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})
