import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ActivityServiceTest } from './activity-spec.service';
import { ActivityModuleTest } from './activity-spec.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('Activity Endpoint', () => {
  let app: INestApplication;
  let logger: Logger;
  let activityServiceTest: ActivityServiceTest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ActivityModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    activityServiceTest = app.get(ActivityServiceTest);
  });

  describe('POST /api/activities', () => {
    beforeEach(async () => {
      await activityServiceTest.deleteAll();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/activities')
        .set('Authorization', 'wrong')
        .send({
          title: '',
          start_date: '',
          end_date: '',
          start_time: '',
          end_time: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/activities')
        .set('Authorization', 'test')
        .send({
          title: '',
          start_date: '',
          end_date: '',
          start_time: '',
          end_time: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if request and token is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/activities')
        .set('Authorization', 'test')
        .send({
          title: 'test',
          start_date: new Date(),
          end_date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          project_id: 171,
        });

      logger.debug(response.body);

      expect(response.status).toBe(201);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.duration).toBeDefined();
    });
  });

  describe('GET /api/activities/:id', () => {
    beforeEach(async () => {
      await activityServiceTest.deleteAll();
      await activityServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .get(`/api/activities/${activity?.id}`)
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .get(`/api/activities/${activity?.id + 1}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param and token  is valid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .get(`/api/activities/${activity.id}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
    });
  });

  describe('DELETE /api/activities/:id', () => {
    beforeEach(async () => {
      await activityServiceTest.deleteAll();
      await activityServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .delete(`/api/activities/${activity?.id}`)
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .delete(`/api/activities/${activity?.id + 1}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param dan token is valid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .delete(`/api/activities/${activity?.id}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('UPDATE /api/activities', () => {
    beforeEach(async () => {
      await activityServiceTest.deleteAll();
      await activityServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .patch(`/api/activities/${activity?.id}`)
        .set('Authorization', 'wrong')
        .send({
          title: 'test update',
          start_date: new Date(),
          end_date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          project_id: 171,
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .patch(`/api/activities/${activity?.id + 1}`)
        .set('Authorization', 'test')
        .send({
          title: 'test update',
          start_date: new Date(),
          end_date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          project_id: 171,
        });

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .patch(`/api/activities/${activity?.id}`)
        .set('Authorization', 'test')
        .send({
          title: '',
          start_date: '',
          end_date: '',
          start_time: '',
          end_time: '',
          project_id: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if request is valid', async () => {
      const activity = await activityServiceTest.get();
      const response = await request(app.getHttpServer())
        .patch(`/api/activities/${activity?.id}`)
        .set('Authorization', 'test')
        .send({
          title: 'test update',
          start_date: new Date(),
          end_date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          project_id: 171,
        });

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.title).toBe('test update');
    });
  });
});
