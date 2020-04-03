import VisitHistory from '../visitHistory';

export async function findAndActivateVisitHistoryForUser(userId) {
  try {
    const visitHistory = await VisitHistory.findOne({ user: userId });
    if (!visitHistory) {
      const vh = await VisitHistory.create({
        user: userId,
        isActive: true,
      });

      return { success: true, visitHistory: vh };
    }

    await visitHistory.updateOne({
      isActive: true,
      lastActive: Date.now(),
    });
    return { success: true, visitHistory };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function deactiveUser(userId) {
  try {
    const visitHistory = await VisitHistory.findOne({ user: userId });
    if (!visitHistory) {
      return { success: false };
    }
    await visitHistory.updateOne({
      isActive: false,
      lastActive: Date.now(),
    });
    return { success: true, visitHistory };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function allActiveUsers() {
  try {
    const activeHistorys = await VisitHistory.find({
      isActive: true,
    })
      .populate('user')
      .select('user')
      .exec();
    return { success: true, activeUsers: activeHistorys };
  } catch (err) {
    return { success: false };
  }
}
