import { Table, Td, Th, Tr, InnerDiv } from './PortfolioTable.style'
// import Bitcoin from './assets/Bitcoin.svg'

const PortfolioTable = () => {
  return (
    <Table>
      <Tr>
        <Th>Fund</Th>
        <Th>Clients (#)</Th>
        <Th>Vault Assets</Th>
        <Th>Productive Assets</Th>
        <Th>Liabilities</Th>
        <Th>Total AUM</Th>
        <Th> Change</Th>
      </Tr>
      <Tr>
        <Td>
          <InnerDiv>
            {/* <FundLogo src={Bitcoin} alt='logo' /> */}
            Equally Top-5
          </InnerDiv>
        </Td>
        <Td>10</Td>
        <Td>$20,500</Td>
        <Td>$1,000</Td>
        <Td>$1,000</Td>
        <Td>$25,500</Td>
        <Td>+5%</Td>
      </Tr>
    </Table>
  )
}

export default PortfolioTable
