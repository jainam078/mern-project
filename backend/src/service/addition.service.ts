import { AppDataSource } from '../data-source';
import { Sum } from '../entities/sum.entity';

interface IStep {
	carryString: string;
	sumString: string;
}
export const additionService = {
	getAdditionSteps: ({
		number1,
		number2,
	}: {
		number1: string;
		number2: string;
	}) => {
		try {
			if (typeof number1 !== 'string' || typeof number2 !== 'string') {
				throw new Error('Both number1 and number2 must be string');
			}
			let carry = 0;
			let steps: IStep[] = [];

			// Convert the numbers to strings
			let str1 = String(number1);
			let str2 = String(number2);

			// Make the lengths of the input strings equal by padding zeros
			const maxLength = Math.max(str1.length, str2.length);
			str1 = str1.padStart(maxLength, '0');
			str2 = str2.padStart(maxLength, '0');

			// Iterate through the digits from right to left
			let counter = 0;
			for (let i = maxLength - 1; i >= 0; i--) {
				// Convert the current digits to numbers
				const digit1 = parseInt(str1[i]);
				const digit2 = parseInt(str2[i]);

				// Add the digits along with the carry
				const digitSum = digit1 + digit2 + carry;

				// Determine the carry for the next iteration
				carry = Math.floor(digitSum / 10);

				// Update the sum and carry strings
				const sumString = String(digitSum % 10);
				const carryString = String(carry);

				// Create an object for the current step and add it to the steps array

				if (i === 0 && (carry > 0 || carry === 0)) {
					const step = {
						carryString:
							steps.length > 0 ? `${steps[0].carryString}` : carryString + '_',
						sumString:
							steps.length > 0
								? carry > 0
									? String(carry + sumString + steps[0].sumString)
									: String(sumString + steps[0].sumString)
								: sumString,
					};
					steps.unshift(step);
				} else {
					const step = {
						carryString:
							steps.length > 0
								? `${carryString}${steps[0].carryString}`
								: carryString + '_',
						sumString:
							steps.length > 0 ? sumString + steps[0].sumString : sumString,
					};
					steps.unshift(step);
				}
			}

			// Assign step numbers to the steps
			const numberedSteps: {
				[key: string]: { carryString: string; sumString: string };
			} = {};
			for (let i = steps.length - 1; i >= 0; i--) {
				const stepNumber = 'step' + (counter + 1);
				numberedSteps[stepNumber] = steps[i];
				counter++;
			}
			return numberedSteps;
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
		}
	},
	saveDataWithSteps: async ({
		number1,
		number2,
		steps,
	}: {
		number1: string;
		number2: string;
		steps: string;
	}) => {
		try {
			if (typeof number1 !== 'string' || typeof number2 !== 'string') {
				throw new Error('All the values number1 and number2 must be string');
			} else if (typeof steps! !== 'object') {
				throw new Error('The variable steps must be object');
			}
			const sum = new Sum(Number(number1), Number(number2), steps);
			return await AppDataSource.manager.save(sum);
		} catch (err: unknown) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
		}
	},
	getDataByPagination: async ({
		page,
		limit,
	}: {
		page: number;
		limit: number;
	}) => {
		try {
			// Set a default page value if not provided or if it is negative
			page = page < 0 ? 1 : page;
			const skip = (page - 1) * limit;
			const take = limit;

			const sumRepository = AppDataSource.manager.getRepository(Sum);
			const [sums, total] = await sumRepository.findAndCount({
				skip,
				take,
			});

			return {
				data: sums,
				page,
				limit,
				total,
			};
		} catch (err: unknown) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
		}
	},
};
