--* CREATE POST procedure
CREATE OR REPLACE PROCEDURE create_post(
  userid posts.user_id%type,
  url posts.urls%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- create post
  INSERT INTO posts (user_id, urls)
  VALUES (userid, ARRAY [url]);

  -- update post count on users table
  UPDATE users
  SET posts = posts + 1
  WHERE user_id = userid;

  COMMIT;

END
$$;

-- userid, array[image url]
call create_post('1','{"http://aws.com"}');


--* DELETE POST procedure
CREATE OR REPLACE PROCEDURE delete_post(
  postid posts.post_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- update post count on users table
  UPDATE users
  SET posts = posts - 1
  WHERE user_id = userid
  AND
    EXISTS (
      SELECT *
      FROM posts
      WHERE posts.post_id = postid
    );

  -- delete post
  DELETE FROM posts
  WHERE post_id = postid;

  COMMIT;

END
$$;

-- post id, user id
call delete_post('1','1');


--* LIKE POST procedure
CREATE OR REPLACE PROCEDURE like_post(
  userid users.user_id%type,
  postid posts.post_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- insert into post_likes table
  INSERT INTO post_likes (user_id, post_id)
  VALUES (userid, postid);

  -- update like count on posts table
  UPDATE posts
  SET likes = likes + 1
  WHERE post_id = postid;

  COMMIT;

END
$$;

-- user id, post id
CALL like_post(3,2);


--* UNLIKE POST procedure
CREATE OR REPLACE PROCEDURE unlike_post(
  userid users.user_id%type,
  postid posts.post_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- delete from post_likes table
  DELETE FROM post_likes
  WHERE user_id = userid;

  -- update like count on posts table
  UPDATE posts
  SET likes = likes - 1
  WHERE post_id = postid AND user_id = userid;

  COMMIT;

END
$$;

-- CALL procedure
CALL unlike_post(3,2);


--* CREATE COMMENT POST procedure
CREATE OR REPLACE PROCEDURE create_comment(
  postid posts.post_id%type,
  userid users.user_id%type,
  comment post_comments.text%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- create a comment
  INSERT INTO post_comments (post_id, user_id, text)
  VALUES (postid, userid, comment);

  -- update comment count on posts table
  UPDATE posts
  SET comments = comments + 1
  WHERE post_id = postid;

  COMMIT;

END
$$;

-- CALL procedure
-- post_id, user_id, comment text
call create_comment('4', '1', 'nice picture');


--* DELETE COMMENT POST procedure
CREATE OR REPLACE PROCEDURE delete_comment(
  commentid post_comments.comment_id%type,
  postid posts.post_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- delete a comment
  DELETE FROM post_comments
  WHERE comment_id = commentid AND user_id = userid;

  -- update comment count on posts table
  UPDATE posts
  SET comments = comments - 1
  WHERE post_id = postid;

  COMMIT;

END
$$;

-- CALL procedure
-- comment_id, post_id, user_id
call delete_comment(9, 4, 1);