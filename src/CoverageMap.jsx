import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'

const serviceLocations = [
  { name: 'StyleDecor Studio · Gulshan', position: [23.7925, 90.4078] },
  { name: 'Banani', position: [23.7937, 90.4066] },
  { name: 'Dhanmondi', position: [23.7465, 90.3760] },
  { name: 'Bashundhara', position: [23.8223, 90.4250] },
]
const locationIcon = L.divIcon({ className: 'coverage-marker', html: '<span></span>', iconSize: [20, 20], iconAnchor: [10, 10] })

export default function CoverageMap() {
  return (
    <MapContainer center={[23.7808, 90.4058]} zoom={12} scrollWheelZoom={false} aria-label="Map showing StyleDecor coverage in Dhaka">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {serviceLocations.map((location) => <Marker key={location.name} position={location.position} icon={locationIcon}><Tooltip>{location.name}</Tooltip></Marker>)}
    </MapContainer>
  )
}
