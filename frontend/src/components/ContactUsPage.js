import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ContactUsPage.css';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41]
});

function ContactUsPage() {
  const position = [31.4710615, 74.2386582]; // Updated coordinates for the exact location

  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>
      <div className="contact-us-content">
        <p><strong>Country Office for Pakistan</strong></p>
        <p>Location: 12km Multan Road, Thokar Niaz Baig, Lahore, Punjab 53700, Pakistan.</p>
        <p>Telephone: +92 4235299504, +92 4235299505.</p>
        <p>
          <a href="https://www.openstreetmap.org/?mlat=31.4710615&mlon=74.2386582#map=15/31.4711/74.2387" target="_blank" rel="noopener noreferrer">
            View on OpenStreetMap
          </a>
        </p>
        <div id="map">
          <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
              <Popup>
                12km Multan Road, Thokar Niaz Baig, Lahore, Punjab 53700, Pakistan.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
