import { LinkImg } from '@/components/header/Header.style'
import { useLocation } from 'react-router-dom'
import { InnerNav, UnorderList, List } from './ManageNavbar.style'
import TreadDark from '../../assets/treadDark.svg'
import SmartDark from '../../assets/SmartDark.svg'
import YeildDark from '../../assets/YeildDark.svg'
import TreadLight from '../../assets/treadLight.svg'
import SmartLight from '../../assets/SmartLight.svg'
import YeildLight from '../../assets/YeildLight.svg'
const ManageNavbar = () => {
  const { pathname } = useLocation()

  return (
    <InnerNav>
      <UnorderList>
        <List to='' color={pathname.endsWith('/manage') ? 'active' : ''}>
          {pathname.endsWith('/manage') ? (
            <LinkImg src={SmartLight} alt='listimg' />
          ) : (
            <LinkImg src={SmartDark} alt='listimg' />
          )}
          smart
        </List>
        <List to='tread' color={pathname.endsWith('tread') ? 'active' : ''}>
          {pathname.endsWith('tread') ? (
            <LinkImg src={TreadLight} alt='listimg' />
          ) : (
            <LinkImg src={TreadDark} alt='listimg' />
          )}
          tread
        </List>

        <List to='yeild' color={pathname.endsWith('yeild') ? 'active' : ''}>
          {pathname.endsWith('yeild') ? (
            <LinkImg src={YeildLight} alt='listimg' />
          ) : (
            <LinkImg src={YeildDark} alt='listimg' />
          )}
          yeild
        </List>
      </UnorderList>
    </InnerNav>
  )
}

export default ManageNavbar
