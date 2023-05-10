import {
  AssetLogo,
  Table,
  Td,
  Th,
  Tr,
  InnerDiv,
  InputField,
  RemoveImg,
} from './AssetDynamicTable.style'
import Bitcoin from './../assets/Bitcoin.svg'
import Cross from './../assets/cross.svg'
import { TokenArrayProps } from '../interface/componentsInterface'

const AssetDynamicTable = ({ tokenArray, setTokenArray }: TokenArrayProps) => {
  const handleClick = (address: string) => {
    setTokenArray((prevTokenArray) =>
      prevTokenArray.filter((element) => element.address !== address),
    )
  }

  const handleAllocation = (address: string, allocation: string) => {
    setTokenArray((prevTokenArray) => {
      const updatedTokenArray = [...prevTokenArray]
      const index = updatedTokenArray.findIndex((elem) => elem.address === address)
      if (index > -1) {
        updatedTokenArray[index].allocation = `${+allocation * 100}`
      }
      return updatedTokenArray
    })
  }

  return (
    <Table>
      <Tr>
        <Th>Asset</Th>
        <Th>Price</Th>
        <Th>Change 24H</Th>
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
            <Td>$22,739.03</Td>
            <Td>0.21%</Td>
            <Td>
              <InputField
                placeholder='20%'
                onChange={(e) => handleAllocation(elem.address, e.target.value)}
              />
            </Td>
            <Td>1%</Td>
            <Td>
              <InputField placeholder='Venus' />
            </Td>
            <Td>
              <RemoveImg src={Cross} alt='cross' onClick={() => handleClick(elem.address)} />
            </Td>
          </Tr>
        )
      })}
    </Table>
  )
}

export default AssetDynamicTable
