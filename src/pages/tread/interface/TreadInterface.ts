export interface TokenArrayProps {
  tokenArray: {
    token: string
    allocation: string
    address: string
  }[]
  setTokenArray: React.Dispatch<
    React.SetStateAction<
      {
        token: string
        allocation: string
        address: string
      }[]
    >
  >
  selectToken:
    | {
        address: string
        handler: string
        primary: boolean
        rewardToken: string
        token: string
      }
    | undefined
  setSelectToken: React.Dispatch<
    React.SetStateAction<
      | {
          address: string
          handler: string
          primary: boolean
          rewardToken: string
          token: string
        }
      | undefined
    >
  >
}
export interface ProgressProps {
  progress: number
}
export interface FundProps {
  singleFund: {
    fund: []
  }
}
