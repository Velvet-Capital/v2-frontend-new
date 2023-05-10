import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ButtonProps } from '../interface/componentsInterface'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  color: #7678b5;
  margin: 10px 0;
  background-color: #f1f0fa;
  position: relative;
  border-radius: 25px;
`
export const UnLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #7678b5;
  background-color: #f1f0fa;
`
export const LinkItem = styled(NavLink)<ButtonProps>`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 40px;
  width: 150px;
  border-radius: 10px;
  color: #7678b5;
  color: ${(props) => (props.color ? '#ffffff' : '#7678B5')};
  background: ${(props) =>
    props.color ? 'linear-gradient(0deg, #7e77dd 0%, #564dd0 100%)' : '#F1F0FA'};
`
export const Logo = styled.img``
export const LinkImg = styled.img`
  margin: 0 5px;
  background: none;
`
export const ConnectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(0deg, #7e77dd 0%, #564dd0 100%);
  border-radius: 25px;
  border: none;
  color: #ffffff;
  height: 50px;
  width: 200px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`
