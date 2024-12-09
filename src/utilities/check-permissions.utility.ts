import {
  check,
  request,
  RESULTS,
  PermissionStatus,
} from "react-native-permissions";
import {
  PermissionEnum,
  permissionMap,
} from "../interfaces/permissions.interface";

export const checkPermission = async (
  permissionKey: PermissionEnum
): Promise<boolean> => {
  const permission = permissionMap[permissionKey];

  const result: PermissionStatus = await check(permission);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      return false;
    case RESULTS.DENIED:
      const response = await requestPermission(permissionKey);
      return !response ? false : true;
    case RESULTS.LIMITED:
      return true;
    case RESULTS.GRANTED:
      return true;
    case RESULTS.BLOCKED:
      return false;
  }
};

const requestPermission = async (
  permissionKey: PermissionEnum
): Promise<boolean | void> => {
  try {
    const result: PermissionStatus = await request(
      permissionMap[permissionKey]
    );
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`Error requesting ${permissionKey} permission:, ${error}`);
  }
};
