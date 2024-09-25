import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Rectangle } from './rectangle.entity';
 import { Repository } from 'typeorm';
@Injectable()
export class FilteringService {
  constructor(
    @InjectRepository(Rectangle)
    private rectanglesRepository: Repository<Rectangle>,
  ) {}

  
  async addRectangles(main: any, inputs: any[], time: string): Promise<void> {
    // حداقل کد: مستقیم بدون بررسی تداخل، یک مستطیل ذخیره می‌کنیم
    const rectangle = new Rectangle();
    rectangle.x = inputs[0].x;
    rectangle.y = inputs[0].y;
    rectangle.width = inputs[0].width;
    rectangle.height = inputs[0].height;
    rectangle.time = time;
    await this.rectanglesRepository.save(rectangle);
  }

  async getRectangles(): Promise<Rectangle[]> {
    return this.rectanglesRepository.find();
}

}

