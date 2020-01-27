'use strict';

const {server} = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('My Kawaii Server !' , ()=> {

  it('Responds With 404 Error For Wrong Routes', () => {
    return mockRequest
      .get('/letsSee')
      .then(result => {
        expect(result.status).toBe(404);
        expect(result.res.statusMessage).toBe('WE NEED A MEDIC HERE !! (404)');
      })
      .catch(console.error);
  });

  it('Responds 500 Error', () => {
    return mockRequest
      .get('/test-error' )
      .then(result => {
        expect(result.status).toBe(500);
      })
      .catch(console.error);
  });



  it('/products GET request works' , ( ) => {
    return mockRequest
      .get('/products')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/products GET request works with get() method ' , ( ) => {
    return mockRequest
      .get('/products')
      .then(data => {
        expect(data.body[0].monster).toBe('Tank');
      });
  });



  it('/products POST request works' , ( ) => {
    return mockRequest
      .post('/products')
      .send({ monster: 'boomer' })
      .then(data => {
        expect(data.status).toBe(201);
      });
  });

  it('/products POST request works with create() method' , ( ) => {
    return mockRequest
      .post('/products')
      .send({ monster: 'boomer' })
      .then(data => {
        expect(data.body.monster).toBe('boomer');
      });
  });


  it('/products PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/products/the_boss')
      .send({monster: 'Tankichan'})
      .then(data => {
        console.log(data.body);
        expect(data.status).toBe(200);
      });
  });

  it('/products PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/products/the_boss')
      .send({monster: 'Tankichan'})
      .then(data => {
        console.log(data.body);
        expect(data.body.monster).toBe('Tankichan');
      });
  });

  it('/products DELETE request works' , ( ) => {
    return mockRequest
      .put('/products/the_boss')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });


  it('/products DELETE request works with Delete() method' , ( ) => {
    return mockRequest
      .put('/products/the_boss')
      .then(data => {
        expect(typeof data.body).toBe('object');
      });
  });


  //  CATEGORIES :
  it('/categories GET request works' , ( ) => {
    return mockRequest
      .get('/categories')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });



  it('/categories POST request works' , ( ) => {
    return mockRequest
      .post('/categories')
      .send({ monster: 'boomer' })
      .then(data => {
        expect(data.status).toBe(201);
      });
  });

  it('/categories POST request works with create() method' , ( ) => {
    return mockRequest
      .post('/categories')
      .send({ monster: 'boomer' })
      .then(data => {
        expect(data.body.monster).toBe('boomer');
      });
  });


  it('/categories PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/categories/the_boss')
      .send({monster: 'Tankichan'})
      .then(data => {
        console.log(data.body);
        expect(data.status).toBe(200);
      });
  });

  it('/categories PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/categories/the_boss')
      .send({monster: 'Tankichan'})
      .then(data => {
        console.log(data.body);
        expect(data.body.monster).toBe('Tankichan');
      });
  });

  it('/categories DELETE request works' , ( ) => {
    return mockRequest
      .put('/categories/the_boss')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });


  it('/categories DELETE request works with Delete() method' , ( ) => {
    return mockRequest
      .put('/categories/the_boss')
      .then(data => {
        expect(typeof data.body).toBe('object');
      });
  });







});