import app from "../../../app";
import { RouteGroup } from "../../types/route.type";

export const registerRouteGroup = (prefix: string, routeGroup: RouteGroup) => {
  app.register(routeGroup, { prefix });
};
