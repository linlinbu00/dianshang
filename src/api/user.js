import request from "@/utils/request";
// 登录
export const login = (data) => {
  return request({
    method: "POST",
    url: "/login",
    data,
  });
};
// 左侧侧边栏菜单列表
export const getMenuList = () => {
  return request({
    method: "GET",
    url: "/menus",
  });
};
// 用户列表
export const getUserList = (params) => {
  return request({
    method: "GET",
    url: "/users",
    params,
  });
};
// 修改用户状态
export const changeUserState = (userId, userState) => {
  return request({
    method: "PUT",
    url: `users/${userId}/state/${userState}`,
  });
};
// 添加用户
export const addUser = (data) => {
  return request({
    method: "POST",
    url: "/users",
    data,
  });
};
// 查找用户
export const searchUser = (id) => {
  return request({
    method: "GET",
    url: `users/${id}`,
  });
};
// 删除用户
export const editUser = (id, data) => {
  return request({
    method: "PUT",
    url: `users/${id}`,
    data,
  });
};
// 修改用户
export const deleteUser = (id) => {
  return request({
    method: "DELETE",
    url: `users/${id}`,
  });
};
