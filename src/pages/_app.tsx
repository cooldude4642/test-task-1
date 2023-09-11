import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Raleway } from 'next/font/google'
import cn from 'classnames'

export const raleway = Raleway({
	subsets: ['latin', 'cyrillic'],
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
	],
	display: 'swap',
	preload: true,
})

export default function App ({ Component, pageProps }: AppProps) {
	return (
		<main className={ cn(
			raleway.className,
			'px-16 flex items-center justify-center h-screen',
		) }
		>
			<Component { ...pageProps }/>
		</main>
	)
}
