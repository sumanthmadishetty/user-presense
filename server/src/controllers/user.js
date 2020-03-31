import User from '../models/user';

export async function createUser(request, response) {
  const { username, password } = request.body;
  try {
    const userObj = await User.create({
      username: username,
      password,
    });
    console.log('created', userObj);
    return response.status(200).json({ data: userObj.toObject() });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
}
