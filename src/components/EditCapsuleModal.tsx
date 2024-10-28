import { updateCapsule, useCapsule, useCapsules } from '@/lib/capsule-slice'
import { Plus, Trash } from '@phosphor-icons/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { FieldError } from './FieldError'

type EditCapsuleModalProps = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = yup.object().shape({
	capsule_id: yup.string().required('Capsule ID is required'),
	status: yup.string().required('Please select a status'),
	original_launch: yup.string().required('Please choose a launch date'),
	details: yup.string().required('Capsule details is required'),
	landings: yup.string().required('Please enter number of landings'),
	reuse_count: yup.string().required('Please enter number of reuse count'),
	missions: yup.array().of(
		yup.object().shape({
			name: yup.string().required('Mission name is required'),
			flight: yup.string().required('Please enter mission number of flight in the mission'),
		})
	),
})

export const EditCapsuleModal = ({ visible, setVisible }: EditCapsuleModalProps) => {
	const toast = React.useRef<Toast>(null)
	const capsules = useCapsules()
	const capsule = useCapsule()
	const dispatch = useDispatch()

	const statues = [...new Set(capsules.map(capsule => capsule.status))]

	const onCloseModal = () => {
		if (!visible) return
		setVisible(false)
	}

	return (
		<>
			<Toast ref={toast} />
			<Dialog
				header='Edit capsule'
				visible={visible}
				onHide={onCloseModal}
				breakpoints={{ '960px': '75vw', '641px': '100vw' }}
				style={{ width: '35vw' }}>
				<Formik
					resetFormOnSubmit={true}
					resetOnMount={true}
					initialValues={{
						capsule_id: capsule?.capsule_id ?? '',
						status: capsule?.status ?? '',
						original_launch: capsule?.original_launch
							? new Date(capsule?.original_launch as string)
							: undefined,
						details: capsule?.details ?? '',
						landings: capsule?.landings ?? "",
						reuse_count: capsule?.reuse_count ?? "",
						missions: capsule?.missions ?? [],
					}}
					onSubmit={(values) => {
						if(!values) return

						const payload = {
							...capsule,
							...values,
						}
						// @ts-expect-error ts(2322)
						dispatch(updateCapsule(payload))
						toast.current?.show({
							severity: 'success',
							summary: 'Success',
							detail: 'Capsule added successfully!',
							life: 3000,
						})
						setVisible(false)
					}}
					validationSchema={validationSchema}>
					{({ values, touched, errors }) => (
						<Form className='text-base flex flex-col gap-6'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='capsule_id' className='font-semibold'>
									Capsule ID
								</label>
								<Field
									name='capsule_id'
									as={InputText}
									type='text'
									keyfilter='int'
									id='capsule_id'
									className={`w-full rounded-md py-3 px-4 ${
										touched.capsule_id && errors.capsule_id
											? 'border-red-600 border-2 bg-red-50/50'
											: 'border border-slate-300 bg-transparent'
									}`}
								/>

								{touched.capsule_id && errors.capsule_id ? (
									<FieldError message={errors.capsule_id} />
								) : null}
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='status' className='font-semibold'>
									Status
								</label>

								<Field
									name='status'
									as={Dropdown}
									checkmark={true}
									id='status'
									highlightOnSelect={false}
									options={statues}
									panelClassName='capitalize'
									placeholder='Select status'
									className={`w-full rounded-md capitalize ${
										touched.status && errors.status
											? 'border-red-600 border-2 bg-red-50/50'
											: 'border border-slate-300 bg-transparent'
									}`}
								/>

								{touched.status && errors.status ? (
									<FieldError message={errors.status} />
								) : null}
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='original_launch' className='font-semibold'>
									Original Launch Date <span className='text-red-600'>*</span>
								</label>
								<Field
									name='original_launch'
									as={Calendar}
									showButtonBar
									id='original_launch'
									placeholder='DD/MM/YYYY'
									dateFormat='dd/mm/yy'
									className={`w-full rounded-md py-3 px-4 ${
										touched.original_launch && errors.original_launch
											? 'border-red-600 border-2 bg-red-50/50'
											: 'border border-slate-300 bg-transparent'
									}`}
								/>
								{touched.original_launch && errors.original_launch ? (
									<FieldError message={errors.original_launch} />
								) : null}
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='landings' className='font-semibold'>
									Number of landings
								</label>
								<Field
									name='landings'
									as={InputText}
									type='text'
									keyfilter='int'
									id='landings'
									className={`w-full rounded-md py-3 px-4 ${
										touched.landings && errors.landings
											? 'border-red-600 border-2 bg-red-50/50'
											: 'border border-slate-300 bg-transparent'
									}`}
								/>

								{touched.landings && errors.landings ? (
									<FieldError message={errors.landings} />
								) : null}
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='reuse_count' className='font-semibold'>
									Reuse count
								</label>
								<Field
									name='reuse_count'
									as={InputText}
									type='text'
									keyfilter='int'
									id='reuse_count'
									className={`w-full rounded-md py-3 px-4 ${
										touched.reuse_count && errors.reuse_count
											? 'border-red-600 border-2 bg-red-50/50'
											: 'border border-slate-300 bg-transparent'
									}`}
								/>

								{touched.reuse_count && errors.reuse_count ? (
									<FieldError message={errors.reuse_count} />
								) : null}
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='reuse_count' className='font-semibold'>
									Detail about capsule
								</label>
								<Field
									autoResize
									name='details'
									as={InputTextarea}
									id='details'
									className={`w-full rounded-md py-3 px-4 resize-none ${
										touched.details && errors.details
											? 'border-red-600 border-2 bg-red-50/50'
											: 'border border-slate-300 bg-transparent'
									}`}
								/>

								{touched.details && errors.details ? (
									<FieldError message={errors.details} />
								) : null}
							</div>

							{/* add missions */}
							<FieldArray name='missions'>
								{({ remove, push }) => (
									<div className='flex flex-col gap-6'>
										{values.missions.length > 0 && (
											<div className='flex flex-col gap-3'>
												<p className='font-semibold'>Missions</p>
												{values.missions.map((mission, index) => (
													<div
														className='flex items-center gap-2'
														key={index}>
														<Field
															as={InputText}
															placeholder='Mission name'
															type='text'
															name={`missions.${index}.name`}
															id='capsule_id'
															className={`w-full rounded-md py-3 px-4 ${
																touched.capsule_id &&
																errors.capsule_id
																	? 'border-red-600 border-2 bg-red-50/50'
																	: 'border border-slate-300 bg-transparent'
															}`}
														/>
														<Field
															as={InputText}
															type='text'
															placeholder='No. of flights'
															keyfilter='int'
															name={`missions.${index}.flight`}
															className={`w-full rounded-md py-3 px-4 ${
																touched.capsule_id &&
																errors.capsule_id
																	? 'border-red-600 border-2 bg-red-50/50'
																	: 'border border-slate-300 bg-transparent'
															}`}
														/>

														<Button
															type='button'
															className='text-red-200 hover:text-red-600'
															icon={<Trash weight='fill' />}
															onClick={() => remove(index)}
														/>
													</div>
												))}
											</div>
										)}
										<Button
											type='button'
											className='text-xs self-start font-normal text-slate-500 gap-1 py-2 px-4 hover:bg-slate-200 transition-colors'
											label='Add mission'
											icon={<Plus />}
											onClick={() => push({ name: '', flight: '' })}
										/>
									</div>
								)}
							</FieldArray>

							<footer className='flex items-center justify-end gap-3'>
								<Button
									type='button'
									label='Cancel'
									onClick={onCloseModal}
									className='text-sm w-32 bg-red-100 text-red-600 hover:bg-red-800 hover:text-red-50 flex items-center gap-1 py-3 px-4'
								/>
								<Button
									type='submit'
									label='Submit'
									className='text-sm w-48 bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 flex items-center gap-1 py-3 px-4'
								/>
							</footer>
						</Form>
					)}
				</Formik>
			</Dialog>
		</>
	)
}
