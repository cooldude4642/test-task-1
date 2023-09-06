import { DateSlider } from 'components/date-slider'
import { Switcher } from 'components/switcher'
import { useState } from 'react'

export default function Home() {
	const [variant, setVariant] = useState<'years' | 'months'>('years')

  return (
      <div className='flex items-center gap-12'>
				<Switcher
					state={ variant }
					setState={ setVariant as (state: string) => void }
					items={ [
						{ state: 'years', label: 'Все года' },
						{ state: 'months', label: 'Месяца' }
					] }
				/>
				<DateSlider
					min={ new Date('2021-01-01') }
					max={ new Date('2023-01-01') }
					variant={ variant }
					onChange={ (e) => console.log(e) }
				/>
			</div>
  )
}
