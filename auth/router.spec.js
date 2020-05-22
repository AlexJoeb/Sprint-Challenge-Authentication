const { uniqueNamesGenerator, starWars } = require('unique-names-generator');

const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
    describe('auth route', () => {
        describe('POST /api/auth/login', () => {
            it('should fail when only username is provided in the body', async () => {
                const expectedBack = {
                    message: "Please a username and password."
                };
                const expectedStatus = 400;

                const username = await request(server)
                    .post('/api/auth/login')
                    .send({ username: "James Halpert" })
                    .expect(expectedStatus)
                    .then(res => {
                        expect(JSON.parse(res.text)).toMatchObject(expectedBack);
                    });
            })

            it('should fail when only password is provided in the body', async () => {
                const expectedBack = {
                    message: "Please a username and password."
                };
                const expectedStatus = 400;

                const password = await request(server)
                    .post('/api/auth/login')
                    .send({ password: "The Office" })
                    .expect(expectedStatus)
                    .then(res => {
                        expect(JSON.parse(res.text)).toMatchObject(expectedBack);
                    });
            })

            it('should fail when username and password are provided in the body but do not match', async () => {
                const expectedStatus = 400;
                const expectedBack = {
                    message: "Invalid credentials."
                };

                const password = await request(server)
                    .post('/api/auth/login')
                    .send({ username: "James Halpert", password: "Wrong password.." })
                    .expect(expectedStatus)
                    .then(res => {
                        expect(JSON.parse(res.text)).toMatchObject(expectedBack);
                    });
            })

            it('should pass when username and password are provided in the body', async () => {
                const expectedStatus = 200;

                const hit = await request(server)
                    .post('/api/auth/login')
                    .send({ username: "James Halpert", password: "The Office" })
                    .expect(expectedStatus)
            })
        })
        describe('POST /api/auth/register', () => {

            it('should fail when only username is provided in the body', async () => {
                const expectedBack = {
                    message: "Username and password must be provided."
                };
                const expectedStatus = 400;

                const register = await request(server)
                    .post('/api/auth/register')
                    .send({ username: "James Halpert" })
                    .expect(expectedStatus)
                    .then(res => {
                        expect(JSON.parse(res.text)).toMatchObject(expectedBack);
                    });
            })

            it('should fail when only password is provided in the body', async () => {
                const expectedBack = {
                    message: "Username and password must be provided."
                };
                const expectedStatus = 400;

                const register = await request(server)
                    .post('/api/auth/register')
                    .send({ password: "The Office" })
                    .expect(expectedStatus)
                    .then(res => {
                        expect(JSON.parse(res.text)).toMatchObject(expectedBack);
                    });
            })

            it('should fail when username is in use', async () => {
                const expectedStatus = 400;

                const register = await request(server)
                    .post('/api/auth/register')
                    .send({ username: "James Halpert", password: "The Office" })
                    .expect(expectedStatus)
            })

            it('should pass when username and password is provided in the body', async () => {
                const expectedStatus = 201;

                const register = await request(server)
                    .post('/api/auth/register')
                    .send({ username: generateName(), password: "The Office" })
                    .expect(expectedStatus)
            })
        })
    })
})

const generateName = () => {
    return uniqueNamesGenerator({
        length: 1,
        dictionaries: [starWars]
    });
}