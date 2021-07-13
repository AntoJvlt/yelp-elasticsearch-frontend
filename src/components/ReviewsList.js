import { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Review from './Review'

/**
 * Handles the list of reviews of one business.
 */
const ReviewsList = ({ reviews, isToggle }) => {
    const AMOUNT_DISPLAY_STEP = 10
    const [currentDisplayedAmount, setCurrentDisplayedAmount] = useState(0)

    /**
     * Increases the number of reviews displayed.
     * It makes sure that we don't increase further than the total reviews length.
     */
    const showMoreReviews = () => {
        if (currentDisplayedAmount + AMOUNT_DISPLAY_STEP > reviews.length){
            setCurrentDisplayedAmount(reviews.length)
        }else {
            setCurrentDisplayedAmount(currentDisplayedAmount + AMOUNT_DISPLAY_STEP)
        }
    }

    useEffect(() => {
        showMoreReviews()
    }, [])

    useEffect(() => {
        if (!isToggle) {
            setCurrentDisplayedAmount(AMOUNT_DISPLAY_STEP)
        }
    }, [isToggle])

    return (
        <Scrollbars autoHeight autoHeightMax={500}>
            <div className='reviews-list'>
                {reviews.slice(0, currentDisplayedAmount ? currentDisplayedAmount : AMOUNT_DISPLAY_STEP - 1).map((review) => <Review key={review.review_id} review={review}/>)}
                <p className='show-more-reviews' onClick={showMoreReviews}>Show more reviews</p>
            </div>
        </Scrollbars>
    )
}

export default ReviewsList
