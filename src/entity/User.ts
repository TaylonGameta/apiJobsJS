import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Job} from '../entity/Job';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Job, job => job.user)
    jobs: Job[];

}
