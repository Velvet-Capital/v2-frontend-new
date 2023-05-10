import React, { useEffect, useState } from 'react'
import {
  AddAssetBtn,
  EditBtn,
  ExitBtn,
  HeadRight,
  HeadTitle,
  HeaderSmartDiv,
  SmartMainContainer,
} from './SmartManagment.style'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

import AssetStaticTable from '@/components/assetStaticTable/AssetStaticTable'
import AssetDynamicTable from '@/components/assetDynamicTable/AssetDynamicTable'
import AddAssetsModal from '@/modals/AddAssetsModal/AddAssetsModal'

import { onChainRebalanceWeight, onChainRebalanceToken, isPausePortfolio } from '@/helper/web3'

const SmartManagement = () => {
  const fund = useSelector<RootState>((state) => state.singleFund.fund)
  console.log('🚀 ~ file: SmartManagement.tsx:22 ~ SmartManagement ~ fund:', fund)

  const [editToggle, setEditToggle] = useState(false)
  const [addAssetToggle, setAddAssetToggle] = useState(false)
  const [portfolioToken, setPorfolioToken] = useState<
    {
      token: string
      allocation: string
      address: string
    }[]
  >([])
  console.log(
    '🚀 ~ file: SmartManagement.tsx:22 ~ SmartManagement ~ portfolioToken:',
    portfolioToken,
  )

  useEffect(() => {
    const tokenList = [...(fund as any).tokenList].map((item) => ({ ...item }))
    setPorfolioToken(tokenList)
  }, [fund])

  const handlerSmartRebalance = async () => {
    if (!(fund as any).isPortfolioPaused) {
      alert('Please pause the fund first')
      return
    }
    if (!(fund as any).isPortfolioHasInvestment) {
      alert('Please invest in the fund first')
      return
    }

    let filteredPorfolioToken = []

    for (let index = 0; index < (fund as any).tokenList!.length; index++) {
      const oldportfolio = (fund as any).tokenList[index]

      const existIndex = portfolioToken.findIndex(
        (elem) => elem.address.toLowerCase() === oldportfolio.address.toLowerCase(),
      )
      if (existIndex > -1) {
        filteredPorfolioToken.push({ ...portfolioToken[existIndex] })
        portfolioToken.splice(existIndex, 1)
      }
    }

    filteredPorfolioToken = [...filteredPorfolioToken, ...portfolioToken]
    console.log(
      '🚀 ~ file: SmartManagement.tsx:46 ~ handlerSmartRebalance ~ filteredPorfolioToken:',
      filteredPorfolioToken,
    )

    setPorfolioToken(filteredPorfolioToken)

    if ((fund as any).tokenList.length === filteredPorfolioToken.length) {
      let hasAddressChanged = false
      for (let i = 0; i < filteredPorfolioToken.length; i++) {
        if (
          (fund as any).tokenList[i].address.toLowerCase() !==
          filteredPorfolioToken[i].address.toLowerCase()
        ) {
          hasAddressChanged = true
        }
      }
      if (hasAddressChanged) {
        const rebalance = (fund as any).rebalancing
        const newWeight = filteredPorfolioToken.map((elem) => elem.allocation)
        const newTokens = filteredPorfolioToken.map((elem) => elem.address)
        const oldSlipage: string[] = []
        const newSlippage: string[] = []
        const sellslippagelp: string[] = []
        const buyslippagelp: string[] = []
        for (const item of (fund as any).tokenList) {
          oldSlipage.push('100')
          sellslippagelp.push('100')
        }
        for (const item of filteredPorfolioToken) {
          newSlippage.push('100')
          buyslippagelp.push('100')
        }

        const isCorrectWeight = newWeight.reduce((prev, newValue) => prev + +newValue, 0)
        console.log(
          '🚀 ~ file: SmartManagement.tsx:182 ~ handlerSmartRebalance ~ isCorrectWeight:',
          isCorrectWeight,
        )
        if (isCorrectWeight !== 10000) {
          alert('Invalid allocation sum')
          return
        }

        console.log(
          '🚀 ~ file: SmartManagement.tsx:87 ~ handlerSmartRebalance ~ rebalance:',
          rebalance,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:89 ~ handlerSmartRebalance ~ newWeight:',
          newWeight,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:91 ~ handlerSmartRebalance ~ newTokens:',
          newTokens,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:93 ~ handlerSmartRebalance ~ oldSlipage:',
          oldSlipage,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:95 ~ handlerSmartRebalance ~ newSlippage:',
          newSlippage,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:97 ~ handlerSmartRebalance ~ sellslippagelp:',
          sellslippagelp,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:99 ~ handlerSmartRebalance ~ buyslippagelp:',
          buyslippagelp,
        )

        await onChainRebalanceToken(
          rebalance,
          newWeight,
          newTokens,
          oldSlipage,
          newSlippage,
          sellslippagelp,
          buyslippagelp,
        )
      } else {
        const rebalance = (fund as any).rebalancing
        const newWeight = filteredPorfolioToken.map((elem) => elem.allocation)
        const slippageArray: string[] = []
        const slippagelp: string[] = []

        for (const item of filteredPorfolioToken) {
          slippageArray.push('100')
          slippagelp.push('100')
        }

        const isCorrectWeight = newWeight.reduce((prev, newValue) => prev + +newValue, 0)
        console.log(
          '🚀 ~ file: SmartManagement.tsx:182 ~ handlerSmartRebalance ~ isCorrectWeight:',
          isCorrectWeight,
        )
        if (isCorrectWeight !== 10000) {
          alert('Invalid allocation sum')
          return
        }

        console.log(
          '🚀 ~ file: SmartManagement.tsx:87 ~ handlerSmartRebalance ~ rebalance:',
          rebalance,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:89 ~ handlerSmartRebalance ~ newWeight:',
          newWeight,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:91 ~ handlerSmartRebalance ~ slippageArray:',
          slippageArray,
        )
        console.log(
          '🚀 ~ file: SmartManagement.tsx:93 ~ handlerSmartRebalance ~ slippagelp:',
          slippagelp,
        )
        await onChainRebalanceWeight(rebalance, newWeight, slippageArray, slippagelp)
      }
    } else {
      const rebalance = (fund as any).rebalancing
      const newWeight = filteredPorfolioToken.map((elem) => elem.allocation)
      const newTokens = filteredPorfolioToken.map((elem) => elem.address)
      const oldSlipage: string[] = []
      const newSlippage: string[] = []
      const sellslippagelp: string[] = []
      const buyslippagelp: string[] = []
      for (const item of (fund as any).tokenList) {
        oldSlipage.push('100')
        sellslippagelp.push('100')
      }
      for (const item of filteredPorfolioToken) {
        newSlippage.push('100')
        buyslippagelp.push('100')
      }

      const isCorrectWeight = newWeight.reduce((prev, newValue) => prev + +newValue, 0)
      console.log(
        '🚀 ~ file: SmartManagement.tsx:182 ~ handlerSmartRebalance ~ isCorrectWeight:',
        isCorrectWeight,
      )
      if (isCorrectWeight !== 10000) {
        alert('Invalid allocation sum')
        return
      }

      console.log(
        '🚀 ~ file: SmartManagement.tsx:87 ~ handlerSmartRebalance ~ rebalance:',
        rebalance,
      )
      console.log(
        '🚀 ~ file: SmartManagement.tsx:89 ~ handlerSmartRebalance ~ newWeight:',
        newWeight,
      )
      console.log(
        '🚀 ~ file: SmartManagement.tsx:91 ~ handlerSmartRebalance ~ newTokens:',
        newTokens,
      )
      console.log(
        '🚀 ~ file: SmartManagement.tsx:93 ~ handlerSmartRebalance ~ oldSlipage:',
        oldSlipage,
      )
      console.log(
        '🚀 ~ file: SmartManagement.tsx:95 ~ handlerSmartRebalance ~ newSlippage:',
        newSlippage,
      )
      console.log(
        '🚀 ~ file: SmartManagement.tsx:97 ~ handlerSmartRebalance ~ sellslippagelp:',
        sellslippagelp,
      )
      console.log(
        '🚀 ~ file: SmartManagement.tsx:99 ~ handlerSmartRebalance ~ buyslippagelp:',
        buyslippagelp,
      )

      await onChainRebalanceToken(
        rebalance,
        newWeight,
        newTokens,
        oldSlipage,
        newSlippage,
        sellslippagelp,
        buyslippagelp,
      )
    }
  }

  const handlerPause = async () => {
    await isPausePortfolio(true, (fund as any).rebalancing)
  }
  const handlerUnpause = async () => {
    await isPausePortfolio(false, (fund as any).rebalancing)
  }

  return (
    <SmartMainContainer>
      {addAssetToggle && (
        <AddAssetsModal
          onClose={() => setAddAssetToggle(false)}
          tokenArray={portfolioToken}
          setTokenArray={setPorfolioToken}
        />
      )}
      <HeaderSmartDiv data={editToggle}>
        {!editToggle ? (
          <>
            <EditBtn onClick={handlerPause} disabled={(fund as any).isPortfolioPaused}>
              Pause
            </EditBtn>
            <EditBtn onClick={handlerUnpause} disabled={!(fund as any).isPortfolioPaused}>
              UnPause
            </EditBtn>
            <EditBtn onClick={() => setEditToggle(!editToggle)}>Edit</EditBtn>
          </>
        ) : (
          <>
            <HeadTitle>Equally Top-5 Edit mode</HeadTitle>
            <HeadRight>
              <AddAssetBtn onClick={() => setAddAssetToggle(true)}>Add Asset</AddAssetBtn>
              <EditBtn onClick={handlerSmartRebalance}>Submit</EditBtn>
              <ExitBtn onClick={() => setEditToggle(!editToggle)}>Exit</ExitBtn>
            </HeadRight>
          </>
        )}
      </HeaderSmartDiv>
      {editToggle ? (
        <AssetDynamicTable tokenArray={portfolioToken} setTokenArray={setPorfolioToken} />
      ) : (
        <AssetStaticTable tokenArray={portfolioToken} />
      )}
    </SmartMainContainer>
  )
}

export default SmartManagement
