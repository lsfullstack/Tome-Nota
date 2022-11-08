import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExtraContent } from "./extraContent.entity";
import { StudyTopic } from "./studyTopic.entity";
import { Text } from "./text.entity";
import { Video } from "./video.entity";

@Entity("lesson")
class Lesson {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @OneToMany(() => Text, (text) => text.lesson, { cascade: true })
  texts: Text[];

  @ManyToOne(() => StudyTopic, { onDelete: 'CASCADE' })
  studyTopic: StudyTopic;

  @OneToMany(() => ExtraContent, (extraContent) => extraContent.lesson,
  { cascade: true })
  extraContents: ExtraContent[];

  @OneToOne(type => Video, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  video: Video;
}

export { Lesson };
