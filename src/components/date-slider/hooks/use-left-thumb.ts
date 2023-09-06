import { Dispatch, MouseEventHandler, RefObject, SetStateAction, TouchEventHandler, useEffect } from 'react'
import { Thumbs } from '../helpers/get-init-thumbs'
import { MAX_VALUE } from '../config'

export interface UseLeftThumbParameter {
	thumbs: Thumbs
	setThumbs: Dispatch<SetStateAction<Thumbs>>
	trackRef: RefObject<HTMLElement>
	divsCount: number
}

export const useLeftThumb = ({ thumbs, setThumbs, trackRef, divsCount }: UseLeftThumbParameter) => {
	const handleLeftThumbDragStart = (clientX: number) => {
		setThumbs(({ left, right }) => ({
			left: {
				...left,
				isDragging: true,
				dragStartX: clientX,
			},
			right,
		}))
	}

	const handleLeftThumbMouseDown: MouseEventHandler = ({ clientX }) => {
		handleLeftThumbDragStart(clientX)
	}

	const handleLeftThumbTouchStart: TouchEventHandler = ({ touches }) => {
		handleLeftThumbDragStart(touches[0].clientX)
	}

	useEffect(() => {
		const handleLeftThumbDragging = (clientX: number) => {
			const trackRect = trackRef.current?.getBoundingClientRect()
	
			setThumbs(({ left, right }) => {
				let newDragDelta = ((clientX - left.dragStartX) / (trackRect?.width ?? MAX_VALUE)) * MAX_VALUE
	
				if (left.value + newDragDelta <= 0) {
					newDragDelta = -left.value
				} else if ((left.value + newDragDelta) + MAX_VALUE / divsCount >= right.value) {
					newDragDelta = (right.value - left.value) - MAX_VALUE / divsCount
				}
	
				return {
					left: {
						...left,
						dragDelta: newDragDelta,
						currentValue: left.value + newDragDelta,
					},
					right,
				}
			})
		}

		const handleLeftThumbMouseMove = ({ clientX }: MouseEvent) => {
			handleLeftThumbDragging(clientX)
		}

		const handleLeftThumbTouchMove = ({ touches }: TouchEvent) => {
			handleLeftThumbDragging(touches[0].clientX)
		}

		const handleLeftThumbDragEnd = () => {
			setThumbs(({ left, right }) => {
				const value = left.currentValue
	
				return {
					left: {
						value,
						isDragging: false,
						dragStartX: 0,
						dragDelta: 0,
						currentValue: value,
					},
					right,
				}
			})
		}

		if (thumbs.left.isDragging) {
			document.addEventListener('mousemove', handleLeftThumbMouseMove)
			document.addEventListener('mouseup', handleLeftThumbDragEnd)
			document.addEventListener('touchmove', handleLeftThumbTouchMove)
			document.addEventListener('touchend', handleLeftThumbDragEnd)
		} else {
			document.removeEventListener('mousemove', handleLeftThumbMouseMove)
			document.removeEventListener('mouseup', handleLeftThumbDragEnd)
			document.removeEventListener('touchmove', handleLeftThumbTouchMove)
			document.removeEventListener('touchend', handleLeftThumbDragEnd)
		}

		return () => {
			document.removeEventListener('mousemove', handleLeftThumbMouseMove)
			document.removeEventListener('mouseup', handleLeftThumbDragEnd)
			document.removeEventListener('touchmove', handleLeftThumbTouchMove)
			document.removeEventListener('touchend', handleLeftThumbDragEnd)
		}
	}, [thumbs.left.isDragging, setThumbs, divsCount, trackRef])

	return {
		handleLeftThumbMouseDown,
		handleLeftThumbTouchStart,
	}
}