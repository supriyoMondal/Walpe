import { ToastAndroid } from 'react-native'
import { API_KEY } from '../config/keys';
import axios from 'axios'
import { FETCH_WALLPAPERS } from './types';
export const fetchWallpaper = (page, order) => async dispatch => {
    try {
        let url = `https://pixabay.com/api/?key=${API_KEY}&orientation=vertical&page=${page}&per_page=19&order=${order}&safesearch=true&image_type=photo`;

        let res = await axios.get(url);
        res = res.data;
        dispatch({
            type: FETCH_WALLPAPERS,
            payload: res.hits
        })

    } catch (error) {
        console.log(error.message);
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
}