import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  /* border-collapse: collapse; */
`
export const Th = styled.th`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-align: right;
  color: #564dd0;
  padding: 0 5px;
  :first-child {
    text-align: left;
  }
`
export const Tr = styled.tr`
  height: 55px;
  margin: 5px;
  &:not(:first-child) {
  }
`
export const Td = styled.td`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-align: right;
  color: #261047;
  padding: 0 5px;
  border-top: 1px solid #f1f0fa;
  border-bottom: 1px solid #f1f0fa;
  :first-child {
    text-align: left;
    border-left: 1px solid #f1f0fa;
    border-radius: 10px 0 0 10px;
  }
  :nth-child(9) {
    border-right: 1px solid #f1f0fa;
    border-radius: 0 10px 10px 0;
  }
  :last-child {
    border: none;
  }
  :nth-child(8) {
    color: #564dd0;
  }
`
export const InnerDiv = styled.div`
  display: flex;
  align-items: center;
`

export const AssetLogo = styled.img`
  margin: 0 5px;
  width: 21.67px;
  height: 21.67px;
`
export const InputField = styled.input`
  max-width: 5rem;
  border: none;
  height: 40px;
  color: #261047;
  padding: 0 10px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background: #ffffff;
  border: 1px solid #d4d1f3;
  border-radius: 5px;
  text-align: right;
  &:focus {
    outline: none;
  }
`
export const RemoveImg = styled.img`
  cursor: pointer;
`
