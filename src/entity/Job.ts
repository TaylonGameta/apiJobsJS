import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from '../entity/User';
import {Category} from '../entity/Category';
import {Country} from '../entity/Country';

@Entity()
export class Job {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    requirements: string;

    @Column()
    experience: string;

    @Column()
    education: string;

    @Column()
    salary: number;

    @ManyToOne(type => User, user => user.jobs)
    user : User;

    @ManyToOne(type => Category, category => category.jobs)
    category: Category;

    @ManyToOne(type => Country, country => country.jobs)
    country: Country;

}