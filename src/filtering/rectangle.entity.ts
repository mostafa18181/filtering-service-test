import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rectangle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column()
    width: number;

    @Column()
    height: number;

    @Column()
    time: string;
}
