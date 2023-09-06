import { MAX_VALUE } from '../config'
import type { DateSliderData } from './create-data'

interface getYearByValueParameter {
	data: DateSliderData
	divsCount: number
	value: number
}

export const getYearByValue = ({
	data,
	divsCount,
	value,
}: getYearByValueParameter) => {
	const DEFAULT_YEAR = 2000
	const order = Math.round((value / MAX_VALUE) * divsCount)

	for (const yearData of data) {
		for (const monthData of yearData.months) {
			if (monthData.order === order) {
				return yearData.year
			}
		}
	}

	return DEFAULT_YEAR
}
