import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { AppError } from "../../errors/AppError";
import { ILesson, ILessonRequest } from "../../interfaces/lessons.interface";

const createLessonService = async ({name}: ILessonRequest, studyTopicId: string): Promise<ILesson> => {

  const lessonRepository = AppDataSource.getRepository(Lesson);
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const studyTopic = await studyTopicRepository.findOneBy({
    id: studyTopicId
  });

  if(!studyTopic) {
    throw new AppError("Study topic not found", 404);
 
  }

  const newLesson = lessonRepository.create({
    name,
    studyTopic
  });

  await lessonRepository.save(newLesson);

  return newLesson;
};

export default createLessonService;

