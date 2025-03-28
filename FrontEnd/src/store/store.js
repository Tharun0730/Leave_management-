import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './loginSlice/loginSlice'
const store=configureStore({
    reducer:{
        loginSlice:loginSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
})
export default store