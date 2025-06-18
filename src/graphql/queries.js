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
      owner
      createdAt
      updatedAt
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
        owner
        createdAt
        updatedAt
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
      order
      done
      owner
      createdAt
      updatedAt
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
        order
        done
        owner
        createdAt
        updatedAt
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
      done
      owner
      createdAt
      updatedAt
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
        done
        owner
        createdAt
        updatedAt
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
        description
        time
        plan
        log
        owner
        createdAt
        updatedAt
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
      owner
      createdAt
      updatedAt
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
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getYearlyPopupTask = /* GraphQL */ `
  query GetYearlyPopupTask($id: ID!) {
    getYearlyPopupTask(id: $id) {
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
export const listYearlyPopupTasks = /* GraphQL */ `
  query ListYearlyPopupTasks(
    $filter: ModelYearlyPopupTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listYearlyPopupTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getFocusTask = /* GraphQL */ `
  query GetFocusTask($id: ID!) {
    getFocusTask(id: $id) {
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
export const listFocusTasks = /* GraphQL */ `
  query ListFocusTasks(
    $filter: ModelFocusTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFocusTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        date
        done
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMonthlyEvent = /* GraphQL */ `
  query GetMonthlyEvent($id: ID!) {
    getMonthlyEvent(id: $id) {
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
export const listMonthlyEvents = /* GraphQL */ `
  query ListMonthlyEvents(
    $filter: ModelMonthlyEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMonthlyEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        start
        end
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGoogleAuth = /* GraphQL */ `
  query GetGoogleAuth($id: ID!) {
    getGoogleAuth(id: $id) {
      id
      token
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGoogleAuths = /* GraphQL */ `
  query ListGoogleAuths(
    $filter: ModelGoogleAuthFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoogleAuths(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        token
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserSettings = /* GraphQL */ `
  query GetUserSettings($id: ID!) {
    getUserSettings(id: $id) {
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
export const listUserSettings = /* GraphQL */ `
  query ListUserSettings(
    $filter: ModelUserSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        googleToken
        isSynced
        theme
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
