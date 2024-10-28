import { ShieldWarning } from '@phosphor-icons/react'

type ErrorMessageProps = {
	message: string
}

export const FieldError = ({ message }: ErrorMessageProps) => {
	return (
		<div className='flex items-center gap-1 text-red-600 font-medium text-xs'>
			<ShieldWarning weight='fill' className='text-base' />
			<p>{message}</p>
		</div>
	)
}
