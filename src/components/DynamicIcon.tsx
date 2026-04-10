import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = (Icons as Record<string, React.ElementType>)[name];

  if (!IconComponent) {
    // Return a default icon or nothing if the icon name is invalid
    return <Icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
