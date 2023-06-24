import express, { Request, Response } from 'express';
import { additionService } from '../service/addition.service';
const router = express.Router();

router
	.route('/sum')
	.get(async (req: Request, res: Response) => {
		try {
			const { page, limit } = req.query;

			const data = await additionService.getDataByPagination({
				page: Number(page),
				limit: Number(limit),
			});
			res.status(200).json({ data });
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ data: { message: err.message } });
			}
		}
	})
	.post((req: Request, res: Response) => {
		try {
			const data = additionService.getAdditionSteps(req.body);
			res.status(200).json({ data });
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ data: { message: err.message } });
			}
		}
	});

router.post('/sum/save', async (req: Request, res: Response) => {
	try {
		const data = await additionService.saveDataWithSteps(req.body);
		res.status(200).json({ data });
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ data: { message: err.message } });
		}
	}
});
export default router;
