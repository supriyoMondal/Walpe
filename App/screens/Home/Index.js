import React, { useEffect, Fragment, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import { Icon, Radio } from 'native-base'
import { useTheme } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchWallpaper, clearData, toggleModalVisibility, changeOrder } from '../../actions/wallpaperActions'


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


const Home = ({ navigation, fetchWallpaper, wallpapers, clearData, order, toggleModalVisibility, visibility, changeOrder }) => {
    const { colors } = useTheme();
    const [page, setPage] = useState((Math.floor(Math.random() * 1000) % 20) + 1);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        clearData();
        fetchWallpaper(page, order);
    }, [order])
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

    const toggleOrder = (order) => {
        toggleModalVisibility();
        changeOrder(order);
    }

    if (wallpapers.length == 0) {
        return (
            <View style={{ backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator color="#ccc" size='large' />
            </View>
        )
    }

    return (

        <View style={{ backgroundColor: colors.dark, flex: 1 }}>
            <Modal visible={visibility}
                transparent={true} >
                <TouchableOpacity
                    onPress={() => toggleModalVisibility()}
                    activeOpacity={1}
                    style={styles.modalContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.modalMain}>
                        <Text style={styles.modalHeading}>Filter By</Text>
                        <View style={styles.modalRows}>
                            <Radio
                                color={"#212121"}
                                selectedColor={"#23b85c"}
                                selected={order == 'popular'}
                                onPress={() => toggleOrder('popular')}
                            />
                            <Text style={styles.radioBtnText}>Popular</Text>
                        </View>
                        <View style={styles.modalRows}>
                            <Radio
                                color={"#212121"}
                                selectedColor={"#5cb85c"}
                                onPress={() => toggleOrder('recent')}
                                selected={order == 'recent'}
                            />
                            <Text style={styles.radioBtnText}>Recent</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
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
    wallpapers: state.wallpaper.wallpapers,
    order: state.wallpaper.order,
    visibility: state.wallpaper.modalVisibility
})

export default connect(mapStateToProps, { fetchWallpaper, clearData, toggleModalVisibility, changeOrder })(Home)

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,.6)',
        flex: 1, justifyContent: 'center',
        alignItems: 'center'
    },
    modalMain: { backgroundColor: "#fff", width: width - 50, padding: 20, borderRadius: 5 },
    modalHeading: {
        fontSize: 17, fontFamily: 'Lato-Regular', paddingBottom: 10, borderBottomColor: '#ccc',
        borderBottomWidth: 1, marginBottom: 10
    },
    modalRows: { flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, marginTop: 10 },
    radioBtnText: { color: '#000', fontSize: 18, marginLeft: 20, fontFamily: 'Lato-Regular' }
})
