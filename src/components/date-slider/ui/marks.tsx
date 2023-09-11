import type { RefObject } from 'react'
import { Fragment } from 'react'
import { MONTHS_ABBRS } from '../config'
import type { DateSliderData } from '../helpers/create-data'
import { useMarks } from '../hooks/use-marks'
import { Mark } from './mark'

export interface MarksProps {
	data: DateSliderData
	divScale: number
	divsCount: number
	variant: 'months' | 'years'
	trackRef: RefObject<HTMLElement>
}

export function Marks ({
	data,
	divScale,
	divsCount,
	variant,
	trackRef,
}: MarksProps) {
	const { markWidth, isHidden } = useMarks({ variant, divsCount, trackRef })

	return (
		<>
			{ data.map((yearData) => {
				const { year, months } = yearData

				return (
					<Fragment key={ year }>
						{ months.map(({ index, order }) => {
							if (index === 0) {
								return (
									<Mark
										key={ order }
										divScale={ divScale }
										isHidden={ isHidden }
										markWidth={ markWidth }
										order={ order }
										type='year'
										variant={ variant }
									>
										{ year }
									</Mark>
								)
							}

							return (
								<Mark
									key={ order }
									divScale={ divScale }
									isHidden={ isHidden }
									markWidth={ markWidth }
									order={ order }
									type='month'
									variant={ variant }
								>
									{ MONTHS_ABBRS[index] }
								</Mark>
							)
						}) }
					</Fragment>
				)
			}) }
		</>
	)
}
