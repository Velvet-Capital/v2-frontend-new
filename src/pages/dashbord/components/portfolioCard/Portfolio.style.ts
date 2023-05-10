import styled from 'styled-components'

interface Prop {
  data: number
}
export const CardContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px 20px;
  width: 320px;
  display: flex;
  flex-direction: column;
`
export const ExtraYeild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f0fa;
  margin-left: auto;
  border-radius: 7px;
  width: 75px;
  height: 15px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  color: #7678b5;
`
export const CardHeaderContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 20px 0;
`
export const CardLogo = styled.img`
  width: 40px;
  object-fit: contain;
`
export const CardHeadingDiv = styled.div`
  margin-left: 11px;
  margin-right: 5px;
`
export const CardTitle = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #564dd0;
`
export const CardSubTitle = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #564dd0;
`
export const ToolTipImg = styled.img`
  width: 12px;
`
export const TokenListContainer = styled.div`
  position: relative;
  left: -22px;
  width: 108%;
  direction: rtl; /* This is to get the stack with left on top */
  text-align: left; /* Now need to explitly align left */
  padding: 10px 10px 5px 38px; /* Same value as the negative margin */
  background-color: #f1f0fa;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    /* box-shadow: #564dd0 0px 0.5px 10px; */
  }
`
export const Arrow = styled.img`
  position: absolute;
  width: 15px;
  right: 10px;
  top: 42%;
  opacity: 0.5;
  transform: rotate(-90deg);
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`
export const TokenImg = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: -18px;
  z-index: 0;
  &:hover {
    z-index: 1;
    transform: scale(1.1);
    transition: all 0.2s;
  }
`
export const CardGraphControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 10px;
  margin-top: 20px;
  margin-bottom: 15px;
`
export const CardGraphInnerControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const LastReturn = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #564dd0;
  margin-right: 10px;
`
export const Select = styled.select`
  color: #261047;
  padding: 3px 10px;
  background: #ffffff;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  border: 2px solid #f1f0fa;
`
export const Option = styled.option`
  background-color: #ffffff;
  color: #222;
`
export const ReturnValue = styled.p<Prop>`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${(props) => (props.data > 0 ? '#55D27C' : '#fe6971')};
`
export const GraphContrainer = styled.div`
  width: 100%;
  height: 100px;
`
export const DepositWithdrawButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: #55d27c;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  margin-top: 10px;
  margin-bottom: 12px;
  height: 58px;
`
export const MoreInfoBtn = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #b3b3b3;
  text-align: center;
`
