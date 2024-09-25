import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilteringModule } from './filtering/filtering.module';
import { Rectangle } from './filtering/rectangle.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'test', // نام کاربری پایگاه داده PostgreSQL
            password: '123456', // رمز عبور پایگاه داده
            database: 'my_database', // نام پایگاه داده
            entities: [Rectangle],
            synchronize: true, // فقط برای توسعه؛ در تولید باید false باشد
        }),
        FilteringModule,
    ],
})
export class AppModule {}
