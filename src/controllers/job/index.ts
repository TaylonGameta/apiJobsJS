import {Request, Response, NextFunction, json} from 'express';
import {getRepository, getManager} from 'typeorm';
import {Job} from '../../entity/Job';
import {User} from '../../entity/User';
import {Category} from '../../entity/Category';

//interfaces
import {JobInterface} from '../../interfaces/job';

/*
*** Job Controller
*/

export const create = async (req: Request, res:Response)=>{

    //get values from request
    const {title,
         description,
          salary,
           education,
            requirements,
             country,
              experience,
                userId,
                  categoryId} : JobInterface = req.body;
    
    const userRepository = getManager().getRepository(User);
    const ownerUser = await userRepository.findOne(userId);

    const categoryRepository = getManager().getRepository(Category);
    const jobCategory = await categoryRepository.findOne(categoryId);

    
    const jobRepository = getManager().getRepository(Job);

    //creating a new job
    const newJob = new Job();
    newJob.title = title;
    newJob.description = description;
    newJob.salary = salary;
    newJob.education = education;
    newJob.requirements = requirements;
    newJob.country = country;
    newJob.experience = experience;
    newJob.user = ownerUser;
    if(categoryId)
      newJob.category = jobCategory;

    await jobRepository.save(newJob);

    res.json({result: "product created"});
    
}

export const read = async(req: Request, res: Response)=>{
  const {minSalary, maxSalary} : JobInterface = req.body

  const jobRepository = getManager().getRepository(Job);
  const jobs = await jobRepository.find();

  res.json({jobs});
}