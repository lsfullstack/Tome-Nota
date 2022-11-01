import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";

@Entity("timeline")
class Timeline {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "time" })
  time: string;

  @Column({ length: 100 })
  description: string;

  @ManyToOne(() => Video)
  video: Video;
}

export { Timeline };
