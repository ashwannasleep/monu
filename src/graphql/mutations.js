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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      completed
      createdAt
      updatedAt
      owner
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
      completed
      createdAt
      updatedAt
      owner
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
      completed
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
