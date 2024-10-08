// import { Controller, Post, Body, Get } from '@nestjs/common';
// import { FilteringService } from './filtering.service';
// @Controller('filtering')
// export class FilteringController {
//   constructor(private readonly filteringService: FilteringService) {}

//   @Post()
//   async addRectangles(@Body() body: any) {
//     // Minimal code to call the service method
//     await this.filteringService.addRectangles(body.main, body.input, new Date().toISOString());
//   }
// }


import { Controller, Post, Body, Get } from '@nestjs/common';
import { FilteringService } from './filtering.service';

@Controller('filtering')
export class FilteringController {
    constructor(private readonly filteringService: FilteringService) {}

    @Post()
    async addRectangles(@Body() body: any) {
        await this.filteringService.addRectangles(body.main, body.input, new Date().toISOString());
    }

    @Get()
    async getRectangles() {
        return this.filteringService.getRectangles();
    }
}
