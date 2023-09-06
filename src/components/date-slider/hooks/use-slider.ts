import { useRef, useState } from "react"
import { createData } from "../helpers/create-data"
import { Thumbs, getInitThumbs } from "../helpers/get-init-thumbs"
import { useLeftThumb } from "./use-left-thumb"
import { useOnChange } from "./use-on-change"
import { useRightThumb } from "./use-right-thumb"
import { DateSliderChangeEventHandler } from "../ui/date-slider"

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

	const {
		handleLeftThumbMouseDown,
		handleLeftThumbTouchStart,
	} = useLeftThumb({
		thumbs,
		setThumbs,
		trackRef,
		divsCount,
	})

	const {
		handleRightThumbMouseDown,
		handleRightThumbTouchStart,
	} = useRightThumb({
		thumbs,
		setThumbs,
		trackRef,
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
		handleLeftThumbMouseDown,
		handleLeftThumbTouchStart,
		handleRightThumbMouseDown,
		handleRightThumbTouchStart,
	}
}