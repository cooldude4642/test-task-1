import { Dispatch, MouseEventHandler, RefObject, SetStateAction, TouchEventHandler, useEffect } from 'react'
import { Thumbs } from '../helpers/get-init-thumbs'
import { MAX_VALUE } from '../config'

export interface UseRightThumbParameter {
	thumbs: Thumbs
	setThumbs: Dispatch<SetStateAction<Thumbs>>
	trackRef: RefObject<HTMLElement>
	divsCount: number
}

export const useRightThumb = ({ thumbs, setThumbs, trackRef, divsCount }: UseRightThumbParameter) => {
	const handleRightThumbDragStart = (clientX: number) => {
		setThumbs(({ left, right }) => ({
			left,
			right: {
				...right,
				isDragging: true,
				dragStartX: clientX,
			},
		}))
	}

	const handleRightThumbMouseDown: MouseEventHandler = ({ clientX }) => {
		handleRightThumbDragStart(clientX)
	}

	const handleRightThumbTouchStart: TouchEventHandler = ({ touches }) => {
		handleRightThumbDragStart(touches[0].clientX)
	}

	useEffect(() => {
		const handleRightThumbDragging = (clientX: number) => {
			const trackRect = trackRef.current?.getBoundingClientRect()
	
			setThumbs(({ left, right }) => {
				let newDragDelta = ((clientX - right.dragStartX) / (trackRect?.width ?? MAX_VALUE)) * MAX_VALUE
	
				if (right.value + newDragDelta >= MAX_VALUE) {
					newDragDelta = MAX_VALUE - right.value
				} else if ((right.value + newDragDelta) - MAX_VALUE / divsCount <= left.value) {
					newDragDelta = -(right.value - left.value) + MAX_VALUE / divsCount
				}
	
				return {
					left,
					right: {
						...right,
						dragDelta: newDragDelta,
						currentValue: right.value + newDragDelta,
					},
				}
			})
		}

		const handleRightThumbMouseMove = ({ clientX }: MouseEvent) => {
			handleRightThumbDragging(clientX)
		}

		const handleRightThumbTouchMove = ({ touches }: TouchEvent) => {
			handleRightThumbDragging(touches[0].clientX)
		}

		const handleRightThumbDragEnd = () => {
			setThumbs(({ left, right }) => {
				const value = right.currentValue
	
				return {
					left,
					right: {
						value,
						isDragging: false,
						dragStartX: 0,
						dragDelta: 0,
						currentValue: value,
					},
				}
			})
		}

		if (thumbs.right.isDragging) {
			document.addEventListener('mousemove', handleRightThumbMouseMove)
			document.addEventListener('mouseup', handleRightThumbDragEnd)
			document.addEventListener('touchmove', handleRightThumbTouchMove)
			document.addEventListener('touchend', handleRightThumbDragEnd)
		} else {
			document.removeEventListener('mousemove', handleRightThumbMouseMove)
			document.removeEventListener('mouseup', handleRightThumbDragEnd)
			document.removeEventListener('touchmove', handleRightThumbTouchMove)
			document.removeEventListener('touchend', handleRightThumbDragEnd)
		}

		return () => {
			document.removeEventListener('mousemove', handleRightThumbMouseMove)
			document.removeEventListener('mouseup', handleRightThumbDragEnd)
			document.removeEventListener('touchmove', handleRightThumbTouchMove)
			document.removeEventListener('touchend', handleRightThumbDragEnd)
		}
	}, [thumbs.right.isDragging, setThumbs, divsCount, trackRef])

	return {
		handleRightThumbMouseDown,
		handleRightThumbTouchStart,
	}
}