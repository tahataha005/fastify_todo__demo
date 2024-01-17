import app from "../../../app";
import { RouteGroup } from "../../contants/types/route.types";

export const registerRouteGroup = (prefix: string, routeGroup: RouteGroup) => {
  app.register(routeGroup, { prefix });
};
