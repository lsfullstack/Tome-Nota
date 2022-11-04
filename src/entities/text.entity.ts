import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lesson } from "./lesson.entity";
import { Paragraph } from "./paragraph.entity";

@Entity("text")
class Text {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => Lesson)
  lesson: Lesson;

  @OneToMany(() => Paragraph, (paragraph) => paragraph.text)
  paragraphs: Paragraph[];
}

export { Text };
