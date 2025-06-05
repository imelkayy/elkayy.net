import { SelectOption } from "./types";

export enum UserRoles {
  Default = 0,
  Admin = 1
}

export enum SettingType {
  Boolean = 0,
  Byte,
  Integer,
  Float,
  String,
  Vector,
  Classes
}

export const SettingType_SelectOptions: SelectOption[] = Object.entries(SettingType)
  .filter((t) => {
    const num = Number(t[0])
    return !Number.isNaN(num);
  }).map(
    t => {
      return { 
        id: Number(t[0]), 
        label: String(t[1]) 
      }
  }
);