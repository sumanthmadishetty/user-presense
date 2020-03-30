import User from '../models/user';

export async function createUser(request, response) {
  const { username, password } = request.body;
  try {
    const userObj = await User.create({
      username: username,
      password,
    });
    return response.status(200).json({ data: userObj.toObject() });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
}
