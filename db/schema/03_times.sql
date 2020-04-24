DROP TABLE IF EXISTS times CASCADE;

CREATE TABLE times (
  id serial PRIMARY KEY NOT NULL,
  event_id integer NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  start_time timestamp NOT NULL,
  end_time timestamp NOT NULL,
  time_zone varchar(10)
);
