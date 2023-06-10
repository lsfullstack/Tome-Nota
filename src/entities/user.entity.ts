import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { StudyTopic } from "./studyTopic.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ length: 60 })
  name: string;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => StudyTopic, (studyTopic) => studyTopic.user, { cascade: true })
  studyTopics: StudyTopic[];
}

export { User };
