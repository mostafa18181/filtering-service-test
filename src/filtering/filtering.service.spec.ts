// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { FilteringService } from './filtering.service';
// import { Rectangle } from './rectangle.entity';

// describe('FilteringService', () => {
//   let service: FilteringService;
//   let repository: Repository<Rectangle>;

//   const mockRepository = {
//     find: jest.fn(),
//     save: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         FilteringService,
//         {
//           provide: getRepositoryToken(Rectangle),  // Mocking the Repository
//           useValue: mockRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<FilteringService>(FilteringService);
//     repository = module.get<Repository<Rectangle>>(getRepositoryToken(Rectangle));
//   });


//   it('should save rectangles that intersect with the main rectangle', async () => {
//     const main = { x: 0, y: 0, width: 10, height: 20 };
//     const inputs = [{ x: 2, y: 18, width: 5, height: 4 }];
//     const time = new Date().toISOString();
  
//     await service.addRectangles(main, inputs, time);
  
//     // The minimal code should only pass this call
//     expect(mockRepository.save).toHaveBeenCalledTimes(1);
//   });
  
// });


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
          provide: getRepositoryToken(Rectangle), // شبیه‌سازی Repository
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FilteringService>(FilteringService);
    repository = module.get<Repository<Rectangle>>(getRepositoryToken(Rectangle));
  });
  afterEach(() => {
    // پاکسازی همه شبیه‌سازی‌ها و فراخوانی‌ها بعد از هر تست
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save rectangles that intersect with the main rectangle', async () => {
    const main = { x: 0, y: 0, width: 10, height: 20 };
    const inputs = [{ x: 2, y: 18, width: 5, height: 4 }];
    const time = new Date().toISOString();

    await service.addRectangles(main, inputs, time);

    // انتظار داریم که save فقط یک بار صدا زده شود
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledWith({
      x: 2,
      y: 18,
      width: 5,
      height: 4,
      time: time,
    });
  });

  it('should not save rectangles that do not intersect with the main rectangle', async () => {
    const main = { x: 0, y: 0, width: 10, height: 20 };  // مستطیل اصلی
    const inputs = [{ x: 15, y: 25, width: 5, height: 4 }]; // مستطیل ورودی کاملاً خارج از محدوده اصلی است
    const time = new Date().toISOString();
  
    await service.addRectangles(main, inputs, time);
  
    // انتظار داریم که save صدا زده نشود چون هیچ تداخلی وجود ندارد
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
  
  
  it('should return all saved rectangles', async () => {
    const expectedRectangles = [{ id: 1, x: 2, y: 18, width: 5, height: 4, time: new Date().toISOString() }];
    mockRepository.find.mockResolvedValue(expectedRectangles);

    const result = await service.getRectangles();
    expect(result).toEqual(expectedRectangles);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });
});
