import { Container, InnerDiv, Heading, Value } from './OverAllDetails.style'

const OverAllDetails = () => {
  return (
    <Container>
      <InnerDiv>
        <Heading>Total AUM</Heading>
        <Value>$680,000</Value>
      </InnerDiv>
      <InnerDiv>
        <Heading>Change 24H</Heading>
        <Value>+$50,000</Value>
      </InnerDiv>
      <InnerDiv>
        <Heading> Number of funds</Heading>
        <Value>6 </Value>
      </InnerDiv>
      <InnerDiv>
        <Heading> Number of clients</Heading>
        <Value>116 </Value>
      </InnerDiv>
      <InnerDiv>
        <Heading>Earned fees</Heading>
        <Value>$1,500 </Value>
      </InnerDiv>
    </Container>
  )
}

export default OverAllDetails
