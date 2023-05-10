import styled from 'styled-components'
import { EditBtnProp } from './interface/styleInterface'

export const SmartMainContainer = styled.div`
  width: auto;
  padding: 20px;
`
export const HeaderSmartDiv = styled.div<EditBtnProp>`
  margin: 20px 0;
  display: flex;
  justify-content: ${(props) => (props.data ? 'space-between' : 'end')};
  align-items: center;
`
export const EditBtn = styled.button`
  height: 40px;
  width: 235px;
  background: #7e77dd;
  border-radius: 10px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
  border: none;
  cursor: pointer;

  &:disabled {
    background: rgba(126, 119, 221, 0.5);
  }
`
export const HeadTitle = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #564dd0;
`
export const HeadRight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 42%;
`

export const AddAssetBtn = styled.button`
  background: #fcfcfc;
  border: 1px dashed #7e77dd;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 235px;
  height: 40px;
  cursor: pointer;
`

export const ExitBtn = styled.button`
  background: #fcfcfc;
  border: 1px solid #7e77dd;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 75px;
  height: 40px;
  cursor: pointer;
`
