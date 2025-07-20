import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    items: string[];
}

const initialState: FavoritesState = {
    items: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.items));
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((id) => id !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.items));
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
