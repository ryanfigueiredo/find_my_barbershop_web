import React, { useState, useEffect } from 'react'
import establishmentsServices from '../../services/establishmentsServices'
import LeftBar from '../../components/leftBar'
import Paragraph from '../../components/paragraph'
import Title from '../../components/title'
import Photo from './photo'
import OpeningHours from './openingHours'

const Establishment = props => {
  const [establishment, setEstablishment] = useState([])

  useEffect(() => getEstablishmentsDetails(), [props.place])

  async function getEstablishmentsDetails() {
    try {
      const response = await establishmentsServices.show(props.place.place_id)
      setEstablishment(response.data.result)
    } catch (error) {
      setEstablishment([])
    }
  }

  return (
    <LeftBar>
      <Photo establishment={establishment}/>
      <Title>{establishment.name}</Title>
      <OpeningHours establishment={establishment} />
      <hr/>
      <Paragraph>{establishment.formatted_address}</Paragraph>
    </LeftBar>
  )
}

export default Establishment
