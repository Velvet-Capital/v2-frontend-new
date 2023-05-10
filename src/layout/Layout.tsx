import { ReactNode } from 'react'
import styled from 'styled-components'

// import Footer from '../footer/Footer'
import Header from '../components/header/Header'
import ConnectModal from '@/modals/ConnectModal/ConnectModal'

const MainContainer = styled.div`
  margin: 15px 25px;
`
const Container = styled.div`
  margin: 20px 0;
`
type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  // component code
  return (
    <MainContainer>
      <Header />
      <Container>{children}</Container>
      <ConnectModal />
      {/* <Footer /> */}
    </MainContainer>
  )
}

export default Layout
