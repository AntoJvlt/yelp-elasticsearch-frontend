import { useState } from 'react'
import FunnyEmoji from '../assets/icons/funny.svg'
import ThumbUpEmoji from '../assets/icons/thumb-up.png'
import CoolEmoji from '../assets/icons/cool.svg'
import StarsRating from "./StarsRating"

/**
 * Component handling one review of a business.
 */
const Review = ({ review }) => {
    //Max characters displayed for the review's text if showAll is not true.
    const MAX_CHARACTERS = 400
    const [showAll, setShowAll] = useState(false)

    /**
     * Format the date to local format.
     */
    const formatDate = (date) => {
        date = new Date(date)
        return date.toLocaleDateString()
    }

    return (
        <div className='review'>
            <div className='review-stars-date-wrapper'>
                <StarsRating stars={review.stars}/>
                <p>{formatDate(review.date)}</p>
            </div>
            <p className='review-text'>
                {
                    review.text.length <= MAX_CHARACTERS || showAll ?
                    review.text :
                    review.text.substring(0, MAX_CHARACTERS)
                }
            </p>
            {
                review.text.length > MAX_CHARACTERS &&
                <p className='review-show-more' onClick={() => setShowAll(!showAll)}>{ showAll ? 'Hide' : 'Show more' }</p>
            }
            <div className='review-emoji-wrapper'>
                {review.useful > 0 && <p><img alt='Emoji thumb up' src={ThumbUpEmoji}/>{review.useful}</p>}
                {review.funny > 0 && <p><img alt='Emoji funny' src={FunnyEmoji}/>{review.funny}</p>}
                {review.cool > 0 && <p><img alt='Emoji cool' src={CoolEmoji}/>{review.cool}</p>}
            </div>
        </div>
    )
}

export default Review
