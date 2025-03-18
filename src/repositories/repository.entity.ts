import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RepositoryEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column({ type: 'text', nullable: true })
  description: string | null;
  @Column()
  stars: number;
  @Column({ type: 'text', nullable: true })
  language: string | null;
}
