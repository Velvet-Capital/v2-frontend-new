import {
  Arrow,
  CardContainer,
  CardGraphControl,
  CardGraphInnerControl,
  CardHeaderContainer,
  CardHeadingDiv,
  CardLogo,
  CardSubTitle,
  CardTitle,
  DepositWithdrawButton,
  ExtraYeild,
  GraphContrainer,
  LastReturn,
  MoreInfoBtn,
  Option,
  ReturnValue,
  Select,
  TokenImg,
  TokenListContainer,
  ToolTipImg,
} from './Portfolio.style'
import { styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

import ToolTipImage from '../../assets/toolTipIcon.svg'
import Logo from '../../assets/venuslogo.svg'
import TokenLogo from '../../assets/btc.png'
import ArrowImg from '../../assets/ChevronDown.svg'
import { useState } from 'react'

interface LightTooltipProps extends TooltipProps {
  light?: boolean
}

const LightTooltip = styled(({ className, children, title, ...props }: LightTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} title={title}>
    {children}
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#7678b5',
    borderRadius: '20px',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontFamily: 'Montserrat',
  },
}))
const myArray: number[] = Array.from({ length: 10 }, (_, index) => index + 1)

const PortfolioCard = () => {
  const data = 50
  return (
    <CardContainer>
      <ExtraYeild>EXTRA YIELD</ExtraYeild>
      <CardHeaderContainer>
        <CardLogo src={Logo} alt='logo' />
        <CardHeadingDiv>
          <CardTitle>Yield by Venus</CardTitle>
          <CardSubTitle>by Community</CardSubTitle>
        </CardHeadingDiv>
        <ToolTipImg src={ToolTipImage} alt='tooltip' />
      </CardHeaderContainer>
      <TokenListContainer>
        {myArray.map((elem, index) => {
          return (
            <span key={index}>
              <LightTooltip title={`hello`} placement='top'>
                <TokenImg src={TokenLogo} alt='logo' />
              </LightTooltip>
            </span>
          )
        })}
        <Arrow src={ArrowImg} alt='arrow' />
      </TokenListContainer>
      <CardGraphControl>
        <CardGraphInnerControl>
          <LastReturn>Last</LastReturn>
          <Select>
            <Option>1 day</Option>
            <Option>1 Week</Option>
            <Option>1 Month</Option>
          </Select>
        </CardGraphInnerControl>
        <CardGraphInnerControl>
          <LastReturn>Return</LastReturn>
          <ReturnValue data={data}>+43.86%</ReturnValue>
        </CardGraphInnerControl>
      </CardGraphControl>
      <GraphContrainer />
      <DepositWithdrawButton>Deposit | Withdraw</DepositWithdrawButton>
      <MoreInfoBtn>More info</MoreInfoBtn>
    </CardContainer>
  )
}

export default PortfolioCard
