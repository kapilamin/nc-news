const {app} = require('../app.js')
const db = require('../db/connection.js')
const request = require('supertest')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data/index')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('/api/topics', () => {
    test("GET:200 sends an array of topic objects with 'slug' and 'description' properties to the client", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics).toHaveLength(3)
            response.body.topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string')
                expect(typeof topic.slug).toBe('string')    
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

test('App should be defined', () => {
    expect(app).toBeDefined();
  });
  