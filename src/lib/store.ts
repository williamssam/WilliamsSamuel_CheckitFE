import { configureStore } from '@reduxjs/toolkit'
import capsuleReducer from './capsule-slice'

export const store = configureStore({
	reducer: {
		capsules: capsuleReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
