export const EMPTY = { name: "", email: "" };

export function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Please tell us your name.";
  if (!/^\S+@\S+\.\S+$/.test(fields.email))
    errors.email = "That email does not look right.";
  return errors;
}
