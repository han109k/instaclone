-- Follow a user procedure
CREATE OR REPLACE PROCEDURE follow_user(
  userid users.user_id%type,
  followid users.user_id%type
)
  LANGUAGE PLPGSQL
  AS
$$
BEGIN

  -- insert into follows table
  INSERT INTO follows (user_id, follows)
  VALUES (userid, followid);

  -- update followers count on user table
  UPDATE users
  SET followers = followers + 1
  WHERE user_id = followid;

-- update following count on user table
  UPDATE users
  SET following = following + 1
  WHERE user_id = userid;

  COMMIT;

END;
$$

-- CALL procedure
CALL follow_user(1,5);
CALL follow_user(1,9);
CALL follow_user(1,3);

-- Unfollow a user procedure
CREATE OR REPLACE PROCEDURE unfollow_user(
  userid users.user_id%type,
  followid users.user_id%type
)
  LANGUAGE PLPGSQL
  AS
$$
BEGIN

  -- insert into follows table
  INSERT INTO follows (user_id, follows)
  VALUES (userid, followid);

  -- update followers count on user table
  UPDATE users
  SET followers = followers - 1
  WHERE user_id = followid;

-- update following count on user table
  UPDATE users
  SET following = following - 1
  WHERE user_id = userid;

  COMMIT;

END;
$$

-- CALL procedure
CALL unfollow_user(1,5);