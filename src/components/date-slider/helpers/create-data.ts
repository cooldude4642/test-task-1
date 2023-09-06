import { MAX_VALUE } from '../config'

interface MonthData {
	index: number
	order: number
}

export interface YearData {
	months: MonthData[]
	year: number
}

export type DateSliderData = YearData[]

export const createData = (min: Date, max: Date) => {
	const maxMonthIdx = 11
	const startYear = min.getFullYear()
	const endYear = max.getFullYear()
	const startMonthIdx = min.getMonth()
	const endMonthIdx = max.getMonth()
	const data: DateSliderData = []

	let marksCount = 0

	for (let year = startYear; year <= endYear; year++) {
		if (year === startYear) {
			const months: MonthData[] = []

			for (let i = startMonthIdx; i <= maxMonthIdx; i++) {
				months.push({
					index: i,
					order: marksCount++,
				})
			}

			data.push({ year, months })
		} else if (year < endYear) {
			const months: MonthData[] = []

			for (let i = 0; i <= maxMonthIdx; i++) {
				months.push({
					index: i,
					order: marksCount++,
				})
			}

			data.push({ year, months })
		} else {
			const months: MonthData[] = []

			for (let i = 0; i <= endMonthIdx; i++) {
				months.push({
					index: i,
					order: marksCount++,
				})
			}

			data.push({ year, months })
		}
	}

	const divsCount = marksCount - 1
	const divScale = MAX_VALUE / divsCount

	return {
		data, divScale, divsCount,
	}
}
