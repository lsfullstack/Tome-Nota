import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";

const updateLessonService = async (id:string, name:string) => {
  const lessonRepository = AppDataSource.getRepository(Lesson);

  const lesson = await lessonRepository.findOneBy({id});

  if(!lesson){
    throw new AppError("Lesson not found", 404);
  }

  await lessonRepository.update(id,{
    name:name
  });

  const updatedLesson = await lessonRepository.findOneBy({id});

  return updatedLesson;
};

export default updateLessonService;

