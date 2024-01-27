import { useState } from "react";
import { Switch } from "@headlessui/react";
import useTheme from "../../hooks/useTheme";
const ToggoleBtn = () => {
  const [enabled, setEnabled] = useState(false);
  const { handleModeChnage } = useTheme();
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      onClick={handleModeChnage}
      className={`${
        enabled ? "bg-[#d72050]" : "bg-gray-400"
      } relative inline-flex h-7 w-12 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-5 w-5 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default ToggoleBtn;
