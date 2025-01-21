import { UserDto } from "@/api/types/UserDto";
import { request } from "@/api/request";
import { User, UsersParams } from "@/api/types/user";

// POST create user
export const getAllUsers = async (
    params?: UsersParams
  ): Promise< User[] > => {
    return request({
      url: "users",
      method: "get",
      params,
    });
  };

// POST create user
export const createUser = async (
    data: UserDto
  ): Promise<{ message: string }> => {
    return request({
      url: "users",
      method: "post",
      data,
    });
  };