import Web3 from 'web3';
import Web3Adapter from '@safe-global/safe-web3-lib';
import Safe, {
  SafeFactory,
  SafeAccountConfig,
  ContractNetworksConfig,
} from '@safe-global/safe-core-sdk';
import qs from 'qs';
import IndexFactory from '@/contract/abi/indexFactory.json';
import IndexSwap from '@/contract/abi/indexSwap.json';
import VelvetSafeAbi from '@/contract/abi/velvetSafeAbi.json';
import Rebalance from '@/contract/abi/rebalance.json';
import TokenRegAbi from '@/contract/abi/tokenReg.json';
import Erc20Abi from '@/contract/abi/erc20.json';
import IHandlerAbi from '@/contract/abi/iHandler.json';
import MetaAggregatorAbi from '@/contract/abi/metaAggrigator.json';

import bytecode from '@/constant/byteCode';
import contractAddresses, {
  SwapHandlerAddress,
  oXAddress,
  tokenRegAddress,
} from '@/constant/contract';

import { CreateFunProps } from './interface';
import axios from 'axios';
import { BigNumber } from 'ethers';

let web3 = new Web3(Web3.givenProvider);
const connected = true;

export const initWeb3 = async () => {
  if (connected) {
    web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
  }
};

initWeb3();

export const fetchAccountDetailsWindow = async () => {
  try {
    web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
    const account = await web3.eth.requestAccounts();
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.getChainId();
    let balance = await web3.eth.getBalance(account[0]);
    balance = web3.utils.fromWei(balance, 'ether');
    const user = {
      address: account[0],
      networkId,
      chainId,
      balance: parseFloat(balance).toFixed(2),
    };
    if (account.length > 0) return user;
  } catch (error) {
    return error;
  }
};

export const createPortfolios = async (data: CreateFunProps) => {
  console.log('🚀 ~ file: web3.ts:50 ~ createPortfolios ~ data:', data);
  const account = await web3.eth.requestAccounts();
  const buyAddress = account[0];
  let transfer = false;
  let transferToPublic = false;
  if (data.whitelistTokens) {
    if (data.transferRestriction === 'anyone') {
      transfer = true;
      transferToPublic = true;
    } else if (data.transferRestriction === 'non') {
      transfer = false;
      transferToPublic = false;
    } else if (data.transferRestriction === 'whitelisted') {
      transfer = true;
      transferToPublic = false;
    }
  } else {
    if (data.transferRestriction === 'anyone') {
      transfer = true;
      transferToPublic = true;
    } else if (data.transferRestriction === 'non') {
      transfer = false;
      transferToPublic = false;
    }
  }

  const fundValue = {
    name: data.name,
    symbol: data.symbol,
    maxIndexInvestmentAmount: web3.utils
      .toWei(data.maxInvestment, 'ether')
      .toString(),
    minIndexInvestmentAmount: web3.utils
      .toWei(data.minInvestment, 'ether')
      .toString(),
    _managementFee: parseInt(data.managementFee) * 100,
    _performanceFee: parseInt(data.performanceFee) * 100,
    gnosis: data.gnosis,
    _gnosisVault: data.gnosis
      ? data.gnosisVault
      : '0x0000000000000000000000000000000000000000',
    _gnosisModule: data.gnosis
      ? data.gnosisVault
      : '0x0000000000000000000000000000000000000000',
    _assetManagerTreasury: data.treasury,
    _whitelistedTokens: data.tokenAllow
      ? data.whitelistedTokens.split(',')
      : ['0x0000000000000000000000000000000000000000'],
    _public: data.public,
    _transferable: transfer,
    _transferableToPublic: transferToPublic,
    _whitelistTokens: data.tokenAllow,
  };
  console.log(
    '🚀 ~ file: web3.ts:94 ~ createPortfolios ~ fundValue:',
    fundValue
  );

  try {
    const ContractInstance = await new web3.eth.Contract(
      IndexFactory.abi as [],
      contractAddresses.IndexFactory[56]
    );
    const contractData = await ContractInstance.methods
      .createIndex(fundValue)
      .send({
        from: buyAddress,
        gas: 8000000,
      });
    console.log(contractData);

    return contractData;
  } catch (error) {
    console.log(error);
  }
};

