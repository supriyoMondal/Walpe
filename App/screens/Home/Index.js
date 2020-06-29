import React, { useEffect, Fragment, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base'
import { useTheme } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchWallpaper, clearData } from '../../actions/wallpaperActions'
import { ActivityIndicator } from 'react-native-paper';


const { width, height } = Dimensions.get('screen')

export const FlatListItem = ({ item: { largeImageURL, webformatURL } }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{ backgroundColor: colors.darkLight, width: (width - 30) / 3, marginHorizontal: 4, height: height / 3.7, marginBottom: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{ uri: webformatURL }}
                style={{ width: (width - 30) / 3, marginHorizontal: 4, height: height / 3.7, borderRadius: 8 }} />
            {/* <Icon name="loader" type="Feather" /> */}
        </TouchableOpacity>
    )
}


const Home = ({ navigation, fetchWallpaper, wallpapers, clearData }) => {
    const { colors } = useTheme();
    const [page, setPage] = useState((Math.floor(Math.random() * 1000) % 20) + 1);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchWallpaper(page, 'popular');
    }, [])
    const onLoadMore = () => {
        fetchWallpaper(parseInt(page) + 1, 'popular');
        setPage(parseInt(page) + 1);
    }
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1100);
        clearData();
        fetchWallpaper(parseInt(page) + 1, 'popular');
        setPage(parseInt(page) + 1);
    }

    if (wallpapers.length == 0) {
        return (
            <View style={{ backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator color="#ccc" size='small' />
            </View>
        )
    }

    return (

        <View style={{ backgroundColor: colors.dark, flex: 1 }}>
            <FlatList
                style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                data={wallpapers}
                numColumns={3}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FlatListItem navigation={navigation} item={item} />}
                onEndReached={() => onLoadMore()}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
            />
        </View>

    )
}

const mapStateToProps = state => ({
    wallpapers: state.wallpaper.wallpapers
})

export default connect(mapStateToProps, { fetchWallpaper, clearData })(Home)

const styles = StyleSheet.create({})
