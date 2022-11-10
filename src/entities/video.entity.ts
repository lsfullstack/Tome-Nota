import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { Timeline } from "./timeline.entity";

@Entity("video")
class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 300 })
  link: string;

  @OneToMany(() => Timeline, (timeline) => timeline.video, { onDelete: 'CASCADE' })
  timelines: Timeline[];
}

export { Video };
