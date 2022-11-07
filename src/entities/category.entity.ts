import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyTopicCategory } from "./studyTopicCategory.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @OneToMany(
    () => StudyTopicCategory,
    (studyTopicCategory) => studyTopicCategory.category,
    { cascade: true }
  )
  studyTopicCategories: StudyTopicCategory[];
}

export { Category };
