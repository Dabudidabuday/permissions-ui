import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface WithPermissionProps {
  resource: string;
  action: string;
  isOwn?: boolean;
  children: ReactNode;
}

export const WithPermission = ({ resource, action, isOwn = false, children}: WithPermissionProps) => {
  const { policies } = useContext(AuthContext);

  const isAllow = policies.includes(`${action}${isOwn ? ':own' : ''}:${resource}`);

  return isAllow ? <>{children}</> : <></>
}
