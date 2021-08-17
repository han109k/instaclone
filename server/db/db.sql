CREATE DATABASE insta;

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

CREATE TABLE follows (
  follow_id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL,
  follows INTEGER NOT NULL,
  CONSTRAINT fk_follow_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id SERIAL,
  caption TEXT,
  tags VARCHAR(255),
  location VARCHAR(255),
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  urls VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  comments INTEGER DEFAULT 0 CHECK(comments >= 0),
  CONSTRAINT fk_posts_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

/* EXAMPLE DATA*/
INSERT INTO posts (user_id, urls) VALUES ('1', 'http://aws.com');
INSERT INTO posts (user_id, urls) VALUES ('1', 'http://img.google.com.com');
INSERT INTO posts (user_id, urls) VALUES ('1', 'http://flickr.com');
INSERT INTO posts (user_id, urls) VALUES ('2', 'http://flickr.com');

CREATE TABLE post_comments (
  comment_id SERIAL PRIMARY KEY,
  post_id SERIAL,
  user_id SERIAL,
  text TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0 CHECK(likes >= 0),
  comments INTEGER DEFAULT 0 CHECK(comments >= 0),
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
INSERT INTO post_comments (post_id, user_id, text) VALUES ('2', '1', 'ok boomer');
INSERT INTO post_comments (post_id, user_id, text) VALUES ('2', '1', 'nice helmet');

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

INSERT INTO post_likes (user_id, post_id) VALUES ('3','2');