import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";

const retriveLessonService = async (id:string) => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lessonId = await lessonRepository.findOneBy({
    id
  });

  if(!lessonId){
    throw new AppError("Id not found", 404);
  }

  /*if(lessonId.length == 0){
    throw new AppError("Id not found", 404);

  }*/

  return lessonId;

};

export default retriveLessonService;