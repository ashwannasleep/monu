/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBucketItem = /* GraphQL */ `
  mutation CreateBucketItem(
    $input: CreateBucketItemInput!
    $condition: ModelBucketItemConditionInput
  ) {
    createBucketItem(input: $input, condition: $condition) {
      id
      text
      category
      date
      link
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBucketItem = /* GraphQL */ `
  mutation UpdateBucketItem(
    $input: UpdateBucketItemInput!
    $condition: ModelBucketItemConditionInput
  ) {
    updateBucketItem(input: $input, condition: $condition) {
      id
      text
      category
      date
      link
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBucketItem = /* GraphQL */ `
  mutation DeleteBucketItem(
    $input: DeleteBucketItemInput!
    $condition: ModelBucketItemConditionInput
  ) {
    deleteBucketItem(input: $input, condition: $condition) {
      id
      text
      category
      date
      link
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createYearlyGoal = /* GraphQL */ `
  mutation CreateYearlyGoal(
    $input: CreateYearlyGoalInput!
    $condition: ModelYearlyGoalConditionInput
  ) {
    createYearlyGoal(input: $input, condition: $condition) {
      id
      year
      title
      details
      order
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateYearlyGoal = /* GraphQL */ `
  mutation UpdateYearlyGoal(
    $input: UpdateYearlyGoalInput!
    $condition: ModelYearlyGoalConditionInput
  ) {
    updateYearlyGoal(input: $input, condition: $condition) {
      id
      year
      title
      details
      order
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteYearlyGoal = /* GraphQL */ `
  mutation DeleteYearlyGoal(
    $input: DeleteYearlyGoalInput!
    $condition: ModelYearlyGoalConditionInput
  ) {
    deleteYearlyGoal(input: $input, condition: $condition) {
      id
      year
      title
      details
      order
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createDailyTask = /* GraphQL */ `
  mutation CreateDailyTask(
    $input: CreateDailyTaskInput!
    $condition: ModelDailyTaskConditionInput
  ) {
    createDailyTask(input: $input, condition: $condition) {
      id
      date
      text
      time
      duration
      order
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDailyTask = /* GraphQL */ `
  mutation UpdateDailyTask(
    $input: UpdateDailyTaskInput!
    $condition: ModelDailyTaskConditionInput
  ) {
    updateDailyTask(input: $input, condition: $condition) {
      id
      date
      text
      time
      duration
      order
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDailyTask = /* GraphQL */ `
  mutation DeleteDailyTask(
    $input: DeleteDailyTaskInput!
    $condition: ModelDailyTaskConditionInput
  ) {
    deleteDailyTask(input: $input, condition: $condition) {
      id
      date
      text
      time
      duration
      order
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createHabit = /* GraphQL */ `
  mutation CreateHabit(
    $input: CreateHabitInput!
    $condition: ModelHabitConditionInput
  ) {
    createHabit(input: $input, condition: $condition) {
      id
      name
      icon
      mood
      days
      description
      time
      plan
      log
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateHabit = /* GraphQL */ `
  mutation UpdateHabit(
    $input: UpdateHabitInput!
    $condition: ModelHabitConditionInput
  ) {
    updateHabit(input: $input, condition: $condition) {
      id
      name
      icon
      mood
      days
      description
      time
      plan
      log
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteHabit = /* GraphQL */ `
  mutation DeleteHabit(
    $input: DeleteHabitInput!
    $condition: ModelHabitConditionInput
  ) {
    deleteHabit(input: $input, condition: $condition) {
      id
      name
      icon
      mood
      days
      description
      time
      plan
      log
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFutureGoal = /* GraphQL */ `
  mutation CreateFutureGoal(
    $input: CreateFutureGoalInput!
    $condition: ModelFutureGoalConditionInput
  ) {
    createFutureGoal(input: $input, condition: $condition) {
      id
      category
      title
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFutureGoal = /* GraphQL */ `
  mutation UpdateFutureGoal(
    $input: UpdateFutureGoalInput!
    $condition: ModelFutureGoalConditionInput
  ) {
    updateFutureGoal(input: $input, condition: $condition) {
      id
      category
      title
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFutureGoal = /* GraphQL */ `
  mutation DeleteFutureGoal(
    $input: DeleteFutureGoalInput!
    $condition: ModelFutureGoalConditionInput
  ) {
    deleteFutureGoal(input: $input, condition: $condition) {
      id
      category
      title
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createYearlyPopupTask = /* GraphQL */ `
  mutation CreateYearlyPopupTask(
    $input: CreateYearlyPopupTaskInput!
    $condition: ModelYearlyPopupTaskConditionInput
  ) {
    createYearlyPopupTask(input: $input, condition: $condition) {
      id
      month
      title
      date
      time
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateYearlyPopupTask = /* GraphQL */ `
  mutation UpdateYearlyPopupTask(
    $input: UpdateYearlyPopupTaskInput!
    $condition: ModelYearlyPopupTaskConditionInput
  ) {
    updateYearlyPopupTask(input: $input, condition: $condition) {
      id
      month
      title
      date
      time
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteYearlyPopupTask = /* GraphQL */ `
  mutation DeleteYearlyPopupTask(
    $input: DeleteYearlyPopupTaskInput!
    $condition: ModelYearlyPopupTaskConditionInput
  ) {
    deleteYearlyPopupTask(input: $input, condition: $condition) {
      id
      month
      title
      date
      time
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFocusTask = /* GraphQL */ `
  mutation CreateFocusTask(
    $input: CreateFocusTaskInput!
    $condition: ModelFocusTaskConditionInput
  ) {
    createFocusTask(input: $input, condition: $condition) {
      id
      title
      date
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFocusTask = /* GraphQL */ `
  mutation UpdateFocusTask(
    $input: UpdateFocusTaskInput!
    $condition: ModelFocusTaskConditionInput
  ) {
    updateFocusTask(input: $input, condition: $condition) {
      id
      title
      date
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFocusTask = /* GraphQL */ `
  mutation DeleteFocusTask(
    $input: DeleteFocusTaskInput!
    $condition: ModelFocusTaskConditionInput
  ) {
    deleteFocusTask(input: $input, condition: $condition) {
      id
      title
      date
      done
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMonthlyEvent = /* GraphQL */ `
  mutation CreateMonthlyEvent(
    $input: CreateMonthlyEventInput!
    $condition: ModelMonthlyEventConditionInput
  ) {
    createMonthlyEvent(input: $input, condition: $condition) {
      id
      title
      start
      end
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMonthlyEvent = /* GraphQL */ `
  mutation UpdateMonthlyEvent(
    $input: UpdateMonthlyEventInput!
    $condition: ModelMonthlyEventConditionInput
  ) {
    updateMonthlyEvent(input: $input, condition: $condition) {
      id
      title
      start
      end
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMonthlyEvent = /* GraphQL */ `
  mutation DeleteMonthlyEvent(
    $input: DeleteMonthlyEventInput!
    $condition: ModelMonthlyEventConditionInput
  ) {
    deleteMonthlyEvent(input: $input, condition: $condition) {
      id
      title
      start
      end
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGoogleAuth = /* GraphQL */ `
  mutation CreateGoogleAuth(
    $input: CreateGoogleAuthInput!
    $condition: ModelGoogleAuthConditionInput
  ) {
    createGoogleAuth(input: $input, condition: $condition) {
      id
      token
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGoogleAuth = /* GraphQL */ `
  mutation UpdateGoogleAuth(
    $input: UpdateGoogleAuthInput!
    $condition: ModelGoogleAuthConditionInput
  ) {
    updateGoogleAuth(input: $input, condition: $condition) {
      id
      token
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGoogleAuth = /* GraphQL */ `
  mutation DeleteGoogleAuth(
    $input: DeleteGoogleAuthInput!
    $condition: ModelGoogleAuthConditionInput
  ) {
    deleteGoogleAuth(input: $input, condition: $condition) {
      id
      token
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserSettings = /* GraphQL */ `
  mutation CreateUserSettings(
    $input: CreateUserSettingsInput!
    $condition: ModelUserSettingsConditionInput
  ) {
    createUserSettings(input: $input, condition: $condition) {
      id
      googleToken
      isSynced
      theme
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserSettings = /* GraphQL */ `
  mutation UpdateUserSettings(
    $input: UpdateUserSettingsInput!
    $condition: ModelUserSettingsConditionInput
  ) {
    updateUserSettings(input: $input, condition: $condition) {
      id
      googleToken
      isSynced
      theme
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserSettings = /* GraphQL */ `
  mutation DeleteUserSettings(
    $input: DeleteUserSettingsInput!
    $condition: ModelUserSettingsConditionInput
  ) {
    deleteUserSettings(input: $input, condition: $condition) {
      id
      googleToken
      isSynced
      theme
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
