import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ChoosePage from './ChoosePage'
import BucketList from './BucketList'
import YearlyOverview from './YearlyOverview'
import YearlyPopup from './YearlyPopup'
import LoginWithGoogle from './LoginWithGoogle'
import DailyPlan from './DailyPlan'
import FutureVision from './FutureVision'
import MonthlyPlanner from './MonthlyPlanner';
import HabitTracker from './HabitTracker';
import HabitModal from './HabitModal';
import Pomodoro from './Pomodoro';
import UserGuide from './UserGuide';
import { GoogleOAuthProvider} from '@react-oauth/google';

<GoogleOAuthProvider clientId='632636220479-21mknsckuattniq6u5e8qvt1ktl0ptb4.apps.googleusercontent.com'>
  <App />
</GoogleOAuthProvider>



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/choose" element={<ChoosePage />} />
      <Route path="/bucket-list" element={<BucketList />} />
      <Route path="/yearly-overview" element={<YearlyOverview />} />
      <Route path="/yearly-popup" element={<YearlyPopup />} />
      <Route path="/login-with-google" element={<LoginWithGoogle />} />
      <Route path="/monthly-planner" element={<MonthlyPlanner />} />
      <Route path="/daily-plan" element={<DailyPlan />} />
      <Route path="/habit-tracker" element={<HabitTracker />} />
      <Route path="/habit-modal" element={<HabitModal />} />
      <Route path="/future-vision" element={<FutureVision />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
      <Route path="/user-guide" element={<UserGuide />} />
    </Routes>
  )
}
