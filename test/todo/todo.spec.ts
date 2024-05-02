import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TodoModuleTest } from './todo-spec.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserServiceTest } from '../user/user-spec.service';
import { TodoServiceTest } from './todo-spec.service';
import { UserModuleTest } from '../user/user-spec.module';

describe('Todo Endpoint', () => {
  let app: INestApplication;
  let logger: Logger;
  let userServiceTest: UserServiceTest;
  let todoServiceTest: TodoServiceTest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModuleTest, TodoModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    userServiceTest = app.get(UserServiceTest);
    todoServiceTest = app.get(TodoServiceTest);
  });

  describe('POST /api/todo', () => {
    beforeEach(async () => {
      await todoServiceTest.deleteAll();
      await userServiceTest.register();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todo')
        .set('Authorization', 'wrong')
        .send({
          title: 'test',
          body: 'test',
          category_name: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todo')
        .set('Authorization', 'test')
        .send({
          title: '',
          body: '',
          category_name: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update if request is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todo')
        .set('Authorization', 'test')
        .send({
          title: 'test',
          body: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.body).toBe('test');
      expect(response.body.data.category_name).toBeNull();
    });
  });

  describe('GET /api/todo/:id', () => {
    beforeEach(async () => {
      await todoServiceTest.deleteAll();
      await userServiceTest.register();
      await todoServiceTest.createTodo();
    });

    it('should be rejected if token is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .get(`/api/todo/${todo?.id}`)
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if id is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .get(`/api/todo/${todo?.id + 1}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update if id and token is valid ', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .get(`/api/todo/${todo?.id}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body?.data.title).toBe('test');
    });
  });

  describe('PATCH /api/todo/:id', () => {
    beforeEach(async () => {
      await todoServiceTest.deleteAll();
      await userServiceTest.register();
      await todoServiceTest.createTodo();
    });

    it('should be rejected if token is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .patch(`/api/todo/${todo?.id}`)
        .set('Authorization', 'wrong')
        .send({
          title: 'test updated',
          body: 'test updated',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .patch(`/api/todo/${todo?.id}`)
        .set('Authorization', 'test')
        .send({
          title: '',
          body: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if id is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .patch(`/api/todo/${todo?.id + 1}`)
        .set('Authorization', 'test')
        .send({
          title: 'test updated',
          body: 'test updated',
        });

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update if id, token and request valid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .patch(`/api/todo/${todo?.id}`)
        .set('Authorization', 'test')
        .send({
          title: 'test updated',
          body: 'test updated',
        });

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.title).toBe('test updated');
      expect(response.body.data.body).toBe('test updated');
    });
  });

  describe('DELETE /api/todo/:id', () => {
    beforeEach(async () => {
      await todoServiceTest.deleteAll();
      await userServiceTest.register();
      await todoServiceTest.createTodo();
    });

    it('should be rejected if token is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .delete(`/api/todo/${todo?.id}`)
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if id is invalid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .delete(`/api/todo/${todo?.id + 1}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update to delete if id and token is valid', async () => {
      const todo = await todoServiceTest.getTodo();
      const response = await request(app.getHttpServer())
        .delete(`/api/todo/${todo?.id}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('GET /api/contacts', () => {
    beforeEach(async () => {
      await todoServiceTest.deleteAll();
      await userServiceTest.register();
      await todoServiceTest.createTodo();
    });

    it('should be able to search todo', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/todo`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search todo with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/todo`)
        .query({
          size: 1,
          page: 2,
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.total_page).toBe(1);
      expect(response.body.paging.size).toBe(1);
    });
  });
});
