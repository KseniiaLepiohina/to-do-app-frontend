import { Icon } from "@iconify/react";

export default function TaskStatusIcon({ completed }) {
  return completed ? (
    <Icon icon="lsicon:checkbox-filled" color="#EDB046" height={28} width={28} />
  ) : (
    <Icon icon="material-symbols:check-box-outline" color="#EDB046" height={28} width={28} />
  );
}
