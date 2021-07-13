import Star from '../assets/icons/star.svg'
import HalfStar from '../assets/icons/half-star.svg'
import EmptyStar from '../assets/icons/empty-star.svg'

/**
 * Component handling stars of a review.
 * It displays the right stars icons based on the stars value.
 */
const StarsRating = ({ stars }) => {
    const loadStars = () => {
        const starsImages = []
        for (var i = 1; i < 6; i++) {
            var star = Star
            if (i > stars) {
                star = i - 0.5 === stars ? HalfStar : EmptyStar
            }
            starsImages.push(<img key={i} alt='Star rating icon' className='star-icon' src={star}/>)
        }
        return starsImages
    }

    return (
        <div className='stars-list'>
            {loadStars()}
        </div>
    )
}

export default StarsRating
