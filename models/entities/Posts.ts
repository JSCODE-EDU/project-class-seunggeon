import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("posts", { schema: "JSCODE_DB" })
export class Posts {
  @PrimaryGeneratedColumn({ type: "int", name: "postId" })
  postId: number;

  @Column("varchar", { name: "title", nullable: true, length: 30 })
  title: string | null;

  @Column("varchar", { name: "content", nullable: true, length: 1000 })
  content: string | null;

  @CreateDateColumn({type : "timestamp"})
  createdAt: Date;
}
