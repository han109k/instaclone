--* LIKE COMMENT procedure
CREATE OR REPLACE PROCEDURE like_comment(
  commentid post_comments.comment_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- insert into comment_likes table
  INSERT INTO comment_likes(user_id, comment_id)
  VALUES (userid, commentid);

  -- update like count for that comment
  UPDATE post_comments
  SET likes = likes + 1
  WHERE comment_id = commentid;

  COMMIT;

END;
$$;

-- comment id, user id
call like_comment(13, 3);


--* UNLIKE COMMENT procedure
CREATE OR REPLACE PROCEDURE unlike_comment(
  commentid post_comments.comment_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- update like count on post_comments
  UPDATE post_comments
  SET likes = likes - 1
  WHERE comment_id = commentid
  AND
    EXISTS (
      SELECT *
      FROM comment_likes
      WHERE comment_id = commentid AND user_id = userid
    );

  -- update like count for that comment
  DELETE FROM comment_likes
  WHERE comment_id = commentid AND user_id = userid;

  COMMIT;

END;
$$;

-- comment id, user id
CALL unlike_comment(13, 3);


--* LIKE REPLY procedure
CREATE OR REPLACE PROCEDURE like_reply(
  replyid reply_likes.reply_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- insert into comment_likes table
  INSERT INTO reply_likes(user_id, reply_id)
  VALUES (userid, replyid);

  -- update like count for that reply
  UPDATE reply_comments
  SET likes = likes + 1
  WHERE reply_id = replyid;

  COMMIT;

END;
$$;

-- reply id, user id
call like_reply(2, 4);


--* UNLIKE REPLY procedure
CREATE OR REPLACE PROCEDURE unlike_reply(
  replyid reply_likes.reply_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- update like count on reply_comments
  UPDATE reply_comments
  SET likes = likes - 1
  WHERE reply_id = replyid
  AND
    EXISTS (
      SELECT *
      FROM reply_likes
      WHERE reply_id = replyid AND user_id = userid
    );

  -- update like count for that reply
  DELETE FROM reply_likes
  WHERE reply_id = replyid AND user_id = userid;

  COMMIT;

END;
$$;

-- reply id, user id
call unlike_reply(2, 4);


--* CREATE REPLY COMMENT procedure
CREATE OR REPLACE PROCEDURE create_reply(
  commentid post_comments.comment_id%type,
  userid users.user_id%type,
  reply reply_comments.text%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- create a comment
  INSERT INTO reply_comments (comment_id, user_id, text)
  VALUES (commentid, userid, reply);

  -- update comment count on posts table
  UPDATE post_comments
  SET comments = comments + 1
  WHERE comment_id = commentid;

  COMMIT;

END;
$$;

-- comment id, user id, reply text
call create_reply(13, 1, 'ok boommer');


--* DELETE REPLY COMMENT procedure
CREATE OR REPLACE PROCEDURE delete_reply(
  replyid reply_comments.reply_id%type,
  userid users.user_id%type
)
LANGUAGE PLPGSQL
AS $$
BEGIN

  -- update comment count on posts table
  UPDATE post_comments
  SET comments = comments - 1
  WHERE user_id = userid
  AND
    EXISTS (
      SELECT *
      FROM reply_comments
      WHERE reply_id = replyid
    );

  -- delete the reply
  DELETE FROM reply_comments
  WHERE reply_id = replyid;

  COMMIT;

END;
$$;

-- reply id, user id
call delete_reply(2, 1);