import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerBucketItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BucketItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text: string;
  readonly category?: string | null;
  readonly date?: string | null;
  readonly link?: string | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBucketItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BucketItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text: string;
  readonly category?: string | null;
  readonly date?: string | null;
  readonly link?: string | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BucketItem = LazyLoading extends LazyLoadingDisabled ? EagerBucketItem : LazyBucketItem

export declare const BucketItem: (new (init: ModelInit<BucketItem>) => BucketItem) & {
  copyOf(source: BucketItem, mutator: (draft: MutableModel<BucketItem>) => MutableModel<BucketItem> | void): BucketItem;
}

type EagerYearlyGoal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<YearlyGoal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly year: number;
  readonly title: string;
  readonly details?: string | null;
  readonly order?: number | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyYearlyGoal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<YearlyGoal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly year: number;
  readonly title: string;
  readonly details?: string | null;
  readonly order?: number | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type YearlyGoal = LazyLoading extends LazyLoadingDisabled ? EagerYearlyGoal : LazyYearlyGoal

export declare const YearlyGoal: (new (init: ModelInit<YearlyGoal>) => YearlyGoal) & {
  copyOf(source: YearlyGoal, mutator: (draft: MutableModel<YearlyGoal>) => MutableModel<YearlyGoal> | void): YearlyGoal;
}

type EagerDailyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DailyTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly text: string;
  readonly time?: string | null;
  readonly duration?: string | null;
  readonly order?: number | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDailyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DailyTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly text: string;
  readonly time?: string | null;
  readonly duration?: string | null;
  readonly order?: number | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DailyTask = LazyLoading extends LazyLoadingDisabled ? EagerDailyTask : LazyDailyTask

export declare const DailyTask: (new (init: ModelInit<DailyTask>) => DailyTask) & {
  copyOf(source: DailyTask, mutator: (draft: MutableModel<DailyTask>) => MutableModel<DailyTask> | void): DailyTask;
}

type EagerHabit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly icon?: string | null;
  readonly mood?: string | null;
  readonly days?: (string | null)[] | null;
  readonly description?: string | null;
  readonly time?: string | null;
  readonly plan?: string | null;
  readonly log?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHabit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly icon?: string | null;
  readonly mood?: string | null;
  readonly days?: (string | null)[] | null;
  readonly description?: string | null;
  readonly time?: string | null;
  readonly plan?: string | null;
  readonly log?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habit = LazyLoading extends LazyLoadingDisabled ? EagerHabit : LazyHabit

export declare const Habit: (new (init: ModelInit<Habit>) => Habit) & {
  copyOf(source: Habit, mutator: (draft: MutableModel<Habit>) => MutableModel<Habit> | void): Habit;
}

type EagerFutureGoal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FutureGoal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFutureGoal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FutureGoal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FutureGoal = LazyLoading extends LazyLoadingDisabled ? EagerFutureGoal : LazyFutureGoal

export declare const FutureGoal: (new (init: ModelInit<FutureGoal>) => FutureGoal) & {
  copyOf(source: FutureGoal, mutator: (draft: MutableModel<FutureGoal>) => MutableModel<FutureGoal> | void): FutureGoal;
}

type EagerYearlyPopupTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<YearlyPopupTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly month: string;
  readonly title: string;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyYearlyPopupTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<YearlyPopupTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly month: string;
  readonly title: string;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type YearlyPopupTask = LazyLoading extends LazyLoadingDisabled ? EagerYearlyPopupTask : LazyYearlyPopupTask

export declare const YearlyPopupTask: (new (init: ModelInit<YearlyPopupTask>) => YearlyPopupTask) & {
  copyOf(source: YearlyPopupTask, mutator: (draft: MutableModel<YearlyPopupTask>) => MutableModel<YearlyPopupTask> | void): YearlyPopupTask;
}

type EagerFocusTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FocusTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date?: string | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFocusTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FocusTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date?: string | null;
  readonly done?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FocusTask = LazyLoading extends LazyLoadingDisabled ? EagerFocusTask : LazyFocusTask

export declare const FocusTask: (new (init: ModelInit<FocusTask>) => FocusTask) & {
  copyOf(source: FocusTask, mutator: (draft: MutableModel<FocusTask>) => MutableModel<FocusTask> | void): FocusTask;
}

type EagerMonthlyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MonthlyEvent, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly start: string;
  readonly end: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMonthlyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MonthlyEvent, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly start: string;
  readonly end: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MonthlyEvent = LazyLoading extends LazyLoadingDisabled ? EagerMonthlyEvent : LazyMonthlyEvent

export declare const MonthlyEvent: (new (init: ModelInit<MonthlyEvent>) => MonthlyEvent) & {
  copyOf(source: MonthlyEvent, mutator: (draft: MutableModel<MonthlyEvent>) => MutableModel<MonthlyEvent> | void): MonthlyEvent;
}

type EagerGoogleAuth = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GoogleAuth, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly token: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGoogleAuth = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GoogleAuth, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly token: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GoogleAuth = LazyLoading extends LazyLoadingDisabled ? EagerGoogleAuth : LazyGoogleAuth

export declare const GoogleAuth: (new (init: ModelInit<GoogleAuth>) => GoogleAuth) & {
  copyOf(source: GoogleAuth, mutator: (draft: MutableModel<GoogleAuth>) => MutableModel<GoogleAuth> | void): GoogleAuth;
}

type EagerUserSettings = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSettings, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly googleToken?: string | null;
  readonly isSynced?: boolean | null;
  readonly theme?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserSettings = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSettings, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly googleToken?: string | null;
  readonly isSynced?: boolean | null;
  readonly theme?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserSettings = LazyLoading extends LazyLoadingDisabled ? EagerUserSettings : LazyUserSettings

export declare const UserSettings: (new (init: ModelInit<UserSettings>) => UserSettings) & {
  copyOf(source: UserSettings, mutator: (draft: MutableModel<UserSettings>) => MutableModel<UserSettings> | void): UserSettings;
}