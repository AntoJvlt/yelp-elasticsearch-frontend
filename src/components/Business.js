import { useState, useEffect } from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import StarsRating from "./StarsRating"
import DownArrow from '../assets/icons/down-arrow.svg'
import RightArrow from '../assets/icons/right-arrow.svg'
import ReviewsList from './ReviewsList'
import LoadingIndicator from './LoadingIndicator';

/**
 * Component handling one business in the businesses list.
 */
const Business = ({ business, onBusinessHover }) => {
    const [isToggle, setToggle] = useState(false)
    const [reviews, setReviews] = useState([])
    const [categories, setCategories] = useState([])
    const { promiseInProgress } = usePromiseTracker({area: `reviews-area-${business.business_id}`});

    useEffect(() => {
        //Only fetch reviews once
        if (isToggle && reviews.length === 0 && !promiseInProgress) {
            fetchReviews()
        }
    }, [isToggle])

    /**
     * Parses categories when loading the component.
     */
    useEffect(() => {
        setCategories(business.categories.split(','))
    }, [])

    /**
     * Fetchs reviews of this business from the API and set them in the reviews set.
     */
    const fetchReviews = async () => {
        const response = await trackPromise(fetch(`http://localhost:5000/reviews/${business.business_id}`), `reviews-area-${business.business_id}`)
        const data = await response.json()
        setReviews(data)
    }

    return (
        <div className='business-card' onMouseEnter={() => onBusinessHover(business)}>
            <div className='business-infos-wrapper'>
                <div className='business-main-infos'>
                    <h3>{business.name}</h3>
                    <div className='business-ratings-wrapper'>
                        <p>{business.stars.toFixed(1)}</p>
                        <StarsRating stars={business.stars}/>
                        <p>({business.review_count})</p>
                    </div>
                    <p className='business-address'>{business.address}</p>
                    <p className='business-city-state'>{business.city} - {business.state}</p>
                    <div className='business-categories-list'>
                        {categories.map((categorie) => <p key={categorie} className='business-categorie'>{categorie}</p>)}
                    </div>
                </div>
            </div>
            <div className='reviews-wrapper'>
                <p className='reviews-label' onClick={() => setToggle(!isToggle)}>
                    Reviews <img className='reviews-toggle-icon' alt='Review toggle icon' src={isToggle ? DownArrow : RightArrow}/>
                </p>
                <LoadingIndicator className='reviews-loading-wrapper' size={60} area={`reviews-area-${business.business_id}`}/>
                {
                    (isToggle && !promiseInProgress) &&
                    <ReviewsList reviews={reviews} isToggle={isToggle}/>
                }
            </div>
        </div>
    )
}

export default Business
