import userService from '../services/user.service.js';

async function updateUser(req, res, next) {
  try {
    const { body, userId } = req;

    const data = await userService.updateUser({ userId, body });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export default {
  updateUser,
};
