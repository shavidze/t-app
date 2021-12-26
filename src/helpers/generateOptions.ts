import { Gender } from "../constants/enums";

export default function generateOptionFromEnum<T>(enumObject: T) {
  return Object.keys(enumObject).map((key) => {
    return {
      value: key.toLocaleLowerCase(),
      label: enumObject[key as keyof typeof enumObject],
    };
  });
}
