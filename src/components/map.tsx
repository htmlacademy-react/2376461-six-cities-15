import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet, { LayerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../constants';
import { useMap } from '../hooks/use-map';
import { typeCard, typeCity } from '../types';

type MapProps = {
  city: typeCity;
  offers: typeCard[];
  activeOfferId?: string | null;
};

const defaultMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40,40],
  iconAnchor: [20,20]
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40,40],
  iconAnchor: [20,20]
});

export const Map = ({city,offers,activeOfferId}: MapProps) => {

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({location: city.location, containerRef: mapContainerRef});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect((): void =>{
    if(map){
      map.setView([city.location.latitude,city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  },[city,map]);

  useEffect((): void => {
    if(map){
      offers.forEach((offer): void => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: offer.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
        }).addTo(markerLayer.current);
      });
    }
  },[activeOfferId,map,offers]);


  return <section className='cities__map map' ref={mapContainerRef}/>;
};
