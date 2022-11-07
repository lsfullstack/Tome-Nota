import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";

@Entity("extra_content")
class ExtraContent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 300 })
  link: string;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  lesson: Lesson;
}

export { ExtraContent };
