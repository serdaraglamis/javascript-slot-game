const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('Outcome API', () => {
    it('should return a JSON Object', (done) => {
        request(app)
            .get('/server/outcome')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should throw an error if outcomes length not equal to 3', (done) => {
        request(app)
            .get('/server/outcome')
            .expect(function (res) {
                console.log(res.body);
                if (res.body.results.length !== 3) throw new Error(`Result have to be length 2 but returned ${res.body.results.length}`);
            })
            .expect(200, done);
    });

    it('should return a type value with an integer', (done) => {
        request(app)
            .get('/server/outcome')
            .expect(function (res) {
                console.log(res.body);
                if (typeof res.body.type !== 'number') throw new Error(`Type must return a number`);
            })
            .expect(200, done);
    });

    it('should return an object if bonus available else must return a boolean with false', (done) => {
        request(app)
            .get('/server/outcome')
            .expect(function (res) {
                console.log(res.body);
                if (res.body.bonus && typeof res.body.bonus !== 'object') {
                    throw new Error(`Bonus have to be an object`);
                } else if (!res.body.bonus && typeof res.body.bonus !== 'boolean') {
                    throw new Error(`If bonus is not available it must return booelan`);
                }
            })
            .expect(200, done);
    });


});

describe('GET /random-url', () => {
    it('should return 404', (done) => {
        request(app)
            .get('/reset')
            .expect(404, done);
    });
});
