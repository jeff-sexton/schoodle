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
