import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

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
declare global {
  interface Window {
    ethereum?: any
  }
}
// Hook
const useAccountChange = () => {
  const [accountId, setAccountId] = useState<string | undefined>(undefined)
  const { isConnected, walletType } = useSelector((state: UserProps) => state.user)

  useEffect(() => {
    const accountWasChanged = (accounts: string) => {
      setAccountId(accounts)
    }

    if (window.ethereum !== undefined) {
      if (walletType === 'metamask') {
        window.ethereum.on('accountsChanged', accountWasChanged)
      }
    }
  }, []) // Empty array ensures that effect is only run on mount

  return accountId
}

export default useAccountChange
