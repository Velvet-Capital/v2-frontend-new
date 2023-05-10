import AssetStaticTable from '@/components/assetStaticTable/AssetStaticTable'
import OverAllDetails from '@/components/overAllDetails/OverAllDetails'
import PortfolioDetails from '@/components/portfolioDetails/PortfolioDetails'
import PortfolioTable from '@/components/portfolioTable/PortfolioTable'
import Layout from '@/layout/Layout'
import React from 'react'
import CreatedPortfolio from './components/createdPortfolio/CreatedPortfolio'
import CreateNewFund from './components/createNewFund/CreateNewFund'
import CreateFund from '../createFund/CreateFund'
import { useSelector } from 'react-redux'
import { UserProps } from './interfaces/fundInterfaces'

const Fund = () => {
  const { fundList } = useSelector((state: UserProps) => state.funds)
  return (
    <Layout>
      {/* <CreateFund /> */}
      {fundList.length > 0 ? (
        <>
          <OverAllDetails />
          {fundList &&
            fundList.map((elem, indx) => {
              return <CreatedPortfolio key={indx} data={elem} />
            })}
          <CreateNewFund />
        </>
      ) : (
        <CreateNewFund />
      )}
      {/* <AssetStaticTable />
      <PortfolioTable /> */}
      {/* <PortfolioDetails /> */}
    </Layout>
  )
}

export default Fund
