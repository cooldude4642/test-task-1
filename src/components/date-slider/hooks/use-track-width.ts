import { useEffect, type RefObject, useState } from 'react'
import { MAX_VALUE } from '../config'

export const useTrackWidth = (trackRef: RefObject<HTMLElement>) => {
	const intialTrackWidth = trackRef.current?.getBoundingClientRect().width ?? MAX_VALUE
	const [observer, setObserver] = useState<ResizeObserver>()
	const [trackWidth, setTrackWidth] = useState<number>(intialTrackWidth)

	useEffect(() => {
		const track = trackRef.current

		if (track && !observer) {
			const handleResize = () => {
				const newTrackWidth = track.getBoundingClientRect().width

				setTrackWidth(newTrackWidth)
			}

			const newObserver = new ResizeObserver(handleResize)

			newObserver.observe(track)
			setObserver(newObserver)
		}

		return () => {
			if (track && observer) {
				observer.unobserve(track)
			}
		}
	}, [trackRef, observer])

	return trackWidth
}
