import React from 'react'
import LogoImg from '../../../../assets/brand/VelvetLogo.svg'
import ChevronDown from '../../assets/ChevronDown.svg'
import {
  Container,
  DownArrow,
  InheritedValue,
  InnerHeading,
  LeftContainer,
  Logo,
  Manage,
  NavigateTo,
  PortfolioName,
  RighContainer,
  Value,
  ValueDiv,
} from './CreatedPortfolio.style'
import { FundProps } from '../../interfaces/fundInterfaces'

const CreatedPortfolio = (data: FundProps) => {
  const datas = 125
  return (
    <NavigateTo to={`manage/${data.data.indexSwap}/`}>
      <Container>
        <LeftContainer>
          <Logo src={LogoImg} alt='logo' />
          <PortfolioName>{data.data.name}</PortfolioName>
        </LeftContainer>
        <RighContainer>
          <ValueDiv>
            <InnerHeading>Total AUM</InnerHeading>
            <Value>$25,500</Value>
          </ValueDiv>
          <ValueDiv>
            <InnerHeading>Change 24H</InnerHeading>
            <InheritedValue data={datas}>+$1,275 </InheritedValue>
          </ValueDiv>
          <Manage>Manage</Manage>
          <DownArrow src={ChevronDown} alt='ChevronDown' />
        </RighContainer>
      </Container>
    </NavigateTo>
  )
}

export default CreatedPortfolio
