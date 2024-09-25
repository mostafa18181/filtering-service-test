import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilteringService } from './filtering.service';
import { Rectangle } from './rectangle.entity';

describe('FilteringService', () => {
  let service: FilteringService;
  let repository: Repository<Rectangle>;

  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilteringService,
        {
          provide: getRepositoryToken(Rectangle),  // Mocking the Repository
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FilteringService>(FilteringService);
    repository = module.get<Repository<Rectangle>>(getRepositoryToken(Rectangle));
  });


  it('should save rectangles that intersect with the main rectangle', async () => {
    const main = { x: 0, y: 0, width: 10, height: 20 };
    const inputs = [{ x: 2, y: 18, width: 5, height: 4 }];
    const time = new Date().toISOString();
  
    await service.addRectangles(main, inputs, time);
  
    // The minimal code should only pass this call
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
  
});


