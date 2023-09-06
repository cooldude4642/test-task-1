import type { DateSliderData } from './create-data'
import { getValueByDate } from './get-value-by-date'

export interface ThumbState {
	value: number
	isDragging: boolean
	dragStartX: number
	dragDelta: number
	currentValue: number
}

export interface Thumbs {
	left: ThumbState
	right: ThumbState
}

interface getInitThumbsParameter {
	from: Date
	to: Date
	data: DateSliderData
	divScale: number
}

export const getInitThumbs = ({
	from,
	to,
	data,
	divScale,
}: getInitThumbsParameter) => {
	const leftValue = getValueByDate({
		date: from,
		data,
		divScale,
	})

	const rightValue = getValueByDate({
		date: to,
		data,
		divScale,
	})

	const initThumbs: Thumbs = {
		left: {
			value: leftValue,
			isDragging: false,
			dragStartX: 0,
			dragDelta: 0,
			currentValue: leftValue,
		},
		right: {
			value: rightValue,
			isDragging: false,
			dragStartX: 0,
			dragDelta: 0,
			currentValue: rightValue,
		},
	}

	return initThumbs
}
