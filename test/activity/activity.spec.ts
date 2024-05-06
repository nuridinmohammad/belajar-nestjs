import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { EmployeeServiceTest } from './activity-spec.service';
import { EmployeeModuleTest } from './activity-spec.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('Employee Endpoint', () => {
  let app: INestApplication;
  let logger: Logger;
  let employeeServiceTest: EmployeeServiceTest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, EmployeeModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    employeeServiceTest = app.get(EmployeeServiceTest);
  });

  describe('POST /api/employees', () => {
    beforeEach(async () => {
      await employeeServiceTest.deleteAll();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees')
        .send({
          username: '',
          password: '',
          fullname: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if request is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees')
        .send({
          username: 'test',
          password: 'test',
          fullname: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(201);
      expect(response.body.data.username).toBe('test');
    });

    it('should be rejected if username already exists', async () => {
      await employeeServiceTest.create();
      const response = await request(app.getHttpServer())
        .post('/api/employees')
        .send({
          username: 'test',
          password: 'test',
          fullname: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /api/employees/login', () => {
    beforeEach(async () => {
      await employeeServiceTest.deleteAll();
      await employeeServiceTest.create();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees/login')
        .send({
          username: '',
          password: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if request is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees/login')
        .send({
          username: 'test',
          password: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.token).toBeDefined();
    });

    it('should be rejected if username or password is wrong', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees/login')
        .send({
          username: 'salah',
          password: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/employees/current', () => {
    beforeEach(async () => {
      await employeeServiceTest.deleteAll();
      await employeeServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/employees/current')
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get employee', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/employees/current')
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.fullname).toBe('test');
      expect(response.body.data.rate).toBe('12.000');
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe('PATCH /api/employees/current', () => {
    beforeEach(async () => {
      await employeeServiceTest.deleteAll();
      await employeeServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/employees/current')
        .set('Authorization', 'wrong')
        .send({
          fullname: 'test update',
          password: 'test update',
          rate: '13.000',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/employees/current')
        .set('Authorization', 'test')
        .send({
          fullname: '',
          password: '',
          rate: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able if request is valid', async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/employees/current')
        .set('Authorization', 'test')
        .send({
          fullname: 'test update',
          password: 'test update',
          rate: '13.000',
        });

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.fullname).toBe('test update');
      expect(response.body.data.rate).toBe('13.000');

      response = await request(app.getHttpServer())
        .post('/api/employees/login')
        .send({
          username: 'test',
          password: 'test update',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.fullname).toBe('test update');
      expect(response.body.data.rate).toBe('13.000');
    });
  });
});
