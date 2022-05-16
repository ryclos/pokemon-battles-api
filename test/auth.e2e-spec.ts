import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('[POST][201] /auth/register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(201);
  });

  it('[POST][200] /auth/login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(200);
  });

  // TODO 403 mot de passe invalide
  //it('[POST][403] /auth/login', () => {
  //  return request(app.getHttpServer())
  //      .post('/auth/login')
  //      .send({
  //        username: 'test',
  //        password: 'testicule',
  //      })
  //      .expect(403);
  //});
  //
  //// TODO 403 UTILISATEUR NON EXISTANT
  //it('[POST][403] /auth/login', () => {
  //  return request(app.getHttpServer())
  //      .post('/auth/login')
  //      .send({
  //        username: 'testabulle',
  //        password: 'test',
  //      })
  //      .expect(`Utilisateur introuvable ${403}`)
  //});
});
