import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import establishmentsServices from './services/establishmentsServices'
import Establishment from './components/establishment'

function App() {
  const { REACT_APP_GOOGLE_API_KEY } = process.env

  const [latitude, setLatitude ] = useState(0)
  const [longitude, setLongitude ] = useState(0)
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState({})

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      loadBarbershops()
    }, function(error) {
      alert("Habilite a localização para usar este app.")
    })
  }

  async function loadBarbershops() {
    const response = await establishmentsServices.index(latitude, longitude)
    setLocations(response.data.results)
  }

  useEffect(() => setCurrentLocation(), [])

  return (
    <>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={{height: '100vh', width: '100%'}} zoom={15}
          center={{lat: latitude, lng: longitude}}
        >
          {
            locations.map((item, index) => {
              return(
                <Marker key={index} icon="/images/barbershop.png"
                  title={item.name} animation="4"
                  position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                  onClick={() => setSelected(item)}
                />
              )
            })
          }
          {
            selected.place_id && (
              <Establishment place={selected} />
            )
          }
          <Marker key="current_local" icon="/images/my-location-pin.png" title="Seu local" animation="2" position={{lat: latitude, lng: longitude}} />
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default App;
