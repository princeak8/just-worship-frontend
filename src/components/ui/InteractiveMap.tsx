import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapStyles = `
  .leaflet-container {
    z-index: 1 !important;
  }
  .leaflet-control-container {
    z-index: 1000 !important;
  }
  .leaflet-popup-pane {
    z-index: 1200 !important;
  }
  .leaflet-tooltip-pane {
    z-index: 1100 !important;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = mapStyles;
  if (!document.head.querySelector('style[data-leaflet-custom]')) {
    styleElement.setAttribute('data-leaflet-custom', 'true');
    document.head.appendChild(styleElement);
  }
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  name: string;
  country: string;
  coordinates: [number, number];
  address?: string;
  cities?: string[];
  isSpecific?: boolean;
  cityName?: string;
}

interface InteractiveMapProps {
  selectedCountry: string;
  selectedCity?: string;
}

const locations: Location[] = [
  {
    name: 'Just Worship New Layout Campus',
    country: 'Nigeria',
    coordinates: [6.431668328244832, 7.499444329053613],
    address: '38 Edinburgh Road, Opposite Urban Girls Secondary School, New Layout',
    isSpecific: true,
    cityName: 'New Layout Campus'
  },
  {
    name: 'Just Worship Belgium Campus',
    country: 'Belgium',
    coordinates: [51.02345998353483, 4.487818509671712],
    address: 'Thomas Moore University, C3 Campus de vest Mechelen, Belgium',
    isSpecific: true,
    cityName: 'Mechelen Campus'
  }
];

const specificLocationIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const generalLocationIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33]
});

const MapController = ({ selectedCountry, selectedCity }: { selectedCountry: string; selectedCity?: string }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCity) {
      const campusLocation = locations.find(loc => 
        loc.country === selectedCountry && 
        loc.cityName === selectedCity
      );
      
      if (campusLocation) {
        map.setView(campusLocation.coordinates, 15, { animate: true });
        return;
      }
    }

    const countryLocation = locations.find(loc => loc.country === selectedCountry);
    
    if (countryLocation) {
      map.setView(countryLocation.coordinates, 12, { animate: true });
    }
  }, [selectedCountry, selectedCity, map]);

  return null;
};

const InteractiveMap = ({ selectedCountry, selectedCity }: InteractiveMapProps) => {
  const defaultCenter: [number, number] = [20, 0]; 
  const defaultZoom = 2;

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg relative z-10">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        keyboard={true}
        boxZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedCountry={selectedCountry} selectedCity={selectedCity} />
        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={location.coordinates}
            icon={location.isSpecific ? specificLocationIcon : generalLocationIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{location.name}</h3>
                {location.address && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Address:</p>
                    <p className="text-sm">{location.address}</p>
                  </div>
                )}
                {location.cities && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Cities:</p>
                    <p className="text-sm">{location.cities.join(', ')}</p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap; 