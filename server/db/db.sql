CREATE DATABASE insta;

--* users TABLE
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  user_name VARCHAR(25) NOT NULL UNIQUE,
  full_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) NOT NULL,
  bio TEXT,
  posts INTEGER DEFAULT 0 CHECK(posts >= 0),
  followers INTEGER DEFAULT 0 CHECK(followers >= 0),
  following INTEGER DEFAULT 0 CHECK(following >= 0)
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
  user_id SERIAL NOT NULL,
  follows INTEGER NOT NULL,
  CONSTRAINT fk_follow_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

--* posts TABLE
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id SERIAL,
  caption TEXT,
  tags VARCHAR(255),
  location VARCHAR(255),
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  urls TEXT [] NOT NULL,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  comments INTEGER DEFAULT 0 CHECK(comments >= 0),
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

--* post_comments TABLE
CREATE TABLE post_comments (
  comment_id SERIAL PRIMARY KEY,
  post_id SERIAL,
  user_id SERIAL,
  text TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  replies INTEGER DEFAULT 0 CHECK(replies >= 0),
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


--* post_likes TABLE
CREATE TABLE post_likes (
  user_id SERIAL,
  post_id SERIAL,
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


--* comment_likes TABLE
CREATE TABLE comment_likes (
  user_id SERIAL,
  comment_id SERIAL,
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




--* reply_comments TABLE
CREATE TABLE reply_comments (
  reply_id SERIAL PRIMARY KEY,
  comment_id SERIAL,
  user_id SERIAL,
  text TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  CONSTRAINT fk_reply_comment
  FOREIGN KEY(comment_id) 
    REFERENCES post_comments(comment_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_reply_user
  FOREIGN KEY(user_id) 
    REFERENCES users(user_id)
    ON DELETE CASCADE
);




--* reply_likes TABLE
CREATE TABLE reply_likes (
  user_id SERIAL,
  reply_id SERIAL,
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





--* bookmarks TABLE
CREATE TABLE bookmarks (
  bookmark_id SERIAL PRIMARY KEY,
  post_id SERIAL NOT NULL,
  user_id SERIAL NOT NULL,
  CONSTRAINT fk_user_bookermark
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_post_bookmark
      FOREIGN KEY(post_id) 
	    REFERENCES posts(post_id)
      ON DELETE CASCADE
);
