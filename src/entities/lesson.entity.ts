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

  @OneToMany(() => Text, (text) => text.lesson)
  texts: Text[];

  @ManyToOne(() => StudyTopic)
  studyTopic: StudyTopic;

  @OneToMany(() => ExtraContent, (extraContent) => extraContent.lesson)
  extraContents: ExtraContent[];

  @OneToOne(() => Video, { eager: true, nullable: true })
  @JoinColumn()
  video: Video;
}

export { Lesson };
