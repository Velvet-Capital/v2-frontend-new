import styled from 'styled-components'

export const MainContainer = styled.div``
export const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const PercentDiv = styled.div``
export const MaxBtn = styled.button`
  background: #ffffff;
  border: 1px solid #d4d1f3;
  border-radius: 4px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #564dd0;
  width: 40px;
  height: 15px;
  margin-right: 5px;
`
export const Balance = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #564dd0;
`
export const SwapContainer = styled.div`
  position: relative;
`

export const SwapDiv = styled.div`
  background: #f1f0fa;
  border-radius: 5px;
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
`
export const ValueDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  margin-right: 10px;
`
export const TokenPrice = styled.input`
  height: 20px;
  margin: 5px 0;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  background: transparent;
  cursor: text;
  text-align: right;
  border: none;
  color: #262626;
  &:focus {
    outline: none;
  }
`
export const TokenUsdPrice = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #7678b5;
`
export const SelectSwapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 40px;
  border: 1px solid #d4d1f3;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
`
export const BestRouter = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7678b5;
  span {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #55d27c;
    text-transform: uppercase;
    margin: 0 5px;
  }
`
export const SelectDropDownBtn = styled.div`
  cursor: pointer;
  display: flex;
`
export const Logo = styled.img`
  width: 20px;
`
export const SwapName = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #261047;
  margin: 0 5px;
`
export const DownArrowImg = styled.img`
  width: 10px;
  margin: 0 5px;
`

export const InfoContainer = styled.div`
  border: 1px solid #d4d1f3;
  margin: 10px 0;
  border-radius: 5px;
  height: 175px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;

    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #a49ee9;
    border-radius: 5px;
  }
`
export const InnerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`
export const InfoQuestion = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7678b5;
`
export const InfoValue = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #7678b5;
`
export const ExecuteBtn = styled.button`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  height: 50px;
  width: 100%;
  text-align: center;
  border: none;
  color: #ffffff;
  background: #7e77dd;
  border: 1px solid #7e77dd;
  border-radius: 10px;
  cursor: pointer;
`

export const AllSwapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #f1f0fa;
  border-radius: 5px;
  margin: 5px;
  height: 52px;
  padding: 10px;
  &:hover {
    border: 1px solid #7e77dd;
    border-radius: 5px;
  }
`
export const AllSwapLeft = styled.div`
  display: flex;
  flex-direction: column;
`
export const AllSwapRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`
export const AllSwapLeftHeading = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #261047;
  margin: 5px 0;
  &img {
    margin: 0 5px;
    width: 20px;
  }
`
export const AllSwapRightHeading = styled.p`
  display: flex;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #262626;
  margin: 5px 0;
`

export const AllSwapValue = styled.p`
  display: flex;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #7678b5;
`
