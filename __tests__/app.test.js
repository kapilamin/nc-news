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
})

describe("error handling", () => {
    test("404 for missing endpoints", () => {
        return request(app)
        .get('/api/missing')
        .expect(404)
        .then(({body}) => {
        expect(body.msg).toEqual('/api/missing endpoint not found')
        })
    })
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




  