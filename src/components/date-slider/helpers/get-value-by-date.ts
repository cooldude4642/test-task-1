import { MIN_VALUE } from '../config'
import type { DateSliderData } from './create-data'

interface getValueByDateParameter {
	data: DateSliderData
	date: Date
	divScale: number
}

export const getValueByDate = ({
	data,
	date,
	divScale,
}: getValueByDateParameter) => {
	const year = date.getFullYear()
	const monthIdx = date.getMonth()

	for (const yearData of data) {
		if (yearData.year === year) {
			for (const monthData of yearData.months) {
				if (monthData.index === monthIdx) {
					const value = monthData.order * divScale

					return value
				}
			}
		}
	}

	return MIN_VALUE
}
