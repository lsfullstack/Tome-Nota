import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Text } from "./text.entity";

@Entity("paragraph")
class Paragraph {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 5000 })
  description: string;

  @ManyToOne(() => Text, { onDelete: 'CASCADE' })
  text: Text;
}

export { Paragraph };
