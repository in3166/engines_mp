function getRole(user) {
  let role = '';
  switch (user) {
    case 0:
      role = '일반 사용자';
      break;
    case 1:
      role = '관리자';
      break;
    case 2:
      role = '전문가';
      break;
    case 3:
      role = '엔지니어';
      break;
    case '일반 사용자':
      role = 0;
      break;
    case '관리자':
      role = 1;
      break;
    case '전문가':
      role = 2;
      break;
    case '엔지니어':
      role = 3;
      break;
    default:
      role = '';
      break;
  }
  return role;
}

export default getRole;
