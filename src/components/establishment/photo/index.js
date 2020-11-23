import React from 'react'
import Image from '../../image'

const Photo = props => {
  const { establishment } = props

  return (
    <>
      {(establishment.photos) ? <HavePhoto establishment={establishment}/> : <NoPhoto />}
    </>
  )
}

export default Photo

function HavePhoto(props) {
  const { REACT_APP_GOOGLE_API_KEY } = process.env

  const { establishment } = props
  const urlPhoto = 'https://maps.googleapis.com/maps/api/place/photo?'
  const urlPhotoReference = `photoreference=${establishment.photos[0].photo_reference}`
  const urlKey = `key=${REACT_APP_GOOGLE_API_KEY}`
  const urlOptionsImage = 'maxwidth=400'

  return (
    <Image src={`${urlPhoto}${urlPhotoReference}&${urlKey}&${urlOptionsImage}`} alt="Barbershop image" />
  )
}

const NoPhoto = () => (<Image src="/images/no_photo.jpg" alt="Barbershop no image"/>)

