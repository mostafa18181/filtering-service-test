// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { FilteringService } from './filtering.service';
// import { Rectangle } from './rectangle.entity';
// import { FilteringController } from './filtering.controller';



// describe('FilteringService', () => {
//   let service: FilteringService;
 
//   let controller: FilteringController;
   
//   const mockRepository = {
//     find: jest.fn(),
//     save: jest.fn(),
//   };
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [FilteringController],
//       providers: [
//         {
//           provide: FilteringService,
//           useValue: {
//             addRectangles: jest.fn(), // Mocking addRectangles method
//           },
//         },
//       ],
//     }).compile();
    

//     controller = module.get<FilteringController>(FilteringController);
//     service = module.get<FilteringService>(FilteringService);
//   });
//   it('should call service to save rectangles', async () => {
//     const body = {
//       main: { x: 0, y: 0, width: 10, height: 20 },
//       input: [{ x: 2, y: 18, width: 5, height: 4 }],
//     };
  
//     jest.spyOn(service, 'addRectangles').mockResolvedValue(undefined);
//     await controller.addRectangles(body);
//     expect(service.addRectangles).toHaveBeenCalledWith(body.main, body.input, expect.any(String));
//   });
  
 
// });


import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilteringService } from './filtering.service';
import { Rectangle } from './rectangle.entity';

const mockRepository = {
  find: jest.fn(),
  save: jest.fn(),
};

describe('FilteringService', () => {
  let service: FilteringService;
  let repository: Repository<Rectangle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilteringService,
        {
          provide: getRepositoryToken(Rectangle), // استفاده از getRepositoryToken
          useValue: mockRepository,  // مخزن شبیه‌سازی شده (mock)
        },
      ],
    }).compile();

    service = module.get<FilteringService>(FilteringService);
    repository = module.get<Repository<Rectangle>>(getRepositoryToken(Rectangle)); // اصلاح repository به Repository
  });
  afterEach(() => {
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
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should return all saved rectangles', async () => {
    const expectedRectangles = [{ id: 1, x: 2, y: 18, width: 5, height: 4, time: new Date().toISOString() }];
    mockRepository.find.mockResolvedValue(expectedRectangles);

    const result = await service.getRectangles();
    expect(result).toEqual(expectedRectangles);
  });
});

