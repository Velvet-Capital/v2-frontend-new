/* eslint-disable @typescript-eslint/no-empty-function */
import Layout from '@/layout/Layout'
import {
  AddImage,
  CheckLable,
  ExitBtn,
  ExitImg,
  FeesContainerDiv,
  FeesDiv,
  HeaderDiv,
  Heading,
  InnerLable,
  InputField,
  Lable,
  LineContainer,
  MainContainer,
  ProgressBar,
  RadioButton,
  RadioButtonDiv,
  StepBtn,
  StepDiv,
  StepText,
  TickImg,
  VerticalContainer,
} from './CreateFund.style'
import ExitImage from './assets/Exit.svg'
import TickImage from './assets/Tick.png'
import CustomizedProgressBars from './components/progressBar/ProgressBar'
import { useState } from 'react'
import SelectToken from './components/seletct/Select'
import AssetDynamicTable from '@/components/assetDynamicTable/AssetDynamicTable'
import { CreateFunProps } from './interfaces/createFundInterfaces'
import {
  createPortfolios,
  deployEnableModule,
  deployNewSafe,
  deployVelvetModule,
  InitializeToken,
} from '@/helper/web3'
import axios from 'axios'
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

interface TokenArray {
  token: string
  allocation: string
  address: string
}

const CreateFund = () => {
  const user = useSelector((state: UserProps) => state.user)
  const [step, setStep] = useState<number>(1)
  const [gnosisState, setGnosisState] = useState(false)
  const [moduleState, setModuleState] = useState(false)
  const [enableState, setEnableState] = useState(false)
  const [tokenArray, setTokenArray] = useState<TokenArray[]>([])
  const [progressBar, setprogressBar] = useState(20)
  const [fundDetails, setFundDetails] = useState<CreateFunProps>({
    name: '',
    createrName: '',
    symbol: '',
    maxInvestment: '',
    minInvestment: '',
    gnosis: false,
    gnosisModule: '',
    gnosisVault: '',
    treasury: '',
    managementFee: '',
    performanceFee: '',
    whitelistedTokens: '',
    public: false,
    transferRestriction: 'anyone',
    transferable: true,
    transferableToPublic: true,
    whitelistTokens: false,
    tokenAllow: false,
  })
  const [recentCreatedFundIndexSwap, setRecentCreatedFundIndexSwap] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    setFundDetails((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  const handletoggleChange = (variable: string, value: boolean) => {
    setFundDetails((prevFormData) => ({
      ...prevFormData,
      [variable]: value,
    }))
  }

  const exitFund = () => {
    setStep(1)
    setprogressBar(10)
  }

  const startDeployFund = async () => {
    setStep(2)

    if (fundDetails.gnosis) {
      const resultNewSafe = await deployNewSafe()
      console.log('🚀 ~ file: CreateFund.tsx:112 ~ startDeployFund ~ resultNewSafe:', resultNewSafe)
      setprogressBar(45)

      const resultVelvetModule = await deployVelvetModule(resultNewSafe!.newSafeAddress)
      console.log(
        '🚀 ~ file: CreateFund.tsx:116 ~ startDeployFund ~ resultVelvetModule:',
        resultVelvetModule,
      )
      setprogressBar(50)

      const resultEnableModule = await deployEnableModule(
        resultVelvetModule,
        resultNewSafe!.safeSdk,
      )
      console.log(
        '🚀 ~ file: CreateFund.tsx:121 ~ startDeployFund ~ resultEnableModule:',
        resultEnableModule,
      )
      setprogressBar(55)

      const updatedFundDetails = {
        ...fundDetails,
        gnosisVault: resultNewSafe!.newSafeAddress,
        gnosisModule: resultVelvetModule,
      }
      setFundDetails(updatedFundDetails)

      const result = await createPortfolios(updatedFundDetails as any)
      console.log(result)

      const indexSwapResult = (
        result.events.IndexInfo.returnValues.indexData[0] as string
      ).toLowerCase()
      console.log(
        '🚀 ~ file: CreateFund.tsx:128 ~ startDeployFund ~ indexSwapResult:',
        indexSwapResult,
      )
      setRecentCreatedFundIndexSwap(indexSwapResult)

      setprogressBar(65)
    } else {
      const result = await createPortfolios(fundDetails as any)
      console.log(result)

      const indexSwapResult = (
        result.events.IndexInfo.returnValues.indexData[0] as string
      ).toLowerCase()
      console.log(
        '🚀 ~ file: CreateFund.tsx:128 ~ startDeployFund ~ indexSwapResult:',
        indexSwapResult,
      )
      setRecentCreatedFundIndexSwap(indexSwapResult)

      setprogressBar(65)
    }
  }

  const endDeployFund = () => {
    setStep(3)
    setprogressBar(90)
    setTokenArray([])
  }

  const initilizeToken = async () => {
    const arrayOfTokens: string[] = []
    const arrayOfDenorms: string[] = []

    tokenArray.forEach((item) => {
      arrayOfTokens.push(item.address)
      arrayOfDenorms.push(item.allocation)
    })

    console.log('🚀 ~ file: CreateFund.tsx:152 ~ initilizeToken ~ arrayOfTokens:', arrayOfTokens)
    console.log('🚀 ~ file: CreateFund.tsx:154 ~ initilizeToken ~ arrayOfDenorms:', arrayOfDenorms)
    const data = await InitializeToken(recentCreatedFundIndexSwap, arrayOfTokens, arrayOfDenorms)
    console.log('🚀 ~ file: CreateFund.tsx:144 ~ initilizeToken ~ data:', data)

    setStep(1)
    setprogressBar(10)
  }

  return (
    <Layout>
      <MainContainer>
        <HeaderDiv>
          <Heading>New fund creation mode</Heading>
          <ExitBtn onClick={exitFund}>
            <ExitImg src={ExitImage} alt='exitImage' />
            Exit
          </ExitBtn>
        </HeaderDiv>
        <ProgressBar>
          <CustomizedProgressBars progress={progressBar} />
        </ProgressBar>
        {step === 1 ? (
          <>
            <StepDiv>
              <StepText>Step 1: Choose name and parameters </StepText>
              <StepBtn onClick={startDeployFund}>Next - Step 2 </StepBtn>
            </StepDiv>
            <LineContainer>
              <Lable>Create fund:</Lable>
              <InputField
                placeholder='Portfolio name'
                value={fundDetails.name}
                onChange={handleInputChange}
                type='text'
                name='name'
              />
              <InputField
                placeholder='Creator name'
                value={fundDetails.createrName}
                onChange={handleInputChange}
                type='text'
                name='createrName'
              />
              <InputField
                placeholder='Ticker'
                value={fundDetails.symbol}
                onChange={handleInputChange}
                type='text'
                name='symbol'
              />
            </LineContainer>
            <LineContainer>
              <Lable>Image:</Lable>
              <AddImage>Add Image</AddImage>
            </LineContainer>
            <LineContainer>
              <Lable>Deposit range:</Lable>
              MIN BNB{' '}
              <InputField
                placeholder='0.01'
                value={fundDetails.minInvestment}
                onChange={handleInputChange}
                type='text'
                name='minInvestment'
              />{' '}
              - MAX BNB
              <InputField
                placeholder='50'
                value={fundDetails.maxInvestment}
                onChange={handleInputChange}
                type='text'
                name='maxInvestment'
              />
            </LineContainer>
            <LineContainer>
              <Lable>User Whitelisting:</Lable>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  checked={fundDetails.whitelistTokens === false}
                  onClick={() => handletoggleChange('whitelistTokens', false)}
                  name='whitelistTokens'
                />
                <InnerLable>Off</InnerLable>
              </RadioButtonDiv>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  checked={fundDetails.whitelistTokens === true}
                  onClick={() => handletoggleChange('whitelistTokens', true)}
                  name='whitelistTokens'
                />
                <InnerLable>On</InnerLable>
              </RadioButtonDiv>
            </LineContainer>
            <LineContainer>
              <Lable>Transfer restriction:</Lable>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  name='transferRestriction'
                  value='anyone'
                  onChange={handleInputChange}
                  checked={fundDetails.transferRestriction === 'anyone'}
                />
                <InnerLable>Transferable to anyone</InnerLable>
              </RadioButtonDiv>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  name='transferRestriction'
                  value='whitlised'
                  onChange={handleInputChange}
                  checked={fundDetails.transferRestriction === 'whitlised'}
                />
                <InnerLable>Transferable only to whitelisted wallets</InnerLable>
                <RadioButtonDiv>
                  <RadioButton
                    type='radio'
                    name='transferRestriction'
                    value='Non'
                    onChange={handleInputChange}
                    checked={fundDetails.transferRestriction === 'Non'}
                  />
                  <InnerLable>Non-transferable</InnerLable>
                </RadioButtonDiv>
              </RadioButtonDiv>
            </LineContainer>
            <LineContainer>
              <Lable>Token allowed:</Lable>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  checked={fundDetails.tokenAllow === false}
                  onClick={() => handletoggleChange('tokenAllow', false)}
                  name='tokenAllow'
                />
                <InnerLable>All</InnerLable>
              </RadioButtonDiv>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  checked={fundDetails.tokenAllow === true}
                  onClick={() => handletoggleChange('tokenAllow', true)}
                  name='tokenAllow'
                />
                <InnerLable>Whitlist</InnerLable>
              </RadioButtonDiv>
              <InputField placeholder='Array Of Tokens' />
            </LineContainer>
            <LineContainer style={{ alignItems: 'start' }}>
              <Lable style={{ marginTop: '10px' }}>Fees:</Lable>
              <FeesContainerDiv>
                <FeesDiv>
                  <InnerLable>Management fee</InnerLable>
                  <InputField
                    style={{ width: '4rem' }}
                    placeholder='2'
                    value={fundDetails.managementFee}
                    onChange={handleInputChange}
                    type='text'
                    name='managementFee'
                  />
                  %
                </FeesDiv>
                <FeesDiv>
                  <InnerLable>Perfomance fee</InnerLable>
                  <InputField
                    style={{ width: '4rem' }}
                    placeholder='20'
                    value={fundDetails.performanceFee}
                    onChange={handleInputChange}
                    type='text'
                    name='performanceFee'
                  />
                  %
                </FeesDiv>
                <FeesDiv>
                  <InnerLable>Wallet for fee collection</InnerLable>
                  <InputField
                    value={fundDetails.treasury}
                    onChange={handleInputChange}
                    type='text'
                    name='treasury'
                  />
                </FeesDiv>
              </FeesContainerDiv>
            </LineContainer>
            <LineContainer>
              <Lable>Vault:</Lable>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  checked={fundDetails.gnosis === false}
                  onClick={() => handletoggleChange('gnosis', false)}
                  name='gnosis'
                />
                <InnerLable>Non-custodial</InnerLable>
              </RadioButtonDiv>
              <RadioButtonDiv>
                <RadioButton
                  type='radio'
                  checked={fundDetails.gnosis === true}
                  onClick={() => handletoggleChange('gnosis', true)}
                  name='gnosis'
                />
                <InnerLable>Multisig</InnerLable>
              </RadioButtonDiv>
            </LineContainer>
          </>
        ) : null}
        {step === 2 ? (
          <>
            <StepDiv>
              <StepText>Step 2: Deploy the fund</StepText>
              <StepBtn onClick={endDeployFund}>Next - Step 3</StepBtn>
            </StepDiv>
            <VerticalContainer>
              <CheckLable>
                Your fund is being created… Please confirm these {fundDetails.gnosis ? 5 : 2}{' '}
                transactions in your wallet:
              </CheckLable>
              {fundDetails.gnosis ? (
                <>
                  <CheckLable>
                    1. Safe creation <TickImg src={TickImage} alt='tick' />
                  </CheckLable>
                  <CheckLable>
                    2. Create Velvet Module <TickImg src={TickImage} alt='tick' />
                  </CheckLable>
                  <CheckLable>
                    3. Enable the module <TickImg src={TickImage} alt='tick' />
                  </CheckLable>
                  <CheckLable>
                    4. Deploy Fund <TickImg src={TickImage} alt='tick' />
                  </CheckLable>
                  {/* <CheckLable>
                    5. Transfer Ownership <TickImg src={TickImage} alt='tick' />
                  </CheckLable> */}
                </>
              ) : (
                <>
                  <CheckLable>
                    1. Deploy Fund <TickImg src={TickImage} alt='tick' />
                  </CheckLable>
                </>
              )}
            </VerticalContainer>
          </>
        ) : null}
        {step === 3 ? (
          <>
            <StepDiv>
              <StepText>Step 3: Create the fund strusture</StepText>
              <StepBtn onClick={initilizeToken}>Submit</StepBtn>
            </StepDiv>
            {tokenArray.length >= 1 ? (
              <AssetDynamicTable tokenArray={tokenArray} setTokenArray={setTokenArray} />
            ) : null}
            <LineContainer>
              <SelectToken
                onClose={() => {}}
                tokenArray={tokenArray}
                setTokenArray={setTokenArray}
              />
            </LineContainer>
          </>
        ) : null}
      </MainContainer>
    </Layout>
  )
}

export default CreateFund
