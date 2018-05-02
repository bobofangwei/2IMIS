const loginRes = {
  msg: 'OK',
  res: {
    token: 'lsdfjlsadhgoewrfls'
  },
  status: '0'
};
const userInfoRes = {
  msg: 'OK',
  res: {
    roles: ['admin', 'pm'],
    avatar: 'url',
    username: 'bobo'
  },
  status: '0'
};
const logoutRes = {
  'status': 0,
  'msg': 'OK'
};

export default {
  login: config => {
    return loginRes;
  },
  getUserInfo: config => {
    return userInfoRes;
  },
  logout: config => {
    return logoutRes
  }
};
