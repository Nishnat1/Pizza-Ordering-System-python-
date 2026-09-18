
export default function passwordValidator(password: string) {
  let isValid = false;
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (pattern.test(password)) {
    isValid = true;
  }
  return isValid;
}
