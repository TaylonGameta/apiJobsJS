import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Job} from '../entity/Job';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @OneToMany(type => Job,  job => job.category)
    jobs: Job[]; 

}
