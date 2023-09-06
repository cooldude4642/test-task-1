import cn from 'classnames'
import type { ComponentProps } from 'react'
import { DEFAULT_FROM, DEFAULT_TO } from '../config'
import { ActiveTrack } from './active-track'
import { LeftThumb } from './left-thumb'
import { Marks } from './marks'
import { RightThumb } from './right-thumb'
import { useSlider } from '../hooks/use-slider'

export interface DateSliderChangeEvent {
	min: Date
	max: Date
	from: Date
	to: Date
}

export type DateSliderChangeEventHandler = (e: DateSliderChangeEvent) => void

export interface DateSliderProps extends Omit<ComponentProps<'div'>, 'onChange'> {
	min?: Date
	max?: Date
	from?: Date
	to?: Date
	onChange?: DateSliderChangeEventHandler
	variant?: 'months' | 'years'
}

export function DateSlider ({
	min = DEFAULT_FROM,
	max = DEFAULT_TO,
	from = min,
	to = max,
	variant = 'years',
	onChange,
	className,
}: DateSliderProps) {
	const {
		thumbs,
		trackRef,
		data,
		divScale,
		divsCount,
		handleLeftThumbMouseDown,
		handleLeftThumbTouchStart,
		handleRightThumbMouseDown,
		handleRightThumbTouchStart,
	} = useSlider({ min, max, from, to, onChange })
	

	return (
		<div className='flex items-center justify-center h-[166px] w-full'>
			<div
				ref={ trackRef }
				className={ cn(
					'w-full h-[10px] bg-[#EDF1F8] rounded-full mx-[64px] relative select-none',
					className,
				) }
			>
				<LeftThumb
					data={ data }
					divsCount={ divsCount }
					value={ thumbs.left.currentValue }
					onMouseDown={ handleLeftThumbMouseDown }
					onTouchStart={ handleLeftThumbTouchStart }
				/>
				<ActiveTrack
					leftValue={ thumbs.left.currentValue }
					rightValue={ thumbs.right.currentValue }
				/>
				<RightThumb
					data={ data }
					divsCount={ divsCount }
					value={ thumbs.right.currentValue }
					onMouseDown={ handleRightThumbMouseDown }
					onTouchStart={ handleRightThumbTouchStart }
				/>
				<Marks
					data={ data }
					divScale={ divScale }
					variant={ variant }
				/>
			</div>
		</div>
	)
}
