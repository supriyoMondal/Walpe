import { combineReducers } from 'redux';
import wallpaperReducer from './wallpaperReducer';

export default combineReducers({
    wallpaper: wallpaperReducer
})