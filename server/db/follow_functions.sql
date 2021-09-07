-- Function for calling follow_user procedure if necessary
CREATE OR REPLACE FUNCTION follow_user(
  userid users.user_id%type,
  followid users.user_id%type
)
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
  following_count INTEGER;
  success BOOLEAN;
BEGIN

  -- following count for user and followed user
  SELECT COUNT(*)
  INTO following_count
  FROM follows
  WHERE user_id = userid AND follows = followid

  -- if already follows return 0 else return 1
  IF following_count > 0 THEN
    -- RAISE NOTICE 'Already following';
    success = 0;
  ELSE
    INSERT INTO follows (user_id, follows)
    VALUES (userid, followid);

    -- update followers count (followed user) on user table
    UPDATE users
    SET followers = followers + 1
    WHERE user_id = followid;

    -- update following count on user table
    UPDATE users
    SET following = following + 1
    WHERE user_id = userid;

    success = 1;
  END IF;

  return success;

END
$$;

-- CALL function
-- user id, user id (followed user)
SELECT follow_user(1,5);
SELECT follow_user(1,9);
SELECT follow_user(1,3);


-- Unfollow a user function
CREATE OR REPLACE FUNCTION unfollow_user(
  userid users.user_id%type,
  followid users.user_id%type
)
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
  following_count INTEGER;
  success BOOLEAN;
BEGIN

  -- following count for user and followed user
  SELECT COUNT(*)
  INTO following_count
  FROM follows
  WHERE user_id = userid AND follows = followid;

  IF following_count > 0 THEN
    -- insert into follows table
    DELETE FROM follows
    WHERE user_id = userid AND follows = followid;

    -- update followers count on user table
    UPDATE users
    SET followers = followers - 1
    WHERE user_id = followid;

    -- update following count on user table
    UPDATE users
    SET following = following - 1
    WHERE user_id = userid;

    success = 1;
  ELSE
    success = 0;
  END IF;

  RETURN success;

END
$$;

-- CALL procedure
SELECT unfollow_user(1,5);