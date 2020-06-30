import React, { Fragment } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { colorsImage, categories } from '../../assets/images';

const { width, height } = Dimensions.get('screen');

const Categories = ({ navigation }) => {
    const { colors } = useTheme();


    const allColors = [
        "grayscale", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
    ]
    const allCategories = [
        'backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health', 'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music'
    ]

    const CategoryListItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('SelectedCategory', { searchQuery: item, type: 'category' })}
                activeOpacity={0.8}
                style={styles.categoryItemContainer}>
                <Image
                    style={styles.categoryImage}
                    source={categories[item]}
                />
                <Text style={styles.categoryText}>
                    {item.toUpperCase()}
                </Text>

            </TouchableOpacity>
        )
    }

    return (
        <Fragment>
            <View style={{ backgroundColor: colors.dark, paddingBottom: 280 }}>
                <View >
                    <Text style={styles.subHeading}>Colors</Text>
                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.colorScrollbar}>
                        {allColors.map((c, index) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SelectedCategory', { searchQuery: c, type: 'colors' })}
                                key={index}
                                activeOpacity={0.8}
                                style={{ width: 73, height: 85 }}>
                                <Image source={colorsImage[c]}
                                    style={styles.colorImage} />
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    <Text style={{ ...styles.subHeading }}>Categories</Text>
                    <FlatList
                        style={{
                            margin: 10,
                            paddingBottom: 10
                        }}
                        data={allCategories}
                        keyExtractor={(item, index) => index}
                        numColumns={2}
                        renderItem={({ item }) => <CategoryListItem item={item} />}
                    />
                </View>
            </View>
        </Fragment>
    )
}

export default Categories

const styles = StyleSheet.create({
    subHeading: { color: '#ccc', marginLeft: 15, fontSize: 16, marginTop: 5 },
    colorScrollbar: { marginLeft: 10, marginTop: 7, marginRight: 5 },
    colorImage: { width: 65, height: 65, borderRadius: 100 },
    categoryItemContainer: { width: width / 2 - 18, height: 75, marginVertical: 4, marginHorizontal: 4, position: 'relative' },
    categoryImage: { width: width / 2 - 18, height: 75, opacity: .6 },
    categoryText: {
        color: 'floralwhite', fontFamily: 'Lato-Regular', fontSize: 17, alignSelf: 'center', position: 'absolute', top: '40%'
    }
})
