import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import {
  CloseLogo,
  ConnectBtn,
  ConnectBtnDiv,
  ConnectContainer,
  ConnectModalTitle,
  CreateWalletBtn,
  CreateWalletDiv,
  CreateWalletInput,
  FooterText,
  Logo,
  MagicLink,
} from './ConnectModal.style'
import { useDispatch, useSelector } from 'react-redux'
import { toggleConnectWallet } from '@/store/slice/modal'
import { ModalState } from '../interface/ConnectModal'
import { Fade } from '@mui/material'
import VelvetLogo from '@/assets/svg/VelvetLogo.svg'
import Cross from '../assets/cross.svg'
import Tick from '../assets/Path.svg'
import MagicLogo from '../assets/magicLink.svg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: '#FFFFFF',
  border: '1px solid #FCFCFC',
  borderRadius: '20px',
  boxShadow: 24,
  p: 2,
}
const backdropStyles = {
  backgroundColor: '#7E77DD',
  opacity: 0.5,
}
export default function ConnectModal() {
  const dispatch = useDispatch()
  const { isConnectWalletModalVisible } = useSelector((state: ModalState) => state.modals)

  return (
    <div>
      <Modal
        open={isConnectWalletModalVisible}
        onClose={() => dispatch(toggleConnectWallet())}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        BackdropProps={{
          style: backdropStyles,
        }}
      >
        <Fade in={isConnectWalletModalVisible}>
          <Box sx={style}>
            <CloseLogo onClick={() => dispatch(toggleConnectWallet())} src={Cross} alt='cross' />
            <ConnectContainer>
              <Logo src={VelvetLogo} alt='logo' />
              <ConnectModalTitle>Connect Wallet</ConnectModalTitle>
              <ConnectBtnDiv>
                <ConnectBtn>MetaMask</ConnectBtn>
                <ConnectBtn>Coinbase wallet</ConnectBtn>
                <ConnectBtn>Wallet Connect</ConnectBtn>
                <ConnectBtn>Binance Wallet</ConnectBtn>
              </ConnectBtnDiv>
              <ConnectModalTitle>Create Wallet</ConnectModalTitle>
              <CreateWalletDiv>
                <CreateWalletInput />
                <CreateWalletBtn src={Tick} alt='check' />
              </CreateWalletDiv>
              <MagicLink src={MagicLogo} alt='magiclink' />
              <FooterText>
                By selecting one of the options you are agree to our Terms of Service and Privacy
                Policy
              </FooterText>
            </ConnectContainer>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
