import { useState } from 'react';
import BusinessesSection from './components/BusinessesSection';
import MapContainer from './components/MapContainer';
import {isMobile} from 'react-device-detect';
import './App.css';

function App() {
  const [businessHover, setBusinessHover] = useState()

  /**
   * Callback used to get a notification when a new business
   * from the businesses list is hovered.
   * The businessHover is then modified and so it is received by the
   * MapContainer component.
   */
  const onBusinessHover = (business) => {
    setBusinessHover(business)
  }

  //The MapContainer is not created on mobile.
  return (
    <div className='main-wrapper'>
      <BusinessesSection onBusinessHover={onBusinessHover}/>
      {!isMobile && <MapContainer businessHover={businessHover}/>}
    </div>
  );
}

export default App;
