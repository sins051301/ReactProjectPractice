export function isNotEmpty(str) {
  return str.trim() !== "";
}

export function isEmail(str){
    return str.includes("@");
}

export function hasMinLength(str, num){
    return str.length > num;
}