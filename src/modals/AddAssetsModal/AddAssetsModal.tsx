import { Modal } from './AddAssetsModal.style'
import Select from '@/pages/createFund/components/seletct/Select'

import { TokenArrayProps } from '@/pages/createFund/interfaces/createFundInterfaces'

interface AddAssets extends TokenArrayProps {
  onClose: () => void
}

export default function ConnectModal({ tokenArray, setTokenArray, onClose }: AddAssets) {
  return (
    <div>
      <Modal>
        <Select onClose={onClose} tokenArray={tokenArray} setTokenArray={setTokenArray} />
      </Modal>
    </div>
  )
}
