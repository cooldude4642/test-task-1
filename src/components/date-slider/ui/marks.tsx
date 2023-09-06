import cn from 'classnames'
import { Fragment } from 'react'
import { MONTHS_ABBRS } from '../config'
import type { DateSliderData } from '../helpers/create-data'

export interface MarksProps {
	data: DateSliderData
	divScale: number
	variant: 'months' | 'years'
}

export function Marks ({
	data,
	divScale,
	variant,
}: MarksProps) {
	return (
		<>
			{ data.map((yearData) => {
				const { year, months } = yearData

				return (
					<Fragment key={ year }>
						{ months.map(({ index, order }) => {
							if (index === 0) {
								return (
									<span
										key={ order }
										className={ cn(
											'absolute top-[18px] w-10 text-[#333333] text-center text-[14px] leading-[18px] font-semibold',
											variant === 'years' ? 'text-[#999999]' : 'text-[#333333]',
										) }
										style={ { left: `calc(${ order * divScale }% - 20px)` } }
									>
										{ year }
									</span>
								)
							}

							return (
								<span
									key={ order }
									className={ cn(
										'absolute top-[18px] w-10 text-[#999999] text-center text-[14px] leading-[18px] font-semibold',
										variant === 'years' && 'hidden',
									) }
									style={ { left: `calc(${ order * divScale }% - 20px)` } }
								>
									{ MONTHS_ABBRS[index] }
								</span>
							)
						}) }
					</Fragment>
				)
			}) }
		</>
	)
}
