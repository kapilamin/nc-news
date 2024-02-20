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
        expect(body.msg).toEqual('invalid id supplied')
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
