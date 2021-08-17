-- UPVOTE procedure
CREATE OR REPLACE PROCEDURE upvote_post_likes(
  userid users.user_id%type,
  postid posts.post_id%type
)
  LANGUAGE PLPGSQL
  AS
$$
BEGIN

  -- insert into post_likes table
  INSERT INTO post_likes
  VALUES (userid, postid);

  -- update like count on posts table
  UPDATE posts
  SET likes = likes + 1
  WHERE post_id = postid;

  COMMIT;

END;
$$

-- CALL procedure
CALL update_post_likes(3,2);

-- DOWNVOTE procedure
CREATE OR REPLACE PROCEDURE downvote_post_likes(
  userid users.user_id%type,
  postid posts.post_id%type
)
  LANGUAGE PLPGSQL
  AS
$$
BEGIN

  -- insert into post_likes table
  DELETE FROM post_likes
  WHERE user_id = userid;

  -- update like count on posts table
  UPDATE posts
  SET likes = likes - 1
  WHERE post_id = postid;

  COMMIT;

END;
$$

CALL downvote_post_likes(3,2);