import { useEffect, useState, useRef } from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { Scrollbars } from 'react-custom-scrollbars-2';
import LoadingIndicator from './LoadingIndicator';
import SearchIcon from '../assets/icons/search.svg'
import YelpLogo from '../assets/icons/yelp-logo.svg'
import CloseIcon from '../assets/icons/close.svg'
import ElasticsearchLogo from '../assets/icons/elasticsearch-logo.png'
import Business from './Business'
import Cities from '../data/cities'

/**
 * Component handling the whole businesses section.
 * It handles searchs and display businesses results.
 */
const BusinessesSection = ({ onBusinessHover }) => {
    const [businesses, setBusinesses] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cityValue, setCityValue] = useState('')
    const { promiseInProgress } = usePromiseTracker({area: 'businesses-fetch'});
    const citySelector = useRef()

    /**
     * Detects the enter key down on the input field used for the search.
     */
    const onSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchBusinesses(searchValue)
        }
    }

    useEffect(() => {
        //Default search when loading the page
        searchBusinesses('restaurant')
    }, [])

    /**
    * Redo the search everytime the user select a new city.
    */
    useEffect(() => {
        searchBusinesses(searchValue)
    }, [cityValue])

    /**
     * Fetch businesses from the API based on the given query
     * and filter by city if one is given.
     */
    const searchBusinesses = async (queryTerms) => {
        if (!promiseInProgress && queryTerms && queryTerms !== '') {
            var query = `http://localhost:5000/search/${queryTerms}`
            if (cityValue && cityValue !== 'City' && cityValue !== '') {
                query = `http://localhost:5000/search/${queryTerms}?city=${cityValue}`
            }
            const response = await trackPromise(fetch(query), 'businesses-fetch')
            const data = await response.json()
            setBusinesses(data)
        }
    }

    /**
     * Called when the user resets the city selection.
     * Set back the selectedIndex to '0' which is the default one
     * and update cityValue.
     */
    const onCityCrossClicked = () => {
        //'City' is the default value.
        setCityValue('City')
        citySelector.current.selectedIndex = '0'
    }

    return (
        <section className='businesses-section'>
            <h1>Yelp Elasticsearch Engine <img className='yelp-logo' alt='Logo Yelp' src={YelpLogo}/></h1>
            <div className='search-area'>
                <div className='search-input-wrapper'>
                    <input placeholder='Search...' onChange={(e) => setSearchValue(e.target.value)} onKeyDown={onSearchKeyDown}/>
                    <img className='search-icon' alt='Search icon' src={SearchIcon} onClick={() => searchBusinesses(searchValue)}/>
                </div>
                <div className='sort-wrapper'>
                    <p>City:</p>
                    <select ref={citySelector} name='cities' className='cities-selector' onChange={(e) => setCityValue(e.target.value)}>
                        <option value="">City</option>
                        {Cities.map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <img className='close-icon' alt='Reset city sort icon' src={CloseIcon} onClick={onCityCrossClicked}/>
                </div>
                {(businesses && !promiseInProgress) && <p className='query-results-label'>Your query returned <span>{businesses.length}</span> results</p>}
            </div>
            <LoadingIndicator size={100} area='businesses-fetch'/>
            <Scrollbars autoHeight autoHeightMax={'100%'}>
                <div className='businesses-list'>
                    {businesses.map((business) => <Business key={business.business_id} business={business} onBusinessHover={onBusinessHover}/>)}
                </div>
            </Scrollbars>
            <footer>
                <p>Powered by Elasticsearch</p>
                <img alt='Logo Elasticsearch' src={ElasticsearchLogo}/>
            </footer>
        </section>
    )
}

export default BusinessesSection
