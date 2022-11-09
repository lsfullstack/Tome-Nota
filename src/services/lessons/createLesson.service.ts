import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { AppError } from "../../errors/AppError";
import { ILesson, ILessonRequest } from "../../interfaces/lessons.interface";

const createLessonService = async (lesson: ILessonRequest, studyTopicId: string): Promise<ILesson> => {
  const { name } = lesson;
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const studyTopic = await studyTopicRepository.findOneBy({
    id: studyTopicId
  });

  const verifyBlockedFields = Object.keys(lesson).some(e => e !== "name");

  if (verifyBlockedFields) {
    throw new AppError("Only the name field can be send");
  }

  if (!studyTopic) {
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
