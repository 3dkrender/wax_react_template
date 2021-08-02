import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    isLogged: false,
    balance: 0
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPlayerData: (state, action) => (action.payload),
        setPlayerLogout: (state, action) => initialState,
        setPlayerBalance: (state, action) => ({...state, balance: action.payload})
    }
});

export const { setPlayerData, setPlayerLogout, setPlayerBalance } = user.actions;
export default user.reducer;
