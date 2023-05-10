export interface TokenArrayProps {
  tokenArray: {
    address: string
    token: string
    allocation: string
  }[]
  setTokenArray: React.Dispatch<
    React.SetStateAction<
      {
        address: string
        token: string
        allocation: string
      }[]
    >
  >
}
export interface ProgressProps {
  progress: number
}

export interface CreateFunProps {
  name: string
  createrName: string
  symbol: string
  maxInvestment: string
  minInvestment: string
  gnosis: boolean
  gnosisModule?: string
  gnosisVault: string
  treasury: string
  managementFee: string
  performanceFee: string
  whitelistedTokens: string
  transferRestriction: string
  public: boolean
  transferable: boolean
  transferableToPublic: boolean
  whitelistTokens: boolean
  tokenAllow: boolean
}
