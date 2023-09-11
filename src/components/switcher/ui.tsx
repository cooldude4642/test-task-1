import cn from 'classnames'

interface SwitcherItem<T> {
	label: string
	state: T
}

export interface SwitcherProps<T = string> {
	items: SwitcherItem<T>[]
	state: T
	setState(state: T): void
}

export function Switcher ({ items, state, setState }: SwitcherProps) {
	return (
		<div className='flex flex-col whitespace-nowrap items-start gap-[10px] leading-[18px] text-[14px] text-[#0167B3] font-semibold w-min'>
			{ items.map((item) => (
				<button
					key={ item.state }
					className={ cn(
						'relative',
						item.state !== state && 'opacity-50 before:absolute before:h-[1px] before:bg-[#D3DCF1] before:w-full before:bottom-[-1px]',
					) }
					type='button'
					onClick={ () => {
						setState(item.state)
					} }
				>
					{ item.label }
				</button>
			)) }
		</div>
	)
}
