import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ProjectServiceTest } from './project-spec.service';
import { ProjectModuleTest } from './project-spec.module';

describe('Project Endpoint', () => {
  let app: INestApplication;
  let logger: Logger;
  let projectServiceTest: ProjectServiceTest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProjectModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    projectServiceTest = app.get(ProjectServiceTest);
  });

  describe('POST /api/projects', () => {
    beforeEach(async () => {
      await projectServiceTest.deleteAll();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .set('Authorization', 'wrong')
        .send({
          name: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .set('Authorization', 'test')
        .send({
          name: '',
        });

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able create if request is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .set('Authorization', 'test')
        .send({
          name: 'test',
        });

      logger.debug(response.body);

      expect(response.status).toBe(201);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.name).toBe('test');
    });
  });

  describe('GET /api/projects/:id', () => {
    beforeEach(async () => {
      await projectServiceTest.deleteAll();
      await projectServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${project.id}`)
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param is invalid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${Number(project.id - 1)}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if param and token is valid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${project.id}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.name).toBe('test');
    });
  });

  describe('DELETE /api/projects/:id', () => {
    beforeEach(async () => {
      await projectServiceTest.deleteAll();
      await projectServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', 'wrong');

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param is invalid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .delete(`/api/projects/${project.id + 1}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if param and token is valid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', 'test');

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('PUT /api/projects/:id', () => {
    beforeEach(async () => {
      await projectServiceTest.deleteAll();
      await projectServiceTest.create();
    });

    it('should be rejected if token is invalid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .put(`/api/projects/${project.id}`)
        .set('Authorization', 'wrong')
        .send({
          name: 'test updated',
        });

      logger.debug(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if param is invalid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .put(`/api/projects/${project.id + 1}`)
        .set('Authorization', 'test')
        .send({
          name: 'test updated',
        });
      test;

      logger.debug(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be success if param and token is valid', async () => {
      const project = await projectServiceTest.getProject();
      const response = await request(app.getHttpServer())
        .put(`/api/projects/${project.id}`)
        .set('Authorization', 'test')
        .send({
          name: 'test updated',
        });

      logger.debug(response.body);

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.name).toBe('test updated');
    });
  });
});
