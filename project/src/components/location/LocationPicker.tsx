import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Location } from '../../types';
import { searchLocation, getVenuesNearby } from '../../services/location';
import LocationMap from './LocationMap';

interface Venue {
  name: string;
  lat: number;
  lon: number;
  type: string;
}

const LocationPicker: React.FC = () => {
  const { currentLocation, setCurrentLocation } = useApp();
  const [isLocating, setIsLocating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [nearbyVenues, setNearbyVenues] = useState<Venue[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Set default location if none exists
    if (!currentLocation) {
      setCurrentLocation({
        city: 'New York',
        state: 'NY',
        country: 'USA',
        latitude: 40.7128,
        longitude: -74.0060
      });
    }
  }, [currentLocation, setCurrentLocation]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchLocation(query);
      setSearchResults(results.map(result => ({
        city: result.display_name.split(',')[0],
        state: result.display_name.split(',')[1] || '',
        country: result.display_name.split(',').slice(-1)[0],
        latitude: result.lat,
        longitude: result.lon
      })));
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            
            const location: Location = {
              city: data.address.city || data.address.town || data.address.village || '',
              state: data.address.state || '',
              country: data.address.country || '',
              latitude,
              longitude
            };
            
            setCurrentLocation(location);
            
            // Fetch nearby venues
            const venues = await getVenuesNearby(latitude, longitude);
            setNearbyVenues(venues.elements);
          } catch (error) {
            console.error('Error getting location details:', error);
          } finally {
            setIsLocating(false);
            setShowDropdown(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setIsLocating(false);
    }
  };

  const selectLocation = async (location: Location) => {
    setCurrentLocation(location);
    setShowDropdown(false);
    setSearchQuery('');
    
    if (location.latitude && location.longitude) {
      try {
        const venues = await getVenuesNearby(location.latitude, location.longitude);
        setNearbyVenues(venues.elements);
      } catch (error) {
        console.error('Error fetching nearby venues:', error);
      }
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="flex items-center mb-2">
        <MapPin size={16} className="text-gray-600 mr-1" />
        <span className="text-sm font-medium text-gray-700">Location</span>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search location..."
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Search 
              size={18} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          
          <button
            className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            onClick={detectLocation}
            disabled={isLocating}
          >
            <Navigation size={18} />
            {isLocating ? 'Detecting...' : 'Current Location'}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="absolute z-20 w-full bg-white rounded-lg border border-gray-200 shadow-lg mt-1">
            {searchResults.map((result, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
                onClick={() => selectLocation(result)}
              >
                {result.city}, {result.state} {result.country}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Location Display */}
      {currentLocation && (
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-purple-500" />
            <span className="font-medium text-purple-900">
              {currentLocation.city}, {currentLocation.state}
            </span>
          </div>
          <p className="text-sm text-purple-700">
            {currentLocation.country}
          </p>
        </div>
      )}

      {/* Map Component */}
      {currentLocation && <LocationMap />}

      {/* Nearby Venues */}
      {nearbyVenues.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Nearby Venues</h3>
          <div className="bg-white rounded-lg border border-gray-200 divide-y">
            {nearbyVenues.slice(0, 5).map((venue, index) => (
              <div key={index} className="p-3">
                <h4 className="font-medium">{venue.name || 'Unnamed Venue'}</h4>
                <p className="text-sm text-gray-600">
                  {venue.type?.replace('_', ' ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;