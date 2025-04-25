import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { useApp } from '../../context/AppContext';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapCenterProps {
  center: LatLngExpression;
}

const MapCenter: React.FC<MapCenterProps> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

const LocationMap: React.FC = () => {
  const { currentLocation } = useApp();
  
  const defaultCenter: LatLngExpression = [40.7128, -74.0060]; // New York
  const center: LatLngExpression = currentLocation?.latitude && currentLocation?.longitude
    ? [currentLocation.latitude, currentLocation.longitude]
    : defaultCenter;

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenter center={center} />
        {currentLocation?.latitude && currentLocation?.longitude && (
          <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
            <Popup>
              <div className="text-sm">
                <strong>{currentLocation.city}</strong>
                <br />
                {currentLocation.state}, {currentLocation.country}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LocationMap;