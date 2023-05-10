import { AssetLogo, Table, Td, Th, Tr, InnerDiv } from './AssetStaticTable.style'
import Bitcoin from './../assets/Bitcoin.svg'

export interface TokenArrayProps {
  tokenArray: {
    token: string
    allocation: string
    address: string
  }[]
}

const AssetStaticTable = ({ tokenArray }: TokenArrayProps) => {
  return (
    <Table>
      <Tr>
        <Th>Asset</Th>
        <Th>Chain</Th>
        <Th>Amount</Th>
        <Th>Price</Th>
        <Th>Change 24H</Th>
        <Th>USD value</Th>
        <Th>Allocation</Th>
        <Th>APY</Th>
        <Th>Protocol</Th>
      </Tr>

      {tokenArray.map((elem, indx) => {
        return (
          <Tr key={indx}>
            <Td>
              <InnerDiv>
                <AssetLogo src={Bitcoin} alt='logo' />
                {elem.token}
              </InnerDiv>
            </Td>
            <Td>BNB</Td>
            <Td>0.224</Td>
            <Td>$22,739.03</Td>
            <Td>0.21%</Td>
            <Td>$5,100</Td>
            <Td>20%</Td>
            <Td>1%</Td>
            <Td>Venus</Td>
          </Tr>
        )
      })}
    </Table>
  )
}

export default AssetStaticTable
