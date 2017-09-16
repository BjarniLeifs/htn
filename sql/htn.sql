CREATE TABLE Users (
  ID SERIAL,
  Name character varying,
  Email character varying(80),
  Username character varying(60),
  Hash character varying,
  PRIMARY KEY(ID)
);
