import authService from '../services/auth.service.js';

async function signUp(req, res, next) {
  try {
    const { body } = req;

    const data = await authService.signUp({ body });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function logIn(req, res, next) {
  try {
    const { body } = req;

    const data = await authService.logIn({ body });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export default {
  signUp,
  logIn,
};
