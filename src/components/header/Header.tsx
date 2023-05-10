import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store'
//style
import { ConnectBtn, HeaderContainer, LinkItem, LinkImg, Logo, UnLink } from './Header.style'

//assets
import LogoImg from '@/assets/brand/VelvetLogo.svg'

import FundLight from './../assets/Light/Fund.svg'
import DasbordLight from './../assets/Light/Dashbord.svg'
import HelpLight from './../assets/Light/Help.svg'
import ReportLight from './../assets/Light/Report.svg'
import SettingLight from './../assets/Light/Setting.svg'
import WalletImg from './../assets/wallet.svg'
import FundDark from './../assets/Dark/Fund.svg'
import DasbordDark from './../assets/Dark/Dashbord.svg'
import HelpDark from './../assets/Dark/Help.svg'
import ReportDark from './../assets/Dark/Report.svg'
import SettingDark from './../assets/Dark/Setting.svg'
import { fetchAccountDetailsWindow } from '@/helper/web3'
import { resetUser, setAccountDetails } from '@/store/slice/user'
import { fetchFundList } from '@/store/slice/funds'
import { useEffect } from 'react'
import useAccountChange from '@/hooks/accountChange'

interface UserProps {
  user: {
    address: string
    chainId: number
    isConnected: boolean
    walletType: string
    displayAddress: string
  }
  funds: []
}
interface DetailsProps {
  address: string
  chainId: number
  isConnected: boolean
  walletType: string
  balance: string
}

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: UserProps) => state.user)

  const account = useAccountChange()
  const { pathname } = useLocation()
  const connectWallet = async () => {
    const details = await fetchAccountDetailsWindow()
    const typedDetails = details as DetailsProps
    dispatch(
      setAccountDetails({
        address: typedDetails.address,
        isConnected: true,
        chainId: typedDetails.chainId,
        balance: typedDetails.balance,
        walletType: 'metamask',
      }),
    )
  }
  useEffect(() => {
    connectWallet()
  }, [account])

  const dispatchs: AppDispatch = useDispatch()
  useEffect(() => {
    if (user.isConnected) {
      dispatchs(fetchFundList(user.address))
    }
  }, [user.address])

  const disconnectWallet = async () => {
    dispatch(resetUser())
  }
  return (
    <HeaderContainer>
      <Logo src={LogoImg} alt='logo' />
      <UnLink>
        <LinkItem to='/' color={pathname === '/' ? 'active' : ''}>
          <LinkImg src={pathname === '/' ? DasbordLight : DasbordDark} />
          Dashboard
        </LinkItem>
        <LinkItem to='/fund' color={pathname.startsWith('/fund') ? 'active' : ''}>
          <LinkImg src={pathname.startsWith('/fund') ? FundLight : FundDark} />
          Funds
        </LinkItem>
        <LinkItem to='/settings' color={pathname.startsWith('/settings') ? 'active' : ''}>
          <LinkImg src={pathname.startsWith('/settings') ? SettingLight : SettingDark} />
          Settings
        </LinkItem>
        <LinkItem to='/help' color={pathname.startsWith('/help') ? 'active' : ''}>
          <LinkImg src={pathname.startsWith('/help') ? HelpLight : HelpDark} />
          Help
        </LinkItem>
        <LinkItem to='/report' color={pathname.startsWith('/report') ? 'active' : ''}>
          <LinkImg src={pathname.startsWith('/report') ? ReportLight : ReportDark} />
          Reporting
        </LinkItem>
      </UnLink>
      {user.isConnected ? (
        <ConnectBtn onClick={disconnectWallet}>
          {' '}
          <LinkImg src={WalletImg} /> {user.displayAddress}
        </ConnectBtn>
      ) : (
        <ConnectBtn onClick={connectWallet}> Connect</ConnectBtn>
      )}
    </HeaderContainer>
  )
}

export default Header
