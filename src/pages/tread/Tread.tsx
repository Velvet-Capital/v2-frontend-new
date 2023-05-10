import React from 'react'
import TreadOption from './components/treadOption/TreadOption'
import { LeftContainer, RighContainer } from './Tread.style'
import { Container } from '@mui/material'

const Tread = () => {
  return (
    <Container>
      <LeftContainer></LeftContainer>
      <RighContainer>
        <TreadOption />
      </RighContainer>
    </Container>
  )
}

export default Tread
