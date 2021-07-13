import { useEffect, useState, useRef } from "react"
import Marker from '../assets/icons/marker.png'
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Feature from 'ol/Feature';
import { fromLonLat, transform } from 'ol/proj';
import Icon from 'ol/style/Icon';

/**
 * Component handling the OpenLayers map.
 * OpenStreetMap is used there.
 */
const MapContainer = ({ businessHover }) => {
    const [map, setMap] = useState()
    const [markerLayer, setMarkerLayer] = useState()
    const mapContainer = useRef()

    /*
     * Creates the map when the component is loaded.
     * Map is stored as state for further interactions.
     */
    useEffect(() => {
        const initialMap = new Map({
            layers: [
                new TileLayer({
                source: new OSM(),
                }),
            ],
            target: mapContainer.current,
            view: new View({
                center: transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
                zoom: 2,
            }),
        })
        setMap(initialMap)
    }, [])

    /**
     * Listen to the businessOver state change.
     * It is called whenever a new business is hovered by the user.
     * 
     * Puts a marker on the map at the location of the new hovered business.
     */
    useEffect(() => {
        if (markerLayer) {
            map.removeLayer(markerLayer)
        }
        if (businessHover && map) {    
            addMarkerAndFocusBusiness(businessHover)
        }
    }, [businessHover])

    /**
     * Add a marker on the map at the location of the given business.
     * The view of the map is also modified to be centered on the business location.
     */
    const addMarkerAndFocusBusiness = (business) => {
        const iconFeature = new Feature({
            geometry: new Point(fromLonLat([business.longitude, business.latitude])),
            name: business.name,
        });

        var marker = new LayerVector({
            source: new SourceVector({
                features: [iconFeature]
            }),
            style: new Style({
                image: new Icon({
                    src: Marker,
                    scale: 0.08
                })
            })
        });
        setMarkerLayer(marker)
        map.addLayer(marker);
        map.setView(new View({
            center: transform([business.longitude, business.latitude], 'EPSG:4326', 'EPSG:3857'),
            zoom: 13
        }))
    }
    
    return (
        <section ref={mapContainer} id='map'></section>
    )
}

export default MapContainer
