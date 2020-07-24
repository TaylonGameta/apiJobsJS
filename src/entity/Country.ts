import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Job} from '../entity/Job';

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @OneToMany(type => Job, job => job.country)
    jobs: Job[];

}
