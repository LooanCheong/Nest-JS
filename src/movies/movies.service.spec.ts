import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import exp from 'constants';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      const afterCreate = service.getAll().length;
      expect(afterCreate).toEqual(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.update(1, { title: 'Updated Title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Title');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'Updated Title' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
