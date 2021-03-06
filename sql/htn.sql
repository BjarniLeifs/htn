CREATE TABLE Users (
  ID SERIAL,
  PagerdutyId character varying,
  Name character varying,
  Email character varying(80),
  Username character varying(60),
  Hash character varying,
  PRIMARY KEY(ID)
);

CREATE TABLE Notifications (
  ID SERIAL,
  UserId integer,
  ImageURL character varying,
  ServiceId character varying,
  CreatedOn character varying,
  PRIMARY KEY(ID)
);
