import {Request, Response} from 'express';
import {getManager, MoreThanOrEqual, LessThanOrEqual, Between} from 'typeorm';
import {Job} from '../../entity/Job';
import {User} from '../../entity/User';
import {Category} from '../../entity/Category';
import {Country} from '../../entity/Country';

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
             countryId,
              experience,
                userId,
                  categoryId} : JobInterface = req.body;
    
    //user repository
    const userRepository = getManager().getRepository(User);
    const ownerUser = await userRepository.findOne(userId);

    //category repository
    const categoryRepository = getManager().getRepository(Category);
    const jobCategory = await categoryRepository.findOne(categoryId);

    //country repository
    const countryRepository = getManager().getRepository(Country);
    const jobCountry = await categoryRepository.findOne(countryId);

    
    const jobRepository = getManager().getRepository(Job);

    //creating a new job
    const newJob = new Job();
    newJob.title = title;
    newJob.description = description;
    newJob.salary = salary;
    newJob.education = education;
    newJob.requirements = requirements;
    newJob.country = jobCountry;
    newJob.experience = experience;
    newJob.user = ownerUser;
    if(categoryId)
      newJob.category = jobCategory;

    await jobRepository.save(newJob).catch(e => res.status(400).json({error: "bad request"}));
    res.status(201).json({result: "created"});
    
}

export const read = async(req: Request, res: Response)=>{
  const {minSalary, maxSalary, salary, countryId, categoryId, skip} : JobInterface = req.body;

  const jobRepository = getManager().getRepository(Job);

  const jobs = await jobRepository.find({
    join:{
      alias: "job",
      leftJoinAndSelect:{
        country: "job.country",
        category: "job.category"
      }
    },
    where:{
      ...(categoryId ? {
        category:{
          id: categoryId
        }
      } : {}),
      ...(countryId ? {
        country:{
          id: countryId
        }
      } : {}),
      ...(minSalary && maxSalary ? {salary: Between(minSalary, maxSalary)} : minSalary ? {salary: MoreThanOrEqual(minSalary)}
      : {salary: LessThanOrEqual(maxSalary)})
    },
    
    skip: skip,
    take:100
  });
  res.json(jobs);
}

export const update = async(req: Request, res: Response) =>{
  const {jobId,
     categoryId,
      countryId,
       description,
        education,
         experience,
          requirements,
           salary,
            title} : JobInterface = req.body;

  //category repository
  const categoryRepository = getManager().getRepository(Category);
  const myCategory = await categoryRepository.findOne(categoryId);

  //country repository
  const countryRepository = getManager().getRepository(Country);
  const myCountry = await countryRepository.findOne(countryId);

  //job repository
  const jobRepository = getManager().getRepository(Job);
  const myJob = await jobRepository.findOne(jobId);

  myJob.category = myCategory;
  myJob.country = myCountry;
  myJob.description = description;
  myJob.education = education;
  myJob.experience = experience;
  myJob.requirements = requirements;
  myJob.salary = salary;
  myJob.title = title;

  await jobRepository.save(myJob).catch(e => res.status(400).json({error: "bad request"}));
  res.status(200).json({result: "updated successfuly"});
}