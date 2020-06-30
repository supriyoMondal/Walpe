import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ToastAndroid, ActivityIndicator, FlatList } from 'react-native'
import { Icon } from 'native-base'
import { colors } from '../../assets/colors'
import { API_KEY } from '../../config/keys';
import axios from 'axios'
import { FlatListItem } from '../Home/Index';

const { width, height } = Dimensions.get('screen');

const SelectedCategory = ({ navigation, route: { params: { searchQuery, type } } }) => {
    const [page, setPage] = useState(1);
    const [wallpapers, setWallpapers] = useState([]);

    const fetchWallpapers = async () => {
        let url = `https://pixabay.com/api/?key=${API_KEY}&orientation=vertical&page=${page}&per_page=19&safesearch=true&image_type=photo&${type}=${searchQuery}`;
        setPage(page + 1);
        try {
            let res = await axios.get(url);
            res = res.data
            if (wallpapers.length == 0) {
                setWallpapers(res.hits);
                return;
            }
            setWallpapers([...wallpapers, ...res.hits]);
        } catch (error) {
            console.log(error.message);
            ToastAndroid.show('Something went wrong');
        }
    }

    useEffect(() => {
        fetchWallpapers();
    }, [])

    const onLoadMore = () => {
        fetchWallpapers();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark, position: 'relative' }}>
            <View style={styles.headerContainer}>
                {/* <TouchableOpacity style={{ position: 'absolute', top: 0, left: 20, zIndex: 1000 }}>
                    <Text>hello</Text>
                </TouchableOpacity> */}
                <Text style={styles.headerText}>{searchQuery}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 0, left: 20, zIndex: 10 }}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color: "#fff" }} />
            </TouchableOpacity>
            {(!wallpapers || wallpapers.length == 0) ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="#eee" />
                </View> :
                <FlatList
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    data={wallpapers}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <FlatListItem navigation={navigation} item={item} />}
                    onEndReached={() => onLoadMore()}
                    onEndReachedThreshold={0.5}
                />
            }
        </View >

    )
}

export default SelectedCategory

const styles = StyleSheet.create({
    headerText: { fontSize: 23, letterSpacing: 1, color: colors.textLight, fontFamily: 'Lato-Regular', marginLeft: 70 },
    headerContainer: { width: width, height: 60, backgroundColor: colors.darkLight, justifyContent: 'center' }
});
