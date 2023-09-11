import { useRef, useState } from 'react'
import { createData } from '../helpers/create-data'
import type { Thumbs } from '../helpers/get-init-thumbs'
import { getInitThumbs } from '../helpers/get-init-thumbs'
import { useOnChange } from './use-on-change'
import type { DateSliderChangeEventHandler } from '../ui/date-slider'
import { useThumb } from './use-thumb'

export interface useSliderParameter {
	min: Date
	max: Date
	from: Date
	to: Date
	onChange: DateSliderChangeEventHandler | undefined
}

export const useSlider = ({
	min,
	max,
	from,
	to,
	onChange,
}: useSliderParameter) => {
	const { data, divScale, divsCount } = createData(min, max)
	const trackRef = useRef<HTMLDivElement>(null)
	const [thumbs, setThumbs] = useState<Thumbs>(getInitThumbs({ from, to, data, divScale }))

	const leftThumbRef = useThumb({
		thumbs,
		setThumbs,
		trackRef,
		position: 'left',
		divsCount,
	})

	const rightThumbRef = useThumb({
		thumbs,
		setThumbs,
		trackRef,
		position: 'right',
		divsCount,
	})

	useOnChange({
		min,
		max,
		from,
		to,
		data,
		divScale,
		divsCount,
		thumbs,
		onChange,
	})

	return {
		thumbs,
		trackRef,
		data,
		divScale,
		divsCount,
		leftThumbRef,
		rightThumbRef,
	}
}
