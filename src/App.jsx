import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import OrganizationalPlans from './pages/OrganizationalPlans';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<UpgradePage />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/organisation/plans" element={<OrganizationalPlans />} />
    </Routes>
  )
}

export default App
