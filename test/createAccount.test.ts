import * as DotEnv from 'dotenv';
DotEnv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ErrorExceptionFilter } from 'src/shared/exception/filter/errorException.filter';
import { HttpExceptionFilter } from 'src/shared/exception/filter/httpException.filter';
import { IUserData } from 'src/shared/interface/userData.interface';
import { PrismaService } from 'src/service/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('Create Account (e2e)', () => {
  let server: INestApplication;
  let database: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({}));
    app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());
    database = app.get<PrismaService>(PrismaService);
    await app.init();
    server = app.getHttpServer();
  });

  it('Should not accept a request, without CPF', () => {
    const body = {
      name: 'teste',
      password: 'teste01',
      email: 'teste@teste.com',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(Array.isArray(res.body.message)).toBeTruthy();
        expect(res.body.message.join(', ').includes('cpf')).toBeTruthy();
      });
  });

  it('Should not accept a request, without EMAIL', () => {
    const body = {
      cpf: '12345678901',
      name: 'teste',
      password: 'teste01',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(Array.isArray(res.body.message)).toBeTruthy();
        expect(res.body.message.join(', ').includes('email')).toBeTruthy();
      });
  });

  it('Should not accept a request, without NAME', () => {
    const body = {
      cpf: '12345678901',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(Array.isArray(res.body.message)).toBeTruthy();
        expect(res.body.message.join(', ').includes('name')).toBeTruthy();
      });
  });

  it('Should not accept a request, without PASSWORD', () => {
    const body = {
      cpf: '12345678901',
      name: 'teste',
      email: 'teste@teste.com',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(Array.isArray(res.body.message)).toBeTruthy();
        expect(res.body.message.join(', ').includes('password')).toBeTruthy();
      });
  });

  it('Should not create a account, with email invalid', () => {
    const body = {
      cpf: '12345678901',
      name: 'teste',
      email: 'testeteste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message).toEqual('Email invalid!');
      });
  });

  it('Should not create a account, with cpf with more than 11 digits', () => {
    const body = {
      cpf: '123456789011',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message).toEqual('CPF invalid!');
      });
  });

  it('Should not create a account, with cpf with less than 11 digits', () => {
    const body = {
      cpf: '1234567890',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message).toEqual('CPF invalid!');
      });
  });

  it('Should not create a account, with cpf with less than 11 digits', () => {
    const body = {
      cpf: '1234567890',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message).toEqual('CPF invalid!');
      });
  });

  it('Should create a account', () => {
    const body = {
      cpf: '12345678901',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    const ID = 1;
    database.account.create = jest.fn().mockResolvedValue({
      ...body,
      id: ID,
    } as IAccount);

    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(database.account.create).toHaveBeenCalled();
        expect(res.body.account.id).toEqual(ID);
      });
  });

  it('Should not create a account, when the CPF is not unique', () => {
    const body = {
      cpf: '12345678901',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    database.account.create = jest.fn().mockRejectedValue({
      meta: {
        target: ['cpf'],
      },
    });

    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(database.account.create).toHaveBeenCalled();
        expect(res.body.message.includes('cpf')).toBeTruthy();
      });
  });

  it('Should not create a account, when the EMAIL is not unique', () => {
    const body = {
      cpf: '12345678901',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste01',
    } as Partial<IUserData>;
    database.account.create = jest.fn().mockRejectedValue({
      meta: {
        target: ['email'],
      },
    });

    return request(server)
      .post('/account/create')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(database.account.create).toHaveBeenCalled();
        expect(res.body.message.includes('email')).toBeTruthy();
      });
  });
});
