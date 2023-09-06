interface ActiveTrackProps {
	leftValue: number
	rightValue: number
}

export function ActiveTrack ({ leftValue, rightValue }: ActiveTrackProps) {
	return (
		<span
			className='absolute z-10 top-[2px] bg-[#5CADEA] h-[6px]'
			style={ {
				left: `${ leftValue }%`,
				right: `${ rightValue }%`,
				width: `${ rightValue - leftValue }%`,
			} }
		/>
	)
}
