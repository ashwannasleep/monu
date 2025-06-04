import { Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import * as Auth from '@aws-amplify/auth';
import awsExports from './aws-exports';

import LandingPage     from './LandingPage';
import ChoosePage      from './ChoosePage';
import BucketList      from './BucketList';
import YearlyOverview  from './YearlyOverview';
import YearlyPopup     from './YearlyPopup';
import LoginWithGoogle from './LoginWithGoogle';
import DailyPlan       from './DailyPlan';
import FutureVision    from './FutureVision';
import MonthlyPlanner  from './MonthlyPlanner';
import HabitTracker    from './HabitTracker';
import HabitModal      from './HabitModal';
import Pomodoro        from './Pomodoro';
import UserGuide       from './UserGuide';
import SettingsPage    from './SettingsPage';
import ScrollToTop     from './ScrollToTop';
import Dashboard from './Dashboard';
import FocusCard from './FocusCard';

Amplify.configure({
  ...awsExports,
  Auth,
});

const updatedConfig = {
  ...awsExports,
  Auth: {
    ...awsExports.Auth,
    // Allow multiple concurrent sessions
    cookieStorage: {
      domain: 'https://monu-planner.com',
      path: '/',
      expires: 365,
      sameSite: 'strict',
      secure: true
    }
  }
};

Amplify.configure(updatedConfig);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"                 element={<LandingPage />} />
        <Route path="/SignIn"           element={<LandingPage />} />
        <Route path="/SignUp"           element={<LandingPage />} />
        <Route path="/choose"           element={<ChoosePage />} />
        <Route path="/bucket-list"      element={<BucketList />} />
        <Route path="/yearly-overview"  element={<YearlyOverview />} />
        <Route path="/yearly-popup"     element={<YearlyPopup />} />
        <Route path="/login-with-google"element={<LoginWithGoogle />} />
        <Route path="/monthly-planner"  element={<MonthlyPlanner />} />
        <Route path="/daily-plan"       element={<DailyPlan />} />
        <Route path="/habit-tracker"    element={<HabitTracker />} />
        <Route path="/habit-modal"      element={<HabitModal />} />
        <Route path="/future-vision"    element={<FutureVision />} />
        <Route path="/pomodoro"         element={<Pomodoro />} />
        <Route path="/user-guide"       element={<UserGuide />} />
        <Route path="/settings"         element={<SettingsPage />} />
        <Route path="/dashboard"        element={<Dashboard />} />
        <Route path="/focuscard"        element={<FocusCard />} />
      </Routes>
    </>
  );
}
