
import cn from 'classnames'
import type { MouseEventHandler, TouchEventHandler } from 'react'
import { MONTHS } from '../config'
import type { DateSliderData } from '../helpers/create-data'
import { getMonthIdxByValue } from '../helpers/get-month-idx-by-value'
import { getYearByValue } from '../helpers/get-year-by-value'

interface LeftThumbProps {
	value: number
	data: DateSliderData
	divsCount: number
	onMouseDown: MouseEventHandler
	onTouchStart: TouchEventHandler
}

export function LeftThumb ({
	value, data, divsCount, onMouseDown, onTouchStart
}: LeftThumbProps) {
	const month = MONTHS[getMonthIdxByValue({ value, data, divsCount })]
	const year = getYearByValue({ value, data, divsCount })

	return (
		<>
			<span
				className='absolute z-20 top-[-5px] w-5 h-5 border-[5px] border-[#5CADEA] rounded-full bg-[#FFFFFF] border-solid shadow-[0px_3px_5px_0px_#1F558433] cursor-pointer'
				style={ { left: `calc(${ value }% - 10px)` } }
				onMouseDown={ onMouseDown }
				onTouchStart={ onTouchStart }
			/>
			<div
				className='z-20 w-32 absolute top-[-78px]'
				style={ { left: `calc(${ value }% - 64px)` } }
			>
				<div
					className={ cn('absolute w-min flex flex-col items-center px-[14px] py-[6px] rounded-[10px] left-0 right-0 mx-auto bg-[#FFFFFF] shadow-[0px_5px_15px_0px_#0E588F33] text-[#0167B3] text-[18px] leading-[24px] font-semibold') }
				>
					<span className='z-10 w-[16px] h-[16px] rounded-[2px] bg-[#FFFFFF] absolute -bottom-1 transform rotate-45'/>
					<span className='z-20'>{ month }</span>
					<span className='z-20'>{ year }</span>
				</div>
			</div>
		</>
	)
}
