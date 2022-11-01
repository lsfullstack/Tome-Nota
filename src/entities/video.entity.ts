import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timeline } from "./timeline.entity";

@Entity("video")
class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 300 })
  link: string;

  @OneToMany(() => Timeline, (timeline) => timeline.video)
  timelines: Timeline[];
}

export { Video };
