import { useEffect, useState } from 'react';
import SelectToken from '../select/SelectToken';
import {
  AllSwapContainer,
  AllSwapLeft,
  AllSwapLeftHeading,
  AllSwapRight,
  AllSwapRightHeading,
  AllSwapValue,
  Balance,
  BestRouter,
  DownArrowImg,
  ExecuteBtn,
  HeadDiv,
  InfoContainer,
  InfoQuestion,
  InfoValue,
  InnerInfo,
  Logo,
  MainContainer,
  MaxBtn,
  PercentDiv,
  SelectDropDownBtn,
  SelectSwapContainer,
  SwapContainer,
  SwapDiv,
  SwapName,
  TokenPrice,
  TokenUsdPrice,
  ValueDiv,
} from './TreadOption.style';
import DownArrow from '@/assets/svg/ChevronDown.svg';
import LogoImg from '../../assets/oneInch.svg';
import { useSelector } from 'react-redux';
import { FundProps } from '../../interface/TreadInterface';
import { tokenRegistry } from '@/constant/token';
import { tokenBalance, tokenDecimal } from '@/helper/web3';
import { convertToDecimal, convertToInt } from '@/helper/helper';

const TreadOption = () => {
  const [tokenArray, setTokenArray] = useState<
    {
      token: string;
      allocation: string;
      address: string;
    }[]
  >([]);
  const [tokenArrayToSwap, setTokenArrayToSwap] = useState<
    {
      token: string;
      allocation: string;
      address: string;
    }[]
  >([]);
  const [tokenFromSwap, setTokenFromSwap] = useState<{
    address: string;
    handler: string;
    primary: boolean;
    rewardToken: string;
    token: string;
  }>({
    address: '',
    handler: '',
    primary: false,
    rewardToken: '',
    token: 'Select',
  });
  const [tokenToSwap, setTokenToSwap] = useState<{
    address: string;
    handler: string;
    primary: boolean;
    rewardToken: string;
    token: string;
  }>({
    address: '',
    handler: '',
    primary: false,
    rewardToken: '',
    token: 'Select',
  });
  const [maxValue, setMaxValue] = useState('');
  const [tokenvalue, setTokenvalue] = useState<string | undefined>('');
  const [tokenBal, setTokenBal] = useState<string | undefined>('');
  const [swapDropDownToggle, setSwapDropDownToggle] = useState(false);
  const { fund } = useSelector((state: FundProps) => state.singleFund);

  useEffect(() => {
    setTokenArray((fund as any).tokenList);
    setTokenArrayToSwap(tokenRegistry as any);
    const result:
      | {
          token: string;
          address: string;
          handler: string;
          rewardToken: string;
          primary: boolean;
        }
      | undefined = tokenRegistry.find(
      (elem) => elem.address === (fund as any).tokenList[0].address
    );
    setTokenFromSwap(result!);
    setTokenToSwap(tokenRegistry[0]);
  }, [fund]);
  console.log(fund, 'fund');
  const getTokenBalance = async () => {
    const result = await tokenBalance(
      (fund as any).indexSwap,
      tokenFromSwap?.address
    );
    const decimal = await tokenDecimal(tokenFromSwap?.address);
    const convertToIntValue = convertToInt(result, decimal);
    setTokenBal(convertToIntValue);
  };
  const maxValueSet = async () => {
    const decimal = await tokenDecimal(tokenFromSwap?.address);
    const convertToDecimalValue: string | undefined = convertToDecimal(
      tokenBal,
      decimal
    );
    const result = parseInt(convertToDecimalValue!) * parseFloat(maxValue);
    const convertToIntValue = convertToInt(result.toString(), decimal);
    setTokenvalue(convertToIntValue);
  };
  useEffect(() => {
    getTokenBalance();
  }, [tokenFromSwap]);
  useEffect(() => {
    maxValueSet();
  }, [maxValue]);

  return (
    <MainContainer>
      <HeadDiv>
        <PercentDiv>
          <MaxBtn
            onClick={() => {
              setMaxValue('0.15');
            }}
          >
            15%
          </MaxBtn>
          <MaxBtn
            onClick={() => {
              setMaxValue('0.3');
            }}
          >
            30%
          </MaxBtn>
          <MaxBtn
            onClick={() => {
              setMaxValue('0.5');
            }}
          >
            50%
          </MaxBtn>
          <MaxBtn
            onClick={() => {
              setMaxValue('1');
            }}
          >
            Max
          </MaxBtn>
        </PercentDiv>
        <Balance>Balance {tokenBal} BNB</Balance>
      </HeadDiv>
      <SwapContainer>
        <SwapDiv>
          <SelectToken
            tokenArray={tokenArray}
            setTokenArray={setTokenArray}
            selectToken={tokenFromSwap}
            setSelectToken={setTokenFromSwap as any}
          />
          <ValueDiv>
            <TokenPrice
              value={tokenvalue}
              onChange={(e) => setTokenvalue(e.target.value)}
            />
            <TokenUsdPrice>$283.25</TokenUsdPrice>
          </ValueDiv>
        </SwapDiv>
        <SwapDiv>
          <SelectToken
            tokenArray={tokenArrayToSwap}
            setTokenArray={setTokenArrayToSwap}
            selectToken={tokenToSwap}
            setSelectToken={setTokenToSwap as any}
          />
          <ValueDiv>
            <TokenPrice value={1} />
            <TokenUsdPrice>$283.25</TokenUsdPrice>
          </ValueDiv>
        </SwapDiv>
      </SwapContainer>
      <SelectSwapContainer>
        <BestRouter>
          Router:
          <span>Best</span>
        </BestRouter>
        <SelectDropDownBtn
          onClick={() => setSwapDropDownToggle(!swapDropDownToggle)}
        >
          <Logo src={LogoImg} alt='logo' />
          <SwapName>1inch</SwapName>
          <DownArrowImg src={DownArrow} alt='arrow' />
        </SelectDropDownBtn>
      </SelectSwapContainer>
      <InfoContainer>
        {swapDropDownToggle ? (
          <>
            <AllSwapContainer>
              <AllSwapLeft>
                <AllSwapLeftHeading>
                  <img src={LogoImg} alt='logo' />
                  1inch
                </AllSwapLeftHeading>
                <AllSwapValue>Gas fees ~ $10 </AllSwapValue>
              </AllSwapLeft>
              <AllSwapRight>
                <AllSwapRightHeading>0.22</AllSwapRightHeading>
                <AllSwapValue>$283.25 (-0.37%)</AllSwapValue>
              </AllSwapRight>
            </AllSwapContainer>
            <AllSwapContainer>
              <AllSwapLeft>
                <AllSwapLeftHeading>
                  <img src={LogoImg} alt='logo' />
                  1inch
                </AllSwapLeftHeading>
                <AllSwapValue>Gas fees ~ $10 </AllSwapValue>
              </AllSwapLeft>
              <AllSwapRight>
                <AllSwapRightHeading>0.22</AllSwapRightHeading>
                <AllSwapValue>$283.25 (-0.37%)</AllSwapValue>
              </AllSwapRight>
            </AllSwapContainer>
            <AllSwapContainer>
              <AllSwapLeft>
                <AllSwapLeftHeading>
                  <img src={LogoImg} alt='logo' />
                  1inch
                </AllSwapLeftHeading>
                <AllSwapValue>Gas fees ~ $10 </AllSwapValue>
              </AllSwapLeft>
              <AllSwapRight>
                <AllSwapRightHeading>0.22</AllSwapRightHeading>
                <AllSwapValue>$283.25 (-0.37%)</AllSwapValue>
              </AllSwapRight>
            </AllSwapContainer>
            <AllSwapContainer>
              <AllSwapLeft>
                <AllSwapLeftHeading>
                  <img src={LogoImg} alt='logo' />
                  1inch
                </AllSwapLeftHeading>
                <AllSwapValue>Gas fees ~ $10 </AllSwapValue>
              </AllSwapLeft>
              <AllSwapRight>
                <AllSwapRightHeading>0.22</AllSwapRightHeading>
                <AllSwapValue>$283.25 (-0.37%)</AllSwapValue>
              </AllSwapRight>
            </AllSwapContainer>
          </>
        ) : (
          <>
            <InnerInfo>
              <InfoQuestion>Estimated gas fees</InfoQuestion>
              <InfoValue>~ $10</InfoValue>
            </InnerInfo>
            <InnerInfo>
              <InfoQuestion>Estimated gas fees</InfoQuestion>
              <InfoValue>~ $10</InfoValue>
            </InnerInfo>
            <InnerInfo>
              <InfoQuestion>Estimated gas fees</InfoQuestion>
              <InfoValue>~ $10</InfoValue>
            </InnerInfo>
            <InnerInfo>
              <InfoQuestion>Estimated gas fees</InfoQuestion>
              <InfoValue>~ $10</InfoValue>
            </InnerInfo>
            <InnerInfo>
              <InfoQuestion>Estimated gas fees</InfoQuestion>
              <InfoValue>~ $10</InfoValue>
            </InnerInfo>
            <InnerInfo>
              <InfoQuestion>Estimated gas fees</InfoQuestion>
              <InfoValue>~ $10</InfoValue>
            </InnerInfo>
          </>
        )}
      </InfoContainer>
      <ExecuteBtn>Execute</ExecuteBtn>
    </MainContainer>
  );
};

export default TreadOption;
