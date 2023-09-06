import { useEffect } from 'react'
import type { DateSliderData } from '../helpers/create-data'
import type { Thumbs } from '../helpers/get-init-thumbs'
import { getMonthIdxByValue } from '../helpers/get-month-idx-by-value'
import { getYearByValue } from '../helpers/get-year-by-value'
import type { DateSliderChangeEventHandler } from '../ui/date-slider'

interface useOnSliderChangeParameter {
	min: Date
	max: Date
	from: Date
	to: Date
	data: DateSliderData
	divScale: number
	divsCount: number
	thumbs: Thumbs
	onChange?: DateSliderChangeEventHandler
}

export const useOnChange = ({
	min,
	max,
	from,
	to,
	data,
	divsCount,
	thumbs,
	onChange,
}: useOnSliderChangeParameter) => {
	useEffect(() => {
		let changedFrom = from
		let changedTo = to

		if (thumbs.left.isDragging || thumbs.right.isDragging) {
			const fromYear = getYearByValue({
				data,
				divsCount,
				value: thumbs.left.currentValue,
			})

			const fromMonth = getMonthIdxByValue({
				data,
				divsCount,
				value: thumbs.left.currentValue,
			})

			const toYear = getYearByValue({
				data,
				divsCount,
				value: thumbs.right.currentValue,
			})

			const toMonth = getMonthIdxByValue({
				data,
				divsCount,
				value: thumbs.right.currentValue,
			})

			changedFrom = new Date(fromYear, fromMonth)
			changedTo = new Date(toYear, toMonth)
		}

		onChange?.({
			min,
			max,
			from: changedFrom,
			to: changedTo,
		})
	}, [
		min,
		max,
		from,
		to,
		thumbs,
		data,
		divsCount,
		onChange,
	])
}
