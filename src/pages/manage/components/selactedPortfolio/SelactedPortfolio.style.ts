import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
interface ValueProp {
  data: number
}
interface NavProp {
  to: string
}

export const NavigateTo = styled(NavLink)<NavProp>`
  text-decoration: none;
`
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  color: #7678b5;
  margin: 10px 0;
  background: #fcfcfc;
  /* border: 1px solid #d4d1f3; */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 5px;
`
export const LeftContainer = styled.div`
  margin: 0 25px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 40%;
`
export const RighContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 60%;
  margin: 0 25px;
`
export const Logo = styled.img`
  width: 40px;
  height: 40px;
`
export const PortfolioName = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin: 0 10px;
  color: #564dd0;
`
export const InnerHeading = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-align: right;
  color: #564dd0;
`
export const Value = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */
  text-align: right;
  color: #564dd0;
`
export const ValueDiv = styled.div`
  width: 100px;
  margin-right: 35px;
`
export const InheritedValue = styled(Value)<ValueProp>`
  color: ${(props) => (props.data > 0 ? '#55D27C' : '#FE6971')};
`
export const Manage = styled.button`
  margin-right: 25px;
  width: 237px;
  height: 40px;
  background: #7e77dd;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  cursor: pointer;
`
export const DownArrow = styled.img`
  cursor: pointer;
  transform: rotate(-180deg);
`
