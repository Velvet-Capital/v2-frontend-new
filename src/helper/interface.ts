export interface CreateFunProps {
  name: string
  createrName: string
  symbol: string
  maxInvestment: string
  minInvestment: string
  gnosis: boolean
  gnosisModule: string
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
