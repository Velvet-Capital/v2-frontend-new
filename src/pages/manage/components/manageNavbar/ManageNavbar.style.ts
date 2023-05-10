import styled from 'styled-components'
import { Link } from 'react-router-dom'
interface NavProps {
  to: string
  color: string
}

export const InnerNav = styled.div`
  width: 100%;
  background-color: #f1f0fa;
  border-radius: 10px;
`
export const UnorderList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
`

export const List = styled(Link)<NavProps>`
  text-decoration: none;
  width: 250px;
  display: flex;
  color: ${(props) => (props.color ? '#ffffff' : '#7678B5')};
  background: ${(props) =>
    props.color ? 'linear-gradient(0deg, #7e77dd 0%, #564dd0 100%)' : '#F1F0FA'};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 40px;
  :focus {
    outline: none;
  }
`
export const ListImg = styled.img``
