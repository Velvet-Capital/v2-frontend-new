import { HashRouter, Routes, Route } from 'react-router-dom'

import { Home, Fund, Manage, SmartManagement, YeildFarming, Tread } from '@/pages'
import CreateFund from '@/pages/createFund/CreateFund'

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='fund' element={<Fund />}></Route>
        <Route path='createfund' element={<CreateFund />}></Route>
        <Route path='fund/manage/:id' element={<Manage />}>
          <Route path='tread' element={<Tread />} />
          <Route index element={<SmartManagement />} />
          <Route path='yeild' element={<YeildFarming />} />
        </Route>
        <Route path='*' element={<Home />} /> {/* Will use 404 Page if URL not matched */}
      </Routes>
    </HashRouter>
  )
}

export default AppRouter
