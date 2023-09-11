import cn from 'classnames'
import type { PropsWithChildren } from 'react'

interface MarkProps extends PropsWithChildren {
	type: 'month' | 'year'
	variant: 'months' | 'years'
	isHidden: boolean
	order: number
	divScale: number
	markWidth: number
}

// NOTE: Здесь можно расписать варианты стилей через cva, но это будет оверкил

export function Mark ({
	variant,
	isHidden,
	order,
	divScale,
	markWidth,
	type,
	children,
}: MarkProps) {
	return (
		<span
			className={ cn(
				'absolute top-[18px] text-center text-[14px] leading-[18px] font-semibold text-ellipsis overflow-hidden',
				type === 'year' && variant === 'years' && 'text-[#999999]',
				type === 'year' && variant === 'months' && 'text-[#333333]',
				type === 'month' && 'text-[#999999]',
				type === 'month' && variant === 'years' && 'hidden',
				isHidden && 'hidden',
			) }
			style={ {
				width: markWidth,
				left: `calc(${ order * divScale }% - ${ markWidth / 2 }px)`,
			} }
		>
			{ children }
		</span>
	)
}
