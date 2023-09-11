import type { RefObject } from 'react'
import { useTrackWidth } from './use-track-width'

interface useMarksParameter {
	variant: 'months' | 'years'
	divsCount: number
	trackRef: RefObject<HTMLElement>
}

export const useMarks = ({ variant, divsCount, trackRef }: useMarksParameter) => {
	const monthsInYear = 12
	const maxMarkWidth = 40
	const minMarkWidth = 18
	const marksGap = 10
	const years = divsCount / monthsInYear
	const trackWidth = useTrackWidth(trackRef)

	const markWidth = variant === 'months'
		? Math.min(trackWidth / divsCount - marksGap, maxMarkWidth)
		: Math.min(trackWidth / years - marksGap, maxMarkWidth)

	const isHidden = markWidth < minMarkWidth

	return { markWidth, isHidden }
}
