import React from 'react';
import { additionApi } from '../../api';
import type { INumberAddition } from '../../interfaces';
export const HomePage = () => {
	const [number1, setNumber1] = React.useState<string>('');
	const [number2, setNumber2] = React.useState<string>();
	const [result, setResult] = React.useState('');
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		additionApi
			.getAdditionSteps(String(number1), String(number2))
			.then((res: INumberAddition) => {
				if (res) {
					setResult(JSON.stringify(res?.data));
				}
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	const saveToDb = () => {
		if (!result) {
			alert('Please generate steps first!');
			return;
		}
		additionApi
			.saveToDB(String(number1), String(number2), JSON.parse(result))
			.then((res) => {
				setResult('');
				alert('Data saved successfully!');
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	return (
		<>
			<div
				className="vh-100"
				style={{ backgroundColor: '#FFFFFF' }}
			>
				<div
					className="p-3"
					style={{ backgroundColor: '#E9E9E9', fontWeight: 'bold' }}
				>
					Step Addition
				</div>
				<div className="container p-3">
					<div className="row-md-4 justify-content-md-end">
						<form
							onSubmit={onSubmit}
							className="col"
						>
							<div className="mb-3 row-md-6 justify-content-md-center">
								<div className="col-md-8">
									<div className="mb-3 row justify-content-md-end">
										<label
											htmlFor={'number1'}
											className="col-sm-2 form-label"
										>
											First Number:
										</label>
										<div className="col-md-4">
											<input
												type="number"
												name="number1"
												className="form-control"
												id="number1"
												value={number1}
												min={0}
												onChange={(e) => setNumber1(String(e.target.value))}
												required
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="mb-3 row-md-6 justify-content-md-center">
								<div className="col-md-8">
									<div className="mb-3 row justify-content-md-end">
										<label
											htmlFor={'number2'}
											className="col-sm-2 form-label"
										>
											Second Number:
										</label>
										<div className="col-md-4">
											<input
												type="number"
												name="number2"
												className="form-control"
												id="number2"
												value={number2}
												min={0}
												onChange={(e) => setNumber2(String(e.target.value))}
												required
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="mb-3 row-md-6 justify-content-md-center">
								<div className="col-md-10">
									<div className="mb-3 row justify-content-md-end">
										<div className="col-md-4">
											<button
												type="submit"
												className="btn btn-secondary text-black"
											>
												Generate Steps
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="mb-3 row-md-6 justify-content-md-center">
								<div className="col-md-8">
									<div className="mb-3 row justify-content-md-end">
										<div className="col-md-8">
											<textarea
												className="form-control"
												id="exampleFormControlTextarea1"
												rows={6}
												defaultValue={result}
											></textarea>
											{/* <JsonViewer value={result} /> */}
										</div>
									</div>
								</div>
							</div>
							<div className="mb-3 row-md-6 justify-content-md-center">
								<div className="col-md-10">
									<div className="mb-3 row justify-content-md-end">
										<div className="col-md-4">
											<span
												role="button"
												onClick={saveToDb}
												className="p-1 cursor text-white"
												style={{ backgroundColor: '#138900' }}
											>
												Save results to DB
											</span>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
