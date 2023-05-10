import Layout from '@/layout/Layout'
import { Outlet, useParams } from 'react-router-dom'
import SelactedPortfolio from './components/selactedPortfolio/SelactedPortfolio'
import ManageNavbar from './components/manageNavbar/ManageNavbar'
import { AppDispatch } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchSingleFund } from '@/store/slice/singleFund'
import { MainManageContent } from './Manage.style'

export interface FundProps {
  singleFund: {
    fund: []
    loading: boolean
  }
}
const Manage = () => {
  const { id } = useParams()

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleFund(id))
    } else {
      console.error('Invalid ID')
    }
  }, [id])
  const { fund, loading } = useSelector((state: FundProps) => state.singleFund)
  console.log((fund as any).tokenList.length < 1, 'fund.length < 1', fund)

  return (
    <Layout>
      {loading ? (
        'loading'
      ) : (fund as any).tokenList.length < 1 ? (
        <div>hello</div>
      ) : (
        <>
          <SelactedPortfolio />
          <MainManageContent>
            <ManageNavbar />
            <Outlet />
          </MainManageContent>
        </>
      )}
    </Layout>
  )
}

export default Manage
