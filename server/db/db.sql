CREATE DATABASE insta;

--* users TABLE
CREATE TABLE users (
  user_id uuid DEFAULT uuid_generate_v4 (),
  email VARCHAR(50) NOT NULL UNIQUE,
  user_name VARCHAR(25) NOT NULL UNIQUE,
  full_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) NOT NULL,
  bio TEXT,
  posts INTEGER DEFAULT 0 CHECK(posts >= 0),
  followers INTEGER DEFAULT 0 CHECK(followers >= 0),
  following INTEGER DEFAULT 0 CHECK(following >= 0),
  PRIMARY KEY (user_id)
);

/* EXAMPLE DATA*/
INSERT INTO users (email, user_name, full_name, password, profile_pic) VALUES ('han109k@gmail.com', 'han109k', 'ayhan', 'asd1234', 'http://google.com');
INSERT INTO users (email, user_name, full_name, password, profile_pic) VALUES ('wyvern@gmail.com', 'wyvern', 'wyvern', 'asd1234', 'http://google.com');
INSERT INTO users (email, user_name, full_name, password, profile_pic) VALUES ('abc@gmail.com', 'abc', 'alphabet', 'asd1234', 'http://google.com');
INSERT INTO users (email, user_name, full_name, password, profile_pic) VALUES ('random@hotmail.com', 'random', 'random', 'asd1234', 'http://google.com');
INSERT INTO users (email, user_name, full_name, password, profile_pic) VALUES ('trivial@example.com', 'trivial', 'tri', 'asd1234', 'http://google.com');

--* follows TABLE
CREATE TABLE follows (
  follow_id SERIAL PRIMARY KEY,
  user_id uuid,
  follows uuid NOT NULL,
  CONSTRAINT fk_follow_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

-- CALL function
-- user id, user id (followed user)
select follow_user('73cbc538-2add-4e59-8b3e-ce4aed6f4292', '63df4622-63b8-45b8-8089-f4d6ff98058d');
select unfollow_user('73cbc538-2add-4e59-8b3e-ce4aed6f4292', '63df4622-63b8-45b8-8089-f4d6ff98058d');



--* posts TABLE
CREATE TABLE posts (
  post_id uuid DEFAULT uuid_generate_v4 (),
  user_id uuid NOT NULL,
  caption TEXT,
  tags VARCHAR(255),
  location VARCHAR(255),
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  urls TEXT [] NOT NULL,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  comments INTEGER DEFAULT 0 CHECK(comments >= 0),
  PRIMARY KEY (post_id),
  CONSTRAINT fk_posts_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

/* EXAMPLE DATA*/
-- user_id, urls
call create_post('1','{"http://aws.com", "http://google.com"}');
call create_post('3','{"http://flickr.com"}');
call create_post('4','{"http://cloudinary.com"}');
-- post id, user id
call delete_post('1','1');


--* post_comments TABLE
CREATE TABLE post_comments (
  comment_id uuid DEFAULT uuid_generate_v4 (),
  post_id uuid NOT NULL,
  user_id uuid NOT NULL,
  text TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  replies INTEGER DEFAULT 0 CHECK(replies >= 0),
  PRIMARY KEY (comment_id),
  CONSTRAINT fk_comments_post
    FOREIGN KEY(post_id) 
	    REFERENCES posts(post_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_comments_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

/* EXAMPLE DATA*/
-- post_id, user_id, comment text
call create_comment('4', '1', 'nice picture');
-- comment_id, post_id, user_id
call delete_comment(9, 4, 1);


--* post_likes TABLE
CREATE TABLE post_likes (
  user_id uuid,
  post_id uuid,
  PRIMARY KEY (user_id, post_id),
  CONSTRAINT fk_likes_post
    FOREIGN KEY(post_id) 
	    REFERENCES posts(post_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_likes_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

/* EXAMPLE DATA*/
-- user_id, post_id
CALL like_post(3,2);
CALL unlike_post(3,2);


--* comment_likes TABLE
CREATE TABLE comment_likes (
  user_id uuid,
  comment_id uuid,
  PRIMARY KEY (user_id, comment_id),
  CONSTRAINT fk_likes_comment
    FOREIGN KEY(comment_id) 
	    REFERENCES post_comments(comment_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_likes_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

/* EXAMPLE DATA */
-- comment id, user id
call like_comment(13, 3);
CALL unlike_comment(13, 3);


--* reply_comments TABLE
CREATE TABLE reply_comments (
  reply_id uuid DEFAULT uuid_generate_v4 (),
  comment_id uuid,
  user_id uuid,
  text TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  PRIMARY KEY (reply_id),
  CONSTRAINT fk_reply_comment
  FOREIGN KEY(comment_id) 
    REFERENCES post_comments(comment_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_reply_user
  FOREIGN KEY(user_id) 
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

/* EXAMPLE DATA */
-- comment id, user id, reply text
call create_reply(13, 1, 'ok just a test reply');
-- reply id, user id
call delete_reply(2, 1);


--* reply_likes TABLE
CREATE TABLE reply_likes (
  user_id uuid,
  reply_id uuid,
  PRIMARY KEY (user_id, reply_id),
  CONSTRAINT fk_likes_reply
    FOREIGN KEY(reply_id) 
	    REFERENCES reply_comments(reply_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_likes_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

/* EXAMPLE DATA */
-- reply id, user id
call like_reply(2, 4);
call unlike_reply(2, 4);


--* bookmarks TABLE
CREATE TABLE bookmarks (
  bookmark_id SERIAL PRIMARY KEY,
  post_id uuid,
  user_id uuid,
  CONSTRAINT fk_user_bookmark
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_post_bookmark
      FOREIGN KEY(post_id) 
	    REFERENCES posts(post_id)
      ON DELETE CASCADE
);

--* hashtags TABLE
CREATE TABLE hashtags (
  tag_id SERIAL PRIMARY KEY,
  post_id uuid,
  hashtag VARCHAR(50) NOT NULL,
  CONSTRAINT fk_post
    FOREIGN KEY(post_id)
      REFERENCES posts(post_id)
      ON DELETE CASCADE
);