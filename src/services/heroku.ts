import { HEROKU_URL } from '../constants';
import { Endpoint, ITask, DataTypes, IUser, ICheckSession } from 'src/models';
import { getGithubLogin } from './github-auth';

export const checkUser = async () => {
  const usersRes = await getUsers();
  const users = await usersRes.json();
  const githubLogin = getGithubLogin();
  const user = users.find((user: { githubId: string }) => user.githubId === githubLogin);
  if (!user) {
    registerUser(githubLogin, users);
  }
  return true;
};

const registerUser = async (githubLogin: string, users: IUser[]) => {
  const user = {
    id: `user-${users.length + 1}`,
    githubId: githubLogin,
    roles: [localStorage.role || 'student'],
  };
  addUser(user);
};

export const getUsers = async () => {
  const res = await getData(Endpoint.users);
  return res;
};

export const getTasks = async () => {
  const res = await getData(Endpoint.tasks);
  return res;
};

export const getCheckSessions = async () => {
  const res = await getData(Endpoint.checkSessions);
  return res;
};
export const getReviewRequests = async () => {
  const res = await getData(Endpoint.reviewRequests);
  return res;
};
export const getReviews = async () => {
  const res = await getData(Endpoint.reviews);
  return res;
};

export const getData = async (endpoint: Endpoint) => {
  const res = await fetch(HEROKU_URL + endpoint);
  return res;
};

export const addUser = async (user: IUser) => {
  const res = await addData(Endpoint.users, user);
  return res;
};

export const addTask = async (task: ITask) => {
  const res = await addData(Endpoint.tasks, task);
  return res;
};

export const addCheckSession = async (checkSession: ICheckSession) => {
  const res = await addData(Endpoint.checkSessions, checkSession);
  return res;
};

export const addData = async (endpoint: Endpoint, data: DataTypes) => {
  const resolve = await fetch(HEROKU_URL + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return resolve;
};