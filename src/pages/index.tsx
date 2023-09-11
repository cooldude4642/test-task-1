import { DateSlider } from 'components/date-slider'
import { Switcher } from 'components/switcher'
import { useState } from 'react'

export default function Home () {
	const [variant, setVariant] = useState<'months' | 'years'>('years')

	return (
		<div className='flex flex-1 items-center gap-24'>
			<Switcher
				items={ [{ state: 'years', label: 'Все года' }, { state: 'months', label: 'Месяца' }] }
				setState={ setVariant as (state: string) => void }
				state={ variant }
			/>
			<DateSlider
				max={ new Date('2023-01-01') }
				min={ new Date('2021-01-01') }
				variant={ variant }
			/>
		</div>
	)
}
