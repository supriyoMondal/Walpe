import { FETCH_WALLPAPERS } from "../actions/types";

const initialState = {
    wallpapers: [],
    searchedWallpapers: [],
    categoryWallpapers: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_WALLPAPERS:
            return {
                ...state,
                wallpapers: state.wallpapers.length > 0 ? [...state.wallpapers, ...payload] : payload
            }
        default:
            return state;
    }
}