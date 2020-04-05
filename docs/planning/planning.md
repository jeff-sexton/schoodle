# Scoodle Midterm Project

 - Jeff Sexton
 - Allen Li

## Project Requirements

- Requirements:
  - visitors can create an event proposal in much the same way as Doodle, by specifying:
    - event title and description
    - their own name and email
  - organizers can then send the unique URL to possible attendees via their own communication workflow (email, Slack, Messenger, etc.)
  - attendees visit the unique URL and:
    - specify their name and email
    - specify their availability (yes/no only) for each possible time slot
    - view all responses including their own
    - modify their response
  - the unique URL should be secret and thus not use a simple auto-incrementing integer but instead a larger ID that is harder to guess (much like how secret gists work on GitHub)
  - note: this app does not follow the typical user authentication process: users don't need to register or log in and the only way to access the Schoodles is via links


## Data types

- cookie sessions

- event
  - events title
  - event desc.
  - owner name
  - email
  - possible times/days
  - uniq URL

- users
  - session Id
  - name
  - email

- votes
  - yes/no/unknown
  - name
  - email

  ## Layout idea

 - See wireframe


          |---------------|-------------------|

            event time     |   event time     |


          |----------------|------------------|

          y: | | 
Name 1
          n: | | 

          y: | | 
Name 2
          n: | | 



## User Stories

As a event planner, I want to find out when people can attend, so that evenyone can make it.

As a event planner, I want to be notified when people submit votes, so I know when people are voting.

As an attendee, I want to vote for when the event will be, so that I can attend it.



## REST Routes

B R E A D

### Users

- Browse Users - Not needed
  - GET /users

- Read User
  - GET /users/:id

- Edit user
  - POST /users/:id

- Add User
  - POST /users

- Delete user? -- NO!

### Events

- Browse Events -- not now

- Read Event 
  - GET /events/:id

  - ** also gets related times
  - ** also gets related votes

- Edit Event
  - POST /events/:id
  - maybe not now

- Add Event
  - POST /events

- Delete Event -- not now

### Times

- Browse times - not necessary


- Read times
  - GET / ???

- Edit times
  - no edit

- Add times
  - POST /times

- Delete times
  - POST /times/:id
  - maybe later

### Votes

- Browse votes
  - not needed

- Read votes
  - attaced to event get

- Edit votes
  - POST /votes/:id

- Add votes
  - POST /votes

- Delete votes
  - not needed



  ## Template Var Format Example

  ```javascript
  const data = {
  user: {
    id: 1001,
    name: "Alice",
    email: "alice@alice.com"
  },
  userVotes: {
    user: {
      id: 1001,
      name: "Alice",
      email: "alice@alice.com"
    },
    userVotes: [
      {
        id: 4101,
        user_id: 1001,
        vote: true,
        time_id: 3101,
        event_id: 2101,
        start_time: "2020-04-16T17:00:00.000Z",
        end_time: "2020-04-16T19:00:00.000Z"
      },
      {
        id: 4102,
        user_id: 1001,
        vote: true,
        time_id: 3102,
        event_id: 2101,
        start_time: "2020-04-20T17:00:00.000Z",
        end_time: "2020-04-20T19:00:00.000Z"
      },
      {
        id: 4103,
        user_id: 1001,
        vote: true,
        time_id: 3103,
        event_id: 2101,
        start_time: "2020-04-22T23:00:00.000Z",
        end_time: "2020-04-23T01:00:00.000Z"
      }
    ]
  },
  event: {
    id: 2101,
    owner_id: 1001,
    title: "LHL Graduation Party",
    description: "The best party ever where everyone is tired from bootcamp.",
    url: "abcdefg"
  },
  times: [
    {
      id: 3101,
      event_id: 2101,
      start_time: "2020-04-16T17:00:00.000Z",
      end_time: "2020-04-16T19:00:00.000Z",
      total_votes: "2"
    },
    {
      id: 3102,
      event_id: 2101,
      start_time: "2020-04-20T17:00:00.000Z",
      end_time: "2020-04-20T19:00:00.000Z",
      total_votes: "2"
    },
    {
      id: 3103,
      event_id: 2101,
      start_time: "2020-04-22T23:00:00.000Z",
      end_time: "2020-04-23T01:00:00.000Z",
      total_votes: "3"
    }
  ],
  guests: [
    {
      user: {
        id: 1002,
        name: "Kira",
        email: "Kira@kira.com"
      },
      userVotes: [
        {
          id: 4104,
          user_id: 1002,
          vote: false,
          time_id: 3101,
          event_id: 2101,
          start_time: "2020-04-16T17:00:00.000Z",
          end_time: "2020-04-16T19:00:00.000Z"
        },
        {
          id: 4105,
          user_id: 1002,
          vote: false,
          time_id: 3102,
          event_id: 2101,
          start_time: "2020-04-20T17:00:00.000Z",
          end_time: "2020-04-20T19:00:00.000Z"
        },
        {
          id: 4106,
          user_id: 1002,
          vote: true,
          time_id: 3103,
          event_id: 2101,
          start_time: "2020-04-22T23:00:00.000Z",
          end_time: "2020-04-23T01:00:00.000Z"
        }
      ]
    },
    {
      user: {
        id: 1003,
        name: "Edward",
        email: "edward@edward.com"
      },
      userVotes: [
        {
          id: 4119,
          user_id: 1003,
          vote: true,
          time_id: 3101,
          event_id: 2101,
          start_time: "2020-04-16T17:00:00.000Z",
          end_time: "2020-04-16T19:00:00.000Z"
        },
        {
          id: 4120,
          user_id: 1003,
          vote: false,
          time_id: 3102,
          event_id: 2101,
          start_time: "2020-04-20T17:00:00.000Z",
          end_time: "2020-04-20T19:00:00.000Z"
        },
        {
          id: 4121,
          user_id: 1003,
          vote: true,
          time_id: 3103,
          event_id: 2101,
          start_time: "2020-04-22T23:00:00.000Z",
          end_time: "2020-04-23T01:00:00.000Z"
        }
      ]
    },
    {
      user: {
        id: 1004,
        name: "Shane",
        email: "shane@shane.com"
      },
      userVotes: [
        {
          id: 4122,
          user_id: 1004,
          vote: null,
          time_id: 3101,
          event_id: 2101,
          start_time: "2020-04-16T17:00:00.000Z",
          end_time: "2020-04-16T19:00:00.000Z"
        },
        {
          id: 4123,
          user_id: 1004,
          vote: true,
          time_id: 3102,
          event_id: 2101,
          start_time: "2020-04-20T17:00:00.000Z",
          end_time: "2020-04-20T19:00:00.000Z"
        },
        {
          id: 4124,
          user_id: 1004,
          vote: false,
          time_id: 3103,
          event_id: 2101,
          start_time: "2020-04-22T23:00:00.000Z",
          end_time: "2020-04-23T01:00:00.000Z"
        }
      ]
    }
  ]
}
 ```
