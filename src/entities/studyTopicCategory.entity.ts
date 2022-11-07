import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { StudyTopic } from "./studyTopic.entity";

@Entity("studyTopic_categories")
class StudyTopicCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => StudyTopic, { onDelete: 'CASCADE' })
  studyTopic: StudyTopic;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: Category;
}

export { StudyTopicCategory };
