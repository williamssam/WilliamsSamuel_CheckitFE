import type { Dragons } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const spacexApi = createApi({
	reducerPath: 'spacex',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v3/' }),
	endpoints: builder => ({
		getSpacexDragons: builder.query<Dragons, unknown>({
			query: () => 'dragons',
		}),
	}),
})

export const { useGetSpacexDragonsQuery } = spacexApi