export const deployNewSafe = async () => {
  try {
    const account = await web3.eth.requestAccounts();
    const owner = account[0];
    const ethAdapter = new Web3Adapter({
      web3,
      signerAddress: owner,
    });

    const contractNetworkConfig: any = {
      multiSendAddress: contractAddresses.MULTI_SEND_ADDRESS,
      safeMasterCopyAddress: contractAddresses.SAFE_MASTER_COPY_ADDRESS,
      safeProxyFactoryAddress: contractAddresses.SAFE_PROXY_FACTORY_ADDRESS,
    };
    const contractNetworks: ContractNetworksConfig = {
      [56]: contractNetworkConfig,
    };

    const safeFactory = await SafeFactory.create({
      ethAdapter,
      contractNetworks,
      isL1SafeMasterCopy: true,
    });
    const owners = [owner];
    const threshold = 1;
    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold,
    };
    const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });
    const newSafeAddress = safeSdk.getAddress();
    // txn needs to be done by user
    console.log('Safe deployed to: ', newSafeAddress);
    return { newSafeAddress, safeSdk };
  } catch (e) {
    console.log(e);
  }
};

export const deployVelvetModule = async (newSafeAddress: string) => {
  try {
    const account = await web3.eth.requestAccounts();
    const owner = account[0];

    const deploy_contract = new web3.eth.Contract(VelvetSafeAbi.abi as []);
    const payload = {
      data: bytecode,
    };
    const parameter = {
      from: owner,
      gas: 8000000,
    };
    let veletSafeContract = '';
    await deploy_contract
      .deploy({
        data: '0x' + payload.data,
        arguments: [newSafeAddress],
      })
      .send(parameter, (err, transactionHash) => {
        console.log('Transaction Hash :', transactionHash);
        console.log(err, 'err');
      })
      .on('confirmation', () => {
        console.log('confirm');
      })
      .then((newContractInstance) => {
        console.log(
          'Deployed Contract Address : ',
          newContractInstance.options.address
        );
        veletSafeContract = newContractInstance?.options?.address;
      });
    return veletSafeContract;
  } catch (e) {
    console.log(e);
  }
};

export const deployEnableModule = async (
  veletSafeContract: any,
  safeSdk: any
) => {
  try {
    const safeTransaction = await safeSdk.createEnableModuleTx(
      veletSafeContract
    );
    const txResponse = await safeSdk.executeTransaction(safeTransaction);
    await txResponse.transactionResponse?.wait();
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const InitializeToken = (
  portfolioAddress: string,
  arrayOfTokens: string[],
  arrayOfDenorms: string[]
) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const account = await web3.eth.requestAccounts();
    const buyAddress = account[0];
    try {
      const contractInstance = await new web3.eth.Contract(
        IndexSwap.abi as [],
        portfolioAddress
      );

      const contractData = await contractInstance.methods
        .initToken(arrayOfTokens, arrayOfDenorms)
        .send({
          from: buyAddress,
          gas: 8000000,
        });

      resolve(contractData);
    } catch (error) {
      reject(error);
    }
  });

