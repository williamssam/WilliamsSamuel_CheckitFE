export const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('en-NG', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour12: true,
		hour: '2-digit',
		minute: '2-digit',
	})
}
