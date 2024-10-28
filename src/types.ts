export type Capsule = {
	capsule_serial: string
	capsule_id: string
	status: string
	original_launch?: string
	original_launch_unix?: number
	missions: Array<{
		name: string
		flight: number
	}>
	landings: number
	type: string
	details?: string
	reuse_count: number
}

export type Mission = {
	mission_name: string
	mission_id: string
	manufacturers: string[]
	payload_ids: string[]
	wikipedia: string
	website: string
	twitter: null | string
	description: string
}

export type Dragon = {
	id: string
	name: string
	type: string
}

export type Capsules = Array<Capsule>
export type Missions = Array<Mission>
export type Dragons = Array<Dragon>
