import VisitHistory from '../models/visitHistory';

export async function getAllVisitHistories(request, response) {
  try {
    const userObj = await VisitHistory.find().populate('user').exec();
    return response.status(200).json({ data: userObj });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}
