import { Id } from '../helpers/id';
import { Column, Entity } from 'typeorm';

@Entity('role')
export class Role {
  @Id()
  id: number;

  @Column({ name: 'initials' })
  initials: string;

  @Column({ name: 'description' })
  description: string;
}
