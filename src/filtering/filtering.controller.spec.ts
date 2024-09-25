import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilteringService } from './filtering.service';
import { Rectangle } from './rectangle.entity';
import { FilteringController } from './filtering.controller';



describe('FilteringService', () => {
  let service: FilteringService;
 
  let controller: FilteringController;
   
  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilteringController],
      providers: [
        {
          provide: FilteringService,
          useValue: {
            addRectangles: jest.fn(), // شبیه‌سازی متد addRectangles
          },
        },
      ],
    }).compile();
    

    controller = module.get<FilteringController>(FilteringController);
    service = module.get<FilteringService>(FilteringService);
  });
  it('should call service to save rectangles', async () => {
    const body = {
      main: { x: 0, y: 0, width: 10, height: 20 },
      input: [{ x: 2, y: 18, width: 5, height: 4 }],
    };
  
    jest.spyOn(service, 'addRectangles').mockResolvedValue(undefined);
    await controller.addRectangles(body);
    expect(service.addRectangles).toHaveBeenCalledWith(body.main, body.input, expect.any(String));
  });
  
 
});


