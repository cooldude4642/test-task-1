import { MAX_VALUE } from '../config'
import type { DateSliderData } from './create-data'

interface getMonthIdxByValueParameter {
	data: DateSliderData
	divsCount: number
	value: number
}

export const getMonthIdxByValue = ({
	data,
	divsCount,
	value,
}: getMonthIdxByValueParameter) => {
	const DEFAULT_MONTH_IDX = 0
	const order = Math.round((value / MAX_VALUE) * divsCount)

	for (const yearData of data) {
		for (const monthData of yearData.months) {
			if (monthData.order === order) {
				return monthData.index
			}
		}
	}

	return DEFAULT_MONTH_IDX
}
