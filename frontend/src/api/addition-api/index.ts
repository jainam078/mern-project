import axios from 'axios';
import type { INumberAddition } from '../../interfaces';
export const additionApi = {
	getAdditionSteps: (number1: string, number2: string) => {
		return new Promise<INumberAddition>((resolve, reject) => {
			let data = JSON.stringify({
				number1,
				number2,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://localhost:4000/api/sum',
				headers: {
					'Content-Type': 'application/json',
				},
				data: data,
			};
			axios
				.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		});
	},
	saveToDB: (number1: string, number2: string, steps: object) => {
		return new Promise((resolve, reject) => {
			let data = JSON.stringify({
				number1,
				number2,
				steps,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://localhost:4000/api/sum/save',
				headers: {
					'Content-Type': 'application/json',
				},
				data: data,
			};

			axios
				.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		});
	},
};
