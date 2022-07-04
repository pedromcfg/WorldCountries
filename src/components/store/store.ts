import { createSlice, configureStore } from '@reduxjs/toolkit';

interface favoritesState
{   favorites: string[];   }

const initialState:favoritesState = {favorites: []};

const favoritesSlice = createSlice({
    name: 'favorites', // any name
    initialState,
    reducers: {
        addFavorites (state: { favorites: string[]; }, action: { payload: string; }) 
        {
            state.favorites.push(action.payload);
        },
        deleteFavorites (state: { favorites: string[]; }, action: { payload: string; }) 
        {
            state.favorites = state.favorites.filter((country) => { return country !== action.payload });
        },
    }
});

const store = configureStore({
    reducer: favoritesSlice.reducer,
});

export const favoriteActions = favoritesSlice.actions;

export default store;

/*
THIS GOES IN THE APP

    import { Provider } from 'react-redux';
    import store from '.store/store'

    root.render(<Provider store={store}><App/></Provider>)

THIS GOES IN THE COMPONENT

    import { useSelector, useDispatch } from 'react-redux';
    import { counterActions } from 'store/store'
    
    const counter = useSelector(state => state.counter); 
    const dispatch = useDispatch();

    const someHandler = () =>
    {
        dispatch({ type: 'increment', amountOrAnyOtherName: 5});
        dispatch(counterActions.increment(5))
    }
*/