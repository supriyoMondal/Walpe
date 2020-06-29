import { FETCH_WALLPAPERS, CLEAR_DATA } from "../actions/types";

const initialState = {
    wallpapers: [],
    searchedWallpapers: [],
    categoryWallpapers: [],
    order: 'popular'
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_WALLPAPERS:
            return {
                ...state,
                wallpapers: state.wallpapers.length > 0 ? [...state.wallpapers, ...payload] : payload
            }
        case CLEAR_DATA:
            return {
                ...state,
                wallpapers: []
            }
        default:
            return state;
    }
}