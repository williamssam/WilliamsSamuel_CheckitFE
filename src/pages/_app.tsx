import { store } from '@/lib/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PrimeReactProvider } from 'primereact/api'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PrimeReactProvider>
				<Component {...pageProps} />
			</PrimeReactProvider>
		</Provider>
	)
}
