import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'
import type { Thumbs } from '../helpers/get-init-thumbs'
import { MAX_VALUE } from '../config'

export interface UseThumbParameter {
	thumbs: Thumbs
	setThumbs: Dispatch<SetStateAction<Thumbs>>
	divsCount: number
	trackRef: RefObject<HTMLElement>
	position: 'left' | 'right'
}

export const useThumb = ({
	thumbs,
	setThumbs,
	divsCount,
	trackRef,
	position,
}: UseThumbParameter) => {
	const thumbRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const thumb = thumbRef.current
		const opposite = position === 'left' ? 'right' : 'left'

		const handleDragStart = (clientX: number) => {
			setThumbs((state) => ({
				...state,
				[position]: {
					...state[position],
					isDragging: true,
					dragStartX: clientX,
				},
			}))
		}

		const handleMouseDown = ({ clientX }: MouseEvent) => {
			handleDragStart(clientX)
		}

		const handleTouchStart = ({ touches }: TouchEvent) => {
			handleDragStart(touches[0].clientX)
		}

		thumb?.addEventListener('mousedown', handleMouseDown)
		thumb?.addEventListener('touchstart', handleTouchStart)

		const handleDragging = (clientX: number) => {
			const trackRect = trackRef.current?.getBoundingClientRect()

			setThumbs((state) => {
				const trackWidth = trackRect?.width ?? MAX_VALUE
				const { dragStartX, value } = state[position]
				const oppositeValue = state[opposite].value

				let newDragDelta = ((clientX - dragStartX) / trackWidth) * MAX_VALUE

				if (position === 'left') {
					if (value + newDragDelta <= 0) {
						newDragDelta = -value
					} else if ((value + newDragDelta) + MAX_VALUE / divsCount >= oppositeValue) {
						newDragDelta = (oppositeValue - value) - MAX_VALUE / divsCount
					}
				}

				if (position === 'right') {
					if (value + newDragDelta >= MAX_VALUE) {
						newDragDelta = MAX_VALUE - value
					} else if ((value + newDragDelta) - MAX_VALUE / divsCount <= oppositeValue) {
						newDragDelta = -(value - oppositeValue) + MAX_VALUE / divsCount
					}
				}

				return {
					...state,
					[position]: {
						...state[position],
						dragDelta: newDragDelta,
						currentValue: value + newDragDelta,
					},
				}
			})
		}

		const handleMouseMove = ({ clientX }: MouseEvent) => {
			handleDragging(clientX)
		}

		const handleTouchMove = ({ touches }: TouchEvent) => {
			handleDragging(touches[0].clientX)
		}

		const handleDragEnd = () => {
			setThumbs((state) => {
				const value = state[position].currentValue

				return {
					...state,
					[position]: {
						value,
						isDragging: false,
						dragStartX: 0,
						dragDelta: 0,
						currentValue: value,
					},
				}
			})
		}

		if (thumbs[position].isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleDragEnd)
			document.addEventListener('touchmove', handleTouchMove)
			document.addEventListener('touchend', handleDragEnd)
		} else {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleDragEnd)
			document.removeEventListener('touchmove', handleTouchMove)
			document.removeEventListener('touchend', handleDragEnd)
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleDragEnd)
			document.removeEventListener('touchmove', handleTouchMove)
			document.removeEventListener('touchend', handleDragEnd)
			thumb?.removeEventListener('mousedown', handleMouseDown)
			thumb?.removeEventListener('touchstart', handleTouchStart)
		}
	}, [
		thumbs,
		setThumbs,
		divsCount,
		trackRef,
		thumbRef,
		position,
	])

	return thumbRef
}
