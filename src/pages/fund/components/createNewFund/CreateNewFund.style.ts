import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

interface NavProp {
  to: string
}

export const NavigateTo = styled(NavLink)<NavProp>`
  text-decoration: none;
`
export const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  color: #7678b5;
  margin: 10px 0;
  background: #fcfcfc;
  border: 1px solid #d4d1f3;
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
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100px;
  background: #7e77dd;
  border: 1px solid #7e77dd;
  border-radius: 0px 5px 5px 0px;
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

export const DownArrow = styled.img`
  transform: rotate(-90deg);
`