export const getPorfolioTokenList = async (portfolioAddress: string) => {
  console.log(
    '🚀 ~ file: web3.ts:236 ~ getPorfolioTokenList ~ getPorfolioTokenList:'
  );
  try {
    const ContractInstance = await new web3.eth.Contract(
      IndexSwap.abi as [],
      portfolioAddress
    );
    const listOfToken = await ContractInstance.methods.getTokens().call();
    console.log(listOfToken, 'listOfToken');
    return listOfToken;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
};

export const onChainRebalanceWeight = async (
  rebalanceAddress: string,
  weightArray: string[],
  slippageArray: string[],
  slippagelp: string[]
) => {
  try {
    const account = await web3.eth.requestAccounts();
    const buyAddress = account[0];
    const ContractInstance = new web3.eth.Contract(
      Rebalance.abi as [],
      rebalanceAddress
    );
    await ContractInstance.methods
      .updateWeights(weightArray, slippageArray, slippagelp, SwapHandlerAddress)
      .send({
        from: buyAddress,
        gas: 8000000,
      });
  } catch (e) {
    console.log(e, 'e');
  }
};

export const onChainRebalanceToken = async (
  rebalanceAddress: string,
  weightArray: string[],
  arrayOfToken: string[],
  oldSlippage: string[],
  newSlippage: string[],
  sellslippagelp: string[],
  buyslippagelp: string[]
) => {
  try {
    const account = await web3.eth.requestAccounts();
    const buyAddress = account[0];
    const ContractInstance = new web3.eth.Contract(
      Rebalance.abi as [],
      rebalanceAddress
    );
    await ContractInstance.methods
      .updateTokens({
        tokens: arrayOfToken,
        _swapHandler: SwapHandlerAddress,
        denorms: weightArray,
        _slippageSell: oldSlippage,
        _slippageBuy: newSlippage,
        _lpSlippageSell: sellslippagelp,
        _lpSlippageBuy: buyslippagelp,
      })
      .send({
        from: buyAddress,
        gas: 8000000,
      });
  } catch (e) {
    console.log(e, 'e');
  }
};
export const tokenBalance = async (
  portfolioAddress: string,
  address: string
) => {
  try {
    console.log(portfolioAddress, address);
    const TokenRegInstance = await new web3.eth.Contract(
      TokenRegAbi.abi as [],
      tokenRegAddress
    );
    const TokenHandler = await TokenRegInstance.methods
      .getTokenInformation(address)
      .call();
    const checkNonDerivative = await TokenRegInstance.methods
      .checkNonDerivative(TokenHandler[2])
      .call();
    console.log(TokenHandler[2], checkNonDerivative, 'TokenHandler');
    const indexSwapContractInstance = await new web3.eth.Contract(
      IndexSwap.abi as [],
      portfolioAddress
    );
    const vault = await indexSwapContractInstance.methods.vault().call();

    const Erc20Instance = await new web3.eth.Contract(
      Erc20Abi.abi as [],
      web3.utils.toChecksumAddress(address)
    );
    const handler = await new web3.eth.Contract(
      IHandlerAbi.abi as [],
      TokenHandler[2]
    );
    if (checkNonDerivative) {
      const buyAmount = await handler.methods
        .getTokenBalance(vault, address)
        .call();
      console.log(buyAmount);
      return buyAmount;
    } else {
      const buyAmount = await Erc20Instance.methods.balanceOf(vault).call();
      console.log(buyAmount);
      return buyAmount;
    }
  } catch (e) {
    console.log(e);
  }
};

export const tokenDecimal = async (address: string) => {
  try {
    const Erc20Instance = await new web3.eth.Contract(
      Erc20Abi.abi as [],
      web3.utils.toChecksumAddress(address)
    );
    const decimal = await Erc20Instance.methods.decimals().call();
    return decimal;
  } catch (e) {
    console.log(e);
  }
};
interface RedeemMetaaggrigatorProp {
  sAmount: string;
  sToken: string;
  rebalanceAddress: string;
  slippagelp: string;
}

export const redeemtoken = async ({
  sAmount,
  sToken,
  rebalanceAddress,
  slippagelp,
}: RedeemMetaaggrigatorProp) => {
  try {
    const account = await web3.eth.requestAccounts();
    const buyAddress = account[0];
    const ContractInstance1 = await new web3.eth.Contract(
      MetaAggregatorAbi.abi as [],
      rebalanceAddress
    );
    const tx = await ContractInstance1.methods
      .redeem(sAmount, slippagelp, web3.utils.toChecksumAddress(sToken))
      .send({
        from: buyAddress,
        gas: 8000000,
      });
    return tx;
  } catch (e) {
    console.log(e);
  }
};
interface ZeroxProp {
  sAmount: string;
  sToken: string;
  bToken: string;
  slippage: string;
  rebalanceAddress: string;
  IndexSwapAddress: string;
}
export const zeroxSellAmount = async ({
  sAmount,
  sToken,
  bToken,
  slippage,
  rebalanceAddress,
  IndexSwapAddress,
}: ZeroxProp) => {
  try {
    const account = await web3.eth.requestAccounts();
    const buyAddress = account[0];
    const ContractInstance1 = await new web3.eth.Contract(
      MetaAggregatorAbi.abi as [],
      rebalanceAddress
    );
    const tx = await ContractInstance1.methods
      .redeem(
        web3.utils.toWei(sAmount, 'ether'),
        web3.utils.toChecksumAddress(sToken),
        SwapHandlerAddress
      )
      .send({
        from: buyAddress,
        gas: 8000000,
      });

    const TokenRegInstance = await new web3.eth.Contract(
      TokenRegAbi.abi as [],
      tokenRegAddress
    );
    const sellTokenHandler = await TokenRegInstance.methods
      .getTokenInformation(sToken)
      .call();
    const buyTokenHandle = await TokenRegInstance.methods
      .getTokenInformation(bToken)
      .call();
    const handlerSell = await new web3.eth.Contract(
      IHandlerAbi.abi as [],
      sellTokenHandler[2]
    );
    const handlerBuy = await new web3.eth.Contract(
      IHandlerAbi.abi as [],
      buyTokenHandle[2]
    );
    const getUnderlyingTokensSell = await handlerSell.methods
      .getUnderlying(sToken)
      .call();
    const getUnderlyingTokensBuy = await handlerBuy.methods
      .getUnderlying(bToken)
      .call();
    const ContractInstance = await new web3.eth.Contract(
      IndexSwap.abi as [],
      IndexSwapAddress
    );
    const listOfToken = await ContractInstance.methods.getTokens().call();

    const newTokens = [];

    if (listOfToken.includes(bToken)) {
      for (let i = 0; i < listOfToken.length; i++) {
        newTokens.push(listOfToken[i]);
      }
    } else {
      for (let i = 0; i < listOfToken.length; i++) {
        newTokens.push(listOfToken[i]);
      }
      newTokens.push(bToken);
    }
    const Erc20Instance = await new web3.eth.Contract(
      Erc20Abi.abi as [],
      getUnderlyingTokensSell[0]
    );
    const bal = await Erc20Instance.methods.balanceOf(rebalanceAddress).call();

    let exchangeData = {};
    const _sellTokenAddress = [];
    const _buyTokenAddress = [];
    const _sellAmount = [];
    const _protocolFee = [];
    const _callData = [];
    let zeroExparams = {};
    let fee;
    if (
      getUnderlyingTokensSell.length === 1 &&
      getUnderlyingTokensBuy.length === 1
    ) {
      const Erc20Instance = await new web3.eth.Contract(
        Erc20Abi.abi as [],
        getUnderlyingTokensSell[0]
      );
      const bal = await Erc20Instance.methods
        .balanceOf(rebalanceAddress)
        .call();
      if (getUnderlyingTokensBuy[0] === getUnderlyingTokensSell[0]) {
        _sellTokenAddress.push(getUnderlyingTokensSell[0].toString());
        _buyTokenAddress.push(getUnderlyingTokensBuy[0].toString());
        _sellAmount.push(bal.toString());
        _protocolFee.push('0');
        _callData.push('0x');
      } else {
        zeroExparams = {
          sellToken: getUnderlyingTokensSell[0].toString(),
          buyToken: getUnderlyingTokensBuy[0].toString(),
          sellAmount: bal.toString(),
          slippagePercentage: 0.06,
        };
        const zeroExResponse = await axios.get(
          `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(zeroExparams)}`
        );
        const fee = zeroExResponse.data.protocolFee
          ? zeroExResponse.data.protocolFee
          : 0;

        _sellTokenAddress.push(getUnderlyingTokensSell[0].toString());
        _buyTokenAddress.push(getUnderlyingTokensBuy[0].toString());
        _sellAmount.push(bal.toString());
        _protocolFee.push(fee.toString());
        _callData.push(zeroExResponse.data.data);
      }
    } else if (
      getUnderlyingTokensSell.length === 1 &&
      getUnderlyingTokensBuy.length === 2
    ) {
      const Erc20Instance = await new web3.eth.Contract(
        Erc20Abi.abi as [],
        getUnderlyingTokensSell[0]
      );
      const bal = await Erc20Instance.methods
        .balanceOf(rebalanceAddress)
        .call();

      const bal1 = BigNumber.from(bal).div(2);
      console.log(bal1);
      const bal2 = bal1;
      const balAmount = [bal1, bal2];
      console.log(balAmount);

      for (let i = 0; i < getUnderlyingTokensBuy.length; i++) {
        if (getUnderlyingTokensSell[0] === getUnderlyingTokensBuy[i]) {
          _sellTokenAddress.push(getUnderlyingTokensSell[0]);
          _buyTokenAddress.push(getUnderlyingTokensBuy[i]);
          _sellAmount.push(balAmount[i].toString());
          _protocolFee.push('0');
          _callData.push('0x');
        } else {
          zeroExparams = {
            sellToken: getUnderlyingTokensSell[0].toString(),
            buyToken: getUnderlyingTokensBuy[i].toString(),
            sellAmount: balAmount[i].toString(),
            slippagePercentage: 0.06,
          };
          const zeroExResponse = await axios.get(
            `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(zeroExparams)}`
          );

          const fee = zeroExResponse.data.protocolFee
            ? zeroExResponse.data.protocolFee
            : 0;
          _sellTokenAddress.push(getUnderlyingTokensSell[0]);
          _buyTokenAddress.push(getUnderlyingTokensBuy[i]);
          _sellAmount.push(balAmount[i].toString());
          _protocolFee.push(fee.toString());
          _callData.push(zeroExResponse.data.data);
        }
      }
    } else if (
      getUnderlyingTokensSell.length === 2 &&
      getUnderlyingTokensBuy.length === 1
    ) {
      for (let i = 0; i < getUnderlyingTokensSell.length; i++) {
        const Erc20Instance = await new web3.eth.Contract(
          Erc20Abi.abi as [],
          getUnderlyingTokensSell[i]
        );
        const bal = await Erc20Instance.methods
          .balanceOf(rebalanceAddress)
          .call();

        if (getUnderlyingTokensSell[i] === getUnderlyingTokensBuy[0]) {
          _sellTokenAddress.push(getUnderlyingTokensSell[i]);
          _buyTokenAddress.push(getUnderlyingTokensBuy[0]);
          _sellAmount.push(bal.toString());
          _protocolFee.push('0');
          _callData.push('0x');
        } else {
          zeroExparams = {
            sellToken: getUnderlyingTokensSell[i].toString(),
            buyToken: getUnderlyingTokensBuy[0].toString(),
            sellAmount: bal.toString(),
            slippagePercentage: 0.06,
          };
          const zeroExResponse = await axios.get(
            `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(zeroExparams)}`
          );

          const fee = zeroExResponse.data.protocolFee
            ? zeroExResponse.data.protocolFee
            : 0;
          _sellTokenAddress.push(getUnderlyingTokensSell[i]);
          _buyTokenAddress.push(getUnderlyingTokensBuy[0]);
          _sellAmount.push(bal.toString());
          _protocolFee.push(fee.toString());
          _callData.push(zeroExResponse.data.data);
        }
      }
    } else if (
      getUnderlyingTokensSell.length === 2 &&
      getUnderlyingTokensBuy.length === 2
    ) {
      const common = [];
      const tempUnder0 = [];
      const tempUnder1 = [];
      for (let i = 0; i < getUnderlyingTokensSell.length; i++) {
        if (getUnderlyingTokensBuy.includes(getUnderlyingTokensSell[i])) {
          common.push(getUnderlyingTokensSell[i]);
        } else {
          tempUnder1.push(getUnderlyingTokensSell[i]);
        }
      }

      for (let i = 0; i < getUnderlyingTokensBuy.length; i++) {
        if (!common.includes(getUnderlyingTokensBuy[i])) {
          tempUnder0.push(getUnderlyingTokensBuy[i]);
        }
      }

      const newUnderlying0 = tempUnder0.concat(common);
      const newUnderlying1 = tempUnder1.concat(common);

      for (let i = 0; i < newUnderlying1.length; i++) {
        const Erc20Instance = await new web3.eth.Contract(
          Erc20Abi.abi as [],
          newUnderlying1[i]
        );
        const bal = await Erc20Instance.methods
          .balanceOf(rebalanceAddress)
          .call();

        if (newUnderlying1[i] === newUnderlying0[i]) {
          _sellTokenAddress.push(newUnderlying1[i]);
          _buyTokenAddress.push(newUnderlying0[i]);
          _sellAmount.push(bal.toString());
          _protocolFee.push('0');
          _callData.push('0x');
        } else {
          zeroExparams = {
            sellToken: newUnderlying1[i].toString(),
            buyToken: newUnderlying0[i].toString(),
            sellAmount: bal.toString(),
            slippagePercentage: 0.06,
          };
          const zeroExResponse = await axios.get(
            `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(zeroExparams)}`
          );

          const fee = zeroExResponse.data.protocolFee
            ? zeroExResponse.data.protocolFee
            : 0;
          _sellTokenAddress.push(newUnderlying1[i]);
          _buyTokenAddress.push(newUnderlying0[i]);
          _sellAmount.push(bal.toString());
          _protocolFee.push(fee.toString());
          _callData.push(zeroExResponse.data.data);
        }
      }
    }

    exchangeData = {
      sellTokenAddress: _sellTokenAddress,
      buyTokenAddress: _buyTokenAddress,
      sellAmount: _sellAmount,
      swapHandler: oXAddress,
      protocolFee: _protocolFee,
      portfolioToken: bToken,
      newTokens: newTokens,
      callData: _callData,
    };
    return exchangeData;
  } catch (e) {
    console.log(e);
  }
};
export const isPausePortfolio = (data: boolean, portfolioAddress: string) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const account = await web3.eth.requestAccounts();
    const buyAddress = account[0];
    try {
      const ContractInstance = new web3.eth.Contract(
        Rebalance.abi as [],
        portfolioAddress
      );

      const contractData = await ContractInstance.methods.setPause(data).send({
        from: buyAddress,
        gas: 8000000,
      });
      resolve(contractData);
    } catch (error) {
      reject(error);
    }
  });

export const checkIfPortfolioPaused = async (portfolioAddress: string) => {
  try {
    const ContractInstance = new web3.eth.Contract(
      IndexSwap.abi as [],
      portfolioAddress
    );
    const isPaused = await ContractInstance.methods.paused().call();
    console.log(isPaused, 'isPaused');
    return isPaused;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
};

export const checkIfPortfoliohasInvestment = async (
  portfolioAddress: string
) => {
  try {
    const ContractInstance = new web3.eth.Contract(
      IndexSwap.abi as [],
      portfolioAddress
    );
    const totalSupply = await ContractInstance.methods.totalSupply().call();

    if (+totalSupply === 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
};
