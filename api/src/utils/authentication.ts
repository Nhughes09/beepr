import { UserRole } from "../entities/User";
import { AuthChecker } from "type-graphql";
import type { Context } from "../utils/context";
import { GraphQLError } from "graphql";

export const authChecker: AuthChecker<Context> = ({ args, context }, roles) => {
  const { user } = context;

  if (!user) return false;

  // Let admins do anything
  if (user.role === UserRole.ADMIN) return true;

  if (roles[0] === 'No Verification') return true;

  if (roles[0] === 'No Verification Self') return args.id === undefined || args.id === user.id;

  if (!user.isEmailVerified) throw new GraphQLError("Please verify your email to use the Beep App");

  if (roles.length === 0) return true;

  if (roles[0] === 'self') {
    if (!args.id) {
      return false;
    }
    return args.id === user.id;
  }

  if (roles[0] === context.user.role) {
    return true;
  }

  return false;
};
