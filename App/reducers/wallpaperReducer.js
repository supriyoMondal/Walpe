import { FETCH_WALLPAPERS, CLEAR_DATA, CHANGE_ORDER, CHANGE_MODAL_VISIBILITY } from "../actions/types";

const initialState = {
    wallpapers: [],
    searchedWallpapers: [],
    categoryWallpapers: [],
    order: 'popular',
    modalVisibility: false
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
        case CHANGE_ORDER:
            return {
                ...state,
                order: payload
            }
        case CHANGE_MODAL_VISIBILITY:
            return {
                ...state,
                modalVisibility: !state.modalVisibility
            }
        default:
            return state;
    }
}