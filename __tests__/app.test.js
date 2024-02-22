const app = require('../app.js')
const db = require('../db/connection.js')
const request = require('supertest')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data/index')
const endpoints = require('../endpoints.json');

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('/api/topics', () => {
    test("GET:200 sends an array of topic objects with 'slug' and 'description' properties to the client", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3)
          body.topics.forEach((topic) => {
            expect(topic).toHaveProperty('slug')
            expect(topic).toHaveProperty('description')
          })
        })
    })
    test('GET 404: should respond with a 404 not found if given an endpoint that does not exist', () => {
        return request(app)
        .get('/api/missing')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe("Endpoint does not exist");
        });
    });
})


describe("GET /api", () => {
    test("GET 200: returns an object describing all the available endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
            const body = response.body;
            expect(body).toEqual(endpoints);
        })
    })
})

describe('/api/articles/:article_id', () => {
    test("GET: 200 should return the article identified by the specified article_id", () => {
      const expectedArticle = {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: expect.any(String),
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      }
      return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) => {
        expect(body.article).toEqual(expectedArticle)
      })
    })
    test("GET: 400 when requesting an article with an invalid id", () => {
      return request(app)
      .get('/api/articles/banana')
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toEqual('invalid Id supplied')
      })
    })
    test("GET: 404 when requesting an article with an id that doesn't exist", () => {
      return request(app)
      .get('/api/articles/99999')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toEqual('requested article Id not found')
      })
    })
    test("PATCH: 200 should increment the votes of a specified article by the supplied amount", () => {
      const expectedArticle = {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: '2020-07-09T20:11:00.000Z',
        votes: 105,
        article_img_url:
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
      }
      return request(app)
      .patch('/api/articles/1')
      .send({inc_votes:5})
      .expect(200)
      .then(({body}) => {
        expect(body.updatedArticle).toEqual(expectedArticle)
      })
    })
    test("PATCH: 404 when attempting to udpate an article with an id that doesn't exist", () => {
      return request(app)
        .patch('/api/articles/99999')
        .send({inc_votes:5})
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('requested article Id not found')
        })
    })
    test('PATCH: 400 when attempting to update an article with an invalid id', () => {
      return request(app)
        .patch('/api/articles/banana')
        .send({inc_votes:5})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('invalid Id supplied')
        })
    })
   test("PATCH: 400 when attempting to update an article with an invalid vote count", () => {
      return request(app)
        .patch('/api/articles/1')
        .send({inc_votes:'banana'})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('invalid vote increment supplied')
        })
    })
    test("PATCH: 400 when attempting to update an article without an inc_votes value", () => {
      return request(app)
        .patch('/api/articles/1')
        .send({inc_comments:5})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('invalid vote increment supplied')
        })
    })
  })

describe('/api/articles', () => {
    test('GET: 200 should return an array of all articles,and all articles should have the following core properties: article_id,author,title,topic,created_at,votes,article_img_url', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(13)
          body.articles.forEach((article) => {
            expect(typeof article.article_id).toBe('number')
            expect(typeof article.author).toBe('string')
            expect(typeof article.title).toBe('string')
            expect(typeof article.topic).toBe('string')
            expect(typeof article.created_at).toBe('string')
            expect(typeof article.votes).toBe('number')
            expect(typeof article.article_img_url).toBe('string')
          })
        })
    })
    test('GET: 200 should return an array of all articles, sorted by date created in descending order', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy('created_at', { descending: true })
          })
      })
      test('GET: 200 none of the returned articles should have a body property', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach((article) => {
              expect(article).not.toHaveProperty('body')
            })
          })
      })
      test('GET: 200 returned articles should have a comment_count which is the total count of all comments on each article_id', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].comment_count).toBe(2)
            body.articles.forEach((article) => {
              expect(typeof article.comment_count).toBe('number')
            })
        })
    })
})

