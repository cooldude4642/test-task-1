import cn from 'classnames'
import type { ComponentProps } from 'react'
import { DEFAULT_FROM, DEFAULT_TO } from '../config'
import { ActiveTrack } from './active-track'
import { Marks } from './marks'
import { useSlider } from '../hooks/use-slider'
import { Thumb } from './thumb'

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
		leftThumbRef,
		rightThumbRef,
	} = useSlider({
		min, max, from, to, onChange,
	})

	return (
		<div className='flex items-center justify-center w-full min-w-[64px] mx-[10px]'>
			<div
				ref={ trackRef }
				className={ cn(
					'w-full h-[10px] bg-[#EDF1F8] rounded-full relative select-none',
					className,
				) }
			>
				<Thumb
					ref={ leftThumbRef }
					data={ data }
					divsCount={ divsCount }
					labelPosition='top'
					value={ thumbs.left.currentValue }
				/>
				<ActiveTrack
					leftValue={ thumbs.left.currentValue }
					rightValue={ thumbs.right.currentValue }
				/>
				<Marks
					data={ data }
					divScale={ divScale }
					divsCount={ divsCount }
					trackRef={ trackRef }
					variant={ variant }
				/>
				<Thumb
					ref={ rightThumbRef }
					data={ data }
					divsCount={ divsCount }
					labelPosition='bottom'
					value={ thumbs.right.currentValue }
				/>
			</div>
		</div>
	)
}
