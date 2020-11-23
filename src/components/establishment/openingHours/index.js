import React from 'react'
import Paragraph from '../../paragraph'

const OpeningHours = props => {
  const { establishment } = props
  const openingHours = establishment.opening_hours

  return (
    <>
      {
        openingHours ?
          <div>
            { openingHours.open_now ? "Aberto" : "Fechado" }
            <hr/>

            <WorkingDays workingDayss={openingHours.weekday_text} />
          </div> :
        <Paragraph>Não há cadastro de dias e horários abertos</Paragraph>
      }
    </>
  )
}

export default OpeningHours

function WorkingDays(props) {
  const { workingDayss } = props

  return workingDayss.map((schedule, index) => <Paragraph key={index}>{schedule}</Paragraph> )
}
