export interface ButtonProps {
  color: string
  to: string
}

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
}
