import User from '../models/user';
import VisitHistory from '../models/visitHistory';

export async function createUser(request, response) {
  const { username, password } = request.body;
  try {
    const userObj = await User.create({
      username: username,
      password,
    });
    return response.status(200).json({ data: userObj.toObject() });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}

export async function findOrCreateVisitHistoryAndActivateUser(
  userId,
) {
  try {
    const visitHistory = await VisitHistory.findOne({ user: userId });
    if (!visitHistory) {
      const vh = await VisitHistory.create({
        user: userId,
        isActive: true,
      });
      return vh;
    }

    const vhup = await visitHistory.update({ isActive: true });
    return vhup;
  } catch (err) {
    return null;
  }
}
