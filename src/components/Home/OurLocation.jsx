import { TbLocationFilled } from 'react-icons/tb';
import { Link } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Button from '../../shared/Button';

// Fix Leaflet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationSection = () => {
  const address = "EliteClub, Sports City, Dhaka 1207, Bangladesh";
  const position = [23.8103, 90.4125]; // Dhaka coordinates

  return (
    <div className="my-20 md:my-32 px-6" id="location">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mb-6 flex items-center justify-center gap-3">
          <TbLocationFilled className="rotate-90 text-4xl md:text-5xl" />
          <span className="text-[#FF02CB]">Our</span> Location
        </h2>

        <p className="text-lg md:text-xl italic text-gray-600 font-semibold mb-10">{address}</p>

        {/* Interactive Leaflet Map with TileLayer */}
        <div className="w-full h-80 md:h-120 mb-6 overflow-hidden rounded-2xl shadow-lg -z-50">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>📍 EliteClub, Sports City, Dhaka 1207</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Navigate Button */}
        <Link
          to="https://www.google.com/maps/place/Dhaka,+Bangladesh"
          target="_blank"
          title="Google Maps"
          className="flex justify-center mt-10"
        >
          <Button text="Go Now" />
        </Link>
      </div>
    </div>
  );
};

export default LocationSection;
