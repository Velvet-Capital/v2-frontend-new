import React from 'react'
import {
  Container,
  DownArrow,
  LeftContainer,
  Logo,
  NavigateTo,
  PortfolioName,
  RighContainer,
} from './CreateNewFund.style'
import ChevronDown from '../../assets/ChevronRight.svg'
import Add from '../../assets/Add.svg'

const CreateNewFund = () => {
  return (
    <NavigateTo to='../createfund'>
      <Container>
        <LeftContainer>
          <Logo src={Add} alt='logo' />
          <PortfolioName>Create new fund</PortfolioName>
        </LeftContainer>
        <RighContainer>
          <DownArrow src={ChevronDown} alt='ChevronDown' />
        </RighContainer>
      </Container>
    </NavigateTo>
  )
}

export default CreateNewFund
