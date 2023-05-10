export interface FundProps {
  data: {
    assetManagerConfig: string
    createdAt: string
    exchangeHandler: string
    feeModule: string
    gnosis: boolean
    indexId: string
    indexSwap: string
    isConfirmed: boolean
    maxIndexInvestmentAmount: string
    metaAggregator: string
    minIndexInvestmentAmount: string
    name: string
    offChainIndexSwap: string
    offChainRebalancing: string
    owner: string
    rebalancing: string
    symbol: string
    time: string
    updatedAt: string
    __v: 0
    _assetManagerTreasury: string
    _gnosisModule: string
    _gnosisVault: string
    _id: string
    _managementFee: string
    _performanceFee: string
    _public: boolean
    _transferable: boolean
    _transferableToPublic: boolean
    _whitelistTokens: boolean
    _whitelistedTokens: []
  }
}

export interface UserProps {
  funds: {
    fundList: []
  }
}
