import type { Capsule, Capsules } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from './store'

interface CapsulesState {
	capsules: Capsules
	capsule: Capsule | null
}

type AddCapsulePayload = {
	capsule_id: string
	status: string
	original_launch: string | undefined
}

// interface EditCapsulePayload extends AddCapsulePayload {
// 	landings: number
// 	reuse_count: number
// 	details: string
// 	missions: Array<{ name: string; flight: number }> | []
// }

const initialState: CapsulesState = {
	capsules: [],
	capsule: null,
}

function convertString(input: string) {
	const number = input.replace(/[^0-9]/g, '')
	return `Dragon ${number}.0`
}

export const capsuleSlice = createSlice({
	name: 'capsules',
	initialState,
	reducers: {
		setStore: (state, action: PayloadAction<Capsules>) => {
			// Sort capsules in alphabetical order based on capsule_serial
			state.capsules = action.payload
		},
		addCapsule: (state, action: PayloadAction<AddCapsulePayload>) => {
			const type = convertString(action.payload.capsule_id)
			const serials = state.capsules.map(capsule => capsule.capsule_serial)
			// generate new capsule_serial
			const new_capsule_serial = `C${(parseInt(serials[serials.length - 1].slice(1)) + 1)
				.toString()
				.padStart(3, '0')}`

			const payload = {
				...action.payload,
				missions: [],
				reuse_count: 0,
				landings: 0,
				details: '',
				type,
				capsule_serial: new_capsule_serial,
				original_launch_unix:
					new Date(action.payload.original_launch as string).getTime() / 1000,
			}
			state.capsules = [payload, ...state.capsules]
		},
		removeCapsule: (state, action: PayloadAction<string>) => {
			state.capsules = state.capsules.filter(
				capsule => capsule.capsule_serial !== action.payload
			)
		},
		updateCapsule: (state, action: PayloadAction<Capsule>) => {
			state.capsules = state.capsules.map(capsule => {
				if (capsule.capsule_serial === action.payload.capsule_serial) {
					const type = convertString(action.payload.capsule_id)
					return {
						...capsule,
						...action.payload,
						type,
						original_launch_unix:
							new Date(action.payload.original_launch as string).getTime() / 1000,
					}
				}
				return capsule
			})
		},
		setCapsule: (state, action: PayloadAction<Capsule>) => {
			state.capsule = action.payload
		},
	},
})

export const { addCapsule, setStore, removeCapsule, updateCapsule, setCapsule } =
	capsuleSlice.actions
export const useCapsules = () => useSelector((state: RootState) => state.capsules.capsules)
export const useCapsule = () => useSelector((state: RootState) => state.capsules.capsule)
export default capsuleSlice.reducer