describe('/api/articles/:article_id/comments', () => {
    test('GET: 200 should return an array of all comments for the supplied article id. Each comment should have the following properties: comment_id, votes, created_at,author, body & article_id', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toHaveLength(11)
            body.comments.forEach((comment) => {
              expect(typeof comment.comment_id).toBe('number')
              expect(typeof comment.votes).toBe('number')
              expect(typeof comment.created_at).toBe('string')
              expect(typeof comment.author).toBe('string')
              expect(typeof comment.body).toBe('string')
              expect(typeof comment.article_id).toBe('number')
            })
        })
    })
    test("GET: 200 returned comments should be sorted by most recent first", () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
          expect(body.comments).toBeSortedBy('created_at',{descending: true})
        })
      })
    test('GET: 400 when requesting comments from an article using an invalid id', () => {
        return request(app)
        .get('/api/articles/banana/comments')
        .expect(400)
        .then(({ body }) => {
        expect(body.msg).toEqual('invalid Id supplied')
          })
      })
    test("GET: 404 when requesting comments from an article with an id that doesn't exist", () => {
    return request(app)
        .get('/api/articles/99999/comments')
        .expect(404)
        .then(({ body }) => {
        expect(body.msg).toEqual('requested article Id not found')
        })
    })
    test("GET: 200 returns an empty array when requesting comments from a valid article that doesn't have any associated comments", () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then(({ body }) => {
            expect(body.comments).toHaveLength(0)
        })
    })
    test('POST: 201 should return the posted comment', () => {
        return request(app)
          .post('/api/articles/4/comments')
          .send({ username: 'lurker', body: 'Ditch Mitch' })
          .expect(201)
          .then(({ body }) => {
            const { postedComment } = body
            expect(postedComment.author).toBe('lurker')
            expect(postedComment.body).toBe('Ditch Mitch')
            expect(postedComment.article_id).toBe(4)
            expect(postedComment.votes).toBe(0)
            expect(postedComment.comment_id).toBe(19)
            expect(typeof postedComment.created_at).toBe('string')
        })
    })
    test('POST: 400 when attempting to post a comment to an article with an invalid id', () => {
      return request(app)
        .post('/api/articles/banana/comments')
        .send({username:'lurker', body: 'Ditch Mitch'})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('invalid Id supplied')
        })
    })
    test("POST: 404 when attempting to post a comment to an article with an id that doesn't exist", () => {
      return request(app)
        .post('/api/articles/99999/comments')
        .send({username:'lurker', body: 'Ditch Mitch'})
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('requested article Id not found')
        })
    })
    test("POST: 400 given username does not exist in database", () => {
      return request(app)
      .post('/api/articles/4/comments')
      .send({username:'alias',body:'hello'})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('username does not exist')
      })
    })
    test('POST: 400 when the comment is missing a required field', () => {
      return request(app)
        .post('/api/articles/4/comments')
        .send({ username: 'lurker' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('body missing required field')
        })
    })
    test('POST: 201 should return the posted comment,ignoring unnecessary properties in the supplied body', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({
          username: 'lurker',
          body: 'Mitch spends too much time on the internet',
          article_id: 4,
        })
        .expect(201)
        .then(({ body }) => {
          const { postedComment } = body
          expect(postedComment.author).toBe('lurker')
          expect(postedComment.body).toBe('Mitch spends too much time on the internet')
          expect(postedComment.article_id).toBe(1)
          expect(postedComment.votes).toBe(0)
          expect(postedComment.comment_id).toBe(19)
          expect(typeof postedComment.created_at).toBe('string')
        })
    })
})

describe('/api/comments/:comment_id endpoint', () => {
  test('DELETE: 204 with no content when successfully deleting comment with supplied id', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204)
      .then((res) => {
        expect(res.body).toEqual({})
      })
  })
  test('DELETE: 400 when attempting to delete an article with an invalid id', () => {
    return request(app)
      .delete('/api/comments/cat')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('invalid Id supplied')
      })
  })
  test("DELETE: 404 when attempting to udpate an article with an id that doesn't exist", () => {
    return request(app)
      .delete('/api/comments/99999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual('requested Id not found')
      })
  })
})