import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";

const deleteLessonService = async(id:string) => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOneBy({id});
  console.log(id);
  if(!lesson){
    throw new AppError ("Lesson not found", 404);
  }

  await lessonRepository.delete({id:id});


};

export default deleteLessonService;