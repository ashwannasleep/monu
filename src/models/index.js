// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { BucketItem, YearlyGoal, DailyTask, Habit, FutureGoal, YearlyPopupTask, FocusTask, MonthlyEvent, GoogleAuth, UserSettings } = initSchema(schema);

export {
  BucketItem,
  YearlyGoal,
  DailyTask,
  Habit,
  FutureGoal,
  YearlyPopupTask,
  FocusTask,
  MonthlyEvent,
  GoogleAuth,
  UserSettings
};