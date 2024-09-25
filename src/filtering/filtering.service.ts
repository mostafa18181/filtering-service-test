// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
//  import { Rectangle } from './rectangle.entity';
//  import { Repository } from 'typeorm';
// @Injectable()
// export class FilteringService {
//   constructor(
//     @InjectRepository(Rectangle)
//     private rectanglesRepository: Repository<Rectangle>,
//   ) {}

  
//   async addRectangles(main: any, inputs: any[], time: string): Promise<void> {
//     // Minimal code: directly save a rectangle without checking for intersections
//     const rectangle = new Rectangle();
//     rectangle.x = inputs[0].x;
//     rectangle.y = inputs[0].y;
//     rectangle.width = inputs[0].width;
//     rectangle.height = inputs[0].height;
//     rectangle.time = time;
//     await this.rectanglesRepository.save(rectangle);
//   }

//   async getRectangles(): Promise<Rectangle[]> {
//     return this.rectanglesRepository.find();
// }

// }



import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rectangle } from './rectangle.entity';
import { log } from 'console';

@Injectable()
export class FilteringService {
    constructor(
        @InjectRepository(Rectangle)
        private rectanglesRepository: Repository<Rectangle>,
    ) {}

    async addRectangles(main: any, inputs: any[], time: string): Promise<void> {
        for (const input of inputs) {
            if (this.isIntersecting(main, input)) {
                const rectangle = new Rectangle();
                rectangle.x = input.x;
                rectangle.y = input.y;
                rectangle.width = input.width;
                rectangle.height = input.height;
                rectangle.time = time;
                await this.rectanglesRepository.save(rectangle);
            }
        }
    }

    async getRectangles(): Promise<Rectangle[]> {
        return this.rectanglesRepository.find();
    }

    private isIntersecting(main: any, input: any): boolean {
    
            console.log("*****why1",  
                input.x > main.x + main.width );
                console.log("*****why2",  
                    input.x + input.width < main.x);
                    console.log("*****why3",  
                        input.y > main.y + main.height);
                        console.log("*****why4",  
                            input.y + input.height < main.y);

                            console.log("*****whyfinal",  
                                !(
                                    input.x > main.x + main.width ||
                                    input.x + input.width < main.x ||
                                    input.y > main.y + main.height ||
                                    input.y + input.height < main.y
                                ));       
        return !(
            input.x > main.x + main.width ||
            input.x + input.width < main.x ||
            input.y > main.y + main.height ||
            input.y + input.height < main.y
        );
    }
}

