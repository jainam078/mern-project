import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Sum {
	constructor(number1: number, number2: number, steps: string) {
		this.number1 = number1;
		this.number2 = number2;
		this.steps = steps;
	}
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'numeric' })
	number1: number;

	@Column({ type: 'numeric' })
	number2: number;

	@Column({ type: 'json' })
	steps: string;
}
