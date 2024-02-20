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
        created_at: "2020-07-09T20:11:00.000Z",
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
  