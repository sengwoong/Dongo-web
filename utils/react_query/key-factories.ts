import { queryKeys } from "./constants";

export const generateUserKey = () => {

  return [queryKeys.user];
};

export const generateUserAppointmentsKey = (
  userId: number,
  userToken: string
) => {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
};
