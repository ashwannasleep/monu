/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBucketItem = /* GraphQL */ `
  query GetBucketItem($id: ID!) {
    getBucketItem(id: $id) {
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
export const listBucketItems = /* GraphQL */ `
  query ListBucketItems(
    $filter: ModelBucketItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBucketItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getDailyTask = /* GraphQL */ `
  query GetDailyTask($id: ID!) {
    getDailyTask(id: $id) {
      id
      date
      text
      time
      duration
      order
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listDailyTasks = /* GraphQL */ `
  query ListDailyTasks(
    $filter: ModelDailyTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDailyTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        text
        time
        duration
        order
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getHabit = /* GraphQL */ `
  query GetHabit($id: ID!) {
    getHabit(id: $id) {
      id
      name
      icon
      mood
      days
      log
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listHabits = /* GraphQL */ `
  query ListHabits(
    $filter: ModelHabitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHabits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        icon
        mood
        days
        log
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFutureVision = /* GraphQL */ `
  query GetFutureVision($id: ID!) {
    getFutureVision(id: $id) {
      id
      ageTarget
      goals
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listFutureVisions = /* GraphQL */ `
  query ListFutureVisions(
    $filter: ModelFutureVisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFutureVisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ageTarget
        goals
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getYearlyGoal = /* GraphQL */ `
  query GetYearlyGoal($id: ID!) {
    getYearlyGoal(id: $id) {
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
export const listYearlyGoals = /* GraphQL */ `
  query ListYearlyGoals(
    $filter: ModelYearlyGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listYearlyGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getFutureGoal = /* GraphQL */ `
  query GetFutureGoal($id: ID!) {
    getFutureGoal(id: $id) {
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
export const listFutureGoals = /* GraphQL */ `
  query ListFutureGoals(
    $filter: ModelFutureGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFutureGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        title
        done
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
