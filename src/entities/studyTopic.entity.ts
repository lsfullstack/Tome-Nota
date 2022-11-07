import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Lesson } from "./lesson.entity";
import { StudyTopicCategory } from "./studyTopicCategory.entity";
import { User } from "./user.entity";

@Entity("study_topic")
class StudyTopic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(
    () => StudyTopicCategory,
    (studyTopicCategory) => studyTopicCategory.studyTopic,
    { cascade: true }
  )
  studyTopicCategories: StudyTopicCategory[];

  @OneToMany(() => Lesson, (lesson) => lesson.studyTopic, { onDelete: 'CASCADE' })
  lessons: Lesson[];
}

export { StudyTopic };
